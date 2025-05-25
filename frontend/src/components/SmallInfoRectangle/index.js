import { View, Text } from 'react-native';
import styles from './styles';

export default function SmallInfoRectangle({title, description, children}) {
  return (
    <View style={styles.container}>
        {children}
        <View>
            <Text style={styles.boldText}>{description}</Text>
            <Text style={styles.regularText}>{title}</Text>
        </View>
    </View>
  );
}