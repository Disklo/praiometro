import { View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import logoUFF from '../../../assets/images/logo-uff-azul.png';
import styles from './styles';

export default function SobreNos() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Sobre o Praiômetro</Text>
                <Text style={styles.description}>
                    Somos alunos da Universidade Federal Fluminense (UFF) e desenvolvemos este projeto de extensão para criar uma plataforma digital que reúne dados sobre as condições ambientais e marítimas das praias de Niterói - RJ. Nosso objetivo é facilitar o acesso a informações como balneabilidade da água, altura e período das ondas, chuva e temperatura, promovento o uso seguro e consciente das praias.
                </Text>
                
                <View>
                    <Image source={logoUFF} style={styles.logoUFF}/>       
                </View>

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
