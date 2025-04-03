// Types pour les données
export interface Webinar {
  id: string;
  title: string;
  presenter: string;
  date: string;
  time: string;
  duration: string;
  attendees: number;
  category: string;
  status: "upcoming" | "live" | "completed" | "cancelled";
  thumbnailUrl: string;
  description?: string;
}

export interface UpcomingWebinarSimple {
  title: string;
  date: string;
  time: string;
  presenter: string;
}

export interface StatData {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
}

// Données mockées pour les webinaires
export const webinars: Webinar[] = [
  {
    id: "1",
    title: "Introduction à React pour débutants",
    presenter: "Marie Dubois",
    date: "12 Juin 2023",
    time: "14:00",
    duration: "1h 30m",
    attendees: 45,
    category: "Développement Web",
    status: "completed",
    thumbnailUrl: "https://placehold.co/600x400/3b82f6/FFFFFF?text=React+D%C3%A9butants",
    description: "Apprenez les fondamentaux de React, de la création de composants à la gestion d'état. Ce webinaire est conçu pour les développeurs ayant une connaissance de base en HTML, CSS et JavaScript."
  },
  {
    id: "2",
    title: "Maîtriser Tailwind CSS en entreprise",
    presenter: "Thomas Martin",
    date: "15 Juin 2023",
    time: "10:00",
    duration: "2h",
    attendees: 32,
    category: "Design Front-end",
    status: "live",
    thumbnailUrl: "https://placehold.co/600x400/8b5cf6/FFFFFF?text=Tailwind+CSS",
    description: "Découvrez les meilleures pratiques pour utiliser Tailwind CSS dans vos projets d'entreprise, avec des conseils pour l'organisation du code et l'optimisation des performances."
  },
  {
    id: "3",
    title: "TypeScript Avancé pour les équipes de développement",
    presenter: "Julie Bernard",
    date: "20 Juin 2023",
    time: "15:30",
    duration: "1h 45m",
    attendees: 28,
    category: "Programmation",
    status: "upcoming",
    thumbnailUrl: "https://placehold.co/600x400/ec4899/FFFFFF?text=TypeScript+Avanc%C3%A9",
    description: "Ce webinaire aborde les fonctionnalités avancées de TypeScript : génériques, types conditionnels, inférence de types et stratégies pour améliorer la qualité du code dans les grandes bases de code."
  },
  {
    id: "4",
    title: "API RESTful avec Node.js et Express",
    presenter: "Alexandre Lefebvre",
    date: "25 Juin 2023",
    time: "11:00",
    duration: "2h",
    attendees: 40,
    category: "Backend",
    status: "upcoming",
    thumbnailUrl: "https://placehold.co/600x400/10b981/FFFFFF?text=Node.js+API",
    description: "Créez des API RESTful robustes avec Node.js et Express. Nous couvrirons la structure des routes, la validation des données, l'authentification et la documentation."
  },
  {
    id: "5",
    title: "Optimisation des performances React",
    presenter: "Sophie Moreau",
    date: "30 Juin 2023",
    time: "14:00",
    duration: "1h 30m",
    attendees: 35,
    category: "Développement Web",
    status: "upcoming",
    thumbnailUrl: "https://placehold.co/600x400/f59e0b/FFFFFF?text=React+Performance",
    description: "Améliorez les performances de vos applications React avec des techniques avancées : memoization, code splitting, lazy loading, et optimisation du rendu."
  },
  {
    id: "6",
    title: "Introduction à GraphQL",
    presenter: "Marc Dubois",
    date: "5 Juillet 2023",
    time: "10:30",
    duration: "2h",
    attendees: 30,
    category: "API",
    status: "upcoming",
    thumbnailUrl: "https://placehold.co/600x400/8b5cf6/FFFFFF?text=GraphQL",
    description: "Découvrez comment GraphQL peut remplacer les API REST traditionnelles avec un modèle plus efficace et flexible pour les requêtes de données."
  },
  {
    id: "7",
    title: "Tests automatisés avec Jest et React Testing Library",
    presenter: "Clara Martin",
    date: "10 Juillet 2023",
    time: "15:00",
    duration: "1h 45m",
    attendees: 25,
    category: "Qualité logicielle",
    status: "upcoming",
    thumbnailUrl: "https://placehold.co/600x400/ef4444/FFFFFF?text=React+Testing",
    description: "Apprenez à mettre en place une stratégie de tests efficace pour vos applications React avec Jest et React Testing Library."
  },
  {
    id: "8",
    title: "Déploiement continu avec GitHub Actions",
    presenter: "Antoine Bernard",
    date: "15 Juillet 2023",
    time: "11:00",
    duration: "1h 30m",
    attendees: 20,
    category: "DevOps",
    status: "upcoming",
    thumbnailUrl: "https://placehold.co/600x400/3b82f6/FFFFFF?text=GitHub+Actions",
    description: "Automatisez vos workflows de développement avec GitHub Actions pour des déploiements fluides et sans erreur."
  }
];

// Données mockées pour les webinaires à venir (version simplifiée)
export const upcomingWebinarsSimple: UpcomingWebinarSimple[] = [
  {
    title: "Gestion de projet Agile",
    date: "22 Juin",
    time: "11:00",
    presenter: "Nicolas Petit"
  },
  {
    title: "UX/UI Design pour développeurs",
    date: "23 Juin",
    time: "14:30",
    presenter: "Amélie Lefebvre"
  },
  {
    title: "DevOps pour les startups",
    date: "24 Juin",
    time: "16:00",
    presenter: "Pierre Moreau"
  },
  {
    title: "Bases de données NoSQL",
    date: "27 Juin",
    time: "10:00",
    presenter: "Camille Blanc"
  }
];

