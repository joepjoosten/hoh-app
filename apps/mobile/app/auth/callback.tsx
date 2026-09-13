import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { supabase } from '../../lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    // The auth session will be handled automatically by Supabase
    // Just check if we're logged in and redirect
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        router.replace('/(tabs)/home')
      } else {
        router.replace('/(auth)/login')
      }
    }

    // Small delay to ensure auth state is updated
    const timer = setTimeout(checkAuth, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  )
}
