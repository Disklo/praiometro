import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
import { useEffect, useState } from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';
import { api } from '../../api/api';

export default function Home() {
    const [location, setLocation] = useState(null);
    const [beaches, setBeaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                <Text style={{ color: '#E53935', fontSize: 18, textAlign: 'center' }}>{error}</Text>
            </View>
        );
    }

    if (!beaches || !location) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}></View>
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
                        latitude: location?.coords?.latitude,
                        longitude: location?.coords?.longitude,
                    }}
                    radius={25}
                    strokeColor="rgba(0,122,255,0.8)"
                    fillColor="rgba(0,122,255,0.3)"
                />
                <Circle
                    center={{
                        latitude: location?.coords?.latitude,
                        longitude: location?.coords?.longitude,
                    }}
                    radius={8}
                    strokeColor="white"
                    fillColor="white"
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
                        />
                    ) : null
                )}
            </MapView>
        </View>
    );
}