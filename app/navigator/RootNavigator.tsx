import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import AuthNavigator from "./AuthNavigator";
import HomeNavigator from "./HomeNavigator";
import { routes } from "./routes";
import { useAuthStore } from "../store/useAuthStore";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
      const { isLoggedIn } = useAuthStore();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
                <Stack.Screen name={routes.HOME_NAVIGATOR} component={HomeNavigator} />
            ) : (
                <Stack.Screen name={routes.AUTH_NAVIGATOR} component={AuthNavigator} />
            )}
        </Stack.Navigator>
    );
}

export default RootNavigator;