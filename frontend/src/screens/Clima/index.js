import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import styles from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import InfoSquare from '../../components/InfoSquare';
import InfoRectangle from '../../components/InfoRectangle';
import UVInfoRectangle from '../../components/UVInfoRectangle';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import WeatherIcon from '../../components/WeatherIcon';
import { getHumidityMessage, getSensationMessage, getUVIndexLevel, getUVIndexMessage } from '../../helpers/weatherMessages';
import { Feather } from '@expo/vector-icons';

export default function Clima() {
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
                setError('Erro ao tentar carregar o clima.');
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    if (loading) {
        return (
            <View style={[styles.fullScreen, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#FAFAFA" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.fullScreen, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#FAFAFA', fontSize: 18 }}>{error}</Text>
                <Text style={{ color: '#FAFAFA', fontSize: 16 }}>Tente novamente mais tarde!</Text>
                <Feather style={{marginTop: 20}} name="sun" size={100} color='#FAFAFA' />
            </View>
        );
    }

    if (!weather) {
        return null;
    }

    let weatherType = 'Desconhecido';
    let isDangerous = false;
    let isSafe = false;
    const code = weather.weather_code;

    if (code === 0) {
        weatherType = 'Céu limpo';
        isSafe = true;
    } else if ([1, 2, 3].includes(code)) {
        weatherType = 'Nublado';
        isSafe = true;
    } else if (code === 45) {
        weatherType = 'Névoa';
        isDangerous = true;
    } else if ([51, 53, 55].includes(code)) {
        weatherType = 'Chuvisco';
        isSafe = true;
    } else if ([61, 63, 65].includes(code)) {
        weatherType = 'Chuva';
        isDangerous = true;
    } else if ([80, 81, 82].includes(code)) {
        weatherType = 'Pancadas de chuva';
        isDangerous = true;
    } else if (code === 95) {
        weatherType = 'Trovoadas';
        isDangerous = true;
    } else if ([96, 99].includes(code)) {
        weatherType = 'Trovoadas com granizo';
        isDangerous = true;
    }

    return (
        <ScrollView
            bounces={false}
            overScrollMode='never'
            contentContainerStyle={styles.container}
        >
            <View>
                <Text style={styles.headerText}>Niterói, Rio de Janeiro</Text>
                <Text style={styles.temperature}>{Math.trunc(weather.temperature_2m)}°</Text>
            </View>
            <View style={styles.infoContainer}>
                <InfoRectangle
                    title="Clima"
                    description={weatherType}
                    danger={isDangerous}
                    safe={isSafe}
                >
                    <WeatherIcon weatherCode={weather.weather_code} size={55} color="#015486" />
                </InfoRectangle>
                <View style={styles.squaresContainer}>
                    <InfoSquare title='Umidade' info={`${weather.relative_humidity_2m}%`} description={getHumidityMessage(weather.relative_humidity_2m)}>
                        <Ionicons name="water-sharp" size={16} color="#015486" />
                    </InfoSquare>
                    <InfoSquare title='Sensação' info={`${Math.trunc(weather.apparent_temperature)}°`} description={getSensationMessage(weather.apparent_temperature)}>
                        <FontAwesome6 name="temperature-full" size={16} color="#015486" />
                    </InfoSquare>
                </View>
                <UVInfoRectangle
                    uvIndex={weather.uv_index}
                    uvLevel={getUVIndexLevel(weather.uv_index)}
                    uvRecommentadions={getUVIndexMessage(weather.uv_index)}
                />
            </View>
        </ScrollView>
    );
}