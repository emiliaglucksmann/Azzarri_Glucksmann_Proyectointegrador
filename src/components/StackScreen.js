import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from '../screens/Home';
import ComentarPosteo from '../screens/ComentarPosteo';

//importar home y comentar

const Stack = createNativeStackNavigator();

function StackScreen(){
    return(
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name='ComentarPosteo' component={ComentarPosteo} options={{ headerShown: false }}/>
      </Stack.Navigator>
    )
}

export default StackScreen