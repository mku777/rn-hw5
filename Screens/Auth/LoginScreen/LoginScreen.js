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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [focusEmail, setIsFocusEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [focusPassword, setFocusPassword] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [phoneWidth, setPhoneWidth] = useState(Dimensions.get("window").width);
  const [phoneHeidth, setPhoneHeidth] = useState(
    Dimensions.get("window").height
  );

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setPhoneWidth(width);
      const height = Dimensions.get("window").height;
      setPhoneHeidth(height);
    };
    const addListener = Dimensions.addEventListener("change", onChange);

    return () => addListener.remove();
  }, []);

  const emailSave = (email) => setEmail(email);
  const passwordSave = (password) => setPassword(password);

  const onLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(`all fields must be filled!`);
      return;
    }
    Alert.alert(`${email}, successfully logged in`);
    console.log(`email - ${email}, password - ${password}`);

    setEmail("");
    setPassword("");
    setIsShowKeyboard(false);
    navigation.navigate("Home")
    Keyboard.dismiss();
  };

  const keyboardIsHidden = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const [fonts] = useFonts({
    RobotoBold: require("../../../assets/fonts/Roboto-Bold.ttf"),
    Roboto: require("../../../assets/fonts/Roboto-Regular.ttf"),
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
          style={{
            ...styles.backgroundImg,
            width: phoneWidth,
            height: phoneHeidth,
          }}
          source={require("../../../assets/images/background.png")}
        >
          <KeyboardAvoidingView
            onLayout={onLayoutRootView}
            behavior={Platform.OS === "ios" ? "padding" : "null"}
            style={styles.container}
          >
            <View
              style={{
                ...styles.wrapper,
              }}
            >
              <View
                style={{
                  marginHorizontal: 16,
                  paddingBottom: isShowKeyboard ? 32 : 110,
                }}
              >
                <Text style={styles.title}>Login</Text>

                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: focusEmail ? "#FF6C00" : "#E8E8E8",
                  }}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsFocusEmail(true);
                  }}
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
                    fontFamily: "Roboto",
                  }}
                  onFocus={() => {
                    setFocusPassword(true);
                    setIsShowKeyboard(true);
                  }}
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
                  onPress={() => setIsPasswordHidden((prevState) => !prevState)}
                >
                  <Text style={styles.isPasswordShow}>
                    {isPasswordHidden ? "show" : "hide"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onLogin}>
                  <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.footer}>
                    Don't have an account? Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* </ScrollView> */}
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginTop: 35,
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
    top: 182,
    paddingRight: 16,
  },
  isPasswordShow: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontFamily: "Roboto",
  },

  button: {
    height: 50,
    marginTop: 43,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "RobotoBold",
  },
  footer: {
    marginTop: 16,
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "Roboto",
  },
});
