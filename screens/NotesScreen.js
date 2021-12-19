import React, { useState, useEffect } from "react";
import {
 StyleSheet,
 Text,
 View,
 TouchableOpacity,
 FlatList,
} from "react-native";

import { Entypo, Ionicons } from '@expo/vector-icons';  

import * as FileSystem from "expo-file-system";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("notes.db");
console.log(FileSystem.documentDirectory); 

export default function NotesScreen({ navigation, route }) {
 const [notes, setNotes] = useState([]);

  function refreshNotes() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes",
        null,
        (txObj,{ rows: { _array } }) => setNotes(_array),
        (txObj,error) => console.log("Error ",error)
      );
    });
  }

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity onPress={addNote}>
  //         <Entypo
  //           name="new-message"
  //           size={24}
  //           color="black"
  //           style={{ marginRight: 20 }}
  //         />
  //       </TouchableOpacity>
  //     ),
  //   });
  // });
  
  // This is to set up the database on first run
 useEffect(() => {
    db.transaction((tx) =>{
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS
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
 
 // Monitor route.params for changes and add items to the database
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
    
    //Needed to take out this? then cannot update the note inputted.
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

 // This deletes an individual note
 function deleteNote(id) {
  console.log("Deleting " + id);
  db.transaction(
    (tx) => {
      tx.executeSql(`DELETE FROM notes WHERE id=${id}`);
    },
    null,
    refreshNotes
  );
}

 // The function to render each row in our FlatList
 function renderItem({ item }) {
   return (
     <View
       style={{
         padding: 10,
         paddingTop: 20,
         paddingBottom: 20,
         borderBottomColor: "#ccc",
         borderBottomWidth: 1,
         flexDirection: "row",
         justifyContent: "space-between",
       }}
     >
       <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
       <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>

     </View>
   );
 }

 return (
   <View style={styles.container}>
     <FlatList
       style={{ width: "100%" }}
       data={notes}
       renderItem={renderItem}
       keyExtractor={( item ) => item.id.toString()}
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

