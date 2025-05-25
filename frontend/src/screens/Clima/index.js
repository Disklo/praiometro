import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import InfoSquare from '../../components/InfoSquare';
import InfoRectangle from '../../components/InfoRectangle';
import UVInfoRectangle from '../../components/UVInfoRectangle';

export default function Clima() {
    return (
        <ScrollView
            bounces={false}
            overScrollMode='never'
            contentContainerStyle={styles.container}
        >
            <View>
                <Text style={styles.headerText}>Niterói, Rio de Janeiro</Text>
                <Text style={styles.temperature}>29°</Text>
            </View>
            <View style={styles.infoContainer}>
                <InfoRectangle title="Clima" description="Tempestade" danger={true}>
                    <Ionicons name="thunderstorm" size={55} color="#015486" />
                </InfoRectangle>
                <View style={styles.squaresContainer}>
                    <InfoSquare title='Umidade' info='20%' description='Risco moderado, hidrate-se!'>
                        <Ionicons name="water-sharp" size={16} color="#015486" />
                    </InfoSquare>
                    <InfoSquare title='Sensação' info='28°' description='Hidrate-se e use boné!'>
                        <FontAwesome6 name="temperature-full" size={16} color="#015486" />
                    </InfoSquare>
                </View>
                <UVInfoRectangle/>
            </View>
        </ScrollView>
    );
}