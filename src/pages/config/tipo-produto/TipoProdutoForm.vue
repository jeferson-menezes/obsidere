<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                    {{ isUpdate ? "Atualizar" : "Cadastrar" }} tipo de produto
                </p>
            </div>
            <q-form
                class="col-md-6 col-sm-10 col-xs-12 q-gutter-y-md"
                @submit.prevent="handleSubmit"
            >
                <q-input
                    label="Nome"
                    v-model="form.name"
                    lazy-rules
                    :rules="[(v) => (v && v.length > 0) || 'Name is required']"
                ></q-input>

                <div class="row q-gutter-md">
                    <q-radio
                        v-model="form.classe"
                        val="RENDA_FIXA"
                        label="Renda Fixa"
                    />
                    <q-radio
                        v-model="form.classe"
                        val="RENDA_VARIAVEL"
                        label="Renda Variável"
                    />
                </div>

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
                    :to="{ name: 'tipo-produto-list' }"
                />
            </q-form>
        </div>
    </q-page>
</template>

<script>
import useNotify from "src/composable/useNotify";
import { useTipoProdutoStore } from "src/stores/tipo-produto-store";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
    name: "TipoProdutoFormPage",

    setup() {
        const route = useRoute();
        const router = useRouter();
        const tipoStore = useTipoProdutoStore();
        const { notifySuccess, notifyError } = useNotify();

        const loading = ref(false);
        const form = ref({ name: "", classe: "RENDA_FIXA" });

        const isUpdate = computed(() => route.params.id);

        const handleSubmit = async () => {
            try {
                loading.value = true;

                if (isUpdate.value) {
                    await tipoStore.update(form.value);
                } else {
                    await tipoStore.post(form.value);
                }
                notifySuccess(
                    isUpdate.value ? "Atualizado" : "Cadastrado" + "com sucesso"
                );
                router.push({ name: "tipo-produto-list" });
            } catch (error) {
                notifyError(error.message);
            } finally {
                loading.value = false;
            }
        };

        const handleGetTipo = async (id) => {
            try {
                form.value = await tipoStore.getById(id);
            } catch (error) {
                notifyError(error.message);
            }
        };

        onMounted(() => {
            if (isUpdate.value) {
                handleGetTipo(isUpdate.value);
            }
        });

        return { form, handleSubmit, isUpdate };
    },
});
</script>