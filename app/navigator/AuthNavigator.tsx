import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "./routes";
import { AuthStackParamList } from "./types";
import LoginScreen from "../views/screens/auth/LoginScreen";
import GetStartedScreen from "../views/screens/auth/GetStartedScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={routes.GET_STARTED_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={routes.GET_STARTED_SCREEN} component={GetStartedScreen} />
      <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;