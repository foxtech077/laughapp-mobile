import { NavigatorScreenParams } from "@react-navigation/native";
import { routes } from "./routes";

export type RootStackParamList = {
  [routes.SPLASH_SCREEN]: undefined;
  [routes.AUTH_NAVIGATOR]: NavigatorScreenParams<AuthStackParamList>;
  [routes.HOME_NAVIGATOR]: NavigatorScreenParams<HomeStackParamList>;
}

export type AuthStackParamList = {
  [routes.LOGIN_SCREEN]: undefined;
  [routes.GET_STARTED_SCREEN]: undefined;
  [routes.OTP_VERIFICATION_SCREEN]: { phoneNumber: string };
};

export type ProfileStackParamList = {
  [routes.PROFILE_SCREEN_MAIN]: undefined;
  [routes.PROFILE_FOLLOWING_SCREEN]: undefined;
};

export type HomeTabParamList = {
  [routes.FOLLOWING_SCREEN]: undefined;
  [routes.TOP_COMEDIANS_SCREEN]: undefined;
  [routes.PROFILE_SCREEN]: NavigatorScreenParams<ProfileStackParamList>;
};

export type HomeStackParamList = {
  [routes.HOME_TABS]: undefined;
  [routes.ONBOARDING_FEED_INTRO_SCREEN]: undefined;
  [routes.ONBOARDING_CHOOSE_ROLE_SCREEN]: undefined;
  [routes.CREATE_FAN_ACCOUNT_SCREEN]: undefined;
  [routes.CREATE_COMEDIAN_ACCOUNT_SCREEN]: undefined;
  [routes.TIP_INBOX_SCREEN]: undefined;
};