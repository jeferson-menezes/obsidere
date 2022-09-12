<template>
    <q-page padding>
        <div class="row justify-center">
            <q-table
                class="col-12"
                title="Lista de ativos"
                :loading="loading"
                :columns="columns"
                :rows="produtoStore.produtos"
                row-key="id"
            >
                <template v-slot:top>
                    <div class="text-h6">Lista de ativos</div>
                    <q-space></q-space>
                    <q-btn
                        v-if="$q.platform.is.desktop"
                        label="novo"
                        icon="mdi-plus"
                        color="primary"
                        :to="{ name: 'produto-form' }"
                    />
                </template>
                <template v-slot:body-cell-image_url="props">
                    <q-td :props="props">
                        <q-avatar v-if="props.row.image_url">
                            <img :src="props.row.image_url" />
                        </q-avatar>
                        <q-avatar
                            v-else
                            color="grey"
                            text-color="white"
                            icon="mdi-image-off"
                        />
                    </q-td>
                </template>
                <template v-slot:body-cell-acoes="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn
                            icon="mdi-pencil-outline"
                            color="info"
                            dense
                            :to="{
                                name: 'produto-form',
                                params: { id: props.row.id },
                            }"
                        >
                            <q-tooltip> Editar </q-tooltip>
                        </q-btn>
                        <q-btn
                            icon="mdi-delete-outline"
                            color="negative"
                            dense
                            @click="handleRemoveProduto(props.row)"
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
                :to="{ name: 'produto-form' }"
            ></q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import useNotify from "src/composable/useNotify";
import { useProdutoStore } from "src/stores/produto-store";
import { defineComponent, onMounted, ref } from "vue";
import { columns } from "./table";

export default defineComponent({
    name: "ProdutoListPage",

    setup() {
        const $q = useQuasar();
        const produtoStore = useProdutoStore();
        const loading = ref(false);
        const { notifyError, notifySuccess } = useNotify();

        const handleListaProdutos = async () => {
            try {
                loading.value = true;
                await produtoStore.list();
            } catch (error) {
                notifyError(error.message);
            } finally {
                loading.value = false;
            }
        };

        const handleRemoveProduto = (produto) => {
            try {
                $q.dialog({
                    title: "Confirme",
                    message: `Você realmente quer excluir ${produto.name}`,
                    cancel: true,
                    persistent: true,
                }).onOk(async () => {
                    await produtoStore.remove(produto.id);
                    notifySuccess("Deletado com sucesso");
                    handleListaTipos();
                });
            } catch (error) {
                notifyError(error.message);
            }
        };

        onMounted(() => handleListaProdutos());

        return { columns, produtoStore, loading, handleRemoveProduto };
    },
});
</script>
