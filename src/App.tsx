import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import NotFound from "./pages/NotFound";
import WebinarList from "./pages/WebinarList";
import WebinarDetail from "./pages/WebinarDetail";
import CalendarPage from "./pages/Calendar";
import Trainees from "./pages/Trainees";
import ProtectedRouteEntreprise from "./utils/ProtectedRouteEntreprise";
import KeycloakContextProvider from "./context/keycloak/KeycloakContext";

const queryClient = new QueryClient();

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouteEntreprise>
        <WebinarList />
      </ProtectedRouteEntreprise>
    ),

    children: [
      {
        path: "/webinaire/:id",
        element: (
          <ProtectedRouteEntreprise>
            <WebinarDetail />
          </ProtectedRouteEntreprise>
        ),
      },
      {
        path: "/calendrier",
        element: (
          <ProtectedRouteEntreprise>
            <CalendarPage />
          </ProtectedRouteEntreprise>
        ),
      },
      {
        path: "/stagiaires",
        element: (
          <ProtectedRouteEntreprise>
            <Trainees />
          </ProtectedRouteEntreprise>
        ),
      },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <KeycloakContextProvider>
          <RouterProvider router={route} />
        </KeycloakContextProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
