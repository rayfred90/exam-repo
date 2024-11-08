import { Card } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <Card className="p-6">
        <div className="space-y-4">
          <p>Admin dashboard content will be displayed here.</p>
        </div>
      </Card>
    </div>
  );
}
