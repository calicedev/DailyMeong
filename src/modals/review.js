import React, { useContext, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import Flatbutton from '../shared/button'
import { globalStyles, globalDesign } from '../shared/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import Card from '../shared/card'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MapView, { Polyline, Marker } from 'react-native-maps'
import { createRun, deleteRun } from '../api/databaseCalls'
import { UserContext } from '../context'

export default function Review({
  id,
  backPress,
  deletePress,
  savePress,
  setCategory,
  setIcon1,
  setIcon2,
  setIcon3,
  setIcon4,
  setIcon5,
  setNotes,
  setTitle,
  ...runData
}) {
  const user = useContext(UserContext)
  const setIconsToDefault = () => {
    setIcon1(globalDesign.dark)
    setIcon2(globalDesign.dark)
    setIcon3(globalDesign.dark)
    setIcon4(globalDesign.dark)
    setIcon5(globalDesign.dark)
  }

  const handleDelete = () => {
    Alert.alert('Alert', 'Are you sure you would like to delete this run?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () =>
          deleteRun({ userId: user.id, runId: id }).then(deletePress),
      },
    ])
  }




  return (
    //displays time and distance gathered in start modal and asks user for notes info
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={globalStyles.containerLight}>
          <View style={globalStyles.header}>
            <SafeAreaView style={globalStyles.headerLayout}>
              <TouchableOpacity onPress={backPress}>
                <Ionicons
                  name='ios-arrow-back'
                  size={30}
                  color={"black"}
                />
              </TouchableOpacity>
              <TouchableOpacity disabled={!user?.id} onPress={handleDelete}>
                <Ionicons
                  name='ios-trash'
                  size={30}
                  color={"black"}
                />
              </TouchableOpacity>
            </SafeAreaView>
          </View>

          <SafeAreaView style={globalStyles.containerLight}>
            <View style={globalStyles.mapStyleFlex}>
              <MapView
                style={globalStyles.mapStyleFlex}
                provider={MapView.PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: runData.runPath[0].latitude,
                  longitude: runData.runPath[0].longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}>
                <Marker
                  coordinate={{
                    latitude: runData.runPath[0].latitude,
                    longitude: runData.runPath[0].longitude,
                  }}
                />
                <Marker
                  coordinate={{
                    latitude:
                      runData.runPath[runData.runPath.length - 1].latitude,
                    longitude:
                      runData.runPath[runData.runPath.length - 1].longitude,
                  }}
                />
                <Polyline
                  coordinates={runData.runPath}
                  strokeColor={globalDesign.primary}
                  strokeWidth={10}
                />
              </MapView>
            </View>

            <Card>
              <View style={globalStyles.paddingHorizontal}>
                <Text style={styles.reviewSubtitle}>{runData.dateAndTime}</Text>
                <View style={globalStyles.horizontalSpaceBetween}>
                  <TextInput
                    onChangeText={(val) => setTitle(val)}
                    value={runData.title}
                    style={styles.reviewTitle}
                  />
                  <Feather
                    name='edit-2'
                    size={18}
                    color={globalDesign.primary}
                  />
                </View>
              </View>
            </Card>

            <Card>
              <View style={globalStyles.horizontalSpaceAround}>
                <View style={styles.statBox}>
                  <View style={styles.logo}>
                    <Entypo
                      name='location-pin'
                      size={48}
                      color={globalDesign.secondary}
                    />
                  </View>
                  <View style={styles.statBoxTextContainer}>
                    <Text style={styles.statBoxTextHeader}>산책 거리</Text>
                    <Text style={styles.statBoxTextHeader}>
                      <Text style={styles.statBoxTextDynamic}>
                        {Math.round(runData.distance * 100) / 100}
                      </Text>{' '}
                      km
                    </Text>
                  </View>
                </View>
                <View style={styles.statBox}>
                  <View style={styles.logo}>
                    <Entypo
                      name='stopwatch'
                      size={48}
                      color={globalDesign.secondary}
                    />
                  </View>
                  <View style={styles.statBoxTextContainer}>
                    <Text style={styles.statBoxTextHeader}>산책 시간</Text>
                    <Text style={styles.statBoxTextHeader}>
                      <Text style={styles.statBoxTextDynamic}>
                        {runData.time}
                      </Text>{' '}
                      min
                    </Text>
                  </View>
                </View>
              </View>
              <View style={globalStyles.horizontalSpaceAround}>
                <View style={styles.statBox}>
                  <View style={styles.logo}>
                    <FontAwesome5
                      name='dog'
                      size={48}
                      color={globalDesign.secondary}
                    />
                  </View>
                  <View style={styles.statBoxTextContainer}>
                    <Text style={styles.statBoxTextHeader}>평균 속도</Text>
                    <Text style={styles.statBoxTextHeader}>
                      <Text style={styles.statBoxTextDynamic}>
                        {runData.avgSpeed}
                      </Text>{' '}
                      min/km
                    </Text>
                  </View>
                </View>
                <View style={styles.statBox}>
                  <View style={styles.logo}>
                    <FontAwesome5
                      name='fire'
                      size={48}
                      color={globalDesign.secondary}
                    />
                  </View>
                  <View style={styles.statBoxTextContainer}>
                    <Text style={styles.statBoxTextHeader}>칼로리</Text>
                    <Text style={styles.statBoxTextHeader}>
                      <Text style={styles.statBoxTextDynamic}>
                        {Math.round(runData.calories)}
                      </Text>{' '}
                      cals
                    </Text>
                  </View>
                </View>
              </View> 
            </Card>

            <Card>
              <View style={globalStyles.paddingHorizontal}>
                <View style={globalStyles.horizontalSpaceBetween}>
                  <MaterialCommunityIcons
                    onPress={() => {
                      setIconsToDefault()
                      setIcon1("#F3C757")
                    }}
                    name='emoticon-cry-outline'
                    size={48}
                    color={runData.icon1}
                  />
                  <MaterialCommunityIcons
                    onPress={() => {
                      setIconsToDefault()
                      setIcon2("#F3C757")
                    }}
                    name='emoticon-sad-outline'
                    size={48}
                    color={runData.icon2}
                  />
                  <MaterialCommunityIcons
                    onPress={() => {
                      setIconsToDefault()
                      setIcon3("#F3C757")
                    }}
                    name='emoticon-neutral-outline'
                    size={48}
                    color={runData.icon3}
                  />
                  <MaterialCommunityIcons
                    onPress={() => {
                      setIconsToDefault()
                      setIcon4("#F3C757")
                    }}
                    name='emoticon-happy-outline'
                    size={48}
                    color={runData.icon4}
                  />
                  <MaterialCommunityIcons
                    onPress={() => {
                      setIconsToDefault()
                      setIcon5("#F3C757")
                    }}
                    name='emoticon-excited-outline'
                    size={48}
                    color={runData.icon5}
                  />
                </View>
              </View>
            </Card>
            
            <View style={globalStyles.inputView}>
              <Text style={globalStyles.subTextDark}>오늘 산책은 </Text>
              <TextInput
                style={globalStyles.inputPrimary}
                onChangeText={(val) => setNotes(val)}
                value={runData.notes}
              />

            
            </View>
            {/* <View style={globalStyles.inputView}>
              <Text style={globalStyles.subTextDark}>Category: </Text>
              <TextInput
                style={globalStyles.inputPrimary}
                onChangeText={(val) => setCategory(val)}
                value={runData.category}
              />
            </View> */}
            <Flatbutton
              text='저장하기'
              onPress={() =>
                createRun({ userId: user.id, runId: id, runData }).then(
                  savePress
                )
              }
              backgroundColor={globalDesign.primary}
              color={globalDesign.light}
              width={globalDesign.width * 0.9}
              disabled={!user?.id}
            />
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  banner: {
    margin: 5,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 8,
    backgroundColor: globalDesign.secondary,
    width: globalDesign.width * 0.4,
  },
  bannerText: {
    color: globalDesign.light,
    fontFamily: 'NanumSquareRoundB',
    fontSize: 18,
    textAlign: 'center',
  },
  reviewSubtitle: {
    fontFamily: 'NanumSquareRoundB',
    color: globalDesign.dark,
    fontSize: 16,
  },
  reviewTitle: {
    fontFamily: 'NanumSquareRoundB',
    color: globalDesign.dark,
    fontSize: 24,
    flex: 1,
  },
  statBox: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 6,
    marginHorizontal: 4,
  },
  statBoxTextContainer: {
    flex: 1,
    padding: 2,
    justifyContent: 'space-around',
  },
  statBoxTextHeader: {
    fontFamily: 'NanumSquareRoundB',
    color: globalDesign.dark,
    fontSize: 14,
  },
  statBoxTextDynamic: {
    fontFamily: 'NanumSquareRoundB',
    color: globalDesign.dark,
    fontSize: 24,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  container: {
    flex: 1,
  },
})
