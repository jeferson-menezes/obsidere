<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleLeftDrawer"
                />

                <q-toolbar-title> Quasar App </q-toolbar-title>

                <q-btn-dropdown flat color="white" icon="person">
                    <q-list>
                        <q-item clickable :to="{ name: 'tipo-produto-list' }">
                            <q-item-section avatar>
                                <q-avatar
                                    icon="mdi-cog"
                                    color="primary"
                                    text-color="white"
                                />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Configuração</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable v-close-popup @click="handleLogout">
                            <q-item-section avatar>
                                <q-avatar
                                    icon="mdi-exit-to-app"
                                    text-color="primary"
                                />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Logout</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
            <q-list>
                <q-item-label header> Essential Links </q-item-label>

                <EssentialLink
                    v-for="link in essentialLinks"
                    :key="link.title"
                    v-bind="link"
                />
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const linksList = [
    {
        title: "Proventos",
        caption: "Movimentação de Dividendos",
        icon: "mdi-cash-plus",
        routerName: "provento-list",
    },
];

export default defineComponent({
    name: "MainLayout",

    components: {
        EssentialLink,
    },

    setup() {
        const leftDrawerOpen = ref(false);

        const $q = useQuasar();

        const router = useRouter();

        const userStore = useUserStore();

        const handleLogout = async () => {
            $q.dialog({
                title: "Logout ?",
                message: "Do you realy want to leave?",
                cancel: true,
                persistent: true,
            }).onOk(async () => {
                await userStore.logout();
                router.replace({ name: "login" });
            });
        };

        return {
            essentialLinks: linksList,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
            handleLogout,
        };
    },
});
</script>
