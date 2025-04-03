
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trainees } from "@/data/mockData";

const Trainees = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filtrer les stagiaires
  const filteredTrainees = trainees.filter((trainee) => {
    const matchesSearch = 
      trainee.name.toLowerCase().includes(search.toLowerCase()) ||
      trainee.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || trainee.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Stagiaires</h1>
            <p className="text-muted-foreground">
              Regardez chaque détail des profils de nos stagiaires.
            </p>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un stagiaire..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Liste des stagiaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainees.map((trainee) => (
            <Card key={trainee.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center space-y-0 gap-4 pb-2">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-semibold text-xl text-primary">
                    {trainee.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{trainee.name}</h3>
                  <p className="text-sm text-muted-foreground">{trainee.email}</p>
                </div>
              </CardHeader>
              
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm">Voir le profil</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredTrainees.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">Aucun stagiaire trouvé</h3>
            <p className="text-muted-foreground max-w-md mt-2">
              Aucun stagiaire ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Trainees;
