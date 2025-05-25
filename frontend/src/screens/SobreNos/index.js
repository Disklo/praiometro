import { View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import logoIC from '../../../assets/images/logo-ic.png';
import styles from './styles';

export default function SobreNos() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Sobre o Praiômetro</Text>
                <Text style={styles.description}>
                O Praiômetro é um projeto de extensão da Universidade Federal Fluminense (UFF), desenvolvido por alunos de Sistemas de Informação. A plataforma reúne dados atualizados sobre as praias de Niterói – RJ, como balneabilidade da água, altura e período das ondas, chuva, temperatura e outras informações oceanográficas e meteorológicas. O objetivo é facilitar o acesso a esses dados e incentivar o uso seguro e consciente das praias.
                </Text>
                <View style={styles.logosContainer}>
                    <Image source={logoIC} style={styles.logoIC}/>     
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
