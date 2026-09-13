import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { supabase } from '../../lib/supabase'
import { router } from 'expo-router'

export default function Profile() {
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.replace('/(auth)/login')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profiel</Text>

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Uitloggen</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#dc3545',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
