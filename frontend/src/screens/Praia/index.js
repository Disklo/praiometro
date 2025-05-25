import { View, Text, ScrollView } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from './styles';
import InfoRectangle from '../../components/InfoRectangle';
import SmallInfoRectangle from '../../components/SmallInfoRectangle';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function Praia() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Praia de Piratininga</Text>
                <Text style={styles.dateText}>29 de abril de 2025</Text>
                <FontAwesome5 name="umbrella-beach" size={100} color="#FAFAFA" style={{marginTop: 16}}/>
            </View>
            <ScrollView 
                bounces={false}           
                overScrollMode='never'           
                contentContainerStyle={styles.scrollViewContainer}
            >
                <InfoRectangle title="Qualidade da água do mar" description="Própria para banho!" danger={false}>
                    <Entypo name="emoji-happy" size={55} color="#015486" />
                </InfoRectangle>
                <InfoRectangle title="Altura da onda" description="1,5 metros" danger={true}>
                    <MaterialIcons name="waves" size={55} color="#015486"/>
                </InfoRectangle>
                <View style={styles.smallInfoRectanglesContainer}>
                    <SmallInfoRectangle title="Período das ondas" description="9.2s">
                        <Ionicons name="timer" size={55} color="#015486" />
                    </SmallInfoRectangle>
                    <SmallInfoRectangle title="Vento" description="10km/h">
                        <Feather name="wind" size={55} color="#015486" />
                    </SmallInfoRectangle>
                </View>
            </ScrollView>
        </View>
    )
}