import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        width: 160,
        height: 160,
        flexDirection: 'column',
    },
    headerUmidade: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 4,
        alignItems: 'center',
        marginLeft: 16,
    },
    headerSensacao: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 8,
        alignItems: 'center',
        marginLeft: 16,
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
        marginLeft: 16,
    },
    description: {
        fontSize: 12,
        fontWeight: '400',
        color: '#454A4C',
        textAlign: 'left',
        marginTop: 6,
        marginLeft: 16,
        width: '85%',
        marginHorizontal: 'auto',
    }
});