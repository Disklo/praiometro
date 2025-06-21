import styles from './styles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import WeatherIcon from '../WeatherIcon';

export default function HomeHeader() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.get('/pontos/GR000');
                setWeather(response.data.leitura_atual);
            } catch (error) {
                console.error('Erro ao buscar dados de clima:', error);
                setError('Erro ao tentar carregar dados de clima.');
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    if (loading) {
        return (
            <View style={[styles.headerContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#015486', fontSize: 18 }}>Carregando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.headerContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#FAFAFA', fontSize: 16 }}>{error}</Text>
                <Text style={{ color: '#FAFAFA', fontSize: 14 }}>Tente novamente mais tarde!</Text>
            </View>
        );
    }

    if (!weather) {
        return null;
    }

    let weatherType = 'Desconhecido';
    const code = weather.weather_code;

    if (code === 0) {
        weatherType = 'Céu limpo';
    } else if ([1, 2, 3].includes(code)) {
        weatherType = 'Nublado';
    } else if (code === 45) {
        weatherType = 'Névoa';
    } else if ([51, 53, 55].includes(code)) {
        weatherType = 'Chuvisco';
    } else if ([61, 63, 65, 80, 81, 82].includes(code)) {
        weatherType = 'Chuva';
    } else if (code === 95) {
        weatherType = 'Trovoadas';
    } else if ([96, 99].includes(code)) {
        weatherType = 'Trovoadas com granizo';
    }

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerLocation}>Niterói, Rio de Janeiro</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.temperature}>{Math.trunc(weather.temperature_2m)}°</Text>
                <View style={styles.climateInfoContainer}>
                    <View style={styles.rowContainer}>
                        <FontAwesome6 style={{ position: 'relative', right: 1 }} name="temperature-half" size={22} color="#FAFAFA" />
                        <Text style={styles.climateText}>Sensação de {Math.trunc(weather.apparent_temperature)}°</Text>
                    </View>
                    <View style={[styles.rowContainer, { position: 'relative', right: 3 }]}>
                        <WeatherIcon style={{ position: 'relative', left: 5 }} weatherCode={weather.weather_code} size={18} color="#FAFAFA"/>
                        <Text style={styles.climateText}>{weatherType}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}