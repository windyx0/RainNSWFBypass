import { definePlugin } from "@plugins";
import * as metro from "@metro";

let bypassInterval: any;

export default definePlugin({
    name: "RainNSFWBypass",
    description: "Age Confirmation Bypass Plugin For Rain (Runtime Mode)",
    author: [{ name: "WindyxCXX", id: 0n }],
    id: "RainNSFWBypass",
    version: "1.0.4",
    start() {
        // Таймер ждет, пока Discord прогрузит данные аккаунта
        bypassInterval = setInterval(() => {
            const UserStore = metro.findByProps("getCurrentUser");
            if (UserStore) {
                const user = UserStore.getCurrentUser();
                if (user) {
                    // Принудительно ставим статус 18+ (1) и разрешаем NSFW
                    user.nsfwAllowed = true;
                    user.nsfw_allowed = true;
                    user.ageVerificationStatus = 1;
                    
                    // Останавливаем таймер — патч применен
                    clearInterval(bypassInterval);
                }
            }
        }, 1000);
    },
    stop() {
        if (bypassInterval) clearInterval(bypassInterval);
    }
});
