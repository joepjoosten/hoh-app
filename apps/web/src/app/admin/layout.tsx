import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin</h2>
        <nav className="space-y-2">
          <Link
            href="/admin/rehearsals"
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Repetities
          </Link>
          <Link
            href="/admin/events"
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Evenementen
          </Link>
          <Link
            href="/admin/members"
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Leden
          </Link>
          <Link
            href="/admin/sheet-music"
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Bladmuziek
          </Link>
          <Link
            href="/admin/formations"
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Formaties
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
