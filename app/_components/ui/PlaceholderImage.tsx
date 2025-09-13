import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  text?: string;
  style?: any;
}

export default function PlaceholderImage({
  width = 300,
  height = 200,
  text = "Event Image",
  style,
}: PlaceholderImageProps) {
  // Extract dimensions from style if provided
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const finalWidth = flattenedStyle.width || width;
  const finalHeight = flattenedStyle.height || height;

  return (
    <View
      style={[
        styles.placeholder,
        { width: finalWidth, height: finalHeight },
        style,
      ]}
    >
      <Text style={styles.placeholderText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: "rgba(78, 205, 196, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(78, 205, 196, 0.3)",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  placeholderText: {
    color: "#4ECDC4",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
