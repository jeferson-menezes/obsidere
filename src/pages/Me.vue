<template>
    <q-page class="flex flex-center">
        <div v-if="user">
            <p>Hello {{ user.user_metadata.name }}</p>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from "src/stores/user-store";
export default defineComponent({
    name: "MePage",
    setup() {
        const { user } = useUserStore();

        return { user };
    },
});
</script>
