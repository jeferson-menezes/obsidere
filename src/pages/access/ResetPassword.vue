<template>
    <q-page padding>
        <q-form
            class="row justify-center"
            @submit.prevent="handlePasswordReset"
        >
            <p class="text-h5 text-center col-12">Reset Password</p>
            <div class="col-md-4 col-sm-6 col-xs-10">
                <q-input
                    label="New Password"
                    v-model="password"
                    lazy-rules
                    :rules="[
                        (v) => (v && v.length > 0) || 'Password is required',
                    ]"
                ></q-input>
                <div class="full-width q-pt-md q-gutter-y-md">
                    <q-btn
                        label="Send New Password"
                        color="primary"
                        class="full-width"
                        type="submit"
                        outline
                        rounded
                    ></q-btn>
                </div>
            </div>
        </q-form>
    </q-page>
</template>

<script>
import { useUserStore } from "src/stores/user-store";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useNotify from "src/composable/useNotify";

export default defineComponent({
    name: "ResetPasswordPage",

    setup() {
        const userStore = useUserStore();
        const password = ref("");
        const router = useRouter();
        const route = useRoute();
        const token = route.query.token;
        const { notifyError, notifySuccess } = useNotify();

        const handlePasswordReset = async () => {
            try {
                await userStore.resetPassword(token, password.value);
                router.push({ name: "login" });
            } catch (error) {
                notifyError(error.message);
            }
        };

        return { password, handlePasswordReset };
    },
});
</script>
