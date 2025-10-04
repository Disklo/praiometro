import { View, Text } from 'react-native';
import styles from './styles';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useEffect, useState, useRef } from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { api } from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import HomeHeader from '../../components/HomeHeader';

import AD000 from '../../../assets/images/marcadores/AD000.svg';
import BV001 from '../../../assets/images/marcadores/BV001.svg';
import CH000 from '../../../assets/images/marcadores/CH000.svg';
import CH001 from '../../../assets/images/marcadores/CH001.svg';
import CH002 from '../../../assets/images/marcadores/CH002.svg';
import CM000 from '../../../assets/images/marcadores/CM000.svg';
import CM001 from '../../../assets/images/marcadores/CM001.svg';
import EA000 from '../../../assets/images/marcadores/EA000.svg';
import FC000 from '../../../assets/images/marcadores/FC000.svg';
import FC001 from '../../../assets/images/marcadores/FC001.svg';
import GR000 from '../../../assets/images/marcadores/GR000.svg';
import IA000 from '../../../assets/images/marcadores/IA000.svg';
import IA001 from '../../../assets/images/marcadores/IA001.svg';
import IC00 from '../../../assets/images/marcadores/IC00.svg';
import IC001 from '../../../assets/images/marcadores/IC001.svg';
import IC002 from '../../../assets/images/marcadores/IC002.svg';
import IC003 from '../../../assets/images/marcadores/IC003.svg';
import II000 from '../../../assets/images/marcadores/II000.svg';
import II001 from '../../../assets/images/marcadores/II001.svg';
import JR000 from '../../../assets/images/marcadores/JR000.svg';
import JR001 from '../../../assets/images/marcadores/JR001.svg';
import PR000 from '../../../assets/images/marcadores/PR000.svg';
import PR001 from '../../../assets/images/marcadores/PR001.svg';
import PR002 from '../../../assets/images/marcadores/PR002.svg';
import PR003 from '../../../assets/images/marcadores/PR003.svg';
import SF000 from '../../../assets/images/marcadores/SF000.svg';
import SF001 from '../../../assets/images/marcadores/SF001.svg';
import SF002 from '../../../assets/images/marcadores/SF002.svg';
import SG000 from '../../../assets/images/marcadores/SG000.svg';
import MarcadorPeq from '../../../assets/images/marcadores/marcador_peq.svg';

MapLibreGL.setAccessToken(null);

const markerMap = {
    AD000, BV001, CH000, CH001, CH002, CM000, CM001,
    EA000, FC000, FC001, GR000, IA000, IA001, IC00,
    IC001, IC002, IC003, II000, II001, JR000, JR001,
    PR000, PR001, PR002, PR003, SF000, SF001, SF002,
    SG000,
};

const BeachMarker = ({ beachCode, zoomLevel }) => {
    if (zoomLevel < 13) {
        return <MarcadorPeq width={50} height={65} />;
    }

    const Marker = markerMap[beachCode];

    if (Marker) {
        return <Marker width={181/1.4} height={70/1.4} />;
    }

    return <Entypo name="location-pin" size={32} color="#2ea5e4" />;
};

export default function Home() {
    const [beaches, setBeaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    const [zoomLevel, setZoomLevel] = useState(11);
    const mapRef = useRef(null);

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

    const handleRegionDidChange = async (event) => {
        if (event && event.properties && event.properties.zoomLevel) {
            setZoomLevel(event.properties.zoomLevel);
        }
    };

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
            ref={mapRef}
            style={styles.map}
            mapStyle="https://tiles.openfreemap.org/styles/liberty"
            attributionEnabled={false}
            logoEnabled={false}
            onRegionDidChange={handleRegionDidChange}
        >
            <MapLibreGL.Camera
                defaultSettings={{
                    centerCoordinate: [-43.112033, -22.907484],
                    zoomLevel: 11,
                }}
            />
            {beaches.map((beach) =>
                beach.coordenadas_terra && beach.coordenadas_terra.length === 2 ? (
                    <MapLibreGL.PointAnnotation
                        key={beach.codigo}
                        id={beach.codigo}
                        coordinate={[beach.coordenadas_terra[1], beach.coordenadas_terra[0]]}
                        anchor={{ x: 0.5, y: 1 }}
                    >
                        <BeachMarker beachCode={beach.codigo} zoomLevel={zoomLevel} />
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