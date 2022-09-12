import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";

const { supabase } = useSupabase();

export const useEventoStore = defineStore({
    id: "evento",
    state: () => ({ eventos: [] }),
    actions: {
        async list() {
            const { data, error } = await supabase
                .from("event")
                .select("*");

            if (error) throw error;
            this.eventos = data;
            return data;
        },

        async post(evento) {
            const { data, error } = await supabase
                .from("event")
                .insert([evento]);

            if (error) throw error;
            return data;
        },

        async getById(id) {
            const { data, error } = await supabase
                .from("event")
                .select("*")
                .eq("id", id);

            if (error) throw error;
            return data[0];
        },

        async update(evento) {
            const { data, error } = await supabase
                .from("event")
                .update([evento])
                .match({ id: evento.id });

            if (error) throw error;
            return data;
        },

        async remove(id) {
            const { data, error } = await supabase
                .from("event")
                .delete()
                .match({ id });
        }
    }
});
