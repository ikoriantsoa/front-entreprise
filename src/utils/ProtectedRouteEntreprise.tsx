import { Navigate } from "react-router-dom";
import { useKeycloak } from "../context/keycloak/KeycloakContext";

type Props = {
    children:React.ReactNode
}

const ProtectedRouteEntreprise = ({children}: Props) => {
  const { keycloak, keycloakInitialized } = useKeycloak();
    
      if (!keycloakInitialized) return <div>******** Chargement ********</div>;
    
      if (keycloak != null && keycloak.authenticated) {
        if (keycloak.realmAccess?.roles.includes("entreprise")) {
          return children;
        } else {
          return <Navigate to="/" />;
        }
      } else {
        return <Navigate to="/" />;
      }
}

export default ProtectedRouteEntreprise