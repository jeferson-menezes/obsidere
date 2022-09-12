const routes = [
    {
        path: "/",
        component: () => import("src/layouts/AccessLayout.vue"),
        children: [
            {
                path: "",
                name: "login",
                component: () => import("pages/access/Login.vue")
            },
            {
                path: "login",
                name: "loginDefault",
                component: () => import("pages/access/Login.vue")
            },
            {
                path: "register",
                name: "register",
                component: () => import("pages/access/Register.vue")
            },
            {
                path: "email-confirmation",
                name: "email-confirmation",
                component: () => import("pages/access/EmailConfirmation.vue")
            },
            {
                path: "forgot-password",
                name: "forgot-password",
                component: () => import("pages/access/ForgotPassword.vue")
            },
            {
                path: "reset-password",
                name: "reset-password",
                component: () => import("pages/access/ResetPassword.vue")
            }
        ]
    },
    {
        path: "/",
        component: () => import("src/layouts/MainLayout.vue"),
        children: [
            {
                path: "me",
                name: "me",
                component: () => import("pages/Me.vue")
            },
            {
                path: "provento",
                name: "provento-list",
                component: () => import("pages/provento/ProventoList.vue")
            },
            {
                path: "provento/form/:id?",
                name: "provento-form",
                component: () => import("pages/provento/ProventoForm.vue")
            },
            {
                path: "configuracao",
                name: "configuracao",
                meta: { title: "Configurações" },
                component: () => import("pages/config/ConfigPage.vue"),
                children: [
                    {
                        path: "produto",
                        name: "produto-list",
                        meta: { title: "Produtos" },
                        component: () =>
                            import("src/pages/config/produto/ProdutoList.vue")
                    },
                    {
                        path: "tipo/produto",
                        name: "tipo-produto-list",
                        meta: { title: "Tipos de Produtos" },
                        component: () =>
                            import("src/pages/config/tipo-produto/TipoProdutoList.vue")
                    },
                    {
                        path: "setor",
                        name: "setor-list",
                        meta: { title: "Setores" },
                        component: () =>
                            import("src/pages/config/setor/SetorList.vue")
                    },
                    {
                        path: "evento",
                        name: "evento-list",
                        meta: { title: "Eventos" },
                        component: () =>
                            import("src/pages/config/evento/EventoList.vue")
                    },
                    {
                        path: "evento/form/:id?",
                        name: "evento-form",
                        meta: { title: "Eventos" },
                        component: () =>
                            import("src/pages/config/evento/EventoForm.vue")
                    },
                    {
                        path: "produto/form/:id?",
                        name: "produto-form",
                        meta: { title: "Produtos" },
                        component: () =>
                            import("src/pages/config/produto/ProdutoForm.vue")
                    },
                    {
                        path: "tipo/produto/form/:id?",
                        name: "tipo-produto-form",
                        meta: { title: "Tipos de Produtos" },
                        component: () =>
                            import("src/pages/config/tipo-produto/TipoProdutoForm.vue")
                    },
                    {
                        path: "setor/form/:id?",
                        name: "setor-form",
                        meta: { title: "Setores" },
                        component: () =>
                            import("src/pages/config/setor/SetorForm.vue")
                    }
                ]
            }
        ],
        meta: { requireAuth: true }
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue")
    }
];

export default routes;
