import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";

function ComentarPosteo(props){

    const [comentario, setComentario] = useState("")
    const [comentarios, setComentarios] = useState([])

    const postId = props.route.params.id

    function onSubmit(){

        db.collection("comments")
        .add({
            postId: postId,
            owner: auth.currentUser.email,
            comentario: comentario,
            createdAt: Date.now()
        })
        .then(() => {
            setComentario("")
        })
        .catch(error => console.log(error))
    }

    useEffect(
        () => {
            db.collection("comments")
            .where("postId","==",postId)
            .onSnapshot(snapshot => {

                let comentariosDelPost = []

                snapshot.forEach(doc =>
                    comentariosDelPost.push({
                        id: doc.id,
                        datos: doc.data()
                    })
                )

                setComentarios(comentariosDelPost)
            })
        },
        []
    )

    return(
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Comentar Posteo
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Escribí un comentario"
                value={comentario}
                onChangeText={text => setComentario(text)}
            />

            <Pressable
                style={styles.boton}
                onPress={() => onSubmit()}
            >
                <Text style={styles.textoBoton}>
                    Enviar
                </Text>
            </Pressable>

            <FlatList
                data={comentarios}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                    <View>
                        <Text>{item.datos.owner}</Text>
                        <Text>{item.datos.comentario}</Text>
                    </View>
                }
            />

        </View>
    )
}

export default ComentarPosteo