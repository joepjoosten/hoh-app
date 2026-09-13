import { View, Text, StyleSheet } from 'react-native'

export default function SheetMusic() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bladmuziek</Text>
      <Text>Bladmuziek bibliotheek komt hier</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})
