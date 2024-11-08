import { Card } from "@/components/ui/card";

export default async function ReportsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <Card className="p-6">
        <div className="space-y-4">
          <p>Reports content will be displayed here.</p>
        </div>
      </Card>
    </div>
  );
}
