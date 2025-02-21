"use client"
import NestedCheckbox from "@/components/CheckBox";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Home() {

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: "data",
      emailId: "data",
      password: "data",
    },
  });

  const handleClick = () =>{
    axios.get('http://localhost:8000/login')
  }
  const onSubmit = (data:any) => {
    console.log("Form Submitted:", data);
  };
  return (
    <div className="w-full flex items-center justify-center min-h-screen ">
     {/* <NestedCheckbox /> */}
     <div className="">

     <button onClick={()=>{handleClick()}}>Click me</button>
     <form onSubmit={handleSubmit(onSubmit)}>
     <span  className="w-full grid grid-rows-4 gap-4 bg-red-500">
        <input {...register("fullName")} className="border p-2 rounded text-black" placeholder="Full Name" />
        <input {...register("emailId")} type="email" className="border p-2 rounded text-black" placeholder="Email ID" />
        <input {...register("password")} type="password" className="border p-2 rounded text-black" placeholder="Password" />
        <input type="submit" className="p-2 bg-green-500 text-white rounded cursor-pointer" />
     </span>
      </form>
     </div>
    </div>
  );
}
