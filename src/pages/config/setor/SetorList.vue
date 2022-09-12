<template>
    <q-page padding separator="true">
        <div class="row justify-center">
            <q-list
                bordered
                class="rounded-borders
                    col-md-6 col-sm-10 col-xs-12
                    q-gutter-y-md">
                <q-item-label
                    header
                    class="row
                        justify-between
                        items-center
                        text-weight-medium text-subtitle1"
                    >Lista de Setores <q-spacer />
                    <q-btn
                        v-if="$q.platform.is.desktop"
                        label="novo"
                        icon="mdi-plus"
                        color="primary"
                        :to="{ name: 'setor-form' }"
                    />
                </q-item-label>

                <q-separator spaced />

                <q-item v-for="setor in setorStore.setores" :key="setor.id">
                    <q-item-section>
                        <q-item-label>
                            <span class="text-grey-8">{{ setor.name }}</span>
                        </q-item-label>
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
                                @click="handleRemoveSetor(setor)"
                            />
                            <q-btn
                                class="gt-xs"
                                size="12px"
                                flat
                                dense
                                round
                                icon="edit"
                                :to="{
                                    name: 'setor-form',
                                    params: { id: setor.id },
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
                :to="{ name: 'setor-form' }"
            ></q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import useNotify from "src/composable/useNotify";
import { useSetorStore } from "src/stores/setor-store";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    name: "SetoresListPage",
    setup() {
        const $q = useQuasar();
        const setorStore = useSetorStore();
        const loading = ref(false);
        const { notifyError, notifySuccess } = useNotify();

        const handleListaSetores = async () => {
            try {
                loading.value = true;
                await setorStore.list();
            } catch (error) {
                notifyError(error.message);
            } finally {
                loading.value = false;
            }
        };

        const handleRemoveSetor = (setor) => {
            try {
                $q.dialog({
                    title: "Confirme",
                    message: `Você realmente quer excluir ${setor.name}`,
                    cancel: true,
                    persistent: true,
                }).onOk(async () => {
                    await setorStore.remove(setor.id);
                    notifySuccess("Deletado com sucesso");
                    handleListaSetores();
                });
            } catch (error) {
                notifyError(error.message);
            }
        };

        onMounted(() => handleListaSetores());

        return { setorStore, loading, handleRemoveSetor };
    },
});
</script>

