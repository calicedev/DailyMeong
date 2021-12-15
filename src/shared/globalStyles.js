import React from "react";
import { StyleSheet, Dimensions } from "react-native";

//get width of screen
const width = Math.round(Dimensions.get("window").width);
//color scheme
const dark = "#29252c";
const primary = "#F3C757";
const secondary = "black";
const light = "white";

export const globalStyles = StyleSheet.create({
  containerLight: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  containerDark: {
    backgroundColor: dark,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  containerSecondary: {
    backgroundColor: secondary,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textPrimary: {
    color: primary,
    fontSize: 28,
    fontFamily: "NanumSquareRoundEB",
  },
  textSecondary: {
    color: secondary,
    fontSize: 28,
    fontFamily: "NanumSquareRoundEB",
  },
  textLight: {
    color: "black",
    fontSize: 25,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "NanumSquareRoundEB",
    bottom:-20,
  },
  loginTextDark: {
    color: dark,
    fontSize: width / 8.5,
    fontFamily: "NanumSquareRoundEB",
    paddingBottom: width / 12,
  },
  smallLoginTextDark: {
    fontSize: width / 23,
    fontFamily: "NanumSquareRoundEB",
    paddingLeft: 10,
  },
  mediumLoginTextDark: {
    color: dark,
    fontSize: width / 25,
    fontFamily: "NanumSquareRoundEB",
    paddingLeft: 10,
    paddingTop: 10,
  },
  signupTextDark: {
    color: dark,
    fontSize: width / 11,
    fontFamily: "NanumSquareRoundEB",
    paddingBottom: width / 12,
  },
  inputView: {
    width: width * 0.9,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
  inputLight: {
    width: width * 0.3,
    fontSize: 18,
    borderRadius: 18,
    borderColor: light,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    paddingHorizontal: 10,
    color: light,
    fontFamily: "NanumSquareRoundEB",
    fontSize: 18,
  },
  inputPrimary: {
    width: width * 0.5,
    fontSize: 18,
    borderRadius: 18,
    borderColor: primary,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    paddingHorizontal: 10,
    color: dark,
    fontFamily: "NanumSquareRoundEB",
    fontSize: 18,
  },
  inputSecondary: {
    width: width * 0.5,
    fontSize: 18,
    borderRadius: 18,
    borderColor: secondary,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    paddingHorizontal: 10,
    color: secondary,
    fontFamily: "NanumSquareRoundEB",
    fontSize: 18,
  },
  subTextLight: {
    justifyContent: "center",
    color: light,
    fontSize: 22,
    fontFamily: "NanumSquareRoundB",
  },
  smallSubTextLight: {
    justifyContent: "center",
    color: light,
    fontSize: width / 16,
    fontFamily: "NanumSquareRoundEB",
  },
  midSubTextLight: {
    justifyContent: "center",
    color: light,
    fontSize: width / 9,
    fontFamily: "NanumSquareRoundEB",
  },
  bigSubTextLight: {
    justifyContent: "center",
    color: light,
    fontSize: width / 3.5,
    fontFamily: "NanumSquareRoundEB",
    letterSpacing: -10,
  },
  subTextDark: {
    width: width * 0.3,
    color: dark,
    fontSize: 20,
    fontFamily: "NanumSquareRoundEB",
  },
  subTextSecondary: {
    width: width * 0.3,
    color: secondary,
    fontSize: 22,
    fontFamily: "NanumSquareRoundEB",
  },
  horizontalSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  horizontalSpaceAroundFlex: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  horizontalSpaceAround: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  header: {
    width: "100%",
    height: "11%",
    minHeight: 70,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor:"#ececec",
    borderBottomWidth:1,
  },
 
  headerLayout: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 15,
    
  },
  footer: {
    width: "100%",
    height: 75,
    paddingBottom: 10,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "flex-end",
    alignItems: "center",

    
  },
  Style: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  mapStyle: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  mapStyleFlex: {
    width: "100%",
    flexDirection: "row",
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutHide: {
    padding: 10,
  },
  logout: {
    padding: 10,
  },
  timeAndDistData: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 35,
    borderBottomColor: light,
  },
  speedData: {
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 25,
    paddingTop: 10,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  footerTextLight: {
    fontFamily: "NanumSquareRoundEB",
    fontSize: 12,
    color: "#F3C757",
  },
  headerTextLight: {
    fontFamily: "NanumSquareRoundEB",
    fontSize: 10,
    color: light,
  },
  footerTextSecondary: {
    fontFamily: "NanumSquareRoundEB",
    fontSize: 12,
    color: "#a6a5a5",
  },
  playPauseStopIcons: {
    flexDirection: "row",
  },
  paddingPlayPauseStopIcons: {
    paddingHorizontal: 60,
  },
  bottomLine: {
    borderBottomColor: light,
    borderBottomWidth: 1,
  },
  topLine: {
    borderTopColor: light,
    borderTopWidth: 1,
  },
  rightLine: {
    borderRightColor: light,
    borderRightWidth: 1,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
});

export const globalDesign = {
  width: Math.round(Dimensions.get("window").width),
  dark: dark,
  primary: primary,
  secondary: secondary,
  light: light,
};

export const getDateAndTime = () => {
  let date = new Date().getDate(); //To get the Current Date
  let month = new Date().getMonth() + 1; //To get the Current Month
  let year = new Date().getFullYear(); //To get the Current Year
  let hour = new Date().getHours(); //To get the Current Hours
  let min = new Date().getMinutes(); //To get the Current Minutes
  let ampm = "am";

  if (month == 1) month = "1월";
  else if (month == 2) month = "2월";
  else if (month == 3) month = "3월";
  else if (month == 4) month = "4월";
  else if (month == 5) month = "5월";
  else if (month == 6) month = "6월";
  else if (month == 7) month = "7월";
  else if (month == 8) month = "8월";
  else if (month == 9) month = "9월";
  else if (month == 10) month = "10월";
  else if (month == 11) month = "11월";
  else month = "12월";

  if (min <= 9) min = "0" + min;
  if (hour >= 12) {
    ampm = "pm";
    if (hour > 12) hour = hour - 12;
  }
  if (hour == 0) hour = 12;
  return month + " " + date + "일 "  + hour + ":" + min + ampm;
};

export const getTitle = () => {
  let day = new Date().getDay();
  let hour = new Date().getHours(); //To get the Current Hours
  let timeOfDay = "아침";

  if (day == 0) day = "일요일";
  else if (day == 1) day = "월요일";
  else if (day == 2) day = "화요일";
  else if (day == 3) day = "수요일";
  else if (day == 4) day = "목요일";
  else if (day == 5) day = "금요일";
  else if (day == 6) day = "토요일";

  if (hour >= 21) timeOfDay = "밤";
  else if (hour >= 17) timeOfDay = "저녁";
  else if (hour >= 12) timeOfDay = "오휴";
  return day +  " 산책";
};

export const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
  //console.log(lat1, lon1, "    ", lat2, lon2);

  // lat1 = Math.round(lat1 * 100000) / 100000;
  // lat2 = Math.round(lat2 * 100000) / 100000;
  // lon1 = Math.round(lon1 * 100000) / 100000;
  // lon2 = Math.round(lon2 * 100000) / 100000;
  //console.log(lat1, lon1, "    ", lat2, lon2);
  //console.log("Lat: ", lat2 - lat1);

  //console.log("Lon: ", lon2 - lon1);
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let d = R * c; // in metres

  //if (d <= 3) d = 0;
  //`else d = Math.floor(d);

  //console.log("D: ", d);
  d = d / 1000;

  return d;
};

export const calculateAvgSpeed = (distanceInM, seconds) => {
  let secondsPerKm;
  if (distanceInM != 0) secondsPerKm = (seconds / distanceInM) * 1000;
  else secondsPerKm = 0;

  let mins = Math.floor(secondsPerKm / 60);
  let secs = Math.floor(secondsPerKm) % 60;

  if (mins > 59) {
    mins = "00";
    secs = "00";
  } else {
    if (secs < 10) {
      secs = "0" + secs;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }
  }
  return mins + ":" + secs;
};

export const calculateCalories = (distanceKm, minutes, seconds) => {
  let personsWeight = 136;
  // let walkingMET = 4; // 3.5 mph pace (1.56464 m/s)
  // let joggingMET = 8; // 5 mph pace (2.2352 m/s)
  // let runningMET = 11.5; // 7 mph pace (3.12928 m/s)

  let timeSec = minutes * 60 + seconds;

  let pace = (distanceKm * 1000) / timeSec; // unit: m/s

  let METUsed = 0;

  if (pace < 2.5) {
    METUsed = Math.floor(pace * 2.237) + 0.5;
  } else {
    METUsed = Math.floor(pace * 2.237) + 5.5;
  }

  let caloriesBurned = Math.round(
    (7.71617 * METUsed * personsWeight * (Math.round(timeSec) / 60)) / 200 / 2
  );

  // console.log(METUsed, personsWeight, pace);

  // console.log(caloriesBurned);
  return caloriesBurned;

  // if (speedPerSec <= 1.75) {
  //   return 0.108;
  // } else if (1.75 < speedPerSec <= 2.75) {
  //   return 0.149;
  // } else if (speedPerSec > 2.75) {
  //   return 0.212;
  // }
};

export const FormattedDistance = ({ distance }) => {
  let rounded = Math.round(distance * 100) / 100;
  if (rounded % 1 == 0) return rounded + ".00";
  else if (rounded % 0.1 == 0) return rounded + "0";
  else return rounded;
};
