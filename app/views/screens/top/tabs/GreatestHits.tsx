import { StyleSheet, Text, View } from "react-native";
import ClipsScreen from "./Clips";

const GreatestHitsScreen = () => {
    return (
        <ClipsScreen />
    )
}

const styles = StyleSheet.create({
    greatestHitsContainer: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default GreatestHitsScreen;