import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import ocean from "@/assets/ocean-ecosse.jpg";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

export function OceanScene() {
  const { t } = useT();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  const audio = useRef<AudioContext | null>(null);
  const [sound, setSound] = useState(false);
  const [paused, setPaused] = useState(false);
  const [audioError, setAudioError] = useState(false);
  useEffect(() => { if (audio.current) { if (visible && sound) void audio.current.resume(); else void audio.current.suspend(); } }, [visible, sound]);
  useEffect(() => () => { void audio.current?.close(); }, []);
  const toggleSound = async () => {
    try {
      if (!audio.current) {
        const context = new AudioContext();
        audio.current = context;
        const buffer = context.createBuffer(1, context.sampleRate * 12, context.sampleRate);
        const data = buffer.getChannelData(0);
        let last = 0;
        for (let i = 0; i < data.length; i++) { last = (last + (Math.random() * 2 - 1) * 0.02) / 1.02; data[i] = last * 3.5; }
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const filter = context.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 1400;
        const gain = context.createGain();
        gain.gain.value = 0.22;
        const swell = context.createOscillator();
        swell.frequency.value = 0.13;
        const depth = context.createGain();
        depth.gain.value = 0.15;
        swell.connect(depth).connect(gain.gain);
        source.connect(filter).connect(gain).connect(context.destination);
        source.start();
        swell.start();
      }
      if (sound) await audio.current.suspend(); else await audio.current.resume();
      setSound(!sound);
      setAudioError(false);
    } catch { setAudioError(true); setSound(false); }
  };
  const moving = visible && !paused && !reduced;
  return <div ref={ref} className="relative aspect-[5/4] overflow-hidden bg-card" data-ocean-scene data-moving={moving}>
    <motion.img src={ocean} alt={t("s1s")} loading="lazy" width={1440} height={1024} className="h-full w-full object-cover" animate={moving ? { scale: [1.04, 1.1, 1.04], x: [0, -8, 0], y: [0, 5, 0] } : { scale: 1.04, x: 0, y: 0 }} transition={moving ? { duration: 16, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }} />
    <div className="absolute bottom-4 right-4 flex gap-2 bg-background/90 p-1">
      <Button variant="ghost" size="icon" aria-label={paused ? t("playOcean") : t("pauseOcean")} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</Button>
      <Button variant="ghost" size="icon" aria-label={sound ? t("soundOff") : t("soundOn")} aria-pressed={sound} onClick={() => void toggleSound()}>{sound ? <Volume2 /> : <VolumeX />}</Button>
    </div>
    {audioError && <p role="alert" className="absolute left-4 top-4 bg-background/90 p-3 text-xs">{t("soundUnavailable")}</p>}
  </div>;
}