import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";

const { supabase } = useSupabase();

export const useProventoStore = defineStore({
    id: "provento",

    state: () => ({
        proventos: []
    }),

    actions: {
        async getById(id) {
            const { data, error } = await supabase
                .from("earning")
                .select("*")
                .eq("id", id);

            if (error) throw error;
            return data[0];
        },

        async post(provento) {
            const { data, error } = await supabase
                .from("earning")
                .insert([provento]);

            if (error) throw error;
            return data;
        }
    }
});
