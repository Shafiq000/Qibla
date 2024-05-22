import React, { createContext, useState, useEffect, useContext } from "react";
import Geolocation from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Appearance} from "react-native";
const authContext = createContext(null);
export const useAuthContext = () => useContext(authContext);
const AuthContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(Appearance.getColorScheme());
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pickedLocation, setPickedLocation] = useState(null);
  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("colorScheme").catch(
        (error) => {}
      );
      if (theme) {
        setThemeMode(theme);
        return;
      }
      const AppearanceMode = Appearance.getColorScheme();
      if (AppearanceMode !== null) {
        setThemeMode(AppearanceMode);
        return;
      }
      setThemeMode("light");
      return;
    })();
  }, []);


  useEffect(() => {
    getCurrentLocation();

    return () => {
      Geolocation.clearWatch();
    };
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => console.log(error),
      { 
        TIMEOUT: 3,
        POSITION_UNAVAILABLE: 2,
        PERMISSION_DENIED: 1,
        message: 'Location request timed out',
        ACTIVITY_NULL: 4,
        code: 3
      }
    );
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    if (setCurrentLocation && setPickedLocation) {
      setCurrentLocation({ latitude, longitude });
      setPickedLocation({ latitude, longitude });
    }
  };

  const handleRegionChangeComplete = (region) => {
    if (pickedLocation.latitude !== region.latitude || pickedLocation.longitude !== region.longitude) {
      setPickedLocation(region);
      setCurrentLocation(region);
    }
  };
  

  const value = {
    setCurrentLocation,
    currentLocation,
    handleMapPress,
    pickedLocation,
    setPickedLocation,
    handleRegionChangeComplete,
    themeMode,
    setThemeMode,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
