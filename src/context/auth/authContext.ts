import { createContext } from "react";

export type AuthUserDetails = {
  name: String;
  phoneNumber: String;
  passport: String;
};

export type AuthContextInfo = {
  passportNumber: string | null;
  userDetails: AuthUserDetails | null;
  setPassportNumber: () => void;
  setUserDetails: () => void;
};

export const defaultAuthInfo: AuthContextInfo = {
  passportNumber: null,
  userDetails: null,
  setUserDetails: () => {},
  setPassportNumber: () => {},
};

const AuthContext = createContext<AuthContextInfo>(defaultAuthInfo);

const { Consumer: AuthConsumer, Provider: AuthProvider } = AuthContext;

export { AuthContext, AuthConsumer, AuthProvider };
