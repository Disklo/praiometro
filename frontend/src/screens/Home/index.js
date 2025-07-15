import { View, Text, Image, Platform, Dimensions } from 'react-native';
import styles from './styles';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { api } from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import HomeHeader from '../../components/HomeHeader';

export default function Home() {
    const markerPeqImg = require('../../../assets/images/marcadores/marcador_peq.png');
    const markerImages = {
        'AD000': require('../../../assets/images/marcadores/AD000.png'),
        'BV001': require('../../../assets/images/marcadores/BV001.png'),
        'CH000': require('../../../assets/images/marcadores/CH000.png'),
        'CH001': require('../../../assets/images/marcadores/CH001.png'),
        'CH002': require('../../../assets/images/marcadores/CH002.png'),
        'CM000': require('../../../assets/images/marcadores/CM000.png'),
        'CM001': require('../../../assets/images/marcadores/CM001.png'),
        'EA000': require('../../../assets/images/marcadores/EA000.png'),
        'FC000': require('../../../assets/images/marcadores/FC000.png'),
        'FC001': require('../../../assets/images/marcadores/FC001.png'),
        'GR000': require('../../../assets/images/marcadores/GR000.png'),
        'IA000': require('../../../assets/images/marcadores/IA000.png'),
        'IA001': require('../../../assets/images/marcadores/IA001.png'),
        'IC00': require('../../../assets/images/marcadores/IC00.png'),
        'IC001': require('../../../assets/images/marcadores/IC001.png'),
        'IC002': require('../../../assets/images/marcadores/IC002.png'),
        'IC003': require('../../../assets/images/marcadores/IC003.png'),
        'II000': require('../../../assets/images/marcadores/II000.png'),
        'II001': require('../../../assets/images/marcadores/II001.png'),
        'JR000': require('../../../assets/images/marcadores/JR000.png'),
        'JR001': require('../../../assets/images/marcadores/JR001.png'),
        'PR000': require('../../../assets/images/marcadores/PR000.png'),
        'PR001': require('../../../assets/images/marcadores/PR001.png'),
        'PR002': require('../../../assets/images/marcadores/PR002.png'),
        'PR003': require('../../../assets/images/marcadores/PR003.png'),
        'SF000': require('../../../assets/images/marcadores/SF000.png'),
        'SF001': require('../../../assets/images/marcadores/SF001.png'),
        'SF002': require('../../../assets/images/marcadores/SF002.png'),
        'SG000': require('../../../assets/images/marcadores/SG000.png'),
    };

    const [zoomLevel, setZoomLevel] = useState(0.15);
    const [beaches, setBeaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    // Obter dimensões da tela para calcular tamanhos proporcionais
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    
    // Calcular tamanhos dos marcadores baseados na tela
    const getMarkerSize = (isLarge) => {
        const baseWidth = screenWidth * 0.08; // 8% da largura da tela
        const baseHeight = screenHeight * 0.04; // 4% da altura da tela
        
        if (isLarge) {
            return {
                width: baseWidth * 1.5,
                height: baseHeight * 1.5
            };
        } else {
            return {
                width: baseWidth * 0.7,
                height: baseHeight * 0.7
            };
        }
    };

    useEffect(() => {
        const fetchBeaches = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.get('/pontos');
                setBeaches(response.data.pontos);
            } catch (error) {
                setError('Erro ao buscar praias');
            } finally {
                setLoading(false);
            }
        };
        fetchBeaches();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <Text style={{ color: '#015486', marginTop: 16 }}>Carregando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <Text style={{ color: '#FAFAFA', fontSize: 18, textAlign: 'center' }}>{error}</Text>
                <Text style={{ color: '#FAFAFA', fontSize: 16 }}>Tente novamente mais tarde!</Text>
            </View>
        );
    }

    if (!beaches) {
        return null;
    }

    return (
        <View style={styles.container}>
            <HomeHeader />
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -22.907484,
                    longitude: -43.112033,
                    latitudeDelta: 0.15,
                    longitudeDelta: 0.15,
                }}
                onRegionChangeComplete={(region) => {
                    setZoomLevel(region.latitudeDelta);
                }}>
                {beaches.map((beach) => {
                    if (!beach.coordenadas_terra || beach.coordenadas_terra.length !== 2) {
                        return null;
                    }

                    const isLargeMarker = zoomLevel < 0.05;
                    const markerSize = getMarkerSize(isLargeMarker);

                    return (
                        <Marker
                            key={`${beach.codigo}-${isLargeMarker ? 'large' : 'small'}`}
                            coordinate={{
                                latitude: beach.coordenadas_terra[0],
                                longitude: beach.coordenadas_terra[1],
                            }}
                            anchor={{ x: 0.5, y: 1 }}
                            onPress={() => navigation.navigate('Praias', {
                                screen: 'Praia',
                                params: { id: beach.codigo }
                            })}
                        >
                            <Image
                                source={isLargeMarker ? markerImages[beach.codigo] : markerPeqImg}
                                style={{
                                    width: markerSize.width,
                                    height: markerSize.height,
                                    resizeMode: 'contain'
                                }}
                            />
                        </Marker>
                    );
                })}
            </MapView>
        </View>
    );
}