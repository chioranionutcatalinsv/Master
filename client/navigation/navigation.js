import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MyLocation } from "../screens/MyLocation";
import { Login } from "../screens/Login";
import { Settings } from "../screens/ProfileSettings";
import { SignUp } from "../screens/SignUp";
import { GroupTrack } from "../screens/GropTrack";

const AppNavigation = createBottomTabNavigator({
  "Track On Map": { screen: MyLocation },
  "Group Track": { screen: GroupTrack },
  Settings: { screen: Settings },
});

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigation,
    App: AppNavigation,
  },
  {
    initialRouteName: "Auth",
  }
);

export const AppContainer = createAppContainer(SwitchNavigator);
