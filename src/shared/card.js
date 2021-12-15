import React from "react";
import { StyleSheet, View } from "react-native";
import { globalStyles, globalDesign } from "../shared/globalStyles";

export default function Card(props) {
  const styles = StyleSheet.create({
    card: {
      borderRadius: 6,
      elevation: 3,
      backgroundColor: globalDesign.light,
      shadowOffset: { width: 2, height: 2 },
      shadowColor: "#333",
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 4,
      marginVertical: 8,
      marginTop: 12,
      paddingVertical: 10,
      width: globalDesign.width * 0.9,
    },
    cardComponent: {
      color: globalDesign.light,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.cardComponent}>{props.children}</View>
    </View>
  );
}
