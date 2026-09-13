import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native'
import { supabase } from '../../lib/supabase'
import * as WebBrowser from 'expo-web-browser'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

WebBrowser.maybeCompleteAuthSession()

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/(tabs)/home')
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/(tabs)/home')
      }
    })

    // Handle deep links for OAuth callback
    const handleDeepLink = async (event: { url: string }) => {
      const url = event.url
      console.log('Deep link received:', url)

      // Try to extract tokens from either hash (#) or query (?)
      let access_token: string | null = null
      let refresh_token: string | null = null

      if (url.includes('#')) {
        const hashParams = url.split('#')[1]
        const params = new URLSearchParams(hashParams)
        access_token = params.get('access_token')
        refresh_token = params.get('refresh_token')
      }

      if (!access_token && url.includes('?')) {
        const queryParams = url.split('?')[1]?.split('#')[0] // Get query params before hash
        const params = new URLSearchParams(queryParams)
        access_token = params.get('access_token')
        refresh_token = params.get('refresh_token')
      }

      console.log('Tokens extracted:', { hasAccessToken: !!access_token, hasRefreshToken: !!refresh_token })

      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        })

        if (!error) {
          console.log('Session set successfully!')
          router.replace('/(tabs)/home')
        } else {
          console.error('Error setting session:', error)
        }
      }
    }

    // Listen for deep links
    const subscription2 = Linking.addEventListener('url', handleDeepLink)

    return () => {
      subscription.unsubscribe()
      subscription2.remove()
    }
  }, [])

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'hoh://',
        },
      })

      if (error) throw error

      if (data?.url) {
        // Open browser for OAuth using WebBrowser
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          'hoh://'
        )

        console.log('WebBrowser result:', result)

        if (result.type === 'success' && result.url) {
          // Extract tokens directly from the result URL
          let access_token: string | null = null
          let refresh_token: string | null = null

          if (result.url.includes('#')) {
            const hashParams = result.url.split('#')[1]
            const params = new URLSearchParams(hashParams)
            access_token = params.get('access_token')
            refresh_token = params.get('refresh_token')
          }

          console.log('Tokens found:', { hasAccessToken: !!access_token, hasRefreshToken: !!refresh_token })

          if (access_token && refresh_token) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            })

            if (!sessionError) {
              console.log('Session set successfully!')
              router.replace('/(tabs)/home')
            } else {
              console.error('Error setting session:', sessionError)
              Alert.alert('Error', 'Failed to set session: ' + sessionError.message)
            }
          } else {
            Alert.alert('Error', 'No tokens found in response')
          }
        }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      Alert.alert('Error', error.message)
    }
  }

  const handleAppleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: 'hoh://',
        },
      })

      if (error) throw error

      if (data?.url) {
        // Open browser for OAuth using WebBrowser
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          'hoh://'
        )

        console.log('WebBrowser result:', result)

        if (result.type === 'success' && result.url) {
          // Extract tokens directly from the result URL
          let access_token: string | null = null
          let refresh_token: string | null = null

          if (result.url.includes('#')) {
            const hashParams = result.url.split('#')[1]
            const params = new URLSearchParams(hashParams)
            access_token = params.get('access_token')
            refresh_token = params.get('refresh_token')
          }

          console.log('Tokens found:', { hasAccessToken: !!access_token, hasRefreshToken: !!refresh_token })

          if (access_token && refresh_token) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            })

            if (!sessionError) {
              console.log('Session set successfully!')
              router.replace('/(tabs)/home')
            } else {
              console.error('Error setting session:', sessionError)
              Alert.alert('Error', 'Failed to set session: ' + sessionError.message)
            }
          } else {
            Alert.alert('Error', 'No tokens found in response')
          }
        }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      Alert.alert('Error', error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Harmonie van Horst</Text>
      <Text style={styles.subtitle}>Welkom terug!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
          <Text style={styles.buttonText}>Inloggen met Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAppleLogin}>
          <Text style={styles.buttonText}>Inloggen met Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
