<template>
    <q-page padding>
        <q-form class="row justify-center" @submit.prevent="handleLogin">
            <p class="text-h5 text-center col-12">Login</p>
            <div class="col-md-4 col-sm-6 col-xs-10">
                <q-input
                    label="Email"
                    v-model="form.email"
                    lazy-rules
                    :rules="rules.email"
                ></q-input>
                <q-input
                    label="Password"
                    v-model="form.password"
                    lazy-rules
                    :rules="rules.password"
                ></q-input>
                <div class="full-width q-pt-md q-gutter-y-md">
                    <q-btn
                        label="Login"
                        color="primary"
                        class="full-width"
                        type="submit"
                        outline
                        rounded
                    ></q-btn>
                    <q-btn
                        label="Register"
                        class="full-width"
                        color="primary"
                        rounded
                        flat
                        size="sm"
                        :to="{ name: 'register' }"
                    />

                    <q-btn
                        label="Forgot Password ?"
                        class="full-width"
                        color="primary"
                        rounded
                        flat
                        size="sm"
                        :to="{ name: 'forgot-password' }"
                    />
                </div>
            </div>
        </q-form>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import useNotify from "src/composable/useNotify";

export default defineComponent({
    name: "LoginPage",

    setup() {
        const router = useRouter();

        const userStore = useUserStore();
        const { notifyError, notifySuccess } = useNotify();

        const form = ref({ email: "", password: "" });

        const rules = {
            email: [(v) => (v && v.length > 0) || "Email is required"],
            password: [(v) => (v && v.length > 0) || "Password is required"],
        };

        const handleLogin = async () => {
            try {
                await userStore.login(form.value);
                notifySuccess("Logado com sucesso");
                router.push({ name: "me" });
            } catch (error) {
                notifyError(error.message);
            }
        };

        onMounted(() => {
            if (userStore.isLoggedIn) {
                router.push({ name: "me" });
            }
        });
        return { form, rules, handleLogin };
    },
});
</script>
