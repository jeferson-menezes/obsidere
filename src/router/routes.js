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
                path: "configuracao",
                name: "configuracao",
                component: () => import("pages/config/ConfigPage.vue"),
                children: [
                    {
                        path: "tipo/produto",
                        name: "tipo-produto",
                        component: () => import("pages/config/TipoProduto.vue")
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
