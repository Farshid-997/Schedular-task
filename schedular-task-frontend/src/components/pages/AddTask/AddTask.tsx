/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { Label } from "@/components/ui/label";
import InputTextArea from "@/components/Forms/InputTextArea";
import { useAddTaskMutation } from "@/redux/features/api/task/taskApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import axios from "axios";

type ITask = {
  title: string;
  description: string;
  date: string;
  time: string;
};

export default function AddTask() {
  const [addTask] = useAddTaskMutation();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data:ITask) => {
   console.log("data",data)
    try {
      setLoading(true);

      const dateTimeString = `${data.date}T${data.time}:00Z`;
      const formattedDate = new Date(dateTimeString).toISOString();

      const formattedData = {
        ...data,
        date: formattedDate,
      };

      const res = await axios.post('http://localhost:7000/api/V1/task/create-task', formattedData);

      console.log("res",res);
      toast.success("Task Added successfully");
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
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


          <h1 className="my-3  pl-4 text-3xl font-bold mt-20 ">
            {" "}
            Create your Task
          </h1>

         
        </div>

        <Form submitHandler={onSubmit}>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-1">
            <div className="mt-3 w-full px-4 sm:col-span-2 xl:col-span-1">
              <Label htmlFor="title">Title </Label>
              <FormInput name="title" placeholder="Write the title" />
            </div>

            <div className="mt-3 w-full px-4 sm:col-span-2 xl:col-span-1">
              <Label htmlFor="date">Date </Label>
              <FormInput name="date" type="date" />
            </div>

            <div className="mt-3 w-full px-4 sm:col-span-2 xl:col-span-1">
              <Label htmlFor="time">Time</Label>
              <FormInput name="time" type="time" />
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
      </div>
    </>
  );
}
