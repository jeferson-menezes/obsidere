import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";

export const useUserStore = defineStore({
    id: "user",

    state: () => ({
        user: null
    }),

    getters: {
        isLoggedIn() {
            return !!this.user;
        }
    },

    actions: {
        async login({ email, password }) {
            const { supabase } = useSupabase();
            const { user, error } = await supabase.auth.signIn({
                email,
                password
            });
            if (error) throw error;
            return user;
        },

        async loginWithSocialProvider(provider) {
            const { supabase } = useSupabase();
            const { user, error } = await supabase.auth.signIn({
                provider
            });
            if (error) throw error;
            return user;
        },

        async logout() {
            const { supabase } = useSupabase();
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        },

        async register({ email, password, ...meta }) {
            const { supabase } = useSupabase();
            const { user, error } = await supabase.auth.signUp(
                { email, password },
                {
                    data: meta,
                    redirectTo: `${window.location
                        .origin}/me:?fromEmail=registrationConfirmation`
                }
            );

            if (error) throw error;
            return user;
        },

        async update(data) {
            const { supabase } = useSupabase();
            const { user, error } = await supabase.auth.update(data);
            if (error) throw error;
            return user;
        },

        async sendPasswordRestEmail(email) {
            const { supabase } = useSupabase();
            const {
                user,
                error
            } = await supabase.auth.api.resetPasswordForEmail(email);
            if (error) throw error;
            return user;
        },

        async resetPassword(accessToken, newPassword) {
            const { supabase } = useSupabase();
            const {
                user,
                error
            } = await supabase.auth.api.updateUser(accessToken, {
                password: newPassword
            });
            if (error) throw error;
            return user;
        }
    }
});
