import { View, Text, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import adaoeva from '../../../assets/images/praias/adaoeva.jpg';
import boaviagem from '../../../assets/images/praias/boaviagem.jpg';
import camboinhas from '../../../assets/images/praias/camboinhas.jpg';
import charitas from '../../../assets/images/praias/charitas.jpg';
import flechas from '../../../assets/images/praias/flechas.webp';
import gragoata from '../../../assets/images/praias/gragoata.jpg';
import icarai from '../../../assets/images/praias/icarai.webp';
import saofrancisco from '../../../assets/images/praias/saofrancisco.jpg';
import jurujuba from '../../../assets/images/praias/jurujuba.jpg';
import piratininga from '../../../assets/images/praias/piratininga.jpg';
import sossego from '../../../assets/images/praias/sossego.jpg';
import itaipu from '../../../assets/images/praias/itaipu.jpg';
import itacoatiara from '../../../assets/images/praias/itacoatiara.jpg';
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
import FeedbackModal from '../../components/FeedbackModal';
import { LinearGradient } from 'expo-linear-gradient';
import { formatHour } from '../../helpers/formatHour';
import { formatDate } from '../../helpers/formatdate';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function getBeachImage(beachName) {
    switch (beachName) {
        case "Praia de Eva":
            return adaoeva;
        case "Praia de Adão":
            return adaoeva;
        case "Praia de Camboinhas":
            return camboinhas;
        case "Praia de São Charitas":
            return charitas;
        case "Praia das Flechas":
            return flechas;
        case "Praia de Gragoatá":
            return gragoata;
        case "Praia de Boa Viagem":
            return boaviagem;
        case "Praia de Icaraí":
            return icarai;
        case "Praia de São Francisco":  
            return saofrancisco;
        case "Praia de Jurujuba":
            return jurujuba;
        case "Praia de Piratininga":
            return piratininga;
        case "Praia do Sossego":
            return sossego;
        case "Praia de Itaipu":
            return itaipu;
        case "Praia de Itacoatiara":
            return itacoatiara;
        default:
            return null; 
    }
}

function formatDateToDDMM(dateString) {
    const date = new Date(dateString);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}`;
}

export default function Praia() {
    const route = useRoute();
    const { id } = route.params;
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState(null);
    const [beach, setBeach] = useState(null);

    function openInMaps() {
        if (!beach?.coordenadas_terra_decimais) return;
        const [lat, lng] = beach.coordenadas_terra_decimais;
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        Linking.openURL(url);
    }

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
                <Text style={{ color: '#015486', fontSize: 18 }}>Carregando...</Text>
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
                <Text style={styles.locationText}>{beach.nome?.[0] || 'Praia'}</Text>
                <Text style={styles.specificLocationText}>{beach.specific_location?.[0] || ''}</Text>
            </View>
            <ScrollView 
                bounces={false}           
                overScrollMode='never'           
                contentContainerStyle={styles.scrollViewContainer}
            >
                <View style={{ position: 'relative', width: '100%', height: 200, marginBottom: 10 }}>
                    <Image
                        source={getBeachImage(beach.nome?.[0])}
                        style={{ width: '100%', height: 200 }}
                    />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.2)', 'transparent']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: 25,
                        }}
                    />
                    <LinearGradient
                        colors={['transparent', '#015486']}
                        style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 130,
                        }}
                    />
                </View>
                <InfoRectangle title="Qualidade da água do mar" description={beach.leitura_atual?.balneabilidade ? "Própria para banho!" : "Imprópria para banho!"}>
                    {beach.leitura_atual.balneabilidade
                        ? <Entypo name="emoji-happy" size={55} color="#015486" />
                        : <Entypo name="emoji-sad" size={55} color="#015486" />
                    }
                </InfoRectangle>
                <InfoRectangle title="Altura da onda" description={`${beach.leitura_atual?.wave_height ?? '-'} metros`} danger={beach.leitura_atual?.wave_height >= 2} safe={beach.leitura_atual?.wave_height < 2}>
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
                <FeedbackSection onPress={() => setModalVisible(true)}/>
                <TouchableOpacity
                    style={styles.mapsButton}
                    onPress={openInMaps}
                >
                    <View style={styles.mapsButtonContainer}>
                        <FontAwesome5 name="map-marked-alt" size={20} color="#015486" />
                        <Text style={styles.mapsButtonText}>
                            Ver no mapa
                        </Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.update}>
                    <MaterialCommunityIcons name="update" size={12} color="#e7e9edff" />{' '}
                    Atualizado dia {formatDate(beach.leitura_atual.timestamp)} às {formatHour(beach.leitura_atual.timestamp)}</Text>
                <FeedbackModal visible={modalVisible} onClose={() => setModalVisible(false)} beachName={beach.nome?.[0] || 'Praia'} />
            </ScrollView>
        </View>
    );
}