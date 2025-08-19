import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl = import.meta.env.VITE_FIREBASE_URL;

const storageAPi: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        try {
            const data = await fetch(`${firebaseUrl}/${name}.json`).then(res => res.json());
            // Viene como un objeto, pero zustand necesita un string, por eso se utiliza el stringify
            return JSON.stringify(data);
        } catch(error){
            throw error;
        }



    },
    setItem: async function (name: string, value: string): Promise<void> {
        // Se almacena como un objeto
        const data = await fetch(`${firebaseUrl}/${name}.json`,{
            method: 'PUT',
            body: value
        }).then(res => res.json());
        console.log(data);
        return;
    },
    removeItem: function (name: string): void | Promise<void> {
        console.log('removeItem', name)
    }
}

export const firebaseStorage = createJSONStorage(() => storageAPi)