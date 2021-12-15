import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FormButton from "../shared/formButton";
import FormInput from "../shared/formInput";
import SocialButton from "../shared/socialButton";
import * as firebase from "firebase";
import { globalStyles } from "../shared/globalStyles";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={styles.container}>
      <Text style={globalStyles.loginTextDark}>Daily Meong</Text>
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="아이디"
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

      {/* Sign In Button */}
      <FormButton
        buttonTitle="로그인"
        onPress={() => {
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(
              () => {},
              (error) => {
                Alert.alert(error.message);
              }
            );
        }}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={globalStyles.mediumLoginTextDark}>비밀번호 찾기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={globalStyles.mediumLoginTextDark}>
          계정 생성하기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const width = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: width / 3,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
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
  forgotButton: {
    marginVertical: 20,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },
});