import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./types";
import { routes } from "./routes";
import ChooseRoleScreen from "../views/screens/onboarding/ChooseRole";
import CreateFanAccount from "../views/screens/onboarding/CreateFanAccount";
import CreateComedianAccount from "../views/screens/onboarding/CreateComedianAccount";

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeNavigator() {
    return (
        <Stack.Navigator
            initialRouteName={routes.ONBOARDING_CHOOSE_ROLE_SCREEN}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={routes.ONBOARDING_CHOOSE_ROLE_SCREEN} component={ChooseRoleScreen} />
            <Stack.Screen name={routes.CREATE_FAN_ACCOUNT_SCREEN} component={CreateFanAccount} />
            <Stack.Screen name={routes.CREATE_COMEDIAN_ACCOUNT_SCREEN} component={CreateComedianAccount} />
        </Stack.Navigator>
    );
}

export default HomeNavigator;
