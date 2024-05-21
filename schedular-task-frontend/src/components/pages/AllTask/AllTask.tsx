/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnDef } from "@tanstack/react-table";
import { Home, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import {
  useAllTaskQuery,
  useDeleteTaskMutation,
} from "@/redux/features/api/task/taskApi";

import toast from "react-hot-toast";

export default function AllTask() {
  

  type Task = {
    id: string;
    title: string;
    description: string;
    status: string;
    date: string;
  };

  const { data } = useAllTaskQuery({});
  const [deleteTask] = useDeleteTaskMutation();

  const tasks = data?.data || [];

  

  const deleteHandler = async (id: string) => {
    try {
     
      const res = await deleteTask(id);
      if (res) {
        toast.success("Task Deleted successfully");
       
      }
    } catch (err: any) {
      toast.error(err.message);
    } 
  };

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },

    {
      accessorKey: "description",

      header: "Description",
    },

    {
      accessorKey: "status",

      header: "Status",

      cell: ({ row }) => (
        <span
          className={`px-4 py-1 rounded ${
            row.original.status === "complete" ? "bg-green-900 text-white" : ""
          }`}
        >
          {row.original.status}
        </span>
      ),
    },

    {
      accessorKey: "date",

      header: "Date",
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const tasks = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  deleteHandler(tasks?.id);
                }}
              >
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <div className="p-4">
        <div className="flex justify-start">
          <div className="mt-[47px]  text-[#64748b] ml-[16px]">
            {" "}
            <NavLink to="/">
              <Home />
            </NavLink>
          </div>

          <h1 className="my-3  pl-4 text-3xl font-bold mt-10 ">
            {" "}
            Create your Task
          </h1>
        </div>

        <NavLink to="/add-task">
          {" "}
          <Button className="mb-4 ml-2 w-28 p-2 bg-green-600 hover:bg-green-600 ">
            Create New Task
          </Button>{" "}
        </NavLink>

        
          <DataTable columns={columns} data={tasks} />
      
      </div>
    </>
  );
}
