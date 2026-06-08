import { View, Text, Pressable, StyleSheet } from "react-native";
import { auth } from "../firebase/config";

function Profile(props){

    function logout(){
        auth.signOut()
        .then(() => {
            props.navigation.navigate("Login")
        })
        .catch(error => console.log(error))
    }

    function logout(){
        auth.signOut()
        props.navigation.navigate("Login")
    }    

    return(
        <View style={styles.container}>
            <Text style={styles.nombre}>{auth.currentUser.userName}</Text>

            <Text style={styles.email}>
                {auth.currentUser.email}
            </Text>

            <Text style={styles.titulo}>Últimos posteos</Text>

            <View style={styles.post}>
                <Text>Lorem ipsum lorem ipsum</Text>

                <Pressable style={styles.botonEliminar}>
                    <Text style={styles.textoBoton}>Eliminar</Text>
                </Pressable>
            </View>

            <View style={styles.post}>
                <Text>Lorem ipsum lorem ipsum</Text>

                <Pressable style={styles.botonEliminar}>
                    <Text style={styles.textoBoton}>Eliminar</Text>
                </Pressable>
            </View>

            <View style={styles.post}>
                <Text>Lorem ipsum lorem ipsum</Text>

                <Pressable style={styles.botonEliminar}>
                    <Text style={styles.textoBoton}>Eliminar</Text>
                </Pressable>
            </View>

            <Pressable style={styles.botonLogout} onPress={() => logout()}>
                <Text style={styles.textoBoton}>Cerrar sesión</Text>
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

    botonEliminar:{
        backgroundColor:"pink",
        padding:10,
        marginTop:10,
        alignItems:"center"
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

export default Profile