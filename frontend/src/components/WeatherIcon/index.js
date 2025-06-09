import { Feather, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function WeatherIcon({ weatherCode, size, color }) {
    if (weatherCode === 0) {
        // Céu limpo
        return <Feather name="sun" size={size} color={color} />;
    } else if ([1, 2, 3].includes(weatherCode)) {
        // Nublado
        return <Feather name="cloud" size={size} color={color} />;
    } else if ([45].includes(weatherCode)) {
        // Névoa
        return <MaterialCommunityIcons name="weather-fog" size={size} color={color} />;
    } else if ([51, 53, 55].includes(weatherCode)) {
        // Chivisco
        return <Ionicons name="rainy-outline" size={size} color={color} />;
    } else if ([61, 63, 65, 80, 81, 82].includes(weatherCode)) {
        // Chuva leve, chuva moderada, chuva intensa
        return <Ionicons name="rainy-outline" size={size} color={color} />;
    } else if (weatherCode === 95) {
        // Trovoadas
        return <Ionicons name="thunderstorm-outline" size={size} color={color} />;
    } else if ([96, 99].includes(weatherCode)) {
        // Trovoadas com granizo
        return <MaterialCommunityIcons name="weather-hail" size={size} color={color} />;
    } else {
        // Default
        return <FontAwesome5 name="question" size={size} color={color} />;
    }
}