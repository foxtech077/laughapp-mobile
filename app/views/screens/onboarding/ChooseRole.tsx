import { StyleSheet } from "react-native";
import { spacing } from "../../../utils/dimensions";
import BaseView from "../../components/BaseView";
import TextView from "../../components/TextView";
import { useTheme } from "@react-navigation/native";

function ChooseRoleScreen() {
      const { colors } = useTheme();

    return (
        <BaseView style={styles.container} gradientBackground gradientColors={colors.primaryGradient} gradientLocations={[0, 0.5, 1]} gradientStart={{ x: 1, y: 0 }} gradientEnd={{ x: 0, y: 1 }}>
            <TextView variant="title" align="center" style={styles.appName}>LaughApp -Choose Onborading Role Screen</TextView>
        </BaseView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing(24),
    },
    appName: {
        marginBottom: spacing(8),
    },
});
export default ChooseRoleScreen;