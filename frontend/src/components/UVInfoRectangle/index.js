import { View, Text } from 'react-native';
import styles from './styles';
import Octicons from '@expo/vector-icons/Octicons';

export default function UVInfoRectangle({uvIndex, uvLevel, uvRecommentadions}) {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Octicons name="sun" size={16} color="#015486" />
            <Text style={styles.headerText}>Índice UV</Text>
        </View>
        <View style={styles.infoContainer}>
            <View style={styles.uvContainer}>
                <Text style={styles.uvNumber}>{uvIndex}</Text>
                <Text style={styles.uvScale}>{uvLevel}</Text>
            </View>
            <View style={styles.recommendationsContainer}>
                <Text style={styles.recommendationsText}>{uvRecommentadions}</Text>
            </View>
        </View>
    </View>
  );
}