<template>
    <q-page padding separator="true">
        <div class="row justify-center">
            <q-list
                bordered
                class="
                    rounded-borders
                    col-md-6 col-sm-10 col-xs-12
                    q-gutter-y-md
                "
            >
                <q-item-label
                    header
                    class="
                        row
                        justify-between
                        items-center
                        text-weight-medium text-subtitle1
                    "
                    >Lista de Tipos de Produtos <q-spacer />
                    <q-btn
                        v-if="$q.platform.is.desktop"
                        label="novo"
                        icon="mdi-plus"
                        color="primary"
                        :to="{ name: 'tipo-produto-form' }"
                    />
                </q-item-label>

                <q-separator spaced />

                <q-item v-for="tipo in tipoStore.tipos" :key="tipo.id">
                    <q-item-section>
                        <q-item-label lines="3">{{ tipo.name }} </q-item-label>
                        <q-item-label caption>{{ classeText(tipo.classe) }}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <div class="text-grey-8s">
                            <q-btn
                                class="gt-xs"
                                size="12px"
                                flat
                                dense
                                round
                                icon="delete"
                                @click="handleRemoveTipo(tipo)"
                            />
                            <q-btn
                                class="gt-xs"
                                size="12px"
                                flat
                                dense
                                round
                                icon="edit"
                                :to="{
                                    name: 'tipo-produto-form',
                                    params: { id: tipo.id },
                                }"
                            />
                        </div>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
                v-if="$q.platform.is.mobile"
                fab
                icon="mdi-plus"
                color="primary"
                :to="{ name: 'tipo-produto-form' }"
            ></q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import useNotify from "src/composable/useNotify";
import { useTipoProdutoStore } from "src/stores/tipo-produto-store";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    name: "TipoProdutoListPage",
    setup() {
        const $q = useQuasar();
        const tipoStore = useTipoProdutoStore();
        const loading = ref(false);
        const { notifyError, notifySuccess } = useNotify();

        const handleListaTipos = async () => {
            try {
                loading.value = true;
                await tipoStore.list();
            } catch (error) {
                notifyError(error.message);
            } finally {
                loading.value = false;
            }
        };

        const handleRemoveTipo = (tipo) => {
            try {
                $q.dialog({
                    title: "Confirme",
                    message: `Você realmente quer excluir ${tipo.name}`,
                    cancel: true,
                    persistent: true,
                }).onOk(async () => {
                    await tipoStore.remove(tipo.id);
                    notifySuccess("Deletado com sucesso");
                    handleListaTipos();
                });
            } catch (error) {
                notifyError(error.message);
            }
        };

        onMounted(() => handleListaTipos());

        return {
            tipoStore,
            loading,
            handleRemoveTipo,
            classeText: tipoStore.classeText,
        };
    },
});
</script>

