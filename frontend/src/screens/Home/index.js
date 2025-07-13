import { View, Text, Image } from 'react-native';
import styles from './styles';
import Fontisto from '@expo/vector-icons/Fontisto';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
import { useEffect, useState } from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import Entypo from '@expo/vector-icons/Entypo';
import { api } from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import HomeHeader from '../../components/HomeHeader';

export default function Home() {
    const [zoomLevel, setZoomLevel] = useState(0.15);
    const [location, setLocation] = useState(null);
    const [beaches, setBeaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    async function requestLocationPermission() {
        try {
            const { granted } = await requestForegroundPermissionsAsync();
            if (!granted) {
                setError('Permissão de localização negada');
                setLoading(false);
                return;
            }
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
        } catch (error) {
            setError('Erro ao obter localização');
            setLoading(false);
        }
    }

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

    useEffect(() => {
        requestLocationPermission();
    }, []);

    useEffect(() => {
        let subscription;
        (async () => {
            try {
                subscription = await watchPositionAsync(
                    {
                        accuracy: LocationAccuracy.Highest,
                        timeInterval: 1000,
                        distanceInterval: 1,
                    },
                    (response) => {
                        setLocation(response);
                    }
                );
            } catch (error) {
                console.log('Erro ao acompanhar localização:', error);
                setError('Erro ao acompanhar localização');
            }
        })();
        return () => {
            if (subscription) subscription.remove();
        };
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

    if (!beaches || !location) {
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
            <Circle
                center={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }}
                radius={32}
                strokeColor="rgba(64,207,255,0.5)"
                fillColor="rgba(64,207,255,0.15)"
            />
            <Circle
                center={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }}
                radius={13}
                strokeColor="white"
                fillColor="white"
            />
            <Circle
                center={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }}
                radius={7}
                strokeColor="#40CFFF"
                fillColor="#40CFFF"
            />
            {beaches.map((beach) =>
                beach.coordenadas_terra && beach.coordenadas_terra.length === 2 ? (
                    <Marker
                        key={beach.codigo}
                        coordinate={{
                            latitude: beach.coordenadas_terra[0],
                            longitude: beach.coordenadas_terra[1],
                        }}
                        title={beach.nome?.[0] || 'Praia'}
                        description={beach.specific_location?.[0] || ''}
                        anchor={{ x: 0.5, y: 1 }}
                        image={zoomLevel < 0.05 ? require('../../../assets/images/marcador.png') : require('../../../assets/images/marcador_peq.png')}
                        onPress={() => navigation.navigate('Praias', {
                            screen: 'Praia',
                            params: { id: beach.codigo }
                        })}
                    />
                ) : null
            )}
        </MapView>
    </View>
);
}