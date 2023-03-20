import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Add from "../../../assets/images/add.svg";

const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [focusLogin, setFocusLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [focusEmail, setIsFocusEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [focusPassword, setFocusPassword] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [phoneWidth, setPhoneWidth] = useState(Dimensions.get("window").width);
  const [phoneHeight, setPhoneHeight] = useState(
    Dimensions.get("window").height
  );

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setPhoneWidth(width);

      const height = Dimensions.get("window").height;
      setPhoneHeight(height);
    };
    const addListener = Dimensions.addEventListener("change", onChange);

    return () => addListener.remove();
  }, []);

  const loginSave = (login) => setLogin(login);
  const emailSave = (email) => setEmail(email);
  const passwordSave = (password) => setPassword(password);

  const onLogin = () => {
    if (!login.trim() || !email.trim() || !password.trim()) {
      Alert.alert(`all fields must be filled`);
      return;
    }
    Alert.alert(`${login}, successfully registered`);
    console.log(`login - ${login}, email - ${email}, password - ${password}`);
    setLogin("");
    setEmail("");
    setPassword("");
    setIsShowKeyboard(false);
    navigation.navigate("Home")
    Keyboard.dismiss();
  };

  const keyboardIsHidden = () => {
    setIsShowKeyboard(false)
    Keyboard.dismiss();
  };

  const [fonts] = useFonts({
    RobotoBold: require("../../../assets/fonts/Roboto-Bold.ttf"),
    RobotoRegular: require("../../../assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fonts) {
      await SplashScreen.hideAsync();
    }
  }, [fonts]);

  if (!fonts) {
    return null;
  }

  return (
 
      <TouchableWithoutFeedback onPress={keyboardIsHidden}>
        <View style={styles.containerFlex}>
          <ImageBackground
            style={styles.backgroundImg}
            source={require("../../../assets/images/background.png")}
          >
              <KeyboardAvoidingView
      onLayout={onLayoutRootView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
              <View
                style={{
                  ...styles.wrapper,

                  paddingHorizontal: 16,
                  paddingBottom: isShowKeyboard ? 15 : 50,

                }}
              >
                <View
                  style={{
                    ...styles.imageWrap,
                    left: (phoneWidth - 120) / 2,
                  }}
                ></View>
                <TouchableOpacity
                  style={{
                    ...styles.addSvg,
                    right: phoneWidth / 2 - 70,
                  }}
                >
                  <Add />
                </TouchableOpacity>
                <View style={{ width: phoneWidth - 16 * 2 }}>
                  <Text style={styles.title}>Registration</Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusLogin ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => {setFocusLogin(true); setIsShowKeyboard(true)}}
                    onBlur={() => setFocusLogin(false)}
                    value={login}
                    placeholder="login"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    onChangeText={loginSave}
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusEmail ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => {setIsFocusEmail(true); setIsShowKeyboard(true)}}
                    onBlur={() => setIsFocusEmail(false)}
                    value={email}
                    placeholder="e-mail"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    onChangeText={emailSave}
                    keyboardType="email-address"
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusPassword ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => {setFocusPassword(true); setIsShowKeyboard(true)}}
                    onBlur={() => setFocusPassword(false)}
                    value={password}
                    placeholder="password"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    secureTextEntry={isPasswordHidden}
                    onChangeText={passwordSave}
                  ></TextInput>
                  <TouchableOpacity
                    style={styles.isPassword}
                    onPress={() =>
                      setIsPasswordHidden((prevState) => !prevState)
                    }
                  >
                    <Text style={styles.isPasswordShow}>
                      {isPasswordHidden ? "show" : "hide"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={onLogin}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.footer}>Already have an account? Log in</Text>
                    </TouchableOpacity>
                </View>
              </View>
              </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
   
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "flex-end",
  },
  containerFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

  },

  imageWrap: {
    position: "absolute",
    top: -60,

    width: 120,
    height: 120,

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addSvg: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 25,
    height: 25,
  },
  title: {
    marginTop: 80,
    marginBottom: 30,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    fontFamily: "RobotoBold",
  },
  input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "Roboto",

    color: "#212121",
  },
  isPassword: {
    position: "absolute",
    right: 0,
    bottom: 135,
    paddingRight: 16,
  },
  isPasswordShow: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontFamily: "RobotoRegular",
  },

  button: {
    height: 50,
    marginTop: 20,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "RobotoBold",
  },
  footer: {
    marginTop: 15,
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "RobotoRegular",
  },
});