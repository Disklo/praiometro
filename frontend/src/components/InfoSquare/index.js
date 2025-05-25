import { View, Text } from 'react-native';
import styles from './styles';

export default function InfoSquare({children, title, info, description}) {
  return (
    <View style={styles.container}>
        <View style={styles.infoContainer}>
            <View style={title === 'Umidade' ? styles.headerUmidade : styles.headerSensacao}>
                {children}
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <Text style={styles.mainText}>{info}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
    </View>
  );
}