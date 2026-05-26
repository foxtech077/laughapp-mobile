import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList, HomeTabParamList, ProfileStackParamList } from "./types";
import { routes } from "./routes";
import ChooseRoleScreen from "../views/screens/onboarding/ChooseRole";
import OnboardingFeedIntroScreen from "../views/screens/onboarding/intro/OnboardingFeedIntroScreen";
import CreateFanAccount from "../views/screens/onboarding/CreateFanAccount";
import CreateComedianAccount from "../views/screens/onboarding/CreateComedianAccount";
import ProfileScreen from "../views/screens/profile/ProfileScreen";
import TopScreen from "../views/screens/top/TopScreen";
import ProfileFollowingScreen from "../views/screens/profile/ProfileFollowingScreen";
import FollowingScreen from "../views/screens/following/FollowingScreen";
import CustomTabBar from "./components/CustomTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();
const ProfileStackNav = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = () => (
    <ProfileStackNav.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStackNav.Screen name={routes.PROFILE_SCREEN_MAIN} component={ProfileScreen} />
        <ProfileStackNav.Screen name={routes.PROFILE_FOLLOWING_SCREEN} component={ProfileFollowingScreen} />
    </ProfileStackNav.Navigator>
);

const HomeTab = () => (
    <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
    >
        <Tab.Screen name={routes.FOLLOWING_SCREEN} component={FollowingScreen} />
        <Tab.Screen name={routes.TOP_COMEDIANS_SCREEN} component={TopScreen} />
        <Tab.Screen name={routes.PROFILE_SCREEN} component={ProfileStack} />
    </Tab.Navigator>
);

function HomeNavigator() {
    return (
        <Stack.Navigator
            initialRouteName={routes.ONBOARDING_FEED_INTRO_SCREEN}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={routes.ONBOARDING_FEED_INTRO_SCREEN} component={OnboardingFeedIntroScreen} />
            <Stack.Screen name={routes.ONBOARDING_CHOOSE_ROLE_SCREEN} component={ChooseRoleScreen} />
            <Stack.Screen name={routes.CREATE_FAN_ACCOUNT_SCREEN} component={CreateFanAccount} />
            <Stack.Screen name={routes.CREATE_COMEDIAN_ACCOUNT_SCREEN} component={CreateComedianAccount} />
            <Stack.Screen name={routes.HOME_TABS} component={HomeTab} />
        </Stack.Navigator>
    );
}

export default HomeNavigator;
