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
                    >Lista de Eventos <q-spacer />
                    <q-btn
                        v-if="$q.platform.is.desktop"
                        label="novo"
                        icon="mdi-plus"
                        color="primary"
                        :to="{ name: 'evento-form' }"
                    />
                </q-item-label>

                <q-separator spaced />

                <q-item v-for="evento in eventoStore.eventos" :key="evento.id">
                    <q-item-section>
                        <q-item-label lines="3"
                            >{{ evento.name }}
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
                                @click="handleRemoveEvento(evento)"
                            />
                            <q-btn
                                class="gt-xs"
                                size="12px"
                                flat
                                dense
                                round
                                icon="edit"
                                :to="{
                                    name: 'evento-form',
                                    params: { id: evento.id },
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
                :to="{ name: 'evento-form' }"
            ></q-btn>
        </q-page-sticky>
    </q-page>
</template>
<script>
import { useQuasar } from "quasar";
import useNotify from "src/composable/useNotify";
import { useEventoStore } from "src/stores/evento-store";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    name: "EventoListPage",

    setup() {
        const $q = useQuasar();
        const eventoStore = useEventoStore();
        const loading = ref(false);
        const { notifyError, notifySuccess } = useNotify();

        const handleListaEventos = async () => {
            try {
                loading.value = true;
                await eventoStore.list();
            } catch (error) {
                notifyError(error.message);
            } finally {
                loading.value = false;
            }
        };

        const handleRemoveEvento = async (evento) => {
            try {
                $q.dialog({
                    title: "Confirme",
                    message: `Você realmente quer excluir ${evento.name}`,
                    cancel: true,
                    persistent: true,
                }).onOk(async () => {
                    await eventoStore.remove(evento.id);
                    notifySuccess("Deletado com sucesso");
                    handleListaEventos();
                });
            } catch (error) {
                notifyError(error.message);
            }
        };

        onMounted(() => handleListaEventos());

        return {
            loading,
            eventoStore,
            handleRemoveEvento,
        };
    },
});
</script>