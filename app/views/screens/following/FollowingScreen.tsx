import BaseView from "../../hoc/BaseView";
import TextView from "../../components/TextView";
import ClipsScreen from "../top/tabs/Clips";

function FollowingScreen() {
    return (
        <BaseView applyTopInset={false}>
            <ClipsScreen />
        </BaseView>
    )
}

export default FollowingScreen;