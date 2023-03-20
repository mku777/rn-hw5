import React, { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";

import Message from "../../assets/images/postImg/message.svg";
import Like from "../../assets/images/postImg/like.svg";
import Location from "../../assets/images/postImg/location.svg";
import Logout from "../../assets/images/logout.svg";
import Delete from "../../assets/images/delete.svg";



import { profilePostArray } from "../../data/posts";

export const ProfileScreen = ({ navigation }) => {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  const [posts, setPosts] = useState(profilePostArray);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
      const height = Dimensions.get("window").height;
      setWindowHeight(height);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const [fonts] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
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
    <View onLayout={onLayoutRootView} style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../assets/images/background.png")}
      >
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                ...styles.contentContainer,
                marginTop: windowWidth > 500 ? 100 : 120,
                width: windowWidth,
              }}
            >
              <View
                style={{
                  ...styles.imageContainer,
                  left: (windowWidth - 120) / 2,
                }}
              >
                <Image
                  style={styles.imageAvatar}
                  source={require("../../assets/images/userAvatarBig.jpg")}
                />
              </View>
              <View
                style={{
                  ...styles.userTitleContainer,
                  width: windowWidth - 16 * 2,
                }}
              >
                <TouchableOpacity style={styles.addButton}>
                  <Delete />
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton}>
                  <Logout />
                </TouchableOpacity>
                <Text style={styles.userTitle}>Natali Romanova</Text>
              </View>
            </View>
          }
          data={posts}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.postContainer,
                width: windowWidth,
              }}
            >
              <Image
                source={item.img}
                style={{
                  ...styles.postImg,
                  width: windowWidth - 16 * 2,
                }}
              />
              <Text
                style={{
                  ...styles.postTitle,
                  width: windowWidth - 30,
                }}
              >
                {item.title}
              </Text>
              <View
                style={{ ...styles.statisticUser, width: windowWidth - 30 }}
              >
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.statisticWrap}
                    onPress={() => navigation.navigate("Comments")}
                  >
                    <Message />
                    <Text style={styles.statisticText}>{item.comments}</Text>
                  </TouchableOpacity>
                  <View style={{ ...styles.statisticWrap, marginLeft: 24 }}>
                    <Like />
                    <Text style={styles.statisticText}>{item.likes}</Text>
                  </View>
                </View>
                <View style={styles.statisticWrap}>
                  <Location />
                  <Text style={styles.statisticText}>{item.location}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",

            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  addButton: {
    position: "absolute",
    top: -70,
    right: 102,
  },
  logoutButton: {
    position: "absolute",
    top: -62,
    right: 16,
  },
  contentContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },

  imageContainer: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  imageAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  userTitleContainer: {
    alignItems: "center",
    marginTop: 90,
    marginBottom: 30,
  },
  userTitle: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    fontFamily: "RobotoMedium",
  },
  postContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  postImg: {
    resizeMode: "cover",
    borderRadius: 8,
  },
  postTitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "RobotoMedium",
  },
  statisticUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 35,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statisticWrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  statisticText: {
    marginLeft: 4,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});
