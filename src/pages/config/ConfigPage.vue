<template>
    <q-splitter v-model="splitterModel" :horizontal="$q.platform.is.mobile">
        <template v-slot:before>
            <q-tabs 
                no-caps
                inline-label
                outside-arrows
                mobile-arrows
                align="left"
                :breakpoint="500"
                v-model="tab"
                :vertical="$q.platform.is.desktop"
                class="text-teal"
            >
                <q-route-tab
                    :to="{ name: 'produto-list' }"
                    name="produto"
                    icon="mdi-chart-areaspline"
                    label="Produto"
                />

                <q-route-tab
                    :to="{ name: 'tipo-produto-list' }"
                    name="tipos"
                    icon="category"
                    label="Tipo Produto"
                />

                <q-route-tab
                    :to="{ name: 'evento-list' }"
                    name="evento"
                    icon="mdi-calendar-heart"
                    label="Evento"
                />

                <q-route-tab
                    :to="{ name: 'setor-list' }"
                    name="setores"
                    icon="mdi-graph"
                    label="Setores"
                />
            </q-tabs>
        </template>

        <template v-slot:after>
            <div class="text-h5 q-ma-md">
                {{ $route.meta.title }}
            </div>

            <router-view></router-view>
        </template>
    </q-splitter>
</template>

<script >
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "ConfigPage",
    setup() {
        return {
            tab: ref("produto"),
            splitterModel: ref(20),
        };
    },
});
</script>
