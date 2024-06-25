"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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

import Image from "next/image";
import myAxios from "@/lib/axios.config";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
import { API_URL, REGISTER_URL } from "@/lib/apiEndPoints";
import { useRouter } from "next/navigation";
import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const FormSchema = z.object({
  weight: z.string(),
  height: z.string(),
  gender: z.string(),
  city: z.string(),
  marital_status: z.string(),
  date_of_birth: z.string(),
  family_history: z.array(z.string()).nullable(),
  personal_history: z.array(z.string()).nullable(),
});

export function CompleteDossier({ user, id }: { user: CustomUser, id: String }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gender: "",
      city: "",
      marital_status: "",
      date_of_birth: "",
      family_history: [],
      personal_history: [],
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  //   const { control, handleSubmit } = useForm();
  const [familyHistory, setFamilyHistory] = useState<string[]>([]);
  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [personal_history, setpersonal_history] = useState<string[]>([]);
  const [currentEntry2, setCurrentEntry2] = useState<string>("");

  const addFamilyHistory = () => {
    if (currentEntry.trim() !== "") {
      setFamilyHistory([...familyHistory, currentEntry]);
      setCurrentEntry("");
    }
  };
  const addpersonal_history = () => {
    if (currentEntry2.trim() !== "") {
      setpersonal_history([...personal_history, currentEntry2]);
      setCurrentEntry2("");
    }
  };
    
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    // Integer.paseInt(data.weight)
    const da = parseFloat(data.weight);
    const da1 = parseFloat(data.height);

    const data1 = {
      weight: da,
      height: da1,
      gender: data.gender,
      city: data.city,
      marital_status: data.marital_status,
      date_of_birth: data.date_of_birth,
      family_history: familyHistory,
      personal_history: personal_history,
    };
    // console.log(data1);
    try {
      const res = await myAxios.post(
        API_URL+ `/dossier/completeDossier?id=${id}`,
        data1,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Response: ", res.data);
      const response = res.data;
      setLoading(false);
      console.log(response);
      if (response?.status === 201) {
        toast.success("Dossier completed successfully!");
        // Uncomment the following line if you want to navigate back
        router.push("/Patient");
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      if (err.esponse?.status === 422) {
        toast.error("Something went wrong. Please try again!");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 "
      >
        <div className="grid grid-cols-2">
          <div className="grid grid-flow-row gap-4">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      placeholder="Enter the weight of the patient"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      placeholder="Enter the height of the patient"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender :</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City :</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the city of the patient"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marital_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status :</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Marital Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the date of birth of the patient"
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="family_history"
              render={({ field }) => (
                <div>
                  <label>Family History</label>
                  <div className="flex items-center">
                    <Input
                      type="text"
                      placeholder="Enter the family history of the patient"
                      value={currentEntry}
                      onChange={(e) => setCurrentEntry(e.target.value)}
                    />
                    <button
                      type="button"
                      className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      onClick={addFamilyHistory}
                    >
                      Add
                    </button>
                  </div>
                  <span>[</span>
                  {familyHistory.map((entry, index) => (
                    <React.Fragment key={index}>
                      <span className="p-2">{entry}</span>
                      {index < familyHistory.length - 1 && <span>, </span>}
                    </React.Fragment>
                  ))}
                  <span>]</span>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="personal_history"
              render={({ field }) => (
                <div>
                  <label>Personal History</label>
                  <div className="flex items-center">
                    <Input
                      type="text"
                      placeholder="Enter the family history of the patient"
                      value={currentEntry2}
                      onChange={(e) => setCurrentEntry2(e.target.value)}
                    />
                    <button
                      type="button"
                      className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      onClick={addpersonal_history}
                    >
                      Add
                    </button>
                  </div>
                  <span>[</span>
                  {personal_history.map((entry, index) => (
                    <React.Fragment key={index}>
                      <span className="p-2">{entry}</span>
                      {index < personal_history.length - 1 && <span>, </span>}
                    </React.Fragment>
                  ))}
                  <span>]</span>
                </div>
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
              // className="w-full"
              src="/Add User-pana.svg"
              alt="person"
              width={600}
              height={500}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
