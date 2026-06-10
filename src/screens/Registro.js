import { auth, db } from "../firebase/config";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useEffect, useState } from "react";

function Registro (props){

    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [register, setRegister] = useState(false)

    function onSubmit(email, password){
        console.log("CLICK REGISTER")
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            console.log("USUARIO CREADO")
            db.collection('users').add({
                email: email,
                userName: userName,
                createdAt: Date.now()
            })
            .then(() => {
                console.log("DOCUMENTO GUARDADO")
                setRegister(true)
                props.navigation.navigate("Login")
            })
            .catch(error => {
                console.log("ERROR FIRESTORE", error)
            })
        })
        .catch(error => {
            console.log(error)
            alert(error)
        })
    }

    useEffect(
        () => {
            auth.onAuthStateChanged(
                user => {
                    if (user) {
                        props.navigation.navigate("Login")
                    }
                }
            )
        },
        []
    )

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.titulo}>Registro</Text>

                <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => setEmail(text)}
                    value={email}
                />

                <TextInput
                    style={styles.input}
                    placeholder="userName"
                    onChangeText={text => setUserName(text)}
                    value={userName}
                />

                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password}
                />

                <Pressable onPress={() => onSubmit(email, password)} style={styles.boton}>
                    <Text style={styles.textoBoton}>Registrate</Text>
                </Pressable>
            </View>

            <View>
                <Pressable style={styles.botonLogin} onPress={() => props.navigation.navigate("Login")}>
                    <Text style={styles.textoBoton}>Ya tengo cuenta</Text>
                </Pressable>
            </View>

            <View style={styles.textoBotonContenedor}>
                <Text style={styles.textoRegistro}>Email: {email}</Text>
                <Text style={styles.textoRegistro}>Username: {userName}</Text>
                <Text style={styles.textoRegistro}>Password: {password}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 20,
},
    titulo: {
        fontSize: 30,
        textAlign: "center"
    },

    input: {
        height: 20,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 10,
    },

    botonLogin: {
        backgroundColor: '#28a745',
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#28a745',
        marginTop: 10
    },

    boton: {
        backgroundColor: '#28a745',
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#28a745',
    },

    textoBoton: {
        textAlign: "center",
        fontSize: 18,
        color: '#fff',
        marginTop: 10,
        marginBottom: 10
    },

    textoRegistro: {
        textAlign: "left",
        fontSize: 18,
        color: '#181818',
        marginTop: 10,
        marginBottom: 10
    }
})

export default Registro