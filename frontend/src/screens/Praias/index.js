import { Text, TextInput, ScrollView, View, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BeachCard from '../../components/BeachCard';
import { useEffect, useState, useRef } from 'react';
import Fontisto from '@expo/vector-icons/Fontisto';
import { styles } from './styles';
import { api } from '../../api/api';

export default function Praias({ navigation }) {
    const [beaches, setBeaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);

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

    const filteredBeaches = beaches.filter((beach) => {
        const nome = Array.isArray(beach.nome) ? beach.nome[0] : beach.nome;
        if (!nome) return false;
        return nome.toLowerCase().includes(search.toLowerCase());
    });

    if (loading) {
        return (
            <View style={[styles.fullScreen, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#015486', fontSize: 18 }}>Carregando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.fullScreen, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#FAFAFA', fontSize: 18 }}>{error}</Text>
                <Text style={{ color: '#FAFAFA', fontSize: 16 }}>Tente novamente mais tarde!</Text>
                <Fontisto style={{marginTop: 20}} name="beach-slipper" size={100} color="#FAFAFA" />
            </View>
        );
    }

    if (!beaches) {
        return null;
    }

    return (
        <View
            style={[
                styles.container,
                { flex: 1, backgroundColor: '#015486' },
                (loading || error) && { flex: 1 }
            ]}
        >
            <View style={styles.header}>
                <Pressable
                    style={styles.searchBarContainer}
                    onPress={() => inputRef.current && inputRef.current.focus()}
                >
                    <Ionicons
                        name="search"
                        size={25}
                        color="#aaa"
                        style={styles.icon}
                    />
                    <TextInput
                        ref={inputRef}
                        style={styles.searchBar}
                        placeholder="Digite o nome da praia..."
                        value={search}
                        onChangeText={setSearch}
                    />
                </Pressable>
            </View>
            <ScrollView
                style={{ flex: 1 }}
                bounces={false}
                overScrollMode='never'
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.cardContainer}>
                    {filteredBeaches.length !== 0 ? (
                        filteredBeaches.map((beach) => (
                            <BeachCard
                                key={beach.codigo}
                                beachName={Array.isArray(beach.nome) ? beach.nome[0] : 'Praia'}
                                especificLocation={Array.isArray(beach.specific_location) ? beach.specific_location[0] : 'Sem localização específica'}
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