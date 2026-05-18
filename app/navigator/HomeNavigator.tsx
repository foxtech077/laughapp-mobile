import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./types";
import { routes } from "./routes";
import ChooseRoleScreen from "../views/screens/onboarding/ChooseRole";

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeNavigator() {
    return (
        <Stack.Navigator
            initialRouteName={routes.ONBOARDING_CHOOSE_ROLE_SCREEN}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={routes.ONBOARDING_CHOOSE_ROLE_SCREEN} component={ChooseRoleScreen} />
        </Stack.Navigator>
    );
}

export default HomeNavigator;