// Dates pour le calendrier des webinaires
export const webinarDates = [
  new Date(),
  new Date(new Date().setDate(new Date().getDate() + 2)),
  new Date(new Date().setDate(new Date().getDate() + 5)),
  new Date(new Date().setDate(new Date().getDate() + 10)),
  new Date(new Date().setDate(new Date().getDate() + 15))
];

// Statistiques pour le tableau de bord
export const stats = [
  {
    title: "Webinaires Totaux",
    value: "124",
    change: { value: "12%", positive: true },
    icon: "Video"
  },
  {
    title: "Participants",
    value: "1,893",
    change: { value: "8%", positive: true },
    icon: "Users",
    iconColor: "text-blue-500"
  },
  {
    title: "Sessions à venir",
    value: "18",
    change: { value: "2%", positive: false },
    icon: "Calendar",
    iconColor: "text-indigo-500"
  },
  {
    title: "Taux d'achèvement",
    value: "87%",
    change: { value: "5%", positive: true },
    icon: "TrendingUp",
    iconColor: "text-green-500"
  }
];

// Données mock pour la page Stagiaires
export const trainees = [
  {
    id: "1",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    program: "Développement Web Full Stack",
    progress: 85,
    status: "active",
    webinarsAttended: 12,
    totalWebinars: 15,
  },
  {
    id: "2",
    name: "Lucas Dubois",
    email: "lucas.dubois@example.com",
    program: "Design UX/UI",
    progress: 70,
    status: "active",
    webinarsAttended: 8,
    totalWebinars: 12,
  },
  {
    id: "3",
    name: "Emma Petit",
    email: "emma.petit@example.com",
    program: "Marketing Digital",
    progress: 100,
    status: "completed",
    webinarsAttended: 10,
    totalWebinars: 10,
  },
  {
    id: "4",
    name: "Thomas Bernard",
    email: "thomas.bernard@example.com",
    program: "Data Science",
    progress: 45,
    status: "active",
    webinarsAttended: 5,
    totalWebinars: 12,
  },
  {
    id: "5",
    name: "Léa Richard",
    email: "lea.richard@example.com",
    program: "Product Management",
    progress: 0,
    status: "inactive",
    webinarsAttended: 0,
    totalWebinars: 8,
  },
  {
    id: "6",
    name: "Hugo Moreau",
    email: "hugo.moreau@example.com",
    program: "Développement Web Front-End",
    progress: 30,
    status: "active",
    webinarsAttended: 3,
    totalWebinars: 10,
  },
  {
    id: "7",
    name: "Manon Durand",
    email: "manon.durand@example.com",
    program: "Intelligence Artificielle",
    progress: 90,
    status: "active",
    webinarsAttended: 9,
    totalWebinars: 10,
  },
  {
    id: "8",
    name: "Antoine Lambert",
    email: "antoine.lambert@example.com",
    program: "Cybersécurité",
    progress: 100,
    status: "completed",
    webinarsAttended: 12,
    totalWebinars: 12,
  }
];

// Données mock pour la page Rapports
export const reportSummary = [
  {
    title: "Total participants",
    value: "1,248",
    trend: 12,
  },
  {
    title: "Taux d'assiduité",
    value: "87%",
    trend: 5,
  },
  {
    title: "Webinaires réalisés",
    value: "32",
    trend: 0,
  },
  {
    title: "Note moyenne",
    value: "4.8/5",
    trend: -1,
  },
];

export const monthlyAttendanceData = [
  { name: "Jan", value: 342 },
  { name: "Fév", value: 458 },
  { name: "Mar", value: 521 },
  { name: "Avr", value: 398 },
  { name: "Mai", value: 487 },
  { name: "Juin", value: 623 },
  { name: "Juil", value: 512 },
  { name: "Août", value: 324 },
  { name: "Sept", value: 586 },
  { name: "Oct", value: 678 },
  { name: "Nov", value: 435 },
  { name: "Déc", value: 298 },
];

export const webinarCategoryData = [
  { name: "Développement", value: 15 },
  { name: "Design", value: 8 },
  { name: "Marketing", value: 7 },
  { name: "Data", value: 5 },
  { name: "Soft skills", value: 4 },
];

export const topWebinarsData = [
  {
    title: "Introduction à React",
    presenter: "Marie Lambert",
    date: "12 Oct 2023",
    attendees: 245,
    completionRate: 92,
  },
  {
    title: "Fondamentaux du Design UX",
    presenter: "Paul Durand",
    date: "15 Sept 2023",
    attendees: 198,
    completionRate: 88,
  },
  {
    title: "Marketing Digital Avancé",
    presenter: "Julien Martin",
    date: "3 Nov 2023",
    attendees: 176,
    completionRate: 84,
  },
  {
    title: "Python pour Data Science",
    presenter: "Claire Bernard",
    date: "22 Oct 2023",
    attendees: 152,
    completionRate: 90,
  },
  {
    title: "Leadership et gestion d'équipe",
    presenter: "Alexandre Robert",
    date: "8 Déc 2023",
    attendees: 124,
    completionRate: 78,
  },
];
