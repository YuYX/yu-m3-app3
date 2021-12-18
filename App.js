import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
import { TouchableOpacity } from "react-native-gesture-handler";

function HomeScreen({ navigation }) {
  // 1. run when any component in the screen is updated
  // 2. run when the screen is rendered
  useEffect( () => {
     navigation.setOptions({
       headerRight: () => 
       <Button 
        onPress={addColor} 
        title="Add color"></Button>
     })
  });

 const [colorArray, setColorArray] = useState([]);

 //{item} refers to a single item we pass in
 // e.g. {item} =  {red: 255, green: 0, blue: 0, id: "0"} 
 function renderItem({ item }) {
    // route = {}
    // new_route = {...item} is the same as 
    // new_route = {red: 255, green: 0, blue: 0, id: "0"}

   return (
     <TouchableOpacity
       onPress={() => navigation.navigate("DetailsScreen", { ...item })}
     >
       <BlockRGB red={item.red} green={item.green} blue={item.blue} />
     </TouchableOpacity>
   );
 } 
 
 const numColumns = 4;

 function addColor() {
   //... dots means spread operator
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

 function reset(){
   setColorArray([]);
 } 

 return (
   <View style={styles.container}>
      {/* Reset Button
     <TouchableOpacity
       style={{ height: 40, justifyContent: "center" }}
       onPress={addColor}
     >
       <Text style={{ color: "red" }}>Add colour</Text>
     </TouchableOpacity>*/}

     <TouchableOpacity
       style={{ height: 40, justifyContent: "center" }}
       onPress={reset}
     >
       <Text style={{ color: "blue" }}>Reset</Text>
     </TouchableOpacity>

     <FlatList style={styles.list} 
      data={colorArray} 
      renderItem={renderItem}
      numColumns={numColumns}
      //keyExtractor
       />
   </View>
 );
}  

// route is a simple object
// route = {}
function DetailsScreen({ route }) {
 // Destructure this object so we don't have to type route.params.red etc
 
 // route = {params: {red: 255, blue: 0, green: 0}}
 // route.params = {red: 255, blue: 0, green: 0}
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

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator> 
       <Stack.Screen 
        name="Colour List" 
        component={HomeScreen} 
        options={ {
          title: 'Home', 
          } }
      /> 
       <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   width: "100%",
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center",
 },
 list: { 
   width: "100%",  
   borderColor: "red",
   borderWidth: 6
   ,
 },
 detailText: {
   fontSize: 24,
   marginBottom: 20,
 },
});
