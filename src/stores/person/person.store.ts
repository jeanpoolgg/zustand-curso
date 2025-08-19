import { create, type StateCreator } from "zustand";
import { customSessionStorage } from "../storages/session-storage.storage";
import { persist } from "zustand/middleware";

interface PersonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState & Actions> = (set) => ({
    firstName: 'AA',
    lastName: 'BB',

    setFirstName: (value: string) => set(state => ({ firstName: value })),
    setLastName: (value: string) => set(state => ({ lastName: value })),
});


export const usePersonStore = create<PersonState & Actions>()(
    persist(storeApi, { name: 'person-storage', storage: customSessionStorage })

) 