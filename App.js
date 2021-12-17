import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";

function HomeScreen() {

 const [colorArray, setColorArray] = useState([]);  
 
 function addColor() {
  setColorArray([
    ...colorArray,
    {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
      id: `${colorArray.length}`,
    },
  ]);
}

 function renderItem({ item }) {
   return <BlockRGB red={item.red} green={item.green} blue={item.blue} />;
 } 

return (
  <View style={styles.container}>
    <TouchableOpacity
      style={{ height: 40, justifyContent: "center" }}
      onPress={addColor}
    >
      <Text style={{ color: "red" }}>Add colour</Text>
    </TouchableOpacity>
    <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />
  </View>
);

}

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Color List" component={HomeScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
 },
 list: {
   width: "100%",
 },
});
