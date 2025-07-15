import { View, Text, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from './styles';

export default function FeedbackSection({ onPress, averageRatings }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name="star"
          size={26}
          color={rating >= i ? "#FFC107" : "#C4C4C4"}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
        <Text style={styles.feedbackTitle}>Avaliação dos Usuários</Text>
        <View style={styles.atributesContainer}>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeTitle}>Limpeza</Text>
                <View style={styles.starsContainer}>
                    {renderStars(averageRatings?.limpeza || 0)}
                </View>
            </View>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeTitle}>Acessibilidade</Text>
                <View style={styles.starsContainer}>
                    {renderStars(averageRatings?.acessibilidade || 0)}
                </View>
            </View>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeTitle}>Infraestrutura</Text>
                <View style={styles.starsContainer}>
                    {renderStars(averageRatings?.infraestrutura || 0)}
                </View>
            </View>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeTitle}>Segurança</Text>
                <View style={styles.starsContainer}>
                    {renderStars(averageRatings?.seguranca || 0)}
                </View>
            </View>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeTitle}>Tranquilidade</Text>
                <View style={styles.starsContainer}>
                    {renderStars(averageRatings?.tranquilidade || 0)}
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
