import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import FlatButton from './button'
import Flatbutton from '../shared/button'
import Review from '../modals/review'
import { globalDesign, globalStyles } from '../shared/globalStyles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MapView, { Polyline, Marker } from 'react-native-maps'

export default function Item({ item }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [notes, setNotes] = useState(item.notes)
  const [category, setCategory] = useState(item.category)
  const [title, setTitle] = useState(item.title)
  const [icon1, setIcon1] = useState(item.icon1)
  const [icon2, setIcon2] = useState(item.icon2)
  const [icon3, setIcon3] = useState(item.icon3)
  const [icon4, setIcon4] = useState(item.icon4)
  const [icon5, setIcon5] = useState(item.icon5)

  const onBackPress = () => {
    setNotes(item.notes)
    setCategory(item.category)
    setTitle(item.title)
    setIcon1(item.icon1)
    setIcon2(item.icon2)
    setIcon3(item.icon3)
    setIcon4(item.icon4)
    setIcon5(item.icon5)
    setModalOpen(false)
  }
  const onSavePress = () => {
    item.notes = notes
    item.category = category
    item.title = title
    item.icon1 = icon1
    item.icon2 = icon2
    item.icon3 = icon3
    item.icon4 = icon4
    item.icon5 = icon5
    setModalOpen(false)
  }

  const onDeletePress = () => {
    setModalOpen(false)
  }

  function SelectIcon() {
    //round distance as well
    item.distance = Math.round(item.distance * 100) / 100
    if (icon1 != globalDesign.dark)
    return (
      <MaterialCommunityIcons
        name='emoticon-cry-outline'
        size={48}
        color={"#F3C757"}
      />
    )
  else if (icon2 != globalDesign.dark)
    return (
      <MaterialCommunityIcons
        name='emoticon-sad-outline'
        size={48}
        color={"#F3C757"}
      />
    )
  else if (icon3 != globalDesign.dark)
    return (
      <MaterialCommunityIcons
        name='emoticon-neutral-outline'
        size={48}
        color={"#F3C757"}
      />
    )
  else if (icon4 != globalDesign.dark)
    return (
      <MaterialCommunityIcons
        name='emoticon-happy-outline'
        size={48}
        color={"#F3C757"}
      />
    )
  else
    return (
      <MaterialCommunityIcons
        name='emoticon-excited-outline'
        size={48}
        color={"#F3C757"}
      />
    )
}
  return (
    <View>
      <Modal visible={modalOpen} animationType='slide'>
        <Review
          id={item.id}
          time={item.time}
          distance={item.distance}
          dateAndTime={item.dateAndTime}
          runPath={item.runPath}
          calories={item.calories}
          avgSpeed={item.avgSpeed}
          backPress={onBackPress}
          savePress={onSavePress}
          deletePress={onDeletePress}
          notes={notes}
          category={category}
          setNotes={setNotes}
          setCategory={setCategory}
          title={title}
          setTitle={setTitle}
          icon1={icon1}
          icon2={icon2}
          icon3={icon3}
          icon4={icon4}
          icon5={icon5}
          setIcon1={setIcon1}
          setIcon2={setIcon2}
          setIcon3={setIcon3}
          setIcon4={setIcon4}
          setIcon5={setIcon5}
        />
      </Modal>

      <TouchableOpacity onLongPress={() => setModalOpen(true)}>
        <View style={styles.card}>
          <View style={globalStyles.paddingHorizontal}>
            <View style={styles.cardHorizonatal}>
              <SelectIcon />
              <View style={globalStyles.paddingHorizontal}>
                <Text style={styles.reviewSubtitle}>{item.dateAndTime}</Text>
                <Text style={styles.reviewTitle}>{item.title}</Text>
              </View>
              <TouchableOpacity
                style={styles.logo}
                onPress={() => setModalOpen(true)}>
                <AntDesign
                  name='infocirlceo'
                  size={24}
                  color={"#F3C757"}
                />
              </TouchableOpacity>
            </View>
          </View>

          <MapView
            zoomEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            style={styles.mapStyle}
            provider={MapView.PROVIDER_GOOGLE}
            initialRegion={{
              latitude: item.runPath[0].latitude,
              longitude: item.runPath[0].longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.05,
            }}>
            <Marker
              coordinate={{
                latitude: item.runPath[0].latitude,
                longitude: item.runPath[0].longitude,
              }}
            />
            <Polyline
              coordinates={item.runPath}
              strokeColor={globalDesign.primary}
              strokeWidth={5}
            />
          </MapView>

          <View style={globalStyles.paddingHorizontal}>
            <View style={globalStyles.horizontalSpaceBetween}>
              <View style={globalStyles.paddingHorizontal}>
                <Text style={styles.title}>
                  {item.time}
                  <Text style={styles.subtitle}> m</Text>
                </Text>
                <Text style={styles.subtitle}>산책 시간</Text>
              </View>
              <View style={globalStyles.paddingHorizontal}>
                <Text style={styles.title}>
                  {Math.round(item.distance * 100) / 100}
                  <Text style={styles.subtitle}> km</Text>
                </Text>
                <Text style={styles.subtitle}>산책 거리</Text>
              </View>
              <View style={globalStyles.paddingHorizontal}>
                <Text style={styles.title}>
                  {item.calories}
                  <Text style={styles.subtitle}> cals</Text>
                </Text>
                <Text style={styles.subtitle}>칼로리</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  modalText: {
    color: globalDesign.dark,
    fontSize: 20,
    fontFamily: 'NanumSquareRoundB',
  },
  card: {
    flex: 1,
  },
  cardLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  cardHorizonatal: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  cardText: {
    color: globalDesign.dark,
    fontSize: 18,
    fontFamily: 'NanumSquareRoundB',
  },
  infoModalView: {
    padding: 10,
    flexDirection: 'row',
  },
  titleView: {
    alignItems: 'center',
  },

  reviewTitle: {
    fontFamily: 'NanumSquareRoundB',
    color: globalDesign.dark,
    fontSize: 20,
    flex: 1,
  },
  reviewSubtitle: {
    fontFamily: 'NanumSquareRoundB',
    color: "black",
    fontSize: 15,
  },
  title: {
    color: "black",
    fontSize: 18,
    fontFamily: 'NanumSquareRoundB',
  },
  subtitle: {
    color: globalDesign.dark,
    fontSize: 12,
    fontFamily: 'NanumSquareRoundB',
  },

  mapStyle: {
    flexDirection: 'row',
    flex: 1,
    //width: "100%",
    height: 150,
    marginVertical: 10,
  },
  logo: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
})
