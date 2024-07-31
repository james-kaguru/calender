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
import Link from "next/link";

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
    <div className={"w-[500px] mx-auto rounded p-3 border my-3"}>
      <p className={"font-bold text-center"}>Login</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          {message !== "" ? (
            <p className={"text-sm font-medium text-destructive"}>{message}</p>
          ) : null}

          <Button type="submit" className={"w-full"}>
            Login
          </Button>
        </form>
      </Form>

      <div className={"w-full flex flex-row justify-center mt-2"}>
        <Link href={"/signup"} className={"underline text-sm p-3 mx-auto"}>
          Signup
        </Link>
      </div>
    </div>
  );
}
