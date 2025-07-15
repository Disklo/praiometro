import { Modal, View, Text, Pressable, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from './styles';
import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { api } from '../../api/api';

export default function FeedbackModal({ visible, onClose, beachName, beachId, onVoteSuccess }) {
    const [feedback, setFeedback] = useState({
        limpeza: 0,
        acessibilidade: 0,
        infraestrutura: 0,
        seguranca: 0,
        tranquilidade: 0,
    });

    const atributos = [
        { key: 'limpeza', label: 'Limpeza' },
        { key: 'acessibilidade', label: 'Acessibilidade' },
        { key: 'infraestrutura', label: 'Infraestrutura' },
        { key: 'seguranca', label: 'Segurança' },
        { key: 'tranquilidade', label: 'Tranquilidade' },
    ];

    const handleStarPress = (atributo, value) => {
        setFeedback(prev => ({
            ...prev,
            [atributo]: value
        }));
    };

    const handleSendFeedback = async () => {
        try {
            // Check if all criteria have been rated
            const allRated = Object.values(feedback).every(rating => rating > 0);
            if (!allRated) {
                Alert.alert('Erro', 'Por favor, avalie todos os critérios antes de enviar.');
                return;
            }

            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const idToken = userInfo.idToken;

            if (!idToken) {
                Alert.alert('Erro', 'Não foi possível obter o token de autenticação do Google.');
                return;
            }

            const response = await api.post('/votar', null, {
                params: {
                    token: idToken,
                    praia_id: beachId,
                },
                data: feedback,
            });

            if (response.data.votou) {
                Alert.alert('Sucesso', 'Você já votou nesta praia recentemente. Seu voto não foi registrado novamente.');
            } else {
                Alert.alert('Sucesso', 'Avaliação enviada com sucesso!');
                onVoteSuccess();
            }
            onClose();
        } catch (error) {
            console.error('Erro ao enviar feedback:', error);
            if (error.code === 'SIGN_IN_CANCELLED') {
                Alert.alert('Cancelado', 'Login com Google cancelado.');
            } else if (error.response && error.response.data && error.response.data.detail) {
                Alert.alert('Erro', `Erro ao enviar avaliação: ${error.response.data.detail}`);
            } else {
                Alert.alert('Erro', 'Ocorreu um erro ao enviar sua avaliação. Tente novamente.');
            }
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <Pressable
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={onClose}
            >
                <View
                    style={styles.container}
                    pointerEvents="box-none"
                >
                    <Text style={styles.feedbackTitle}>Avalie a {beachName}</Text>
                    <View style={styles.atributesContainer}>
                        {atributos.map(attr => (
                            <View style={styles.atributeContainer} key={attr.key}>
                                <Text style={styles.atributeTitle}>{attr.label}</Text>
                                <View style={styles.starsContainer}>
                                    {[1,2,3,4,5].map(star => (
                                        <Pressable
                                            key={star}
                                            onPress={() => handleStarPress(attr.key, star)}
                                            hitSlop={8}
                                        >
                                            <FontAwesome
                                                name="star"
                                                size={26}
                                                color={feedback[attr.key] >= star ? "#FFD700" : "#C4C4C4"}
                                            />
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.closeButton,
                                pressed ? { opacity: 0.8 } : null
                            ]}
                            onPress={onClose}
                        >
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                pressed ? { opacity: 0.8 } : null
                            ]}
                            onPress={handleSendFeedback}
                        >
                            <Text style={styles.buttonText}>Enviar</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}