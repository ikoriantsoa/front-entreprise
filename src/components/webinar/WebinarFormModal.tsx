import { useState, useEffect, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface WebinarFormModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  webinar?;
  onSubmit: (webinar) => void;
}

export function WebinarFormModal({
  isOpen,
  setIsOpen,
  webinar,
  onSubmit,
}: WebinarFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    presenter: "",
    date: "",
    time: "",
    duration: "",
    category: "",
    status: "upcoming",
    imageUrl: "", // URL de l'image uploadée
    videoUrl: "", // URL de la vidéo uploadée
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (webinar) {
      // Pré-remplir le formulaire pour un webinaire existant
      const dateObj = new Date(webinar.date);
      setFormData({
        ...webinar,
        date: format(dateObj, "yyyy-MM-dd"),
        time: format(dateObj, "HH:mm"),
        imageUrl: webinar.imageUrl || "",
        videoUrl: webinar.videoUrl || "",
      });
      if (webinar.imageUrl) setImagePreviewUrl(webinar.imageUrl);
      if (webinar.videoUrl) setVideoPreviewUrl(webinar.videoUrl);
    } else {
      // Réinitialiser le formulaire pour un nouveau webinaire
      setFormData({
        title: "",
        description: "",
        presenter: "",
        date: "",
        time: "",
        duration: "",
        category: "",
        status: "upcoming",
        imageUrl: "",
        videoUrl: "",
      });
      setImageFile(null);
      setVideoFile(null);
      setImagePreviewUrl("");
      setVideoPreviewUrl("");
    }
  }, [webinar, isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFile = e.target.files[0];
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image (PNG, JPG, GIF)");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      toast.error("Le fichier est trop volumineux (max 5MB)");
      return;
    }

    setImageFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreviewUrl(objectUrl);
    setFormData((prev) => ({ ...prev, imageUrl: objectUrl }));
  };

  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFile = e.target.files[0];
    if (!selectedFile.type.startsWith("video/mp4")) {
      toast.error("Veuillez sélectionner un fichier MP4");
      return;
    }

    const maxSize = 500 * 1024 * 1024; // 500MB
    if (selectedFile.size > maxSize) {
      toast.error("Le fichier est trop volumineux (max 500MB)");
      return;
    }

    setVideoFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setVideoPreviewUrl(objectUrl);
    setFormData((prev) => ({ ...prev, videoUrl: objectUrl }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedDateTime = new Date(`${formData.date}T${formData.time}`);
    const submittedData = {
      ...formData,
      date: combinedDateTime,
      id: webinar?.id,
    };

    onSubmit(submittedData);

    // Libérer les URLs d'aperçu
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{webinar ? "Modifier le webinaire" : "Ajouter un nouveau webinaire"}</DialogTitle>
            <DialogDescription>
              {webinar
                ? "Modifiez les détails du webinaire existant."
                : "Remplissez le formulaire pour créer un nouveau webinaire."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Titre */}
            <div className="grid gap-2">
              <Label htmlFor="title">Titre du webinaire</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Entrez un titre"
                required
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez le contenu du webinaire"
                rows={3}
                required
              />
            </div>

            {/* Présentateur et Catégorie */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="presenter">Présentateur</Label>
                <Input
                  id="presenter"
                  name="presenter"
                  value={formData.presenter}
                  onChange={handleChange}
                  placeholder="Nom du présentateur"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Développement">Développement</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Éducation">Éducation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date, Heure et Durée */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Heure</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Durée (minutes)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="60"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Statut */}
            <div className="grid gap-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Sélectionnez un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">À venir</SelectItem>
                  <SelectItem value="live">En direct</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Image du webinaire */}
            <div className="grid gap-2">
              <Label htmlFor="imageUpload">Image du webinaire</Label>
              <div className="flex flex-col items-center gap-4">
                {imagePreviewUrl && (
                  <div className="relative w-full h-40 rounded-md overflow-hidden border border-gray-200 mb-2">
                    <img
                      src={imagePreviewUrl}
                      alt="Aperçu"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="imageUpload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Cliquez pour upload</span> ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG ou GIF (max 5MB)</p>
                    </div>
                    <Input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Source du webinaire */}
            <div className="grid gap-2">
              <Label htmlFor="videoUpload">Source du webinaire (MP4)</Label>
              <div className="flex flex-col items-center gap-4">
                {videoPreviewUrl && (
                  <div className="relative w-full h-40 rounded-md overflow-hidden border border-gray-200 mb-2">
                    <video
                      src={videoPreviewUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="videoUpload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Cliquez pour upload</span> ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500">Fichiers MP4 uniquement (max 500MB)</p>
                    </div>
                    <Input
                      id="videoUpload"
                      type="file"
                      accept="video/mp4"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">{webinar ? "Mettre à jour" : "Créer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}