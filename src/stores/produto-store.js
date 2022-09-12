import { defineStore } from "pinia";

import useSupabase from "src/boot/supabase";

const { supabase } = useSupabase();

export const useProdutoStore = defineStore({
    id: "produto",
    state: () => ({
        produtos: []
    }),
    actions: {
        async list() {
            const { data, error } = await supabase.from("product").select("*");

            if (error) throw error;
            this.produtos = data;
            return data;
        },

        async post(produto) {
            const { data, error } = await supabase
                .from("product")
                .insert([produto]);

            if (error) throw error;
            return data;
        },

        async getById(id) {
            const { data, error } = await supabase
                .from("product")
                .select("*")
                .eq("id", id);

            if (error) throw error;
            return data[0];
        },

        async update(produto) {
            const { data, error } = await supabase
                .from("product")
                .update([produto])
                .match({ id: produto.id });

            if (error) throw error;
            return data;
        },

        async remove(id) {
            const { data, error } = await supabase
                .from("product")
                .delete()
                .match({ id });
        }
    }
});
