import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

const weatherOptions = {
    Haze: {
      iconName: "weather-fog",
      gradient: ["#4DA0B0", "#D39D38"],
      title: "Haze?",
      subtitle: "it is something like fog.",
      statusBar: "light-content",
    },
    Thunderstorm: {
      iconName: "weather-lightning-rainy",
      gradient: ["#2c3e50", "#3498db"],
      title: "Thunderstorm!",
      subtitle: "never go to outside.",
      statusBar: "light-content",
    },
    Drizzle: {
      iconName: "weather-hail",
      gradient: ["#F1F2B5", "#135058"],
      title: "Drizzle",
      subtitle: "a tiny rain.",
      statusBar: "dark-content",
    },
    Rain: {
      iconName: "weather-rainy",
      gradient: ["#00d2ff", "#3a7bd5"],
      title: "it's rain",
      subtitle: "don't forget your umbrella.",
      statusBar: "light-content",
    },
    Snow: {
      iconName: "weather-snowy",
      gradient: ["#acb6e5", "#86fde8"],
      title: "happy snow!",
      subtitle: "let's make a snowman.",
      statusBar: "light-content",
    },
    Clear: {
      iconName: "weather-sunny",
      gradient: ["#ff8008", "#ffc837"],
      title: "it's clear!",
      subtitle: "just go outside, and to be happy.",
      statusBar: "light-content",
    },
    Clouds: {
      iconName: "weather-cloudy",
      gradient: ["#8e9eab", "#eef2f3"],
      title: "so gloomy.",
      subtitle: "i don't like clouds.",
      statusBar: "light-content",
    },
    Mist: {
      iconName: "weather-fog",
      gradient: ["#d3959b", "#bfe6ba"],
      title: "Mist",
      subtitle: "for your skin.",
      statusBar: "light-content",
    },
    Dust: {
      iconName: "weather-fog",
      gradient: ["#304352", "#d7d2cc"],
      title: "dust in the wind",
      subtitle: "stay at home.",
      statusBar: "light-content",
    },
  };

function ttem(temp) {
    if ( temp>=15 ) {
      return "옷 안입도 괜찮아요! 즐겁게 산책하세요.";
    } 
    else if ( temp>10 && temp<=14) {
         return "가벼운 티셔츠 입고 산책합시다!";
       }
     else if ( temp>5 && temp<=9 ) {
         return "도톰한 니트, 맨투맨 입는 걸 추천합니다!";
     }
     else if ( temp>0 && temp <=4) {
        return "후리스, 패딩조끼 같은 아우터를 입는걸 추천합니다!";
     }
    else if ( temp>-5 && temp<=-1 ) {
        return "패딩입는 걸 추천해요!";
    }
    else{
        return "패딩입고 10분 이하로 산책합시다!";
    }
  } 


export default function Weather({condition}) {
  return (
    
      <View>
        <Text style={styles.tinyText}>
          {ttem(condition)}
        </Text>
      </View>
    
  );
}


const styles = StyleSheet.create({
    

    tinyText: {
        textAlign: 'center',
        fontSize: 15,
        color: "#c9c9c9",
        fontFamily: 'NanumSquareRoundR',
      },
   
  });
  