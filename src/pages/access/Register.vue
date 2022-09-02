<template>
    <q-page padding>
        <q-form class="row justify-center" @submit.prevent="handleRegister">
            <p class="text-h5 text-center col-12">Register</p>
            <div class="col-md-4 col-sm-6 col-xs-10">
                <q-input
                    label="Name"
                    v-model="form.name"
                    lazy-rules
                    :rules="rules.name"
                ></q-input>
                <q-input
                    label="Email"
                    v-model="form.email"
                    :rules="rules.email"
                ></q-input>
                <q-input
                    label="Password"
                    v-model="form.password"
                    :rules="rules.password"
                ></q-input>
                <div class="full-width q-pt-md q-gutter-y-md">
                    <q-btn
                        label="Register"
                        color="primary"
                        class="full-width"
                        type="submit"
                        outline
                        rounded
                    ></q-btn>
                    <q-btn
                        label="Back"
                        class="full-width"
                        color="primary"
                        rounded
                        flat
                        size="sm"
                        :to="{ name: 'login' }"
                    />
                </div>
            </div>
        </q-form>
    </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import useNotify from "src/composable/useNotify";
export default defineComponent({
    name: "RegisterPage",

    setup() {
        const router = useRouter();

        const userStore = useUserStore();
        const { notifyError, notifySuccess } = useNotify();

        const form = ref({ name: "", email: "", password: "" });
        const rules = {
            name: [(v) => (v && v.length > 0) || "Name is required"],
            email: [(v) => (v && v.length > 0) || "Email is required"],
            password: [(v) => (v && v.length > 0) || "Password is required"],
        };

        const handleRegister = async () => {
            try {
                await userStore.register(form.value);
                notifySuccess("Cadastrado com sucesso");
                router.push({
                    name: "email-confirmation",
                    query: { email: form.value.email },
                });
            } catch (error) {
                notifyError(error.message);
            }
        };

        return { form, rules, handleRegister };
    },
});
</script>
