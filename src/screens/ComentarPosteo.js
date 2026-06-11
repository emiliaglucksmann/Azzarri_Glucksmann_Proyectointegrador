import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";

function ComentarPosteo(props){

    const [comentario, setComentario] = useState("")
    const [comentarios, setComentarios] = useState([])

    const postId = props.route.params.id

    function guardarComentario(){

        db.collection('comments').add({
            postId: postId,
            email: auth.currentUser.email,
            comentario: comentario,
            createdAt: Date.now()
        })

        .then(() => {
            console.log("COMENTARIO GUARDADO")
            setComentario("")
        })

        .catch(error => console.log(error))
    }

    useEffect(() => {

        db.collection('comments').onSnapshot(docs => {

            let comentariosPost = []

            docs.forEach(doc => {

                if(doc.data().postId === postId){

                    comentariosPost.push({
                        id: doc.id,
                        data: doc.data()
                    })

                }

            })

            setComentarios(comentariosPost)

        })

    }, [])

    return(
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Comentar Posteo
            </Text>

            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='comentario'
                onChangeText={text => setComentario(text)}
                value={comentario}
            />
            
            <Pressable
                onPress={() => guardarComentario()}
                style={styles.boton}
            >
                <Text style={styles.textoBoton}>
                    Enviar
                </Text>
            </Pressable>

            <FlatList
                data={comentarios}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.data.email}</Text>
                        <Text>{item.data.comentario}</Text>
                    </View>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },

    titulo: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 10
    },

    input: {
        height: 20,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 10,
    },

    boton: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: 'center',
    },

    textoBoton: {
        textAlign: "center",
        fontSize: 18,
        color: '#fff',
        marginTop: 10,
        marginBottom: 10
    }
})

export default ComentarPosteo