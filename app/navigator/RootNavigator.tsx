import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useState } from "react";
import AuthNavigator from "./AuthNavigator";
import HomeNavigator from "./HomeNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
                <Stack.Screen name="Home" component={HomeNavigator} />
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    );
}

export default RootNavigator;