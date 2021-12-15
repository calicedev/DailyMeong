import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Modal,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import Flatbutton from "../shared/button";
import { globalStyles, globalDesign } from "../shared/globalStyles";
import Start from "../modals/start";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import firebase from "firebase";

export default function StartRun({ navigation }) {
  const [startModal, setStartModal] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [seconds, setSeconds] = useState(0);
  const handlePress = () => {
    if (location.latitude != 0) {
      setIsActive(false);
      setStartModal(true);
    }
  };
  const navigateToFeed = () => {
    setIsActive(false);
    navigation.navigate("Feed");
  };
  const navigateToHome = () => {
    setIsActive(false);
    navigation.navigate("HomeScreen");
  };
  useEffect(() => {
    let interval = null;
    if (isActive) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }
        let location = await Location.getCurrentPositionAsync({});

        let tempCoord = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        setLocation(tempCoord);
        setRegion({
          latitude: tempCoord.latitude,
          longitude: tempCoord.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      })();
    }
    interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <View style={{flex: 1, color:'#F3C757'}}>
      <View style={{
        width: "100%",
        height: "11%",
        minHeight: 70,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Text style={{color: "black",
    fontSize: 25,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "NanumSquareRoundEB",
    bottom:-20,}}>산책 시작</Text> 
      </View>
      <MapView
        style={globalStyles.mapStyle}
        zoomEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        region={region}
        provider={MapView.PROVIDER_GOOGLE}
      >
        <Marker coordinate={location}>
          <Image
            source={require("../assets/ping.gif")}
            style={{ width: 30, height: 30 }}
          />
        </Marker>
        <TouchableOpacity
          onPress={handlePress}
        >
          <Image
            source={require("../../assets/doggyWalk75.gif")}
          />
        </TouchableOpacity>
      </MapView>
      <SafeAreaView>
        <Modal visible={startModal} animationType="fade">
          <Start setStartModal={setStartModal} navigation={navigation} />
        </Modal>
      </SafeAreaView>
      <View style={{
        width: "100%",
        height: 75,
        paddingBottom: 10,
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "flex-end",
        alignItems: "center",
      }}>
        <View style={globalStyles.horizontalSpaceAroundFlex}>
        <TouchableOpacity
            style={globalStyles.center}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <MaterialIcons name="home" size={25} color="#a6a5a5" />
            <Text style={{
              fontFamily: "NanumSquareRoundEB",
              fontSize: 12,
              color: "#a6a5a5",
            }}>홈</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={globalStyles.center}
            onPress={navigateToFeed}
          >
            <MaterialIcons name="playlist-add-check" size={25} color="#a6a5a5" />
            <Text style={{
              fontFamily: "NanumSquareRoundEB",
              fontSize: 12,
              color: "#a6a5a5",
            }}>산책일지</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}