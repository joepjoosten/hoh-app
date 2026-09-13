import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Harmonie van Horst</h1>
        <p className="text-xl mb-8">Admin Panel</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/rehearsals"
            className="p-6 border rounded-lg hover:bg-gray-50"
          >
            <h2 className="text-2xl font-semibold mb-2">Repetities</h2>
            <p>Beheer repetities en afmeldingen</p>
          </Link>

          <Link
            href="/admin/events"
            className="p-6 border rounded-lg hover:bg-gray-50"
          >
            <h2 className="text-2xl font-semibold mb-2">Evenementen</h2>
            <p>Beheer de agenda</p>
          </Link>

          <Link
            href="/admin/members"
            className="p-6 border rounded-lg hover:bg-gray-50"
          >
            <h2 className="text-2xl font-semibold mb-2">Leden</h2>
            <p>Beheer orkestleden en formaties</p>
          </Link>

          <Link
            href="/admin/sheet-music"
            className="p-6 border rounded-lg hover:bg-gray-50"
          >
            <h2 className="text-2xl font-semibold mb-2">Bladmuziek</h2>
            <p>Beheer de bladmuziek bibliotheek</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
