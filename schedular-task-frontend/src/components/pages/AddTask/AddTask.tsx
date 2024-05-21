/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { Label } from "@/components/ui/label";
import InputTextArea from "@/components/Forms/InputTextArea";

import toast from "react-hot-toast";
import { Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Loader } from "@/components/loader/Loader";
import { useCreateTaskMutation } from "@/redux/features/api/task/taskApi";

type ITask = {
  title: string;
  description: string;
  date: string;
  
};

export default function AddTask() {
  // const [createTask] = useCreateTaskMutation();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data:ITask) => {
   
    try {
      setLoading(true);

      const now = new Date();
      const timeString = now.toTimeString().split(' ')[0]; // "HH:MM:SS"

      // Combine date from input with current time
      const dateTimeString = `${data.date}T${timeString}Z`;
      const formattedDate = new Date(dateTimeString).toISOString();

      const formattedData = {
        ...data,
        date: formattedDate,
      };

    await axios.post('https://task-backend-flame.vercel.app/api/V1/task/create-task', formattedData);

     
      toast.success("Task Added successfully");
     
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-start">

        <div className="mt-[88px]  text-[#64748b] ml-[16px]">
            {" "} 
          <NavLink to="/"><Home /></NavLink>  
          </div>


          <h1 className="my-3  pl-4 text-3xl font-bold mt-20 font-sans">
            {" "}
            Create your Task
          </h1>

         
        </div>

        {loading ? (
        <Loader />
      ) : (
        <Form submitHandler={onSubmit}>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-1 font-sans">
            <div className="mt-3 w-full px-4 sm:col-span-2 xl:col-span-1">
              <Label htmlFor="title">Title </Label>
              <FormInput name="title" placeholder="Write the title" />
            </div>

            <div className="mt-3 w-full px-4 sm:col-span-2 xl:col-span-1">
              <Label htmlFor="date">Date </Label>
              <FormInput name="date" type="date" />
            </div>

            

            <div className="mt-3 w-full px-4 sm:col-span-2 xl:col-span-1">
              <Label htmlFor="blogText">Description</Label>
              <InputTextArea
                name="description"
                placeholder="Write the description"
              />
            </div>
          </div>

          <Button className="ml-4 mt-4 w-32  bg-blue-900 hover:bg-blue-900 text-white">
            Create
          </Button>
        </Form>
         )}
      </div>
    </>
  );
}
