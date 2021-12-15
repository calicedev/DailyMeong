import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import {
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import Review from './review'
import {
  globalStyles,
  globalDesign,
  getDateAndTime,
  getTitle,
  distanceInKmBetweenEarthCoordinates,
  calculateCalories,
  calculateAvgSpeed,
  FormattedDistance,
} from '../shared/globalStyles'

//default function
export default function Start({ setStartModal, navigation }) {
  //declare state
  const [reviewModal, setReviewModal] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [icon1, setIcon1] = useState(globalDesign.dark)
  const [icon2, setIcon2] = useState(globalDesign.dark)
  const [icon3, setIcon3] = useState(globalDesign.secondary)
  const [icon4, setIcon4] = useState(globalDesign.dark)
  const [icon5, setIcon5] = useState(globalDesign.dark)
  const [dateAndTime, setDateAndTime] = useState('')
  const [title, setTitle] = useState('')
  const [time, setTime] = useState(0)
  const [distance, setDistance] = useState(0)
  const [notes, setNotes] = useState('')
  const [category, setCategory] = useState('')
  const [calories, setCalories] = useState(0)
  const [avgSpeed, setAvgSpeed] = useState('00:00')
  const [currentSpeed, setCurrentSpeed] = useState('00:00')
  const [runPath, setRunPath] = useState([])
  const [lat1, setLat1] = useState(null)
  const [lon1, setLon1] = useState(null)
  const [lat2, setLat2] = useState(null)
  const [lon2, setLon2] = useState(null)
  const [playPause, setPlayPause] = useState('pause')
  const [isActive, setIsActive] = useState(true)
  const [containerColor, setContainerColor] = useState(globalDesign.secondary)

  //function that navigates to review modal
  const navigateToReview = () => {
    //stop timer and distance
    setIsActive(false)
    //get and set formatted statistics
    setDistance(Math.round(distance * 100) / 100)
    setDateAndTime(getDateAndTime())
    setTitle(getTitle())
    setCalories(Math.round(calculateCalories(distance, minutes, seconds)))
    //open review modal
    setReviewModal(true)
    //change container color
    setContainerColor(globalDesign.dark)
    
  }

  //function that navigates to start modal from review modal
  const navigateToStart = () => {
    setReviewModal(false)
  }

  //function that adds run & navigates to feed
  const navigateToHome = () => {
    //navigate to feed
    setStartModal(false)
    setReviewModal(false)
    navigation.navigate('Feed')
  }

  //function that does NOT add run & navigates to feed
  const deleteNavigateToHome = () => {
    //navigate to feed
    setStartModal(false)
    setReviewModal(false)
    navigation.navigate('Feed')
  }

  const NavigatetoCamera = () => {
    //navigate to feed
    setStartModal(false)
    setReviewModal(false)
    navigation.navigate('CameraScreen')
  }

  //function that handles play and pause change
  const handlePlayPause = () => {
    //change icon, background, stop timer and distance
    if (playPause == 'pause') {
      setPlayPause('play')
      setIsActive(false)
      setContainerColor(globalDesign.dark)
    }
    //change icon, background, start timer and distance
    else {
      setPlayPause('pause')
      setIsActive(true)
      setContainerColor(globalDesign.secondary)
    }
  }

  //function that runs every second
  useEffect(() => {
    let interval = null
    let tempMinutes = minutes
    let tempSeconds = seconds
    //timer and distance updated when isActive
    if (isActive) {
      ;(async () => {
        //get location
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          console.log('Permission to access location was denied')
        }
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        })
        let tempCoord = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
        //on first iteration
        if (lat2 == null) {
          setLat2(location.coords.latitude)
          setLon2(location.coords.longitude)
        }
        //store current location and past location
        setLat1(lat2)
        setLon1(lon2)
        setLat2(location.coords.latitude)
        setLon2(location.coords.longitude)
        //add location to runPath
        setRunPath((currentRunPath) => [...currentRunPath, tempCoord])

        if (lat1 != null && lon1 != null) {
          //calculate distance
          let distanceTraveled = distanceInKmBetweenEarthCoordinates(
            lat1,
            lon1,
            lat2,
            lon2
          )
          setDistance(distance + distanceTraveled)
          //calculate average speed
          let distanceInM = distance * 1000
          let timeInSeconds = minutes * 60 + seconds
          setAvgSpeed(calculateAvgSpeed(distanceInM, timeInSeconds))
          //calculate current speed
          if (runPath.length > 5) {
            let c = runPath.length - 1
            let currentDistanceTraveled =
              distanceInKmBetweenEarthCoordinates(
                runPath[c - 5].latitude,
                runPath[c - 5].longitude,
                runPath[c].latitude,
                runPath[c].longitude
              ) * 1000
            setCurrentSpeed(calculateAvgSpeed(currentDistanceTraveled, 5))
          }
        }
      })()
      //format time
      if (seconds == 60) {
        setMinutes((minutes) => minutes + 1)
        setSeconds(0)
      }
      if (minutes < 10) tempMinutes = '0' + minutes
      if (seconds < 10) tempSeconds = '0' + seconds
      setTime(tempMinutes + ':' + tempSeconds)
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  //defualt output
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          ...globalStyles.containerSecondary,
          ...{ backgroundColor: containerColor },
        }}>
        <View style={globalStyles.bottomLine}>
          <View style={globalStyles.timeAndDistData}>
            <Text style={globalStyles.bigSubTextLight}>{time}</Text>
            <Text style={globalStyles.smallSubTextLight}>Time</Text>
          </View>
        </View>
        <View style={globalStyles.timeAndDistData}>
          <Text style={globalStyles.bigSubTextLight}>
            <FormattedDistance distance={distance} />
          </Text>
          <Text style={globalStyles.smallSubTextLight}>Distance</Text>
        </View>
        <View style={globalStyles.horizontalSpaceAround}>
          <TouchableOpacity onPress={handlePlayPause}>
            <FontAwesome name={playPause} size={56} color="#F3C757" />
          </TouchableOpacity>
          
          <TouchableOpacity
            disabled={runPath.length == 0}
            onPress={navigateToReview}>
            <FontAwesome name='stop' size={56} color="#F3C757" />
          </TouchableOpacity>
        </View>

        <Modal visible={reviewModal} animationType='slide'>
          <Review
            time={time}
            distance={distance}
            notes={notes}
            category={category}
            dateAndTime={dateAndTime}
            title={title}
            setCategory={setCategory}
            setTitle={setTitle}
            setNotes={setNotes}
            deletePress={deleteNavigateToHome}
            backPress={navigateToStart}
            savePress={navigateToHome}
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
            runPath={runPath}
            calories={calories}
            avgSpeed={avgSpeed}
          />
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  )
}
