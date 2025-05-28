import {View, Text} from 'react-native';
import styles from './styles';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
import { use, useEffect, useState } from 'react';
import MapView, {Circle, Marker} from 'react-native-maps';
import { api } from '../../api/api';

export default function Home() {
    const [location, setLocation] = useState(null);
    const [beaches, setBeaches] = useState([]);

    async function requestLocationPermission() {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
            console.error('Permissão de localização negada');
            return;
        } else if (granted) {
            try {
                const currentPosition = await getCurrentPositionAsync();
                console.log('Localização atual:', currentPosition);
                setLocation(currentPosition);
            } catch (error) {
                console.error('Erro ao obter localização:', error);
            }
        }
        
    }

    useEffect(() => {
            const fetchBeaches = async () => {
                try {
                    const response = await api.get('/pontos');
                    setBeaches(response.data.pontos);
                } catch (error) {
                    console.error('Erro ao buscar praias:', error);
                } 
            };
            fetchBeaches();
        }, []);

    useEffect(() => {
        requestLocationPermission();
    }, [])

    useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
        }, (response) => {
            console.log('Nova localização:', response);
            setLocation(response);
        })
    })

    if (!beaches) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>

            </View>
            {location && (
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
                    {beaches.map((beach) => (
                        <Marker
                        key={beach.codigo}
                        coordinate={{
                            latitude: beach.coordenadas[0],
                            longitude: beach.coordenadas[1],
                        }}
                        title={beach.nome?.[0] || 'Praia'}
                        description={beach.specific_location?.[0] || ''}
                    />
                    ))}
                </MapView>
            )}
        </View>
    );
}