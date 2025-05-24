import { Text, TextInput, ScrollView, View } from 'react-native';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BeachCard from '../../components/BeachCard';

export default function Praias() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>PRAIAS</Text>
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
            <View style={styles.cardContainer}>
                <BeachCard/>
                <BeachCard/>
                <BeachCard/>
                <BeachCard/>
                <BeachCard/>
                <BeachCard/>
                <BeachCard/>
                <BeachCard/>
                <BeachCard/>
            </View>
        </ScrollView>
    )
}