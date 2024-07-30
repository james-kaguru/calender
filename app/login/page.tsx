"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema, FormSchema } from "@/app/login/schema";
import { login } from "@/app/login/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: FormSchema) {
    const { message } = await login(data);
    if (message == "success") {
      router.replace("/");
    } else {
      setMessage(message);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {message !== undefined ? (
            <p className={"text-sm font-medium text-destructive"}>{message}</p>
          ) : null}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
