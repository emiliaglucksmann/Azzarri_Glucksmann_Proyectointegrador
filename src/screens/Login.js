import { auth } from '../firebase/config';
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useState, useEffect } from "react";

function Login(props){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [loginError, setLoginError] = useState("");

    function onSubmit(email, password){

        console.log("CLICK LOGIN");

        if(!email.includes("@")){
            setLoginError("Email mal formateado");
            alert("Email mal formateado");
            return;
        }

        if(password.length < 6){
            setLoginError("La password debe tener una longitud mínima de 6 caracteres");
            alert("La password debe tener una longitud mínima de 6 caracteres");
            return;
        }

        auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            console.log("LOGIN CORRECTO");
            setLogin(true);

            props.navigation.navigate("HomeMenue");
        })
        .catch(error => {
            console.log(error);
            alert(error.message);
        });
    }

    useEffect(
        () => {
            auth.onAuthStateChanged(
                user => {
                    if(user){
                        props.navigation.navigate("HomeMenue");
                    }
                }
            )
        },
        []
    )

    return(
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Login
            </Text>

            <Text style={styles.label}>
                Email
            </Text>

            <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder='Ingrese su email'
                onChangeText={text => setEmail(text)}
                value={email}
            />

            <Text style={styles.label}>
                Contraseña
            </Text>

            <TextInput
                style={styles.input}
                placeholder='Ingrese su contraseña'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />

            <Pressable style={styles.boton} onPress={() => onSubmit(email,password)}>
                <Text style={styles.textoBoton}>
                    Iniciar sesión
                </Text>
            </Pressable>

            <Pressable onPress={() => props.navigation.navigate("Registro")}>
                <Text style={styles.link}>
                    No tengo cuenta
                </Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        width:"100%",
        paddingHorizontal:10,
        marginTop:20
    },

    titulo:{
        fontSize:30,
        textAlign:"center",
        marginBottom:30
    },

    label:{
        fontSize:18,
        marginBottom:5,
        marginTop:10
    },

    input:{
        borderWidth:1,
        borderColor:"#ccc",
        padding:10,
        marginBottom:10
    },

    boton:{
        backgroundColor:"#8ecaf7",
        padding:15,
        alignItems:"center",
        marginTop:20
    },

    textoBoton:{
        fontSize:18,
        color:"#000"
    },

    link:{
        textAlign:"center",
        marginTop:15,
        fontSize:16
    }

});

export default Login;