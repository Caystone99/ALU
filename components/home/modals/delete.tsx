import { useProfileState, Profile } from "@/store/profile.store";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";

const Delete =({email, setModal} : {email:string, setModal:any})=>{
    const deleteProfile = useProfileState(state=> state.delete);    

    function handleDelete() {
        deleteProfile(email);
        toast.success(`${email} has been deleted`);
        setModal(null);       
    }

    return(
        <section className="w-screen h-screen flex flex-col items-center justify-center absolute inset-0 bg-gray-400 bg-opacity-70">

            <div className="animate__animated animate__rubberBand bg-white p-4 w-[80%] flex flex-col items-center space-y-2 rounded-lg md:p-8 md:w-[300px] md:rounded-2xl">
                <h4 className="font-bold text-center">Are you sure you want to delete this profile?</h4>
                <p className="text-sm">{email}</p>
                <div className="flex flex-row space-x-2 w-full items-center pt-4 justify-between">
                    <button className="shadow-sm flex-auto border font-bold rounded-md px-6 py-1 md:rounded-lg" onClick={()=>{setModal(null)}}>Cancel</button>
                    <button className="shadow-sm flex-auto font-bold rounded-md px-6 py-1 text-white bg-red-500 hover:bg-red-600 md:rounded-lg" onClick={handleDelete}>Delete</button>
                </div>
            </div>

            <Toaster/>
                    
        </section>
    );
}

export default Delete;