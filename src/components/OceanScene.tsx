import { motion, useReducedMotion } from "motion/react";
import ocean from "@/assets/ocean-ecosse.jpg";
import { useT } from "@/lib/i18n";

export function OceanScene() {
  const { t } = useT();
  const reduced = useReducedMotion();
  return <motion.div className="relative aspect-[5/4] overflow-hidden bg-card" initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
    <img src={ocean} alt={t("s1s")} loading="lazy" width={1440} height={1024} className="h-full w-full object-cover" />
  </motion.div>;
}
