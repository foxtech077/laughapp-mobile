import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "./routes";
import { AuthStackParamList } from "./types";
import LoginScreen from "../views/screens/auth/LoginScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={routes.LOGIN_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;