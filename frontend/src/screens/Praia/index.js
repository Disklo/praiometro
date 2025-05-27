import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from './styles';
import InfoRectangle from '../../components/InfoRectangle';
import SmallInfoRectangle from '../../components/SmallInfoRectangle';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import FeedbackSection from '../../components/FeedbackSection';

export default function Praia() {
    const route = useRoute();
    const { id } = route.params;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [beach, setBeach] = useState(null);

    useEffect(() => {
        const fetchBeach = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.get(`/pontos/${id}`);
                setBeach(response.data);
            } catch (error) {
                console.error('Erro ao buscar praia:', error);
                setError('Erro ao tentar carregar a praia...');
            } finally {
                setLoading(false);
            }
        };
        fetchBeach();
    }, [id]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#FAFAFA" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#FAFAFA', fontSize: 18 }}>{error}</Text>
                <Text style={{ color: '#FAFAFA', fontSize: 18 }}>Tente novamente mais tarde!</Text>
                <Fontisto style={{marginTop: 20}} name="beach-slipper" size={100} color="#FAFAFA" />
            </View>
        );
    }

    if (!beach) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.locationText}>{beach.nomes?.[0] || 'Praia'}</Text>
                <Text style={styles.specificLocationText}>{beach.specific_location?.[0] || ''}</Text>
            </View>
            <ScrollView 
                bounces={false}           
                overScrollMode='never'           
                contentContainerStyle={styles.scrollViewContainer}
            >
                <FontAwesome5 name="umbrella-beach" size={100} color="#FAFAFA" style={{marginBottom: 12}}/>
                <InfoRectangle title="Qualidade da água do mar" description={beach.balneabilidade ? "Própria para banho!" : "Imprópria para banho!"}>
                    {beach.balneabilidade
                        ? <Entypo name="emoji-happy" size={55} color="#015486" />
                        : <Entypo name="emoji-sad" size={55} color="#015486" />
                    }
                </InfoRectangle>
                <InfoRectangle title="Altura da onda" description={`${beach.leitura_atual?.wave_height ?? '-'} metros`} danger={beach.leitura_atual?.wave_height > 2}>
                    <MaterialIcons name="waves" size={55} color="#015486"/>
                </InfoRectangle>
                <View style={styles.smallInfoRectanglesContainer}>
                    <SmallInfoRectangle title="Período das ondas" description={`${beach.leitura_atual?.wave_period ?? '-'}s`}>
                        <Ionicons name="timer" size={55} color="#015486" />
                    </SmallInfoRectangle>
                    <SmallInfoRectangle title="Vento" description={`${beach.leitura_atual?.wind_speed_10m ?? '-'}km/h`}>
                        <Feather name="wind" size={55} color="#015486" />
                    </SmallInfoRectangle>
                </View>
                <FeedbackSection/>
                
            </ScrollView>
        </View>
    );
}