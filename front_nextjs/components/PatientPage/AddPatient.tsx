"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { auth, firestore } from "@/app/firebase";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import myAxios from "@/lib/axios.config";
import { toast } from "react-toastify";
import { useState } from "react";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
import { REGISTER_URL } from "@/lib/apiEndPoints";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export function AddPatient({ user }: { user: CustomUser }) {
  // const session = (await getServerSession(authOptions)) as CustomSession;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: z.infer<typeof FormSchema>) =>{
    console.log(data);
    const data1 = {
      name: data.name,
      email: data.email,
      password: data.password,
      role :"patient",
      id_medecin : user._id,
      status : "In progress"
     
    }
    setLoading(true);
    try {
      const res = await myAxios.post(REGISTER_URL, data1);
      console.log("Response: ", res.data);
      const response = res.data;
      setLoading(false);
      console.log(response);      

      if (response?.status === 201) {
        toast.success("Account created successfully!");
        // Uncomment the following line if you want to navigate back
        router.push("/Patient");
      }
    } catch (err : any) {
      setLoading(false);
      if (err.esponse?.status === 422) {
        toast.error("Something went wrong. Please try again!");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
    // await myAxios
    //   .post(REGISTER_URL , data1)
    //   .then((res) => {
    //     console.log("aaaaaaaaaaaaaaa"+ res.data);
    //     const response = res.data;
    //     setLoading(false);
    //     console.log(response);
    //     if (response?.status == (201)) {
        
    //         toast.success("Account created successfully!.");
           
    //     }
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     if (err.response?.status == 422) {
    //       toast.error("Something went wrong.please try again!");
    //     }
    //   });
      // router.back();
    
  };


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <div className="grid grid-cols-2">
          <div className="grid grid-flow-row gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Set the name of the patient" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                    <Input placeholder="Set the email of the patient" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display email.
                  </FormDescription>
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
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className=" bg-gradient-to-br from-blue-300 via-blue-500 to-blue-600"
            >
              {loading ? "Processing.." : "Add Patient"}
            </Button>
          </div>
          <div className="flex justify-end">
            <Image
              src="/Add User-pana.svg"
              width={400}
              height={250}
              alt="person"
            />
          </div>
        </div>
        
      </form>
    </Form>
  );
}
