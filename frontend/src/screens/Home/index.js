import { View, Text } from 'react-native';
import styles from './styles';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useEffect, useState } from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { api } from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import HomeHeader from '../../components/HomeHeader';

MapLibreGL.setAccessToken(null);

export default function Home() {
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
                <Fontisto style={{marginTop: 20}} name="beach-slipper" size={100} color="#FAFAFA" />
            </View>
        );
    }

    if (!beaches) {
        return null;
    }

return (
    <View style={styles.container}>
        <HomeHeader />
        <MapLibreGL.MapView
            style={styles.map}
            styleURL="https://tiles.openfreemap.org/styles/osm-bright/style.json"
        >
            <MapLibreGL.Camera
                centerCoordinate={[-43.112033, -22.907484]}
                zoomLevel={11}
            />
            {beaches.map((beach) =>
                beach.coordenadas_terra && beach.coordenadas_terra.length === 2 ? (
                    <MapLibreGL.PointAnnotation
                        key={beach.codigo}
                        id={beach.codigo}
                        coordinate={[beach.coordenadas_terra[1], beach.coordenadas_terra[0]]}
                        title={beach.nome?.[0] || 'Praia'}
                    >
                        <Entypo name="location-pin" size={32} color="#2ea5e4" />
                        <MapLibreGL.Callout
                            title={beach.nome?.[0] || 'Praia'}
                            onPress={() => navigation.navigate('Praias', {
                                screen: 'Praia',
                                params: { id: beach.codigo }
                            })}
                        />
                    </MapLibreGL.PointAnnotation>
                ) : null
            )}
        </MapLibreGL.MapView>
    </View>
);
}