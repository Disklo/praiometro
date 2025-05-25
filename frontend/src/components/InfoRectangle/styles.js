import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#fafafa',
        width: '85%',
        height: 90,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        flexDirection: 'row',
        marginLeft: 16,
        alignItems: 'center',
        gap: 12
    },
    regularText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#454A4C',
    },
    boldText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#454A4C',
    },
    textContainer: {
        flexDirection: 'column',
        gap: 2,
    },
    alertMessage: {
        alignItems: 'center',
        marginRight: 16,
    },
    alertText: {
        fontSize: 9,
        fontWeight: '500',
        color: '#454A4C',
        textAlign: 'center',
        width: 70,
    },
});