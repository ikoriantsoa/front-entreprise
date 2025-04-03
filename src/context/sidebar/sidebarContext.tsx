import { useState, createContext, useContext } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import MyProSidebar from "../../layouts/sidebar/MyProSideBar";


// Definition du type des context 
type SidebarContextType = {
  sidebarRTL: boolean;
  setSidebarRTL: React.Dispatch<React.SetStateAction<boolean>>;

  sidebarBackgroundColor: string | undefined;
  setSidebarBackgroundColor: React.Dispatch<React.SetStateAction<string | undefined>>;

  sidebarImage: string | undefined;
  setSidebarImage: React.Dispatch<React.SetStateAction<string | undefined>>;
};

// Création du context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Définition du type des props
type Props = {
  children: React.ReactNode;
};

// Provider
export const MyProSidebarProvider = ({ children }: Props) => {
  // États pour gérer la sidebar
  const [sidebarRTL, setSidebarRTL] = useState<boolean>(false);
  const [sidebarBackgroundColor, setSidebarBackgroundColor] = useState<string | undefined>(undefined);
  const [sidebarImage, setSidebarImage] = useState<string | undefined>(undefined);

  return (
    <ProSidebarProvider>
      <SidebarContext.Provider
        value={{
          sidebarRTL,
          setSidebarRTL,
          sidebarBackgroundColor,
          setSidebarBackgroundColor,
          sidebarImage,
          setSidebarImage,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: sidebarRTL ? "row-reverse" : "row",
          }}
        >
          <MyProSidebar />
          {children}
        </div>
      </SidebarContext.Provider>
    </ProSidebarProvider>
  );
};

// Hook personnalisé
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext doit être utilisé à l'intérieur de MyProSidebarProvider");
  }
  return context;
};
