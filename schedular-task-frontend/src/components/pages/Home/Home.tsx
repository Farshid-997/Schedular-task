import { Button } from "@/components/ui/button";
import { PackageCheck } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>

      <div className="flex justify-center">

      <h1 className="text-4xl text-center mt-20 font-bold text-blue-600">Your Task Application</h1>

 <div className=" mt-20  text-[#64748b]"><PackageCheck /></div>

      </div>
      
<div className="flex justify-center mt-24">
<NavLink to="/add-task"><Button className="mr-10 bg-green-700 hover:bg-green-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100">Create Task </Button></NavLink>   

<NavLink to="/all-task"><Button className=" bg-red-700 hover:bg-red-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100">All Task</Button></NavLink>

</div>
     
    </div>
  )
}
