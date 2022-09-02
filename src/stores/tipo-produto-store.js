import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useTipoProdutoStore = defineStore({
    id: "tipoProduto",

    state: () => ({
        counter: 0,
        tipos: []
    }),

    getters: {
        doubleCount: state => state.counter * 2
    },

    actions: {
        listar() {
            return api
                .get("tipo/produto")
                .then(({ data }) => (this.tipos = data));
        }
    }
});
