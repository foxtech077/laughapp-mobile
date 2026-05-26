import { StyleSheet, Text, View } from "react-native";

const ClipsScreen = () => {
    return (
        <View style={styles.clipsContainer}>
            <Text>Clips</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    clipsContainer: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default ClipsScreen;