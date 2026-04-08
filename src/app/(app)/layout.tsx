export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <a href="/trips" className="text-lg font-semibold tracking-tight">
            Waive
          </a>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
