
import { format, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Clock, Edit, Trash2, Volume2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Clé API pour ElevenLabs - À remplacer par la vôtre
const API_KEY = ""; // Remplacez par votre clé API ElevenLabs

interface WebinarCardProps {
  id: string;
  title: string;
  presenter: string;
  description?: string; // Description is optional
  date: Date | string; // Accept both Date and string types
  duration: number | string; // Allow both number and string for duration
  category: string;
  status: "upcoming" | "live" | "completed" | "cancelled";
  imageUrl?: string; // Optional image URL
  thumbnailUrl?: string; // Optional thumbnail URL
  className?: string; // Optional className prop
  onEdit?: () => void;
  onDelete?: () => void;
}

const statusConfig = {
  upcoming: { label: "À venir", color: "bg-blue-500" },
  live: { label: "En direct", color: "bg-green-500" },
  completed: { label: "Terminé", color: "bg-gray-500" },
  cancelled: { label: "Annulé", color: "bg-red-500" },
};

export function WebinarCard({ 
  id,
  title, 
  presenter, 
  description, 
  date, 
  duration, 
  category, 
  status, 
  imageUrl,
  thumbnailUrl,
  className,
  onEdit,
  onDelete
}: WebinarCardProps) {
  const navigate = useNavigate();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  // Safely convert date to Date object if it's a string and validate it
  let webinarDate: Date;
  if (date instanceof Date) {
    webinarDate = date;
  } else {
    webinarDate = new Date(date);
  }

  // Format dates only if the date is valid
  let dateFormatted = "Date invalide";
  let timeFormatted = "--:--";
  
  if (isValid(webinarDate)) {
    try {
      dateFormatted = format(webinarDate, 'dd MMMM yyyy', { locale: fr });
      timeFormatted = format(webinarDate, 'HH:mm', { locale: fr });
    } catch (error) {
      console.error("Error formatting date:", error, "Date value:", date);
    }
  } else {
    console.warn("Invalid date value:", date);
  }
  
  // Use imageUrl if provided, otherwise use thumbnailUrl
  const displayImage = imageUrl || thumbnailUrl || '/placeholder.svg';

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmDeleteOpen(true);
  };
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  const confirmDelete = () => {
    onDelete?.();
    setConfirmDeleteOpen(false);
  };
  
  // Naviguer vers la page détaillée quand on clique sur la carte
  const handleCardClick = () => {
    navigate(`/webinaire/${id}`);
    speakWebinar();
  };

  // Fonction pour arrêter l'audio en cours si un nouveau est joué
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  // Fonction pour créer le texte à lire
  const getTextToSpeak = () => {
    let text = `Webinaire: ${title}. Présenté par ${presenter}.`;
    
    if (description) {
      text += ` Description: ${description}.`;
    }
    
    text += ` Ce webinaire est ${statusConfig[status].label} et aura lieu le ${dateFormatted} à ${timeFormatted}.`;
    text += ` La durée prévue est de ${duration}.`;
    text += ` Catégorie: ${category}.`;
    
    return text;
  };

  // Fonction pour lire le webinaire
  const speakWebinar = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    if (!API_KEY) {
      return;
    }

    if (isPlaying && audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
  };
  
  return (
    <>
      <Card 
        className={`overflow-hidden hover:shadow-md transition-shadow group ${className || ''} cursor-pointer shadow-lg`}
        onClick={handleCardClick}
      >
        <div className="relative h-40 overflow-hidden">
          <img
            src={displayImage}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="mb-1">
              {category}
            </Badge>
          </div>
          <CardTitle className="text-lg line-clamp-2 h-12 text-[#333]">{title}</CardTitle>
          <CardDescription>Par {presenter}</CardDescription>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <p className="text-sm line-clamp-3">{description}</p>
        </CardContent>
        
      </Card>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le webinaire "{title}" ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
