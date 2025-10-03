import React from 'react'
import {generateSecurePassword} from "@/utils/passwordgen"
import PassgenPage from '../_components/passgenPage';

export default async function Page() {

  async function genAction(prevState: { message: string,password:string } | undefined,formData: FormData){
    "use server";
    try {
      const len = parseInt(formData.get('passlen') as string || '10');
      const password = await generateSecurePassword(len);
      return {message:'Password generated successfully',password};
    } catch (err) {
      console.error(err);
      return {message:'Error generating password',password:''};
    }
  }
  return <PassgenPage action={genAction}/>
}