import { View, Text, ActivityIndicator } from 'react-native';
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
                <ActivityIndicator size="large" color="#015486" />
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
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
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
                beach.coordenadas && beach.coordenadas.length === 2 ? (
                    <Marker
                        key={beach.codigo}
                        coordinate={{
                            latitude: beach.coordenadas[0],
                            longitude: beach.coordenadas[1],
                        }}
                        title={beach.nome?.[0] || 'Praia'}
                        description={beach.specific_location?.[0] || ''}
                        anchor={{ x: 0.5, y: 1 }}
                    >
                        <Entypo name="location-pin" size={32} color="#2ea5e4" />
                        <Callout
                            onPress={() => navigation.navigate('Praias', {
                                screen: 'Praia',
                                params: { id: beach.codigo }
                            })}
                        >
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: 8,
                                    width: 150,
                                    alignItems: 'center',
                                    elevation: 4,
                                }}
                            >
                                <Text style={{ fontWeight: 'bold', color: '#2ea5e4', fontSize: 16, textAlign: 'center' }}>
                                    {beach.nome?.[0] || 'Praia'}
                                </Text>
                                <Text style={{ color: '#666', fontSize: 13, textAlign: 'center' }}>
                                    {beach.specific_location?.[0] || ''}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ) : null
            )}
        </MapView>
    </View>
);
}