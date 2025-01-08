import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { database } from "@/db/database";
import helper from "@/lib/helper";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-8 space-y-4">
      <h1 className="font-bold text-4xl">Post for Sales</h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
        {allItems.map((item) => (
          <Card key={item.id} className="p-5">
            <CardHeader>{item.name}</CardHeader>
            <CardContent>
              {helper.convertCentsToDollars(item.startingPrice)}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
