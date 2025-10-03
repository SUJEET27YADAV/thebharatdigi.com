"use client";
import React, { useActionState, useEffect, useState } from 'react'
import CopyIcon from "@mui/icons-material/ContentCopy";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";

interface PassgenPageProps{
  action: (
    prevState: { message: string,password:string } | undefined,
    formData: FormData
  ) => Promise<{ message: string,password:string} | undefined>;
}

const initialState = {message:'',password:''};

export default function PassgenPage({action}:PassgenPageProps) {
  const [state,formAction,pending] = useActionState(action,initialState);
  const [showPass, setShowPass] = useState(false);

  return (
    <main className='w-full flex flex-col items-center gap-4 px-6 py-20 sm:p-20'>
      <h1 className='text-2xl 2xstext-3xl xs:text-4xl font-bold'>Password Generator</h1>
      <div className='w-full max-w-md space-y-3'>
      <form action={formAction} className='w-full flex flex-col items-center gap-3'>
        <p className={`min-h-6 font-bold text-sm ${state?.message.includes('successfully')?'text-green-500':'text-red-500'}`}>{state?.message??''}</p>
        <div className='w-full'>
          <label htmlFor='passlen'>Password Length <span className='text-[10px]'>( Min: 10 ) :</span></label>
          <input type="number" name="passlen" id="passlen" required className='block w-full p-2 outline-none border border-zinc-600 rounded-md'/>
        </div>
        <button title="Submit Button" type="submit" className='p-2 font-bold rounded-md bg-blue-500 hover:bg-blue-600'>Generate</button>
      </form>
      <h2 className='w-full flex items-center justify-between text-lg font-bold'>
        <span>Generated Password :</span>
        <span onClick={()=>{navigator.clipboard.writeText(state?.password??'')}} className="p-2 flex items-center justify-center text-xl cursor-pointer bg-zinc-900 hover:bg-zinc-600 rounded-md">
          <CopyIcon fontSize="inherit"/>
        </span>
      </h2>
      <div className="relative w-full border border-zinc-600 rounded-md">
        <input
          title='Show generated password'
          type={showPass?"text":"password"}
          value={state?.password??''}
          placeholder=''
          readOnly
          className='w-full h-full px-2 py-2.5 outline-none text-xs'
          />
        <span onClick={()=>{setShowPass(!showPass)}} className="absolute top-0 right-0 h-full p-2 flex items-center justify-center text-xl cursor-pointer bg-zinc-900 hover:bg-zinc-600 rounded-md">
          {showPass?<HideIcon fontSize='inherit'/>:<ShowIcon fontSize="inherit"/>}
        </span>
      </div>
      </div>
    </main>
  )
}