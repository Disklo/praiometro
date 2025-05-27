import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: '85%',
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        padding: 18,
        gap: 20,
        marginBottom: 16,
    },
    feedbackTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#454A4C',
        textAlign: 'center',
    },
    starsContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    atributesContainer: {
        justifyContent: 'space-between',
        gap: 12,
        paddingHorizontal: 8,
    },
    atributeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    atributeTitle: {
        fontSize: 15,
        fontWeight: '400',
        color: '#454A4C',
    },
    button: {
        backgroundColor: '#026099', 
        padding: 10, 
        borderRadius: 8, 
        height: 45,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#FAFAFA',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
});