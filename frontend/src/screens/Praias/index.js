import { Text, TextInput, ScrollView, View } from 'react-native';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BeachCard from '../../components/BeachCard';

const beaches = [
    {
        "id": 1,
        "name": "Praia de Icaraí",
    },
    {
      "id": 2,
      "name": "Praia de São Francisco",
      "especificLocation": "Igreja de São Francisco"
    },
    {
      "id": 3,
      "name": "Praia de São Francisco",
      "especificLocation": "Rua Caraíbas"
    },
    {
      "id": 4,
      "name": "Praia de Charitas",
    },
    {
      "id": 5,
      "name": "Praia do Forte"
    },
    {
      "id": 6,
      "name": "Praia de Piratininga",
      "especificLocation": "Avenida Doutor Acúrcio Torres"
    },
    {
      "id": 7,
      "name": "Praia do Piratininga",
      "especificLocation": "Rua General Rubens Rosada Teixeira"
    },
    {
      "id": 8,
      "name": "Praia do Piratininga",
      "especificLocation": "Rua João Gomes da Silva"
    },
    {
      "id": 9,
      "name": "Praia do Sossego",
    },
    {
      "id": 10,
      "name": "Praia de Camboinhas",
    },
    {
      "id": 11,
      "name": "Praia de Itaipu",
    },
    {
      "id": 12,
      "name": "Praia de Itacoatiara",
    },
    {
      "id": 13,
      "name": "Praia do Sossego",
    }
]

export default function Praias({navigation}) {
    return (
        <View style={styles.container}>
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
                    {beaches.map((beach) => (
                        <BeachCard 
                            key={beach.id} 
                            beachName={beach.name} 
                            especificLocation={beach.especificLocation} 
                            id={beach.id}
                            navigation={navigation}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}