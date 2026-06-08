import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//importar home y comentar

const Stack = createNativeStackNavigator();

function StackScreen(){
    return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name='ComentarPosteo' component={ComentarPosteo} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
}