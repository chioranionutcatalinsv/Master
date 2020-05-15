import * as SecureStore from "expo-secure-store";

export const saveData = async (STORAGE_KEY, data) => {
  SecureStore.setItemAsync(STORAGE_KEY, data);
};

export const loadData = async (STORAGE_KEY) => {
  return SecureStore.getItemAsync(STORAGE_KEY);
};
