import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import CrearPosteo from "./CrearPosteo";
import Likes from "./Likes";

function Home (){
    const [posts, setPosts] = useState([])
    
   useEffect(() => {
    db.collection('posts').onSnapshot(docs => {
        let posts = []

        docs.forEach(doc => {
            posts.push({
                id: doc.id,
                data: doc.data()
            })
        })
        
        setPosts(posts)
    })
}, [])
    return(
    
    <View style={styles.container}>
        <View>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Likes datos={item.data} id={item.id}/>
                )}
            />
        </View>
    </View>
    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    titulo: {
        fontSize: 100,
        fontWeight: "bold",
    }
})
export default Home