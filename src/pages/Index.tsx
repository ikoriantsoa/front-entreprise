
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { WebinarCard } from "@/components/webinar/WebinarCard";
import { WebinarCalendar } from "@/components/dashboard/WebinarCalendar";
import { UpcomingWebinar } from "@/components/webinar/UpcomingWebinar";
import { 
  Users,
  Video,
  Calendar,
  TrendingUp 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { webinars, upcomingWebinarsSimple, stats } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Récupérer les webinaires récents
  const recentWebinars = webinars.slice(0, 3);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Bienvenue sur le tableau de bord des webinaires de nos stagiaires.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/webinars">Tous les webinaires</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/calendar">Calendrier</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const IconComponent = 
              stat.icon === "Video" ? Video : 
              stat.icon === "Users" ? Users : 
              stat.icon === "Calendar" ? Calendar : TrendingUp;
            
            return (
              <StatCard 
                key={index}
                title={stat.title} 
                value={stat.value} 
                change={stat.change}
                icon={IconComponent}
                iconColor={stat.iconColor}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Webinaires récents</h2>
              <Button variant="link" asChild>
                <Link to="/webinars">Voir tous les webinaires</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentWebinars.map((webinar) => (
                <WebinarCard key={webinar.id} {...webinar} />
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Webinaires à venir</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingWebinarsSimple.map((webinar, index) => (
                  <UpcomingWebinar key={index} {...webinar} />
                ))}
              </CardContent>
            </Card>
            
            <WebinarCalendar />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
