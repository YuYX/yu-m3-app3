
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//Later will add...
export default function DetailsScreen({ route }) {
    // Destructure this object so we don't have to type route.params.red etc
    const { red, green, blue } = route.params;
   
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
        ]}
      >
        <View style={{ padding: 30 }}>
          <Text style={styles.detailText}>Red: {red}</Text>
          <Text style={styles.detailText}>Green: {green}</Text>
          <Text style={styles.detailText}>Blue: {blue}</Text>
        </View>
      </View>
    );
   }
   
   const Stack = createStackNavigator();

   
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    }, 
   });