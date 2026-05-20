import { NavigatorScreenParams } from "@react-navigation/native";
import { routes } from "./routes";

export type RootStackParamList = {
  [routes.SPLASH_SCREEN]: undefined;
  [routes.AUTH_NAVIGATOR]: NavigatorScreenParams<AuthStackParamList>;
  [routes.HOME_NAVIGATOR]: NavigatorScreenParams<HomeStackParamList>;
}

export type AuthStackParamList = {
  [routes.LOGIN_SCREEN]: undefined;
};

export type HomeStackParamList = {
  [routes.HOME_TABS]: undefined;
  [routes.ONBOARDING_CHOOSE_ROLE_SCREEN]: undefined;
  [routes.AUTH_CREATE_ACCOUNT_CHOOSE_NAME_SCREEN]: undefined;
};