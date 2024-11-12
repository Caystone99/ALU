import { Profile } from '@/store/profile.store';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';


const ProfileList = ({ profiles, setProfile, setModal }: { profiles: Profile[], setProfile:any, setModal:any }) => {
  return (
    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {profiles.length > 0 ? (
        profiles.map((profile, id) => (
          <div
            className='animate__animated animate__zoomIn border rounded-md p-4 flex flex-col space-y-4 md:rounded-lg'
            key={id}
          >
            <div className='flex flex-row items-center space-x-4'>
              <div className='flex flex-col items-center space-y-1 relative'>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className='text-xs rounded-full w-20 h-20 bg-white border text-center'
                />
                <h5
                  className={`inline-block px-3 text-xs py-1 rounded-full font-bold absolute -bottom-4 ${
                    profile.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {profile.status}
                </h5>
              </div>

              <div className='flex flex-col space-y-2 items-start'>
                <span className='flex flex-col'>
                  <h4 className='text-[10px] font-bold text-gray-400'>FULL NAME</h4>
                  <p className='text-sm font-bold'>{profile.name}</p>
                </span>
                <span className='flex flex-col'>
                  <h4 className='text-[10px] font-bold text-gray-400'>EMAIL ADDRESS</h4>
                  <p className='text-sm font-bold'>{profile.email}</p>
                </span>
                <span className='flex flex-col'>
                  <h4 className='text-[10px] font-bold text-gray-400'>ROLE</h4>
                  <p className='text-sm font-bold'>{profile.role}</p>
                </span>
              </div>
            </div>

            <div className='flex flex-row self-end space-x-2'>
              <button className='bg-blue-500 rounded-md py-1 px-4 text-white font-bold text-sm hover:bg-blue-600' onClick={()=>{
                setModal('edit'); setProfile(profile.email)}
              }>
                Edit
              </button>
              <button className='bg-red-500 py-1 px-4 rounded-md text-white font-bold text-sm hover:bg-red-600' onClick={()=> {
                setModal('delete'); setProfile(profile.email);
              }}>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className='col-span-full text-center text-gray-500'>
          No profiles found.
        </div>
      )}
    </div>
  );
};

export default ProfileList;