import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Home from './screens/Home';
import Praias from './screens/Praias';
import Praia from './screens/Praia';
import Clima from './screens/Clima';
import CustomHeader from './components/CustomHeader';
import SobreNos from './screens/SobreNos';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const PraiasStack = createNativeStackNavigator();

function PraiasStackScreen() {
  return (
    <PraiasStack.Navigator>
      <PraiasStack.Screen
        name="Praias"
        component={Praias}
        options={{
          headerShown: false,
        }}
      />
      <PraiasStack.Screen
        name="Praia"
        component={Praia}
        options={{
          headerShown: false,
        }}
      />
    </PraiasStack.Navigator>
  );
}

function MainTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: (props) => <CustomHeader {...props} />,
        tabBarStyle: { backgroundColor: '#015486', height: 60 + insets.bottom, paddingTop: 10, borderColor: '#015486' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#98A4AE',
        tabBarShowLabel: false,
        tabBarIcon: ({ color }) => {
          if (route.name === 'Home') {
            return <Entypo name="home" size={26} color={color} />;
          } else if (route.name === 'Praias') {
            return <FontAwesome6 name="umbrella-beach" size={26} color={color} />;
          } else if (route.name === 'Clima') {
            return <FontAwesome5 name="cloud-sun" size={24} color={color} />;
          } else if (route.name === 'SobreNos') {
            return <Entypo name="light-bulb" size={26} color={color} />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Praias' component={PraiasStackScreen} />
      <Tab.Screen name='Clima' component={Clima} />
      <Tab.Screen name='SobreNos' component={SobreNos} />
    </Tab.Navigator>
  );
}

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}