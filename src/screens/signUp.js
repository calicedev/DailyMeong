import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert  , Dimensions,} from "react-native";
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
      <Text style={globalStyles.signupTextDark}>회원가입</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="이메일"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="비밀번호"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userConfirmPassword) =>
          setConfirmPassword(userConfirmPassword)
        }
        placeholderText="비밀번호 확인"
        iconType="lock"
        secureTextEntry={true}
      />

      {/* Sign Up Button */}
      <FormButton
        buttonTitle="회원가입"
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
          이미 계정이 있으신가요? 로그인 하세요.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
const width = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: -10,
    bottom:85,
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
