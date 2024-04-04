import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import CardsList from './source/components/CardsList';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CardsList/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 35,
  },
});
