import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        padding: 16,
        width: 160,
        height: 160,
        flexDirection: 'column',
    },
    headerUmidade: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    headerSensacao: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#454A4C',
    },
    infoContainer: {
        flexDirection: 'column',
        gap: 10,
    },  
    mainText: {
        fontSize: 40,
        fontWeight: '500',
        color: '#015486',
        textAlign: 'left',
    },
    description: {
        fontSize: 11,
        fontWeight: '400',
        color: '#454A4C',
        textAlign: 'left',
        marginTop: 6,
        marginHorizontal: 'auto',
    }
});