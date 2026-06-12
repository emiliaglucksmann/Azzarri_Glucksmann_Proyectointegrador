import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { db, auth } from "../firebase/config";

function CrearPosteo(props){

    const [descripcion, setDescripcion] = useState("")

    function onSubmit(){

        db.collection("posts")
        .add({
            descripcion: descripcion,
            email: auth.currentUser.email,
            createdAt: Date.now(),
            likes: []
        })
        .then(() => {
            console.log("POST GUARDADO")
            setDescripcion("")
        })
        .catch(error => console.log(error))
    }

    useEffect(
        () => {
            auth.onAuthStateChanged(
                user => {
                    if (!user) {
                        props.navigation.navigate("Login")
                    }
                }
            )
        },
        []
    )

    return(
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Crear nuevo post
            </Text>

            <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Escribe aquí tu comentario..."
                value={descripcion}
                onChangeText={(text) => setDescripcion(text)}
            />

            <Pressable style={styles.boton} onPress={() => onSubmit()}>
                <Text style={styles.textoBoton}> Publicar post </Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
        marginTop:20
    },

    titulo:{
        fontSize:30,
        textAlign:"center",
        marginBottom:20
    },

    input:{
        height:80,
        borderWidth:1,
        borderColor:"#ccc",
        marginBottom:20
    },

    boton:{
        backgroundColor:"#28a745",
        padding:10,
        alignItems:"center"
    },

    textoBoton:{
        color:"#fff",
        fontSize:18
    }
})

export default CrearPosteo