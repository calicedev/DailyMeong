import React, { useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import Providers from "./src/navigation";
import * as firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ApiKeys from "./firebase";
import { getUserById } from "./src/api/databaseCalls";
import AppStack from "./src/navigation/homeStack";
import { AuthUserContext, UserContext } from "./src/context";
const App = () => {
  // get current signed in user
  const [authUser, loading, error] = useAuthState(firebase.auth());
  const [user, setUser] = useState();

  const [fontsLoaded] = useFonts({
    "DMSans-regular": require("./src/assets/fonts/DMSans-Regular.ttf"),
    "DMSans-bold": require("./src/assets/fonts/DMSans-Bold.ttf"),
    "FiraCode-regular": require("./src/assets/fonts/FiraCode-Regular.ttf"),
    "FiraCode-bold": require("./src/assets/fonts/FiraCode-Bold.ttf"),
    "CourierPrime-regular": require("./src/assets/fonts/CourierPrime-Regular.ttf"),
    "CourierPrime-bold": require("./src/assets/fonts/CourierPrime-Bold.ttf"),
    "Lato-Regular": require("./src/assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./src/assets/fonts/Lato-Bold.ttf"),
    "Lato-Italic": require("./src/assets/fonts/Lato-Italic.ttf"),
    "Lato-BoldItalic": require("./src/assets/fonts/Lato-BoldItalic.ttf"),
    "Kufam-SemiBoldItalic": require("./src/assets/fonts/Kufam-SemiBoldItalic.ttf"),

    "SEBANG": require("./src/assets/fonts/SEBANG.ttf"),
    "NanumSquareRoundB": require("./src/assets/fonts/NanumSquareRoundB.ttf"),
    "NanumSquareRoundEB": require("./src/assets/fonts/NanumSquareRoundEB.ttf"),
    "NanumSquareRoundR": require("./src/assets/fonts/NanumSquareRoundR.ttf"),
  });

  useEffect(() => {
    if (authUser?.uid) {
      getUserById({ id: authUser.uid, cb: setUser });
    }
    return () => {console.log(authUser);};
  }, [authUser]);

  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
  }

  if (loading || !fontsLoaded) return null;
  if (error) return { error };
  if (authUser && !user) return null;
  if (!authUser) return <Providers />;

  return (
    <AuthUserContext.Provider value={authUser}>
      <UserContext.Provider value={user}>
        <AppStack />
      </UserContext.Provider>
    </AuthUserContext.Provider>
  );
};

export default App;
