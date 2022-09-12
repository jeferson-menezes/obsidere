import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";
import { v4 as uuidv4 } from "uuid";

const { supabase } = useSupabase();

export const useImageStore = defineStore({
    
    id: "image",
    
    state: () => ({}),
    
    actions: {
        async uploadImg(file) {
            const fileName = uuidv4();
            const { error } = await supabase.storage
                .from("images")
                .upload(fileName, file, {
                    cacheControl: "3600",
                    upsert: false
                });
            const publicUrl = await this.getUrlImage(fileName);
            if (error) throw error;
            return publicUrl;
        },

        async getUrlImage(fileName) {
            const { publicURL, error } = await supabase.storage
                .from("images")
                .getPublicUrl(fileName);

            if (error) throw error;
            return publicURL;
        },

        async remove(fileName) {
            const { data, error } = await supabase.storage
                .from("avatars")
                .remove([fileName]);

            if (error) throw error;
            return data;
        }
    }
});
