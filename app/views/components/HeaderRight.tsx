import { StyleSheet, TouchableOpacity, View } from "react-native";
import { routes } from "../../navigator/routes";
import { spacing, fontScale } from "../../utils/dimensions";
import { useNavigation } from "@react-navigation/native";
import { BellIcon, CircleDollarSign, Settings, Upload } from "lucide-react-native";

type IconName = "upload" | "earnings" | "notifications" | "settings";

const iconMap: Record<IconName, { icon: React.ReactNode; navigationRoute: string | null }> = {
    upload: { icon: <Upload width={fontScale(28)} height={fontScale(28)} />, navigationRoute: null },
    earnings: { icon: <CircleDollarSign width={fontScale(28)} height={fontScale(28)} />, navigationRoute: routes.EARNINGS_DASHBOARD_SCREEN },
    notifications: { icon: <BellIcon width={fontScale(28)} height={fontScale(28)} />, navigationRoute: null },
    settings: { icon: <Settings width={fontScale(28)} height={fontScale(28)} />, navigationRoute: null },
};

const defaultIcons: IconName[] = ["upload", "earnings", "notifications", "settings"];

type HeaderRightProps = {
    icons?: IconName[];
};

const HeaderRight = ({ icons = defaultIcons }: HeaderRightProps) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {icons.map((name, index) => {
                const item = iconMap[name];
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            if (item.navigationRoute) {
                                navigation.navigate(item.navigationRoute as never);
                            }
                        }}
                    >
                        {item.icon}
                    </TouchableOpacity>
                );
            })}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: spacing(20),
    }
});

export default HeaderRight;
