import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Feed from "../screens/feed";
import StartRun from "../screens/startRun";
import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/camera"

const screens = {
  HomeScreen:{
    screen: HomeScreen,
   },
  Feed: {
    screen: Feed,
  },
  StartRun: {
    screen: StartRun,
  },
  CameraScreen: {
    screen: CameraScreen
  }
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerShown: false,
    animationEnabled: false,
  },
});

const AppStack = createAppContainer(HomeStack);
export default AppStack;
