import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();
  const session = await auth();
  return (
    <main className="container mx-auto py-10">
      {session ? <SignOut /> : <SignIn />}
      <form
        action={async (formData: FormData) => {
          "use server";
          const data = formData.get("name") as string;
          console.log(data);
          await database.insert(items).values({
            name: formData.get("name") as string,
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            userId: session?.user?.id!,
          });
          revalidatePath("/");
        }}
      >
        <Input name="name" placeholder="Enter your item" />
        <Button type="submit">Post Item</Button>
      </form>

      {allItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </main>
  );
}
