import { createContext } from "react";

export type AuthContextType = {
    changePassword: (password: { password: string }) => Promise<void>;
    passResp: {password: string} | null; 
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
