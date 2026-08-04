import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { fontScale, moderateScale, spacing } from "../../../utils/dimensions";
import HeaderRight from "../../components/HeaderRight";
import TextView from "../../components/TextView";
import BaseView from "../../hoc/BaseView";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Banknote, ChevronRight, Landmark, MailOpen, Settings, ShieldCheck } from "lucide-react-native";
import LinearGradient from "react-native-linear-gradient";
import { routes } from "../../../navigator/routes";

export default function EarningsDashboardScreen() {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const items = [
        { name: "Earnings Overview", icon: Banknote, navigationRoute: null },
        { name: "Payout History", icon: Landmark, navigationRoute: null },
        { name: "Tip Inbox", icon: MailOpen, navigationRoute: routes.TIP_INBOX_SCREEN },
        { name: "Account Settings", icon: Settings, navigationRoute: null },
        { name: "Verification Status", icon: ShieldCheck, navigationRoute: null },
    ];

    return (
        <BaseView
            showHeader
            showBackButton
            headerTitle="Earnings Dashboard"
            titleAlign="left"
            headerRight={<HeaderRight icons={["notifications"]} />}
            style={[styles.container, { backgroundColor: colors.white }]}
        >
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {items.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <TouchableOpacity key={index} style={[styles.itemContainer, { borderColor: colors.borderLight }]} onPress={() => item.navigationRoute && navigation.navigate(item.navigationRoute as never)}>
                            <View style={styles.titleContainer}>
                                <View style={styles.iconContainer}>
                                    <LinearGradient
                                        colors={[colors.onboardingGradientStart, colors.onboardingGradientEnd]}
                                        style={StyleSheet.absoluteFill}
                                    />
                                    <Icon width={fontScale(30)} height={fontScale(30)} color={colors.black} />
                                </View>
                                <TextView size={18} weight="700" color={colors.black}>
                                    {item.name}
                                </TextView>
                            </View>
                            <ChevronRight width={fontScale(24)} height={fontScale(24)} color={colors.black} />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </BaseView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: spacing(16),
    },
    iconContainer: {
        padding: spacing(10),
        borderRadius: moderateScale(100),
        backgroundColor: '#E0E0E0',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: spacing(22),
        borderBottomWidth: 1,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing(12),
    },
});
