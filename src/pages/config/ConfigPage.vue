<template>
    <div class="row">
        <div class="col-3">
            <q-tabs v-model="tab" vertical class="text-teal">
                <q-route-tab
                    icon="mail"
                    label="Tipo de Produto"
                    :to="{ name: 'tipo-produto' }"
                />
                <q-route-tab
                    icon="alarm"
                    label="Alarms"
                    :to="{ name: 'tipo-produto' }"
                />
                <q-route-tab
                    icon="movie"
                    label="Movies"
                    :to="{ name: 'tipo-produto' }"
                />
            </q-tabs>
        </div>

        <div class="col">
            <router-view />
        </div>
    </div>
</template>

<script >
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "ConfigPage",
    setup() {
        return {
            tab: ref("mails"),
            splitterModel: ref(20),
        };
    },
});
</script>
