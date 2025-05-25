import styles from './styles';
import { Text, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function BeachCard() {
    return (
        <View style={styles.container}>
            <FontAwesome6 name="location-dot" size={25} color="#015486" />
            <View style={styles.textContainer}>
                <Text style={styles.beachTitle}>Praia de Piratininga</Text>
                <Text style={styles.location}>Niterói, Rio de Janeiro</Text>  
            </View>
        </View>
    );
}