
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UpcomingWebinarProps {
  title: string;
  date: string;
  time: string;
  presenter: string;
}

export function UpcomingWebinar({ title, date, time, presenter }: UpcomingWebinarProps) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card/60 hover:bg-card transition-colors group">
      <div className="flex-shrink-0 h-12 w-12 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
        <Calendar className="h-6 w-6" />
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="text-sm font-medium line-clamp-1">{title}</h4>
        <p className="text-xs text-muted-foreground">par {presenter}</p>
        <div className="flex items-center mt-1">
          <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{date} · {time}</span>
        </div>
      </div>
      <Button size="sm" variant="outline" className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        Voir
      </Button>
    </div>
  );
}
