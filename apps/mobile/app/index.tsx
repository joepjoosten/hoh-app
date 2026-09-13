import { useEffect } from 'react'
import { Redirect } from 'expo-router'
import { View, ActivityIndicator } from 'react-native'
import { supabase } from '../lib/supabase'

export default function Index() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (session) {
    return <Redirect href="/(tabs)/home" />
  }

  return <Redirect href="/(auth)/login" />
}

function useState<T>(initialValue: T): [T, (value: T) => void] {
  const [state, setState] = React.useState(initialValue)
  return [state, setState]
}

import React from 'react'
