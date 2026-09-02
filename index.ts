import definePlugin from "@utils/types";
import { findByProps } from "@webpack";

let bypassInterval: any;

export default definePlugin({
    name: "NSFWBypassRuntime",
    description: "Снимает возрастные ограничения через подмену статуса в памяти",
    authors: [{ name: "ТвойНик", id: "00000000000000000" }],
    start() {
        // Таймер ждет, пока Discord прогрузит данные аккаунта
        bypassInterval = setInterval(() => {
            const userStore = findByProps("getCurrentUser");
            if (userStore) {
                const user = userStore.getCurrentUser();
                if (user) {
                    // Принудительно ставим статус 18+ (1) и разрешаем NSFW
                    (user as any).nsfwAllowed = true;
                    (user as any).ageVerificationStatus = 1; 
                    
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