import { Modal, View, Text, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from './styles';

export default function FeedbackModal({ visible, onClose, beachName }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.4)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={styles.container}>
                    <Text style={styles.feedbackTitle}>Avalie a {beachName}</Text>
                    <View style={styles.atributesContainer}>
                        <View style={styles.atributeContainer}>
                            <Text style={styles.atributeTitle}>Limpeza</Text>
                            <View style={styles.starsContainer}>
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                            </View>
                        </View>
                        <View style={styles.atributeContainer}>
                            <Text style={styles.atributeTitle}>Acessibilidade</Text>
                            <View style={styles.starsContainer}>
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                            </View>
                        </View>
                        <View style={styles.atributeContainer}>
                            <Text style={styles.atributeTitle}>Infraestrutura</Text>
                            <View style={styles.starsContainer}>
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                            </View>
                        </View>
                        <View style={styles.atributeContainer}>
                            <Text style={styles.atributeTitle}>Segurança</Text>
                            <View style={styles.starsContainer}>
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                            </View>
                        </View>
                        <View style={styles.atributeContainer}>
                            <Text style={styles.atributeTitle}>Tranquilidade</Text>
                            <View style={styles.starsContainer}>
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                                <FontAwesome name="star" size={26} color="#C4C4C4" />
                            </View>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            pressed ? { opacity: 0.8 } : null
                        ]}
                        onPress={onClose}
                    >
                        <Text style={styles.buttonText}>Fechar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}