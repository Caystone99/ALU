import { Profile, useProfileState } from '@/store/profile.store';
import { useEffect, useState } from 'react';
import ProfileList from './ui/profile.list';
import Add from './modals/add';
import Delete from './modals/delete';
import Edit from './modals/edit';
import { Toaster } from 'sonner';

function Body(){
    const profiles = useProfileState(state => state.store);  
    const setProfiles = useProfileState(state => state.setProfiles);
    
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Profile[]>([]);
    const [profile, setProfile] = useState<string>('');
    const [modal, setModal] = useState<'add' | 'edit' | 'delete' | null>(null);

    const handleModal=()=>{
        switch(modal) {
            case 'add':
                return <Add setModal={setModal}/>;
            case 'delete':
                return <Delete email={profile} setModal={setModal}/>;
            case 'edit': 
                return <Edit email={profile} setModal={setModal}/>
            default:
                return null;
        }
    }

    const handleSearch=(e:any)=> {
        setQuery(e.target.value);
    }

    const fetchProfiles = async()=> {
        try{
            const response = await fetch('/profiles.json');
            if(!response.ok) throw new Error('Network Error');
            const data = await response.json();
            setProfiles(data);
        }catch(err:any){
            console.log('Error fetching profiles:', err);
        }
    }

    useEffect(() => {
        fetchProfiles();
        setLoading(false);
    }, [setProfiles]);

    useEffect(() => {
        let result = profiles.filter((profile) => profile.email.includes(query) || profile.name.includes(query));
        setResults(result);
    }, [query]);

    return(
        <>
            <section className='py-20 md:py-32'>
                <div className='mx-5 flex flex-col space-y-4 sm:space-y-8 sm:mx-auto sm:container md:px-10'>
                    <div className='flex flex-col items-start space-y-4 w-full sm:space-y-6'>
                        <h2 className='font-black text-2xl md:w-2/3 md:text-4xl lg:w-1/2 lg:text-6xl'>Alumunite User Management Dashboard</h2>
                        <p className='text-sm leading-loose md:text-base md:leading-loose md:w-2/3 lg:w-1/2'>
                            The application is a user management dashboard built with Next.js, showcasing a simple interface for displaying, adding, updating, and deleting user profiles.
                        </p>
                        <div className='flex flex-col w-full space-y-2 md:justify-between md:flex-row md:space-x-6 md:space-y-0'>
                            <input type='text' onChange={handleSearch} value={query} placeholder='Search by name or email address' className='w-full border rounded-md bg-transparent outline-none py-2 px-3 md:rounded-lg md:w-[400px]'/>
                            <button className='bg-gray-900 text-white font-bold text-sm px-6 py-2 rounded-md' onClick={()=>{setModal('add')}}>Add Profile</button>
                        </div>
                        <hr className='w-full'/>
                    </div>

                    {
                        query === '' ? (
                            <ProfileList profiles={profiles} setModal={setModal} setProfile={setProfile}/>
                        ) : (
                            <ProfileList profiles={results} setModal={setModal} setProfile={setProfile}/>
                        )
                    }              
                    
                </div>
                <Toaster/>
            </section>

            { handleModal() }

        </>
    );

}

export default Body;