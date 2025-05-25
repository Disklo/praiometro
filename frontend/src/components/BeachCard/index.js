import styles from './styles';
import { Pressable, Text, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function BeachCard({beachName, especificLocation = 'Sem localização específica', id, navigation}) {
    return (
        <Pressable 
            onPress={() => navigation.navigate('Praia', {id: id})} 
            style={({ pressed }) => [
                styles.container,
                pressed ? { opacity: 0.8 } : null
            ]}
        >
            <FontAwesome6 name="location-dot" size={25} color="#015486" />
            <View style={styles.textContainer}>
                <Text style={styles.beachName}>{beachName}</Text>
                <Text style={styles.especificLocation}>{especificLocation}</Text>  
            </View> 
        </Pressable>
    );
}