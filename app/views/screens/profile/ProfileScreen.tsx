import BaseView from "../../components/BaseView";
import TextView from "../../components/TextView";

function ProfileScreen() {
    return (
        <BaseView showBackButton showHeader headerTitle="Profile" titleAlign="left">
            <TextView>Profile Screen</TextView>
        </BaseView>
    )
};

export default ProfileScreen;