<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                    {{ isUpdate ? "Atualizar" : "Cadastrar" }} provento
                </p>
            </div>

            <q-form
                class="col-md-6 col-sm-10 col-xs-11 q-gutter-y-md"
                ref="formRef"
                @submit.prevent="handleSubmit"
            >
                <q-input
                    v-model="form.date"
                    label="Data"
                    :rules="[(v) => !!v || 'Código is required']"
                >
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                            >
                                <q-date v-model="form.date" mask="DD/MM/YYYY">
                                    <div class="row items-center justify-end">
                                        <q-btn
                                            v-close-popup
                                            label="Selecionar"
                                            color="primary"
                                            flat
                                        />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>

                <q-input
                    label="Quantidade"
                    v-model="form.amount"
                    lazy-rules
                    mask="#"
                    reverse-fill-mask
                    :rules="[(v) => !!v || 'Código is required']"
                ></q-input>

                <q-input
                    prefix="R$"
                    mask="#,##"
                    fill-mask="0"
                    reverse-fill-mask
                    label="Valor unitário"
                    v-model="form.unitary_value"
                    lazy-rules
                    :rules="[(v) => !!v || 'Código is required']"
                ></q-input>

                <q-input
                    prefix="R$"
                    mask="#,##"
                    fill-mask="0"
                    reverse-fill-mask
                    label="Valor líquido"
                    v-model="form.net_value"
                    lazy-rules
                    :rules="[!!v || 'Nome is required']"
                ></q-input>

                <q-select
                    map-options
                    emit-value
                    option-value="id"
                    option-label="name"
                    v-model="form.event_id"
                    :options="eventoStore.eventos"
                    :rules="[(v) => v || 'Evento is required']"
                    label="Evento"
                ></q-select>

                <q-select
                    map-options
                    emit-value
                    option-value="id"
                    option-label="code"
                    v-model="form.product_id"
                    :options="produtoStore.produtos"
                    :rules="[(v) => v || 'Produto is required']"
                    label="Produto"
                >
                    <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps">
                            <q-item-section avatar>
                                {{ scope.opt.code }}
                            </q-item-section>
                            <q-item-section>
                                <q-item-label caption>
                                    {{ scope.opt.name }}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>

                <q-btn
                    :label="isUpdate ? 'Atualizar' : 'Cadastrar'"
                    color="primary"
                    class="full-width"
                    type="submit"
                    outline
                    rounded
                ></q-btn>

                <q-btn
                    label="Cancel"
                    class="full-width"
                    color="primary"
                    type="button"
                    rounded
                    flat
                    :to="{ name: 'provento-list' }"
                />
            </q-form>
        </div>
    </q-page>
</template>

<script>
import useNotify from "src/composable/useNotify";
import { dBrToUs } from "src/helper/date-helper";
import { useEventoStore } from "src/stores/evento-store";
import { useProdutoStore } from "src/stores/produto-store";
import { useProventoStore } from "src/stores/provento-store";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
    name: "ProventoFormPage",

    setup() {
        const loading = ref(false);
        const form = ref({
            date: new Date().toLocaleDateString(),
            unitary_value: "",
            net_value: "",
            event_id: "",
            amount: "",
            product_id: "",
        });
        const formRef = ref(null);

        const route = useRoute();
        const proventoStore = useProventoStore();
        const eventoStore = useEventoStore();
        const produtoStore = useProdutoStore();
        const { notifySuccess, notifyError, notifyWarning } = useNotify();

        const isUpdate = computed(() => route.params.id);

        const handleSubmit = async () => {
            try {
                const {
                    date,
                    unitary_value,
                    net_value,
                    event_id,
                    amount,
                    product_id,
                } = form.value;

                const f = {
                    date: dBrToUs(date),
                    unitary_value: +unitary_value.replace(",", "."),
                    net_value: +net_value.replace(",", "."),
                    amount: +amount,
                    event_id,
                    product_id,
                };

                loading.value = true;
                if (isUpdate.value) {
                    f.id = isUpdate.value;
                    await proventoStore.update(f);
                    router.push({ name: "provento-list" });
                } else {
                    await proventoStore.post(f);
                    formRef.value.reset()
                }
                notifySuccess(
                    isUpdate.value ? "Atualizado" : "Cadastrado" + "com sucesso"
                );
            } catch (error) {
                notifyError(error.message);
            } finally {
                loading.value = false;
            }
        };

        const handleGetProvento = async (id) => {
            try {
                form.value = await proventoStore.getById(id);
            } catch (error) {
                notifyError(error.message);
            }
        };

        onMounted(() => {
            eventoStore.list();
            produtoStore.list();

            if (isUpdate.value) {
                handleGetProvento(isUpdate.value);
            }
        });

        return {
            handleSubmit,
            loading,
            form,
            formRef,
            eventoStore,
            produtoStore,
        };
    },
});
</script>