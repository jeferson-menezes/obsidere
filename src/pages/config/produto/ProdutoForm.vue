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
                ref="formRef"
                @submit.prevent="handleSubmit"
            >
                <q-file
                    v-model="image"
                    label="Imagem"
                    accept="image/*"
                    :readonly="!!form.image_url"
                >
                    <template v-slot:before v-if="form.image_url">
                        <q-avatar>
                            <img :src="form.image_url" />
                        </q-avatar>
                    </template>
                    <template v-slot:append>
                        <q-icon name="attach_file" />
                    </template>
                    <template v-slot:after v-if="form.image_url">
                        <q-btn
                            round
                            dense
                            flat
                            type="button"
                            icon="delete"
                            @click.stop.prevent="
                                handleRemoveImage(form.image_url)
                            "
                        >
                            <q-tooltip> Deletar </q-tooltip></q-btn
                        >
                    </template>
                </q-file>
                <q-input
                    label="Código"
                    v-model="form.code"
                    lazy-rules
                    :rules="[
                        (v) => (v && v.length > 0) || 'Código is required',
                    ]"
                ></q-input>

                <q-input
                    label="Nome"
                    v-model="form.name"
                    lazy-rules
                    :rules="[(v) => (v && v.length > 0) || 'Nome is required']"
                ></q-input>

                <q-select
                    map-options
                    emit-value
                    option-value="id"
                    option-label="name"
                    v-model="form.type_id"
                    :options="tipoStore.tipos"
                    :rules="[(v) => v || 'Tipo is required']"
                    label="Tipo de Produto"
                />

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
                    :to="{ name: 'produto-list' }"
                />
            </q-form>
        </div>
    </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import useNotify from "src/composable/useNotify";
import { useImageStore } from "src/stores/image-store";
import { useProdutoStore } from "src/stores/produto-store";
import { useTipoProdutoStore } from "src/stores/tipo-produto-store";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
    name: "ProdutoFormPage",

    setup() {
        const $q = useQuasar();
        const loading = ref(false);
        const form = ref({ name: "", type_id: "", code: "", image_url: "" });
        const image = ref([]);
        const formRef = ref(null);

        const router = useRouter();
        const route = useRoute();
        const tipoStore = useTipoProdutoStore();
        const produtoStore = useProdutoStore();
        const imageStore = useImageStore();
        const { notifySuccess, notifyError, notifyWarning } = useNotify();

        const isUpdate = computed(() => route.params.id);

        const handleSubmit = async () => {
            try {
                loading.value = true;

                if (!image && form.value.image_url) {
                    notifyWarning("Selecione uma imagem");
                    return;
                }

                if (!form.value.image_url) {
                    form.value.image_url = await imageStore.uploadImg(
                        image.value
                    );
                }

                if (isUpdate.value) {
                    await produtoStore.update(form.value);
                    router.push({ name: "produto-list" });
                } else {
                    await produtoStore.post(form.value);
                    formRef.value.reset();
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

        const handleGetProduto = async (id) => {
            try {
                form.value = await produtoStore.getById(id);
            } catch (error) {
                notifyError(error.message);
            }
        };

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

        const handleRemoveImage = async (fileName) => {
            try {
                $q.dialog({
                    title: "Confirme",
                    message: `Você realmente quer excluir a imagem`,
                    cancel: true,
                    persistent: true,
                }).onOk(async () => {
                    await imageStore.remove(fileName);
                    form.value.image_url = "";
                    notifySuccess("Excluido com sucesso!");
                });
            } catch (error) {
                notifyError(error.message);
            }
        };

        onMounted(() => {
            handleListaTipos();

            if (isUpdate.value) {
                handleGetProduto(isUpdate.value);
            }
        });

        return {
            form,
            tipoStore,
            handleSubmit,
            image,
            isUpdate,
            formRef,
            handleRemoveImage,
        };
    },
});
</script>
