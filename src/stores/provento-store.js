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
        },

        async list() {
            const { data, error, count } = await supabase
                .from("earning")
                .select("*, product_id(code, name), event_id(name)", {
                    count: "exact"
                })
                .range(0, 3);

            console.log(count);
            if (error) throw error;
            this.proventos = data;
            return data;
        },

        async remove(id) {
            const { data, error } = await supabase
                .from("earning")
                .delete()
                .match({ id });

            if (error) throw error;
            return data;
        },

        async update(provento) {
            const { data, error } = await supabase
                .from("earning")
                .update([provento])
                .match({ id: provento.id });

            if (error) throw error;
            return data;
        }
    }
});
