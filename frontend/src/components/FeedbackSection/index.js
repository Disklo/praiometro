import { View, Text, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from './styles';

export default function FeedbackSection({onPress}) {
  return (
    <View style={styles.container}>
        <Text style={styles.feedbackTitle}>Avaliação dos Usuários</Text>
        <View style={styles.atributesContainer}>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeTitle}>Limpeza</Text>
                <View style={styles.starsContainer}>
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                </View>
            </View>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeTitle}>Acessibilidade</Text>
                <View style={styles.starsContainer}>
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                </View>
            </View>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeTitle}>Infraestrutura</Text>
                <View style={styles.starsContainer}>
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                </View>
            </View>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeTitle}>Segurança</Text>
                <View style={styles.starsContainer}>
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                </View>
            </View>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeTitle}>Tranquilidade</Text>
                <View style={styles.starsContainer}>
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                    <FontAwesome name="star" size={26} color="#FFC107" />
                </View>
            </View>
        </View>
        <Pressable 
            style={({ pressed }) => [
                styles.button,
                pressed ? { opacity: 0.8 } : null
            ]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>Envie uma avaliação!</Text>
        </Pressable>
    </View>
  );
}
