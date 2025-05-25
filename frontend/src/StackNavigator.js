import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Praias from './screens/Praias';
import Clima from './screens/Clima';
import Praia from './screens/Praia';
import CustomHeader from './components/CustomHeader';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={{header: (props) => <CustomHeader {...props} />,}}>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='Praias' component={Praias} />
                <Stack.Screen name='Clima' component={Clima} />
                <Stack.Screen name='Praia' component={Praia} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}