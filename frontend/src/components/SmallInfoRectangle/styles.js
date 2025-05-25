import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: 160,
        height: 90,
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        gap: 8,
    },
    regularText: {
        fontSize: 12,
        width: 70,
        fontWeight: '400',
        color: '#454A4C',
    },
    boldText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#454A4C',
    },
});