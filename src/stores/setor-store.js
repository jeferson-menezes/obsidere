import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";

const { supabase } = useSupabase();

export const useSetorStore = defineStore({
    id: "setor",
    state: () => ({ setores: [] }),
    actions: {
        async list() {
            const { data, error } = await supabase
                .from("sector")
                .select("*");

            if (error) throw error;
            this.setores = data;
            return data;
        },

        async post(setor) {
            const { data, error } = await supabase
                .from("sector")
                .insert([setor]);

            if (error) throw error;
            return data;
        },

        async getById(id) {
            const { data, error } = await supabase
                .from("sector")
                .select("*")
                .eq("id", id);

            if (error) throw error;
            return data[0];
        },

        async update(setor) {
            const { data, error } = await supabase
                .from("sector")
                .update([setor])
                .match({ id: setor.id });

            if (error) throw error;
            return data;
        },

        async remove(id) {
            const { data, error } = await supabase
                .from("sector")
                .delete()
                .match({ id });
        }
    }
});
