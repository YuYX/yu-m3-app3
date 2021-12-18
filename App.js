import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack"; 

import NotesStack from "./screens/NoteStack"
import AddScreen from "./screens/AddScreen";

//const db = SQLite.openDatabase("notes.db"); 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen
          name="Notes Stack"
          component={NotesStack}
          options={{presentation:"modal", headerShown: false }}
        /> 
 
        <Stack.Screen name="Add Note" component={AddScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
 }
 

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#ffc",
   alignItems: "center",
   justifyContent: "center",
 },
});
