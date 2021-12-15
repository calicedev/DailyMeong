import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FormButton from "../shared/formButton";
import FormInput from "../shared/formInput";
import SocialButton from "../shared/socialButton";
import * as firebase from "firebase";
import { globalDesign, globalStyles } from "../shared/globalStyles";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  return (
    <View style={styles.container}>
      <Text style={globalStyles.signupTextDark}>Create an Account</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userConfirmPassword) =>
          setConfirmPassword(userConfirmPassword)
        }
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      {/* Sign Up Button */}
      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {
          if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
          }

          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userData) => {
              userData.user.sendEmailVerification();
              console.log(userData);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{" "}
        </Text>
        <TouchableOpacity onPress={() => alert("Terms Clicked!")}>
          <Text
            style={[styles.color_textPrivate, { color: globalDesign.dark }]}
          >
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <TouchableOpacity onPress={() => alert("Privacy Policy Clicked!")}>
          <Text
            style={[styles.color_textPrivate, { color: globalDesign.dark }]}
          >
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      {/* <SocialButton
        buttonTitle="Sign Up with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {}}
      />

      <SocialButton
        buttonTitle="Sign Up with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {}}
      /> */}

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={globalStyles.mediumLoginTextDark}>
          Have an Account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Lato-Regular",
    color: "grey",
  },
});
