import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase.storage";

interface PersonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
    firstName: 'AA',
    lastName: 'BB',

    setFirstName: (value: string) => set({ firstName: value }, false, 'setFirstName'),
    setLastName: (value: string) => set({ lastName: value }, false, 'setLastName'),
});


export const usePersonStore = create<PersonState & Actions>()(
    persist(
        devtools(storeApi),
        { name: 'person-storage', storage: firebaseStorage }
    )

) 