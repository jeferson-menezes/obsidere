<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                    {{ isUpdate ? "Atualizar" : "Cadastrar" }} setor
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
                    :to="{ name: 'setor-list' }"
                />
            </q-form>
        </div>
    </q-page>
</template>

<script>
import useNotify from "src/composable/useNotify";
import { useSetorStore } from "src/stores/setor-store";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
    name: "SetorFormPage",

    setup() {
        const route = useRoute();
        const router = useRouter();
        const setorStore = useSetorStore();
        const { notifySuccess, notifyError } = useNotify();

        const loading = ref(false);
        const form = ref({ name: "" });

        const isUpdate = computed(() => route.params.id);

        const handleSubmit = async () => {
            try {
                loading.value = true;

                if (isUpdate.value) {
                    await setorStore.update(form.value);
                } else {
                    await setorStore.post(form.value);
                }
                notifySuccess(
                    isUpdate.value ? "Atualizado" : "Cadastrado" + "com sucesso"
                );
                router.push({ name: "setor-list" });
            } catch (error) {
                notifyError(error.message);
            } finally {
                loading.value = false;
            }
        };

        const handleGetSetor = async (id) => {
            try {
                form.value = await setorStore.getById(id);
            } catch (error) {
                notifyError(error.message);
            }
        };

        onMounted(() => {
            if (isUpdate.value) {
                handleGetSetor(isUpdate.value);
            }
        });

        return { form, handleSubmit, isUpdate };
    },
});
</script>