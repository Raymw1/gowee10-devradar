import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export default function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialLocation() {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync();
        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }
    loadInitialLocation();
  }, []);

  if (!currentRegion) return null;

  return <MapView style={styles.map} initialRegion={currentRegion} />;
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
