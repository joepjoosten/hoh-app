import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="rehearsals"
        options={{
          title: 'Repetities',
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="sheet-music"
        options={{
          title: 'Bladmuziek',
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profiel',
          headerShown: true,
        }}
      />
    </Tabs>
  )
}
