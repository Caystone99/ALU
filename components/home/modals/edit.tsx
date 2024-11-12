import { Profile, useProfileState } from "@/store/profile.store";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const Edit =({email, setModal} : {email:string, setModal:any})=> {
    const profiles = useProfileState(state => state.store);
    const editProfile = useProfileState(state=> state.update);

    const [profile, setProfile] = useState<Profile>({name:'', email:'', role:'', status:'', avatar:''})

    useEffect(()=>{
        let selected = profiles.find((profile) => profile.email === email);
        if(selected){
            setProfile({name: selected.name, avatar: selected.avatar, role:selected.role, email:selected.email, status:selected.status});
        } else {
            toast.error(`No profile matchig ${email}`);
        }        
    }, [])

    function handleChange(e:any) {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    }

    function handleAvatar(e:any){
        const file = e.target.files?.[0];
        if(file){
            const imageUrl = URL.createObjectURL(file);
            setProfile({ ...profile, avatar: imageUrl });
        }
    }

    function handleSubmit(e:any) {
        e.preventDefault();
        if(profile.email !== '' || profile.name !== '' || profile.avatar !== '' || profile.status !== '' || profile.role !== ''){
            editProfile(profile);
            toast.success(`${profile.email} has been updated successfully`);
        } else {
            toast.error('Please fill all fields');
        }  
    }

    return(
        <section className="w-screen h-screen flex flex-col items-center justify-center absolute inset-0 bg-gray-400 bg-opacity-70">

            <div className="animate__animated animate__bounceIn bg-white p-4 w-[80%] flex flex-col space-y-4 rounded-lg md:p-10 md:w-[500px] md:space-y-6 md:rounded-2xl">
                <div className="flex flex-row justify-between items-center">
                    <h4 className="font-bold text-lg ">Edit Profile</h4>  
                    <button onClick={()=>{setModal(null)}}>&#x2716; close</button>
                </div>
                <hr/> 

                <form className="flex flex-col space-y-2 md:space-y-6" onSubmit={handleSubmit}>
                    
                    {profile.avatar !== '' && <img src={profile.avatar} alt={profile.name} className="border rounded-full w-24 h-24 self-center"/>}

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="avatar" className="text-sm font-bold">Profile Avatar</label>
                        <input type="file" name="avatar" accept="image/*" className="border rounded-md outline-none py-1 px-4 font-semibold md:rounded-lg" onChange={handleAvatar}/>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="name" className="text-sm font-bold">Full Name</label>
                        <input type="text" name="name" className="border rounded-md outline-none py-1 px-4 font-semibold md:rounded-lg" onChange={handleChange} placeholder="Profile Name" value={profile.name}/>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="text-sm font-bold">Email Address</label> 
                        <input type='email' name='email' className="border rounded-md outline-none py-1 px-4 font-semibold md:rounded-lg" onChange={handleChange} placeholder="Profile Email Address" value={profile.email}/>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="role" className="text-sm font-bold">Role</label>
                        <div className="w-full border rounded-md py-1 px-4 md:rounded-lg">
                            <select className="w-full py-1 font-semibold bg-transparent outline-none" onChange={handleChange} value={profile.role} name='role'>
                                <option value=''> Select Role </option>
                                <option value='Admin'> Admin </option>
                                <option value='User'> User </option>
                                <option value='Guest'> Guest </option>
                            </select>   
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="status" className="text-sm font-bold">Status</label>
                        <div className="w-full border rounded-md py-1 px-4 md:rounded-lg">
                            <select className="w-full py-1 font-semibold bg-transparent outline-none" onChange={handleChange} value={profile.status} name="status">
                                <option value=''> Select Status </option>
                                <option value='Active'> Active </option>
                                <option value='Inactive'> Inactive</option>
                            </select>   
                        </div>
                    </div>

                    <button className="bg-blue-500 font-bold text-white rounded-md py-1 hover:bg-blue-600 md:rounded-lg" type='submit'>Submit</button>
                </form>             
            </div>

            <Toaster/>
                    
        </section>
    );
}

export default Edit;