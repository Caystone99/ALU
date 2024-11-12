import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


export interface Profile {
    name: string;
    email: string;
    role: string;
    status: string;
    avatar: string;
}

interface ProfileState {
    store: Profile[];
    setProfiles: (profiles: Profile[]) => void;
    add: (profile: Profile) => void;
    update: (profile: Profile) => void;
    delete: (email: string) => void;
    clear: ()=> void;
}

export const useProfileState = create<ProfileState>()(devtools(
    persist(
        (set, get) => ({
            store: [],

            setProfiles: (profiles) => set({store: profiles}), 

            add: (profile) => { 
                const { store } = get();

                const profileExists = store.some((item) => item.email === profile.email);

                if(!profileExists) {
                    set({store: [...store, profile]})
                }
            },

            update: (profile) => {
                const { store } = get();

                const updatedStore = store.map((item) => {
                    if(item.email === profile.email) {
                        return {...item, ...profile};
                    }
                    return item;
                });

                set({store: updatedStore});


            },

            delete: (email) => {
                const { store } = get();

                const newStore = store.filter((profile) => profile.email !== email);

                set({store: newStore});
            },

            clear: ()=> set({store: []})
        }),
        {name: 'profile_store'}
    )
));