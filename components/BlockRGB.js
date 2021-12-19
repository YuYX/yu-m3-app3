import React from "react";
import { View, Text, Dimensions } from "react-native";

export default function BlockRGB(props) {
  // props have red, greed,blue
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 4;
  const tileSize = screenWidth / numColumns;
   
 return (
   <View
     style={{
       backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
       padding: 30,
       width: tileSize,//"100%",
       height: tileSize,
     }}
   ></View>
 );
}
