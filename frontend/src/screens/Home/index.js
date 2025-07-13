import { View, Text, Image } from 'react-native';
import styles from './styles';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { api } from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import HomeHeader from '../../components/HomeHeader';

export default function Home() {
    const markerImg = require('../../../assets/images/marcador.png');
    const markerPeqImg = require('../../../assets/images/marcador_peq.png');
    const [zoomLevel, setZoomLevel] = useState(0.15);
    const [beaches, setBeaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

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
            {beaches.map((beach) =>
                beach.coordenadas_terra && beach.coordenadas_terra.length === 2 ? (
                    <Marker
                        key={`${beach.codigo}-${zoomLevel < 0.05 ? 'large' : 'small'}`}
                        coordinate={{
                            latitude: beach.coordenadas_terra[0],
                            longitude: beach.coordenadas_terra[1],
                        }}
                        anchor={{ x: 0.5, y: 1 }}
                        onPress={() => navigation.navigate('Praias', {
                            screen: 'Praia',
                            params: { id: beach.codigo }
                        })}
                        image={zoomLevel < 0.05 ? markerImg : markerPeqImg}
                    />
                ) : null
            )}
        </MapView>
    </View>
);
}