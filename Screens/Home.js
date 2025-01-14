import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Image, Text } from "react-native";
import TopBar from "../Components/TopBar";
import { useAuthContext } from "../Navigations/AuthContext";

const Home = ({ navigation }) => {
  const { currentLocation, setCurrentLocation } = useAuthContext();
  const [kaabaDistance, setKaabaDistance] = useState(null);
  const [kaabaAngle, setKaabaAngle] = useState(null);
  const kaabaCoordinates = { latitude: 21.422527833115584, longitude: 39.826186353745136 }; // Kaaba coordinates

  useEffect(() => {
    const calculateValues = () => {
      if (currentLocation) {
        // Calculate distance to Kaaba using Haversine formula
        const distance = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          kaabaCoordinates.latitude,
          kaabaCoordinates.longitude
        );
        setKaabaDistance(distance);

        // Calculate angle to Kaaba
        let angle = calculateAngle(
          currentLocation.latitude,
          currentLocation.longitude,
          kaabaCoordinates.latitude,
          kaabaCoordinates.longitude
        );

        // Adjust angle to be relative to 180 degrees
        angle = adjustAngle(angle);

        setKaabaAngle(angle);
      }
    };

    calculateValues();
  }, [currentLocation]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Calculate distance between two coordinates using Haversine formula
    // Returns distance in kilometers
    // Implementation of Haversine formula
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const calculateAngle = (lat1, lon1, lat2, lon2) => {
    // Calculate angle between two coordinates
    // Returns angle in degrees
    const dLon = lon2 - lon1;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    const angle = Math.atan2(y, x);
    return (angle * 90) / Math.PI;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const adjustAngle = (angle) => {
    // Adjust angle to be relative to the direction towards Kaaba
    if (currentLocation) {
      const kaabaAngle = calculateAngle(
        kaabaCoordinates.latitude,
        kaabaCoordinates.longitude,
        currentLocation.latitude,
        currentLocation.longitude
      );

      // Calculate the difference in angles
      let adjustedAngle = angle - kaabaAngle;

      // Adjust the angle to be in the range [0, 360)
      adjustedAngle = (adjustedAngle + 262) % 360;

      return adjustedAngle;
    }
    return angle;
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#fcba03" }}>
        <TopBar />
        <Pressable
          onPress={() => navigation.navigate("Setting")}
          style={styles.settingButton}
        >
          <Image
            style={{ height: 25, width: 25 }}
            source={require("../Images/setting.png")}
          />
        </Pressable>
        <View style={styles.distanceItem}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 13, fontWeight: "500" }}>Lat/Lon</Text>
              <Text style={{ fontSize: 13, fontWeight: "500" }}>
                {currentLocation &&
                  `${currentLocation.latitude.toFixed(
                    2
                  )}/${currentLocation.longitude.toFixed(2)}`}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              {kaabaDistance != null && (
                <View style={{ marginHorizontal: 37 }}>
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    Distance to Kaaba
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {kaabaDistance.toFixed(0)} KM
                  </Text>
                </View>
              )}
              {kaabaAngle != null && (
                <View>
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    Qibla Angle
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {kaabaAngle.toFixed(2)}
                    {`\u00B0`}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingButton: {
    position: "absolute",
    top: 25,
    right: 10,
    padding: 10,
  },
  distanceItem: {
    position: "absolute",
    top: 80,
    marginLeft: 20,
    flexDirection: "column",
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default Home;
