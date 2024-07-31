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
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpSchema, SignUpSchema } from "@/app/signup/schema";
import { signup } from "@/app/signup/actions";

export default function Page() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpSchema) {
    const { message } = await signup(data);

    if (message == "success") {
      router.replace("/");
    } else {
      setMessage(message);
    }
  }

  return (
    <div className={"w-[500px] mx-auto rounded p-3 border my-3"}>
      <p className={"font-bold text-center"}>Signup</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            Create
          </Button>
        </form>
      </Form>

      <div className={"w-full flex flex-row justify-center mt-2"}>
        <Link href={"/login"} className={"underline text-sm p-3 mx-auto"}>
          Login
        </Link>
      </div>
    </div>
  );
}
