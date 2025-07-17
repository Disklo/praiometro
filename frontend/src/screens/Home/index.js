import { View, Text } from 'react-native';
import styles from './styles';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useEffect, useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import Entypo from '@expo/vector-icons/Entypo';
import { api } from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import HomeHeader from '../../components/HomeHeader';

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
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: -22.907484,
                longitude: -43.112033,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            }}
        >
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
                        anchor={{ x: 0.5, y: 0.2 }}
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