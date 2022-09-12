<template>
    <q-page padding>
        <div class="row justify-center">
            <q-table
                class="col-12"
                title="Lista de provetos"
                :loading="loading"
                :columns="columns"
                :rows="proventoStore.proventos"
                row-key="id"
            >
                <template v-slot:top>
                    <div class="text-h6">Proventos</div>
                    <q-space></q-space>
                    <q-btn
                        v-if="$q.platform.is.desktop"
                        label="novo"
                        icon="mdi-plus"
                        color="primary"
                        :to="{ name: 'provento-form' }"
                    />
                </template>
                <template v-slot:body-cell-acoes="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn
                            icon="mdi-pencil-outline"
                            color="info"
                            dense
                            :to="{
                                name: 'provento-form',
                                params: { id: props.row.id },
                            }"
                        >
                            <q-tooltip> Editar </q-tooltip>
                        </q-btn>
                        <q-btn
                            icon="mdi-delete-outline"
                            color="negative"
                            dense
                            @click="handleRemoveProvento(props.row)"
                        >
                            <q-tooltip> Deletar </q-tooltip>
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
                v-if="$q.platform.is.mobile"
                fab
                icon="mdi-plus"
                color="primary"
                :to="{ name: 'provento-form' }"
            ></q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useProventoStore } from "src/stores/provento-store";
import { columns } from "./table";

export default defineComponent({
    name: "ProventoListPage",
    setup() {
        const proventoStore = useProventoStore();
        const loading = ref(false);
        const handleRemoveProvento = (provento) => {};
        return { columns, proventoStore, loading, handleRemoveProvento };
    },
});
</script>
