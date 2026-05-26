import { StyleSheet, Text, View } from "react-native";

const GreatestHitsScreen = () => {
    return (
        <View style={styles.greatestHitsContainer}>
            <Text>Greatest Hits</Text>
        </View>
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