import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Feed from "../screens/feed";
import StartRun from "../screens/startRun";
import HomeScreen from "../screens/HomeScreen";



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
  
  
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerShown: false,
    animationEnabled: false,
  },
});

const AppStack = createAppContainer(HomeStack);
export default AppStack;
