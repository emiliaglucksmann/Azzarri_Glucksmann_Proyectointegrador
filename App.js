import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from './src/Registro';
import Login from './src/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={ styles.container }>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }}/>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
