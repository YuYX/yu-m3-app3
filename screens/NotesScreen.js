import React, { useState, useEffect } from "react";
import {
 StyleSheet,
 Text,
 View,
 TouchableOpacity,
 FlatList,
} from "react-native";

import { Entypo } from '@expo/vector-icons';

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("notes.db");

export default function NotesScreen({ navigation, route }) {
 const [notes, setNotes] = useState([]);

  function refreshNotes(){
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes",
        null,
        (txObj,{ rows: { _array } }) => setNotes(_array),
        (txObj,error) => console.log("Error ",error)
      );
    });
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Entypo
            name="new-message"
            size={24}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  });
 
//2nd useEffect
 useEffect(() => {
    db.transaction((tx) =>{
      tx.executeSql(
        `CREATE TABLE IF NOT EXIST
        notes
        (id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT,
        done INT);`
      );
    },
    null,
    refreshNotes
    );
 },[]) 

 // 3nd useEffect
 useEffect(() => {
  if (route.params?.text) {
    db.transaction(
      (tx) => {
      tx.executeSql("INSERT INTO notes (done, value) VALUES (0, ?)", [
        route.params.text,
      ]);
    },
    null,
    refreshNotes
    );

    const newNote = {
      title: route.params.text,
      done: false,
      id: notes.length.toString(),
    };
    setNotes([...notes, newNote]);
  }
}, [route.params?.text]);


 function addNote() {
   navigation.navigate("Add Note");
 }

 function renderItem({ item }) {
   return (
     <View
       style={{
         padding: 10,
         paddingTop: 20,
         paddingBottom: 20,
         borderBottomColor: "#ccc",
         borderBottomWidth: 1,
       }}
     >
       <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
     </View>
   );
 }

 return (
   <View style={styles.container}>
     <FlatList
       style={{ width: "100%" }}
       data={notes}
       renderItem={renderItem}
     />
   </View>
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

