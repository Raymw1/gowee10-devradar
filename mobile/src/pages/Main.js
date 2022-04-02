import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../services/api";
import { connect, disconnect, subscribeToNewDevs } from "../services/socket";

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState("");

  useEffect(() => {
    subscribeToNewDevs((dev) => setDevs([...devs, dev]));
  }, [devs]);

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

  function setupWebSocket() {
    disconnect();
    const { latitude, longitude } = currentRegion;
    connect(latitude, longitude, techs);
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;
    const { data } = await api.get("/search", {
      params: { latitude, longitude, techs },
    });
    setDevs(data);
    setupWebSocket();
  }

  function handleRegionChange(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) return null;

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={currentRegion}
        onRegionChangeComplete={handleRegionChange}
      >
        {devs.map((dev) => (
          <Marker
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[1],
              longitude: dev.location.coordinates[0],
            }}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: dev.avatar_url,
              }}
            />
            <Callout
              onPress={() => {
                navigation.navigate("Profile", {
                  github_username: dev.github_username,
                });
              }}
            >
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(", ")}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search devs by techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={setTechs}
        />
        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#FFF",
    resizeMode: "cover",
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  devBio: {
    color: "#666",
    marginTop: 5,
  },
  devTechs: {
    marginTop: 5,
  },
  searchForm: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row",
  },
  searchInput: {
    backgroundColor: "#FFF",
    flex: 1,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    color: "#333",
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: "#8e4dff",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
});
