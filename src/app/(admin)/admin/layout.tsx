import AdminNav from './AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="max-w-[1400px] mx-auto bg-background min-h-screen flex flex-col">
        <AdminNav />
        {children}
      </div>
    </div>
  );
}
