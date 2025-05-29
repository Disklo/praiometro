import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles from './styles';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
import { useEffect, useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import { api } from '../../api/api';
import { useNavigation } from '@react-navigation/native';

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
                <Text style={{ color: '#E53935', fontSize: 18, textAlign: 'center' }}>{error}</Text>
            </View>
        );
    }

    if (!beaches || !location) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLocation}>Niterói, Rio de Janeiro</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.temperature}>29°</Text>
                    <View style={styles.climateInfoContainer}>
                        <View style={styles.rowContainer}>
                            <FontAwesome6 name="temperature-half" size={22} color="#FAFAFA" />
                            <Text style={styles.climateText}>Sensação de 32°</Text>
                        </View>
                        <View style={[styles.rowContainer, { position: 'relative', right: 8 }]}>
                            <FontAwesome5 style={{position: 'relative', left: 5}} name="cloud-sun" size={18} color="#FAFAFA" />;
                            <Text style={styles.climateText}>Tempestade</Text>
                        </View>
                    </View>
                </View>
            </View>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location?.coords?.latitude,
                    longitude: location?.coords?.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title="Você está aqui!"
                    anchor={{ x: 0.5, y: 1 }}
                >
                    <MaterialIcons name="person-pin-circle" size={30} color="#2176AE" />
                    <Callout>
                        <View style={{
                            backgroundColor: 'white',
                            borderRadius: 8,
                            width: 150,
                            alignItems: 'center',
                            elevation: 4,
                        }}>
                            <Text style={{ fontWeight: 'bold', color: '#2176AE', fontSize: 16, textAlign: 'center' }}>
                                {`Você está aqui!`}
                            </Text>
                        </View>
                    </Callout>
                </Marker>
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