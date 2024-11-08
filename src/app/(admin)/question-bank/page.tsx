import { Card } from "@/components/ui/card";

export default async function QuestionBankPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Question Bank</h1>
      <Card className="p-6">
        <div className="space-y-4">
          <p>Question bank content will be displayed here.</p>
        </div>
      </Card>
    </div>
  );
}
