import { createClient } from "@supabase/supabase-js";
import { useUserStore } from "src/stores/user-store";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey =process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabase.auth.onAuthStateChange((event, session) => {
    const  userStore  = useUserStore();
    userStore.user = session?.user || null
})

export default function useSupabase() {
    return { supabase };
}
