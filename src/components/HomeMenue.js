//tab: StackScreen con home y comentaer
// crear posteo y perfil
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// agregar import post y perfil stackscreen
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Tab = createBottomTabNavigator();
function HomeMenue (){
    return(
            <Tab.Navigator>
                <Tab.Screen name="StackScreen" component={ StackScreen } options={{ 
                    headerShown: false,
                    tabBarIcon: () => (
                        <AntDesign name="home" size={24} color="black" />
                    )
                }}/>
                <Tab.Screen name="Posteo" component={ Posteo }    options={{ 
                    headerShown: false,
                    tabBarIcon: () => (
                        <MaterialIcons name="post-add" size={24} color="black" />
                    )
                }}/>
                <Tab.Screen name="Perfil" component={ Perfil } options={{ 
                    headerShown: false,
                    tabBarIcon: () => (
                       <AntDesign name="user" size={24} color="black" />
                    )
                }}/>
            </Tab.Navigator>
    )
}

export default HomeMenue