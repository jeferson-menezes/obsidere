<template>
    <div class="row justify-center items-center content-start">
        <q-list bordered class="rounded-borders">
            <q-item-label header>Lista de Tipos de Produtos</q-item-label>

            <q-item>
                <q-item-section top>
                    <q-item-label lines="1">
                        <span class="text-grey-8">FIIS</span>
                    </q-item-label>
                </q-item-section>

                <q-item-section top side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn
                            class="gt-xs"
                            size="12px"
                            flat
                            dense
                            round
                            icon="delete"
                        />
                        <q-btn
                            class="gt-xs"
                            size="12px"
                            flat
                            dense
                            round
                            icon="edit"
                        />
                    </div>
                </q-item-section>
            </q-item>

            <q-separator spaced />

            <q-item>
                <q-item-section top>
                    <q-item-label lines="1">
                        <span class="text-grey-8">Ações</span>
                    </q-item-label>
                </q-item-section>

                <q-item-section top side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn
                            class="gt-xs"
                            size="12px"
                            flat
                            dense
                            round
                            icon="delete"
                        />
                        <q-btn
                            class="gt-xs"
                            size="12px"
                            flat
                            dense
                            round
                            icon="edit"
                        />
                    </div>
                </q-item-section>
            </q-item>

            <q-separator spaced />
        </q-list>
    </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useTipoProdutoStore } from "src/stores/tipo-produto-store";

export default defineComponent({
    name: "TipoProduto",
    setup() {
        const tipoStore = useTipoProdutoStore();
        const handleListaTipos = async () => {
            await tipoStore.listar();
        };
        onMounted(() => handleListaTipos());
        return { tipoStore };
    },
});
</script>

