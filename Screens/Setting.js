import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Linking,
} from "react-native";
import LeftAerow from "react-native-vector-icons/Feather";
import RightAerow from "react-native-vector-icons/Entypo";
import { Switch } from "react-native-paper";
import { useAuthContext } from "../Navigations/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MY_URL = "https://www.mslm.io/";
function Setting({ navigation }) {
  const { themeMode, setThemeMode } = useAuthContext();
  const [mode, setMode] = useState(themeMode === "dark");
  const toggleSwitch = (value) => {
    setMode(value);
    if (value) {
      setThemeMode("dark");
      AsyncStorage.setItem("colorScheme", "dark").catch((error) =>
        console.log(error)
      );
    } else {
      setThemeMode("light");
      AsyncStorage.setItem("colorScheme", "light").catch((error) =>
        console.log(error)
      );
    }
  };

  return (
    <SafeAreaView
    style={[
      styles.container,
      themeMode == "dark" && { backgroundColor: "#000" },
    ]}
    >
      <View style={styles.mainHeader}>
        <Pressable onPress={() => navigation.goBack()}>
          <LeftAerow name="chevron-left" size={25} />
        </Pressable>
        <View style={styles.mainText}>
          <Text style={styles.headerText}>Settings</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <Pressable onPress={() => Linking.openURL(MY_URL)} style={styles.body}>
          <Text
            style={[
              styles.firstTitle,
              themeMode == "dark" && { color: "#ffff" },
            ]}
          >
            Privacy Policy
          </Text>
          <RightAerow
           style={[
            styles.right,
            themeMode == "dark" && {
              backgroundColor: "#000",
              color: "#ffff",
            },
          ]}
            name="chevron-small-right"
            size={22}
          />
        </Pressable>
      </View>
      <View style={styles.bodyContainer}>
        <Pressable onPress={""} style={styles.body}>
          <Text
           style={[
            styles.firstTitle,
            themeMode == "dark" && { color: "#FFF" },
          ]}
          >
            About Us
          </Text>
          <RightAerow
            style={[
              styles.right,
              themeMode == "dark" && {
                backgroundColor: "black",
                color: "white",
              },
            ]}
            name="chevron-small-right"
            size={22}
          />
        </Pressable>
      </View>
      <View style={styles.bodyContainer}>
        <Pressable
          onPress={() => navigation.navigate("MoreApps")}
          style={styles.body}
        >
          <Text
           style={[
            styles.firstTitle,
            themeMode == "dark" && { color: "#FFF" },
          ]}
        >
            More Apps
          </Text>
          <RightAerow
            style={[
              styles.right,
              themeMode == "dark" && {
                backgroundColor: "black",
                color: "white",
              },
            ]}
            name="chevron-small-right"
            size={22}
          />
        </Pressable>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.body}>
          <Text
            style={[
              styles.firstTitle,
              themeMode == "dark" && { color: "#FFF" },
            ]}
          >
            Dark Mode
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#03D6C3" }}
            thumbColor={mode ? "#03D6C3" : "#fff"}
            value={mode}
            onValueChange={toggleSwitch}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFFFFF"
  },
  mainHeader: {
    flexDirection: "row",
    height: 55,
    backgroundColor: "#fcba03",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginRight: 15,
  },
  mainText: {
    flex: 1,
  },
  goBack: {
    height: 14,
    width: 25,
  },
  bodyContainer: {
    borderBottomColor: "#cbcbcb",
    borderBottomWidth: 1,
   
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 25,
    marginHorizontal: 12,
  },
  firstTitle: {
    fontSize: 15,
    color: "black",
  },
});

export default Setting;
