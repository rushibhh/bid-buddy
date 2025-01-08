"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { createItem } from "./action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

type IForm = {
  name: string;
  startingPrice: string;
};

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
// });

const CreateBidsForm = () => {
  const form = useForm<IForm>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      startingPrice: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  //   const onSubmit = (formData: FormData) => {
  //     console.log(formData)
  //   }

  return (
    <Card className="max-w-lg">
      <CardContent className="pt-2">
        <Form {...form}>
          <form action={createItem} className="space-y-4 flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Item" required {...field} />
                  </FormControl>
                  {errors.name && (
                    <FormMessage>{errors.name?.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startingPrice"
              rules={{}}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auction price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="What to start your auction at"
                      required
                      {...field}
                    />
                  </FormControl>
                  {errors.startingPrice && (
                    <FormMessage>{errors.startingPrice?.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button type="submit" className="self-end">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default CreateBidsForm;
