import { createMMKV } from "react-native-mmkv";
import { appConfig } from "../constants/config";

export const mmkvStorage = createMMKV({ id: "laughApp-mmkv-storage" });

type StorageValue = string | number | boolean | object;

export const Storage = {
  set: (key: string, value: StorageValue): void => {
    if (typeof value === "object") {
      mmkvStorage.set(key, JSON.stringify(value));
    } else {
      mmkvStorage.set(key, value as string | number | boolean);
    }
  },

  getString: (key: string): string | undefined => {
    return mmkvStorage.getString(key);
  },

  getNumber: (key: string): number | undefined => {
    return mmkvStorage.getNumber(key);
  },

  getBoolean: (key: string): boolean | undefined => {
    return mmkvStorage.getBoolean(key);
  },

  getObject: <T>(key: string): T | null => {
    const value = mmkvStorage.getString(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },

  delete: (key: string): void => {
    mmkvStorage.remove(key);
  },

  clearAll: (): void => {
    mmkvStorage.clearAll();
  },

  getAllKeys: (): string[] => {
    return mmkvStorage.getAllKeys();
  },

  has: (key: string): boolean => {
    return mmkvStorage.contains(key);
  },
};

export const mmkvSecureStorage = createMMKV({
  id: "laughApp-secure-storage",
  encryptionKey: appConfig.LAUGH_APP_SECURE_ENCRYPTION_KEY,
});

export const SecureStorage = {
  setAccessToken: (token: string): void => {
    mmkvSecureStorage.set(MMKV_KEYS.ACCESS_TOKEN, token);
  },

  getAccessToken: (): string | undefined => {
    return mmkvSecureStorage.getString(MMKV_KEYS.ACCESS_TOKEN);
  },

  setRefreshToken: (token: string): void => {
    mmkvSecureStorage.set(MMKV_KEYS.REFRESH_TOKEN, token);
  },

  getRefreshToken: (): string | undefined => {
    return mmkvSecureStorage.getString(MMKV_KEYS.REFRESH_TOKEN);
  },

  clearTokens: (): void => {
    mmkvSecureStorage.remove(MMKV_KEYS.ACCESS_TOKEN);
    mmkvSecureStorage.remove(MMKV_KEYS.REFRESH_TOKEN);
  },

  clearAll: (): void => {
    mmkvSecureStorage.clearAll();
  },
};

export const MMKV_KEYS = {
  THEME_MODE: "theme_mode",
  AUTH_LOGGED_IN: "auth.loggedIn",
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  LANGUAGE: "language",
} as const;
