import { Button } from '@react-navigation/elements';
import {View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="Ir para Praias" onPress={() => navigation.navigate('Praias')}>
                Ir para Praias
            </Button>
        </View>
    );
}