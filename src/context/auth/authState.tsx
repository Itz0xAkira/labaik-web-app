import React, { useState, useEffect } from "react";
import { AuthContext, AuthContextInfo, defaultAuthInfo } from "./authContext";
import * as SecureStorage from "expo-secure-store";

const AuthState = (props) => {
  const [userInfo, setUserInfo] = useState<AuthContextInfo>(defaultAuthInfo);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = async () => {
    try {
      const retrievedInfo = await SecureStorage.getItemAsync("user-token");

      // setUserInfo(retrievedInfo);
    } catch (err) {
      console.warn(
        `Here's the error that occured while retrieving token: ${err}`
      );
    }
    setIsLoading(false);
  };

  const onAuthentication = async () => {
    // await SecureStorage.setItemAsync("user-token", USER_TOKEN);
    // setUserToken(USER_TOKEN);
    console.warn("user has been authenticated!");
  };

  const userSignout = async () => {
    await SecureStorage.deleteItemAsync("user-token");
    setUserToken(null);
  };

  // return (
  //   <AuthContext.Provider
  //   // value={{
  //   // onAuthentication,
  //   // userToken,
  //   // isLoading,
  //   // userSignout,
  //   // }}
  //   >
  //     {props.children}
  //   </AuthContext.Provider>
  // );
};

export default AuthState;
