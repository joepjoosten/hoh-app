import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { Effect } from 'effect'
import { RehearsalService, type Rehearsal } from '@hoh/shared'
import { AppRuntime } from '../../lib/effect-runtime'

export default function Rehearsals() {
  const [rehearsals, setRehearsals] = useState<Rehearsal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const program = Effect.gen(function* () {
      const service = yield* RehearsalService
      const data = yield* service.list()
      return data
    })

    AppRuntime.runPromise(program)
      .then(setRehearsals)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Laden...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rehearsals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text>{new Date(item.rehearsal_date).toLocaleDateString('nl-NL')}</Text>
            {item.location && <Text>{item.location}</Text>}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Geen repetities gevonden</Text>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  },
})
