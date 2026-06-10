import { View, Text, StyleSheet, Pressable } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

function Likes(props){
    
    function Like(){
        db.collection("posts")
        .doc(props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => console.log("LIKE AGREGADO"))
        .catch(err => console.log(err))
    }

    function QuitarLike(){
        db.collection("posts")
        .doc(props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => console.log("LIKE QUITADO"))
        .catch(err => console.log(err))
    }

let boton = "";

if(props.datos.likes.includes(auth.currentUser.email)){
    boton = (
        <Pressable onPress={QuitarLike} style={styles.boton}>
            <Text style={styles.textoBoton}>Quitar Like</Text>
        </Pressable>
    )
} else {
    boton = (
        <Pressable onPress={Like} style={styles.boton}>
            <Text style={styles.textoBoton}>Like</Text>
        </Pressable>
    )
}

    return(
        <View style={styles.card}>
            <Text style={styles.comentario}>{props.datos.descripcion}</Text>
            <Text style={styles.email}>{props.datos.email}</Text>

             <Text style={styles.likes}>
                ❤️ Likes: {props.datos.likes.length}
            </Text>

            <View>
                {boton}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 5,
    },

    comentario: {
        fontSize: 18,
        marginBottom: 5,
    },

    email: {
        fontSize: 14,
        color: "gray",
    },
    likes: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold"
},

boton: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5
},

textoBoton: {
    color: "#fff",
    fontSize: 16
}
})

export default Likes