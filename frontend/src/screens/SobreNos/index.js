import { View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

export default function SobreNos() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Sobre o Praiômetro</Text>
                <Text style={styles.description}>
                O Praiômetro é um projeto de extensão da Universidade Federal Fluminense (UFF), desenvolvido por alunos de Sistemas de Informação. Seu principal objetivo é reunir, em um só lugar, informações úteis sobre as praias de Niterói – RJ, facilitando o dia a dia de quem frequenta a orla. A plataforma busca promover um uso mais consciente e seguro das praias, guiando as escolhas dos usuários de forma prática e acessível.
                </Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.instagramButton}
                    onPress={() => Linking.openURL('https://www.instagram.com/')}
                >
                    <FontAwesome name="instagram" size={24} color="#015486" style={{ marginRight: 10 }} />
                    <Text style={styles.instagramButtonText}>Instagram</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.emailButton}
                    onPress={() => Linking.openURL('mailto:naotemosemail@gmail.com')}
                >
                    <FontAwesome name="envelope" size={24} color="#015486" style={{ marginRight: 10 }} />
                    <Text style={styles.emailButtonText}>Email</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
