'use client'

import { useEffect, useState } from 'react'
import { Effect } from 'effect'
import { RehearsalService, type Rehearsal } from '@hoh/shared'
import { AppRuntime } from '@/lib/effect-runtime'

export default function RehearsalsPage() {
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
    return <div>Laden...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Repetities</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Nieuwe repetitie
        </button>
      </div>

      {rehearsals.length === 0 ? (
        <p className="text-gray-500">Geen repetities gevonden</p>
      ) : (
        <div className="space-y-4">
          {rehearsals.map((rehearsal) => (
            <div
              key={rehearsal.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{rehearsal.title}</h3>
              <p className="text-gray-600 mb-2">
                {new Date(rehearsal.rehearsal_date).toLocaleDateString('nl-NL', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              {rehearsal.location && (
                <p className="text-gray-600">Locatie: {rehearsal.location}</p>
              )}
              {rehearsal.description && (
                <p className="mt-2">{rehearsal.description}</p>
              )}
              {rehearsal.notes && (
                <div className="mt-4 p-4 bg-gray-50 rounded">
                  <h4 className="font-semibold mb-2">Notities:</h4>
                  <p>{rehearsal.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
