<template>
    <q-page padding>
        <q-form
            class="row justify-center"
            @submit.prevent="handleForgotPassword"
        >
            <p class="text-h5 text-center col-12">Forgot Password</p>
            <div class="col-md-4 col-sm-6 col-xs-10">
                <q-input
                    label="Email"
                    v-model="email"
                    lazy-rules
                    :rules="[(v) => (v && v.length > 0) || 'Email is required']"
                ></q-input>
                <div class="full-width q-pt-md q-gutter-y-md">
                    <q-btn
                        label="Send Reset Email"
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
import useNotify from "src/composable/useNotify";

export default defineComponent({
    name: "ForgotPasswordPage",

    setup() {
        const userStore = useUserStore();
        const email = ref("");
        const { notifyError, notifySuccess } = useNotify();

        const handleForgotPassword = async () => {
            try {
                await userStore.sendPasswordRestEmail(email.value);
                notifySuccess(`Password reset email sent to: ${email.value}`);
            } catch (error) {
                notifyError(error.message);
            }
        };

        return { email, handleForgotPassword };
    },
});
</script>
