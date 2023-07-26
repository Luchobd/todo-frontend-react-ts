import { useState } from "react";
import AuthContext from "./Context";
import { changePasswordRequest } from "../api/auth";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const AuthProvider = ({ children }: Props) => {
  const [passResp, setpassResp] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const changePassword = async (pass: { password: string }) => {
    try {
      const response = await changePasswordRequest(pass);
      setpassResp(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        changePassword,
        passResp,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
