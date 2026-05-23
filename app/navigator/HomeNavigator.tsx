import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList, HomeTabParamList } from "./types";
import { routes } from "./routes";
import ChooseRoleScreen from "../views/screens/onboarding/ChooseRole";
import CreateFanAccount from "../views/screens/onboarding/CreateFanAccount";
import CreateComedianAccount from "../views/screens/onboarding/CreateComedianAccount";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../views/screens/profile/ProfileScreen";
import TopScreen from "../views/screens/top/TopScreen";
import FollowingScreen from "../views/screens/following/FollowingScreen";
import CustomTabBar from "./components/CustomTabBar";

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTab = () => (
    <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
    >
        <Tab.Screen name={routes.FOLLOWING_SCREEN} component={FollowingScreen} />
        <Tab.Screen name={routes.TOP_COMEDIANS_SCREEN} component={TopScreen} />
        <Tab.Screen name={routes.PROFILE_SCREEN} component={ProfileScreen} />
    </Tab.Navigator>
);

function HomeNavigator() {
    return (
        <Stack.Navigator
            initialRouteName={routes.ONBOARDING_CHOOSE_ROLE_SCREEN}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={routes.ONBOARDING_CHOOSE_ROLE_SCREEN} component={ChooseRoleScreen} />
            <Stack.Screen name={routes.CREATE_FAN_ACCOUNT_SCREEN} component={CreateFanAccount} />
            <Stack.Screen name={routes.CREATE_COMEDIAN_ACCOUNT_SCREEN} component={CreateComedianAccount} />
            <Stack.Screen name={routes.HOME_TABS} component={HomeTab} />
        </Stack.Navigator>
    );
}

export default HomeNavigator;
