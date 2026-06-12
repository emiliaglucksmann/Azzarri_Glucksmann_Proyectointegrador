import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

function ComentarPosteo(props){

    const [comentario, setComentario] = useState("")
    const [comentarios, setComentarios] = useState([])

    function guardarComentario(){

        db.collection('posts').doc(props.route.params.id).update({
            comentario: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                comentario: comentario
            })
        })

        .then(() => {
            console.log("COMENTARIO GUARDADO")
            setComentario("")
        })

        .catch(error => console.log(error))
    }

    useEffect(() => {

        db.collection('posts').onSnapshot(docs => {

            let comentariosPost = []

            docs.forEach(doc => {

                if(doc.id === props.route.params.id){

                    comentariosPost={
                        id: doc.id,
                        data: doc.data()
                    }

                }

            })

            setComentarios(comentariosPost)
            console.log(comentarios)

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
            {comentarios.data?
            <FlatList
                data={comentarios.data.comentario}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.owner}</Text>
                        <Text>{item.comentario}</Text>
                    </View>
                )}
            /> : <Text>No hay comentarios</Text>
            }

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