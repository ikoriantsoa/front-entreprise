import React, { createContext, useContext, useEffect, useState } from "react";


// Les types pour gérer les thèmes
type Theme = "light" | "dark" | "system";


interface ThemeContextType {
 theme: Theme;
 setTheme: (theme: Theme) => void;
}


// Création du contexte
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


// Fournisseur du contexte
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [theme, setTheme] = useState<Theme>(() => {
   // Lire le thème sauvegardé dans localStorage ou revenir à "system" par défaut
   const savedTheme = localStorage.getItem("theme");
   return (savedTheme as Theme) || "system";
 });


 useEffect(() => {
   const root = document.documentElement;


   // Déterminer si le thème doit être sombre
   const isDark =
     theme === "dark" ||
     (theme === "system" &&
       window.matchMedia("(prefers-color-scheme: dark)").matches);


   if (isDark) {
     root.classList.add("dark");
   } else {
     root.classList.remove("dark");
   }


   // Sauvegarder le thème dans localStorage
   localStorage.setItem("theme", theme);
 }, [theme]);


 return (
   <ThemeContext.Provider value={{ theme, setTheme }}>
     {children}
   </ThemeContext.Provider>
 );
};


// Hook pour utiliser le contexte du thème
export const useTheme = (): ThemeContextType => {
 const context = useContext(ThemeContext);
 if (!context) {
   throw new Error("useTheme doit être utilisé dans un ThemeProvider");
 }
 return context;
};

