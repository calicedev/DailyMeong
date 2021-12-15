import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import CalendarView from '../shared/CalendarView';
import Item from "../shared/item";
import Flatbutton from "../shared/button";
import Card from "../shared/card";
import { globalStyles, globalDesign } from "../shared/globalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";

import { MaterialIcons } from "@expo/vector-icons";
import { getRunsByUserId } from "../api/databaseCalls";
import { UserContext } from "../context";


//calendar
import {Calendar} from 'react-native-calendars';
import {
  getDateAndTime,
} from '../shared/globalStyles'
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';


export default function Feed({ navigation }) {
  const user = useContext(UserContext);
  const [runs, setRuns] = useState();

  useEffect(() => {
    if (user?.id) {
      getRunsByUserId({ userId: user.id, cb: setRuns });
    }
    return () => {console.log(user?.id);};
  }, [user?.id]);




  const ListOfRuns = () => {
    if (!runs) {
      return (
        <View style={globalStyles.paddingVertical}>
          <Flatbutton
            text={"Loading..."}
            backgroundColor={"white"}
            color={"#F3C757"}
          ></Flatbutton>
        </View>
      );
    } else if (!runs?.length) {
      return (
        <View style={globalStyles.paddingVertical}>
          <Flatbutton
            text={"첫 산책을 시작하세요!"}
            onPress={() => navigation.navigate("StartRun")}
            backgroundColor={"#F3C757"}
            color={"black"}
          ></Flatbutton>
        </View>
      );
    }
    return (
      <FlatList
        data={runs}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card>
            <Item setRuns={setRuns} item={item} />
          </Card>
        )}
      />
    );
  };

  return (
    <View style={globalStyles.containerLight}>
      <View style={globalStyles.header}>
        <TouchableOpacity style={globalStyles.logoutHide} onPress={() => {}}>
          <MaterialIcons name="logout" size={25} color={"white"} />
          {/* <Text style={globalStyles.headerTextLight}>Log Out</Text> */}
        </TouchableOpacity>
        <Text style={globalStyles.textLight}>산책 일지</Text>
        <TouchableOpacity
          style={globalStyles.logout}
          onPress={() => firebase.auth().signOut()}
        >
          <MaterialIcons name="logout" size={25} color={"#a6a5a5"} />
          {/* <Text style={globalStyles.headerTextLight}>Log Out</Text> */}
        </TouchableOpacity>
      </View>

      <Card>
      <Calendar
      style={{width: 350,fontFamily: "NanumSquareRoundEB",}}
      markedDates={{
        '2021-12-14': {selected: true, marked: true, selectedColor: '#F3C757'},
        '2021-12-15': {selected: true,marked: true, selectedColor: '#F3C757'},
        '2021-12-16': {selected: true,marked: true, selectedColor: '#F3C757'},
      }}
     
      theme={{
        selectedDayBackgroundColor: '#F3C757',
        arrowColor: '#F3C757',
        dotColor: '#F3C757',
        todayTextColor: '#F3C757',
        fontFamily: "NanumSquareRoundEB",
      }}
    />
      </Card>

      <SafeAreaView style={globalStyles.containerLight}>
        <ListOfRuns />
      </SafeAreaView>

      <View style={{borderTopWidth:1,borderColor:"#ececec",}}>
      <View style={globalStyles.footer}>
        <View style={{flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",left:5}}>
        <TouchableOpacity style={globalStyles.center}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <MaterialIcons
              name="home"
              size={25}
              color={"#a6a5a5"}
            />
            <Text style={globalStyles.footerTextSecondary}>홈</Text>
          </TouchableOpacity>

          <TouchableOpacity style={globalStyles.center}>
            <MaterialIcons
              name="playlist-add-check"
              size={25}
              color={"#F3C757"}
            />
            <Text style={globalStyles.footerTextLight}>산책일지</Text>

          </TouchableOpacity>
        </View>
      </View>
    
      </View>
    </View>
  );
}
