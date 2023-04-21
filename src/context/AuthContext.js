import React, { createContext, useState } from "react";

import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
const AuthContext = createContext();

export const UseAuth = (props) => {
  const toast = useToast();
  const id = "toast";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (empolyee_id, password, type) => {
    setIsLoading(true);
    axios
      .post("http://localhost:5000/TecSign", {
        empolyee_id: empolyee_id,
        password: password,
      })
      .then((result) => {
        console.log("login result -->", result.data);
        Cookies.set("jwt", result.data.token);
        window.location.href = "/dashboard";
        setIsLoading(false);
        Cookies.set("TeacherUser", JSON.stringify(result.data));
        Cookies.set("user", result.data.user.name);
        Cookies.set("isLoggedIn", true);
        setIsLoggedIn(true);
        if (!toast.isActive(id)) {
          toast({
            id,
            duration: 2000,
            position: "top",
            status: "success",
            description: "амжилттай нэвтэрлээ!",
          });
        }
      })
      .catch((result) => {
        console.log("login err -->", result.data);
        setIsLoading(false);
        if (!toast.isActive(id)) {
          toast({
            id,
            duration: 2000,
            position: "top",
            status: "error",
            description:
              result.response.status === 400
                ? "Таны нэвтрэх нэр эсвэл нууц үг буруу байна!"
                : "Таны нэвтрэх нэр эсвэл нууц үг буруу байна!",
          });
        }
      });
  };

  const logoutHandler = async () => {
    Cookies.remove("jwt");
    window.location.href = "/login";
    setIsLoggedIn(false);
    Cookies.remove("TeacherUser");
    Cookies.remove("user");
    Cookies.remove("isLoggedIn");
  };

  return (
    <AuthContext.Provider
      value={{
        loginHandler,
        isLoggedIn,
        logoutHandler,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
