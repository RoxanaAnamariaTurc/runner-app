import { Linking } from "react-native";

const openLink = (url: string): void => {
  Linking.openURL(url);
};

export default openLink;
