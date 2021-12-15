import React, { useState, useEffect,useContext, useRef, } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Modal,
  TextInput,
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

import { StyleSheet,  Dimensions,  ActivityIndicator,  ScrollView, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Fontisto } from "@expo/vector-icons";


export default function StartRun({ navigation }) {
//원래 코드

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "784ab24ff2ed5d94d4288abed9e25d13";


const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

const [city, setCity] = useState("Loading...");
const [days, setDays] = useState([]);
const [ok, setOk] = useState(true);
const getWeather = async () => {
  const { granted } = await Location.requestForegroundPermissionsAsync();
  if (!granted) {
    setOk(false);
  }
  const {
    coords: { latitude, longitude },
  } = await Location.getCurrentPositionAsync({ accuracy: 5 });
  const location = await Location.reverseGeocodeAsync(
    { latitude, longitude },
    { useGoogleMaps: false }
  );
  setCity(location[0].city);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
  );
  const json = await response.json();
  setDays(json.daily);
};
useEffect(() => {
  getWeather();
}, []);




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
  function ttem(temp) {
    if ( temp>=15 ) {
      return "옷 안 입어도 괜찮은 날씨~";
    } 
    else if ( temp>10 && temp<=14) {
         return "가벼운 옷 입고 산책해요!";
       }
     else if ( temp>5 && temp<=9 ) {
         return "도톰한 옷입고 산책해요!";
          
     }
     else if ( temp>0 && temp <=4) {
        return "아우터 껴입고 산책해요1";
     }
    else if ( temp>-5 && temp<=-1 ) {
        return "패딩입는 걸 추천해요!";
    }
    else{
        return "날씨가 정말 추워요!";
    }
  } 
  function ttem2(temp) {
    if ( temp>=15 ) {
      return "즐겁게 산책합시다!";
    } 
    else if ( temp>10 && temp<=14) {
         return "#티셔츠";
       }
     else if ( temp>5 && temp<=9 ) {
         return "#니트 #맨투맨";
          
     }
     else if ( temp>0 && temp <=4) {
        return "#패딩조끼 #후리스";
     }
    else if ( temp>-5 && temp<=-1 ) {
        return "#패딩 #목폴라 #목도리";
    }
    else{
        return "패딩입고 10분 이하로 산책합시다!";
    }
  } 
  const navigateToStart = () => {
    setIsActive(false);
    navigation.navigate("StartRun");
  };

  const navigateToFeed = () => {
    setIsActive(false);
    navigation.navigate("Feed");
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
    <View style={globalStyles.containerLight}>
      <View style={globalStyles.header}>
        <TouchableOpacity style={globalStyles.logoutHide} onPress={() => {}}>
          <MaterialIcons name="logout" size={25} color={"white"} />
          {/* <Text style={globalStyles.headerTextLight}>Log Out</Text> */}
        </TouchableOpacity>
        <Text style={globalStyles.textLight}>Daily Meong</Text>
        <TouchableOpacity
          style={globalStyles.logout}
          onPress={() => firebase.auth().signOut()}
        >
          <MaterialIcons name="logout" size={25} color={"#a6a5a5"} />
          {/* <Text style={globalStyles.headerTextLight}>Log Out</Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
     <View style={{margin:20,bottom:-10, width:SCREEN_WIDTH, backgroundColor:"white", flexDirection: 'row', }}>
      </View>
      
      
      <View style={styles.plzcenter}>
      {image == null ? <Image source={require('../../assets/dogimage2.png')} style={styles.image} /> :
              <Image source={{ uri: image }} style={styles.image} />}
              <View  //강아지 사진
               style={styles.btn}>
                    <TouchableOpacity 
                    onPress={pickImage} >
                  <Text style={styles.textplus}>+</Text>
                    </TouchableOpacity>
               </View>
              <View 
              style={{bottom:-70,right:50, position:'absolute'}}>
                <TouchableOpacity //산책 누르면 버튼 이동하는거
                onPress={navigateToStart}
                style={styles.button}
                >
                <Text style={styles.text}>산책</Text>
                </TouchableOpacity>
            </View>
      </View>

      <View  style={{alignItems: 'flex-end', left:-80, top:10}}>
      <TextInput
        style={{fontSize:28,left: 10, fontWeight: 'bold',fontFamily: 'NanumSquareRoundEB' }}
        placeholder="강아지 이름입력"
      />
      <Text style={{fontSize:20,left: 10,fontFamily: 'NanumSquareRoundR'}}>권장 산책량 30분</Text>
      
      </View>


      <View style={{margin:20,bottom:0, width:SCREEN_WIDTH, backgroundColor:"white", flexDirection: 'row', }}>
     
     <ScrollView //날씨 스크롤
       pagingEnabled
       showsHorizontalScrollIndicator={false}
       contentContainerStyle={styles.weather}
     >
       {days.length === 0 ? (
         <View style={{ ...styles.day, alignItems: "center" }}>
           <ActivityIndicator //여긴 상관 없음
             color="gray"
             style={{ marginTop: 80 }}
             size="large"
           />
         </View>
       ) : (
         days.map((day, index) => (
           <View key={index} style={styles.day}>
             <View style={{width: 200,flexDirection: 'row',bottom:-35, justifyContent: 'center',alignItems: "center"}}> 
               <Text style={styles.temp}>
                 {parseFloat(day.temp.day).toFixed(1)}°{"\n"}
                 <Text style={styles.cityName}>{city}{"\n"}</Text>
                 <Text style={styles.tinyText}>{day.weather[0].main}{"\n"}</Text>
                 <Text style={styles.description}>{ttem(parseFloat(day.temp.day).toFixed(1))}{"\n"}</Text>
                 <Text style={styles.description}>{ttem2(parseFloat(day.temp.day).toFixed(1))}</Text>
                 

               </Text>
               
               <View>
                 <Fontisto
                   name={icons[day.weather[0].main]}
                   size={50}
                   /></View>
               </View>
               
           </View>
         ))
       )}
     </ScrollView>
     
     </View>

    </View>
  
      <View style={{borderTopWidth:1,borderColor:"#ececec",}}>
      <View style={globalStyles.footer}>
        <View style={globalStyles.horizontalSpaceAroundFlex}>
        
          <TouchableOpacity style={globalStyles.center}>
            <MaterialIcons
              name="home"
              size={25}
              color={"#F3C757"}
            />
            <Text style={globalStyles.footerTextLight}>홈</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={globalStyles.center}
            onPress={navigateToFeed}
          >
            <MaterialIcons
              name="playlist-add-check"
              size={25}
              color={"#a6a5a5"}
            />
            <Text style={globalStyles.footerTextSecondary}>산책일지</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      </View>
    </View>
  );
}


//스타일 부분
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: 'center',
    },
    plzcenter: {
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 10,
      
    },
    image:{
      alignItems: 'center',
      justifyContent: 'center',
      width:330,
      height:330,
      borderRadius:200,
      marginTop:5,
      borderColor:'#F3C757', 
      borderWidth:10,
      
  
    },
    button:{
          backgroundColor:"#F3C757",
          alignItems: 'center',
          justifyContent: 'center',
          right:-10,
          width: 100,
          height: 100,
          borderRadius: 60,
          shadowColor: "#000",
          shadowOffset: {
            width: 2,
            height: 4,
          },
          shadowOpacity: 0.25,
          
  
          
      },
      btn:{
          backgroundColor:"#F3C757",
          width: 40,
          height: 40,
          borderRadius: 20,
          position: 'absolute',
          bottom: 9,
      },
      text:{
        fontSize:30,
        textAlign:"center",
        justifyContent: 'center',
        bottom: -4,
        color:"white",
        fontFamily: 'NanumSquareRoundEB' 
      },
      textplus:{
        fontSize:30,
        textAlign:"center",
        justifyContent: 'center',
        bottom: -5,
        color:"white",
        fontFamily: 'NanumSquareRoundEB' 
      },
     city: {
      justifyContent: "center",
      alignItems: "flex-start",
    },
    cityName: {
      fontSize: 20,
      fontWeight: "500",
      color: "black",
      marginTop: 10,
      fontFamily: 'NanumSquareRoundEB' ,
      color: "black"
    },
    weather: {
      alignItems: "center",
      paddingBottom:150,
    },
    day: {
      width: 350,
      alignItems: "center",
      bottom:-30,
      fontFamily: 'NanumSquareRoundEB' ,
      borderRadius:20,
      paddingBottom:100,
      borderWidth: 10, borderColor: '#F3C757', borderRadius: 30
      
    },
    temp: {
      flexDirection: 'row',
      textAlign: 'center',
      fontWeight: "300",
      fontSize: 30,
      color: "black",
      marginRight:10,
      fontFamily: 'NanumSquareRoundEB' 
    },
    description: {
      textAlign: 'center',
      fontSize: 15,
      color: "black",
      fontFamily: 'NanumSquareRoundEB' 
  
    },
    tinyText: {
      textAlign: 'center',
      fontSize: 20,
      color: "black",
      fontFamily: 'NanumSquareRoundEB',
    },
  });