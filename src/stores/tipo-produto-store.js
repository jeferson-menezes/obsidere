import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";

const { supabase } = useSupabase();

export const useTipoProdutoStore = defineStore({
    id: "tipoProduto",
    state: () => ({
        tipos: [],
        classesText: {
            RENDA_FIXA: "Renda Fixa",
            RENDA_VARIAVEL: "Renda Variável"
        }
    }),
    getters: {
        classeText() {
            return classe => this.classesText[classe];
        }
    },
    actions: {
        async list() {
            const { data, error } = await supabase
                .from("type-product")
                .select("*");

            if (error) throw error;
            this.tipos = data;
            return data;
        },
        async post(tipo) {
            const { data, error } = await supabase
                .from("type-product")
                .insert([tipo]);

            if (error) throw error;
            return data;
        },
        async getById(id) {
            const { data, error } = await supabase
                .from("type-product")
                .select("*")
                .eq("id", id);

            if (error) throw error;
            return data[0];
        },
        async update(tipo) {
            const { data, error } = await supabase
                .from("type-product")
                .update([tipo])
                .match({ id: tipo.id });

            if (error) throw error;
            return data;
        },
        async remove(id) {
            const { data, error } = await supabase
                .from("type-product")
                .delete()
                .match({ id });
        }
    }
});
