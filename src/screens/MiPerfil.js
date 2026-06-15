import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../firebase/config";
import { useState, useEffect } from "react";
import Likes from "./Likes";

function MiPerfil(props){

    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState("")

useEffect(() => {

    db.collection("posts")
    .where("email", "==", auth.currentUser.email)
    .onSnapshot(docs => {

        let posteos = [];

        docs.forEach(doc => {
            posteos.push({
                id: doc.id,
                data: doc.data()
            })
        })

        setPosts(posteos)
    })

    db.collection("users")
    .where("email", "==", auth.currentUser.email)
    .onSnapshot(docs => {

        docs.forEach(doc => {
            setUserName(doc.data().userName)
        })

    })

}, [])

   function logout(){
        auth.signOut()
        props.navigation.navigate("Login")
    }

    return(
        <View style={styles.container}>

            <Text style={styles.nombre}>
                {userName}
            </Text>

            <Text style={styles.email}>
                {auth.currentUser.email}
            </Text>

            <Text style={styles.titulo}>Mis posteos</Text>

          <FlatList 
            data={posts} 
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <Likes
            datos={item.data}
            id={item.id}
            navigation={props.navigation}/>
    )}
/>

            <Pressable
                style={styles.botonLogout}
                onPress={logout}
            >
                <Text style={styles.textoBoton}>
                    Cerrar sesión
                </Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },

    nombre:{
        fontSize:28,
        marginTop:20
    },

    email:{
        fontSize:16,
        marginBottom:30
    },

    titulo:{
        fontSize:24,
        marginBottom:20
    },

    post:{
        borderWidth:1,
        borderRadius:10,
        padding:15,
        marginBottom:20
    },

    botonLogout:{
        backgroundColor:"pink",
        padding:15,
        marginTop:30,
        alignItems:"center"
    },

    textoBoton:{
        fontSize:16
    }
})

export default MiPerfil;