import { KeycloakInstance } from "keycloak-js";
import { ReactNode } from "react";

export interface KeycloakContextType {
  keycloak: KeycloakInstance | null;
  authenticated: boolean;
  keycloakInitialized: boolean;
}

export interface KeycloakContextProviderProps {
  children: ReactNode;
}