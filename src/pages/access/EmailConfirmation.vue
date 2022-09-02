<template>
    <q-page padding>
        <p class="text-h6 text-center col-12">Thanks for registering !</p>
        <p class="text-body-1 text-center col-12">
            Please confirm your email to finishing registering
            <strong> {{ $route.query.email }}! </strong>
        </p>
        <div class="full-width q-pt-md q-gutter-y-md justify-center">
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
    </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "EmailConfirmationPage",
});
</script>
