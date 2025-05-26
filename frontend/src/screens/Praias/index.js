import { Text, TextInput, ScrollView, View, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BeachCard from '../../components/BeachCard';
import { useEffect, useState } from 'react';
import {styles} from './styles';
import { api } from '../../api/api';


export default function Praias({ navigation }) {
    const [beaches, setBeaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBeaches = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.get('/pontos');
                setBeaches(response.data.pontos);
            } catch (error) {
                console.error('Erro ao buscar praias:', error);
                setError('Erro ao tentar carregar as praias.');
            } finally {
                setLoading(false);
            }
        };
        fetchBeaches();
    }, []);

    return (
        <View 
          style={[
            styles.container,
            (loading || error) && { flex: 1 }
          ]}
        >
            <View style={styles.header}>
                <View style={styles.searchBarContainer}>
                    <Ionicons
                        name="search"
                        size={25}
                        color="#aaa"
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Digite o nome da praia..."
                    />
                </View>
            </View>
            <ScrollView
                bounces={false}
                overScrollMode='never'
                contentContainerStyle={styles.container}
            >
                <View style={styles.cardContainer}>
                    {loading ? (
                        <ActivityIndicator style={{marginTop: '200'}} size="large" color="#FAFAFA" />
                    ) : error ? (
                        <Text style={styles.noBeachesText}>{error}</Text>
                    ) : beaches.length !== 0 ? (
                        beaches.map((beach) => (
                            <BeachCard
                                key={beach.codigo}
                                beachName='Praia de Icaraí'
                                especificLocation='Localização específica'
                                id={beach.codigo}
                                navigation={navigation}
                            />
                        ))
                    ) : (
                        <Text style={styles.noBeachesText}>Nenhuma praia encontrada.</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}