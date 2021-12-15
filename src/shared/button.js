import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default function FlatButton({
  text,
  onPress,
  backgroundColor,
  color,
  width,
  disabled,
}) {
  const styles = StyleSheet.create({
    button: {
      margin: 5,
      borderRadius: 8,
      paddingHorizontal: 32,
      paddingVertical: 8,
      backgroundColor: backgroundColor,
      width: width,
    },
    buttonText: {
      color: color,
      fontFamily: "NanumSquareRoundB",
      fontSize: 20,
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
