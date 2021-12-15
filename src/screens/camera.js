import React,{useState,useEffect, useRef} from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, Image, BackHandler, Alert } from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather, Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { globalStyles, globalDesign } from '../shared/globalStyles'
import start from '../modals/start'

export default function CameraScreen({ navigation }){
  const camRef= useRef(null);
  const [type,setType] = useState(Camera.Constants.Type.back);
  const [hasPermission,setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] =useState(null);
  const [open, setOpen] =useState(false);

  useEffect(() => {
    (async()=>{
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async()=>{
      const {status} = await MediaLibrary.getPermissionsAsync(MediaLibrary.CAMERA_ROLL);
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View/>;
  }

  async function takePicture(){
    if(camRef){
      const data=await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
      console.log(data);
    }
  }

  async function savePicture(){
    const asset = await MediaLibrary.saveToLibraryAsync(capturedPhoto)
    .then(()=>{
      alert("사진 저장 성공!");
    })
    .catch(error=>{
      console.log('err',error);
    })
  }
  async function playSound() {
      const sound = new Audio.Sound();
      try {    
        await sound.loadAsync(require('../assets/dogplay.m4a'));
        await sound.playAsync();
      } catch (error) {

    }
  }

  return(
    <View style={styles.container}>
        <View style={globalStyles.containerLight}>
            <View style={{
                width: "100%",
                height: "11%",
                minHeight: 100,
                backgroundColor: "#F3C757",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <SafeAreaView style={globalStyles.headerLayout}>
                    <TouchableOpacity>
                        <Ionicons name='ios-arrow-back' size={35} color={globalDesign.light} />
                    </TouchableOpacity>
                    <Text style={{
                        alignItems: 'center', fontFamily: "NanumSquareRoundEB", fontSize: 25, marginRight: 10
                    }}>카메라</Text>
                </SafeAreaView>
            </View>
        </View>
        <Camera
        style={{height: 690}} type={type} ref={camRef}
      >
        <View style={{ backgroundColor:'transparent'}}></View>
     </Camera>
     <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={() => playSound()}
        >
            <FontAwesome5 name="dog" size={50} color='#F3C757' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
            <FontAwesome name="camera" size={60} color="#F3C757"/>
        </TouchableOpacity>
        <TouchableOpacity
                onPress={ ()=> {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
            }}
        >
            <MaterialIcons name="flip-camera-android" size={55} color="#F3C757" />
        </TouchableOpacity>
        {/* <TouchableOpacity
            style={{position:"absolute", bottom:15,  left:20,}}
            onPress={() => playSound()}
        >
            <Text style={{marginLeft: 20, bottom: 20}}><FontAwesome5 name="dog" size={50} color='#F3C757' /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
            <FontAwesome name="camera" size={60} color="#F3C757"/>
        </TouchableOpacity>
        <TouchableOpacity
                onPress={ ()=> {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
            }}
        >
            <Text style={{marginLeft: 5}}><MaterialIcons name="flip-camera-android" size={55} color="#F3C757" /></Text>
        </TouchableOpacity> */}
     </View>

     {capturedPhoto &&
       <Modal
        animationType="slide"
        transparent={false}
        visible={open}
       >
        <View style={{flex:1, marginTop:50, marginLeft:30, marginRight:30}}>  
         <Image
          style={{width:'100%', height:720, borderRadius:10}} source={ {uri: capturedPhoto}}
         />
        </View>
        <View style={{flexDirection:'row', justifyContent: 'center', marginBottom: 40}}>
          <TouchableOpacity style={{marginRight: 120}} onPress={()=> setOpen(false)}>
           <MaterialIcons name="cancel-presentation" size={50} color='#F3C757'/>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={savePicture}>
           <Feather name="download" size={50} color='#F3C757' />
          </TouchableOpacity>
        </View>
       </Modal>
      }
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
  },
  button:{
    justifyContent:"center",
    alignItems: "center",
    //backgroundColor: "#F3C757",
    //borderRadius:10,
    flexDirection:"row",
    //width:100,
    height:70,
    margin:20,
    //marginLeft:125,
    //bottom: 10
  }
});