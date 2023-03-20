import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CommentsScreen } from "../Screens/Main/CommentsScreen";
import { MapScreen } from "../Screens/Main/MapScreen";
import { Home } from "../Screens/Main/Home";
import RegistrationScreen from "./../Screens/Auth/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./../Screens/Auth/LoginScreen/LoginScreen";

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export const useRoute = (isLogin) => {
  return isLogin ? (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      ></MainStack.Screen>
      <MainStack.Screen
        options={{
          headerShown: true,
          headerTitleStyle: { color: "#212121", fontSize: 17 },
          headerTitleAlign: "center",
        }}
        name="Comments"
        component={CommentsScreen}
      ></MainStack.Screen>
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Map"
        component={MapScreen}
      ></MainStack.Screen>
    </MainStack.Navigator>
  ) : (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegistrationScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen name="Home" component={Home} />
    </AuthStack.Navigator>
  );
};
