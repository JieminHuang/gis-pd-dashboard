import { useState, useEffect, useRef } from "react";

const generateWaveformData = (length: number) => {
  const data: number[] = [];
  for (let i = 0; i < length; i++) {
    const noise = Math.random() * 0.2;
    const sineWave = Math.sin((i / length) * Math.PI * 4) * 0.3;
    const randomSpike = Math.random() > 0.95 ? Math.random() * 0.5 + 0.3 : 0;
    data.push(Math.max(0, Math.min(1, 0.5 + sineWave + noise + randomSpike)));
  }
  return data;
};

export default function RealtimeWaveform() {
  const [waveformData, setWaveformData] = useState(() => generateWaveformData(100));
  const [isPlaying, setIsPlaying] = useState(true);
  const [frequency, setFrequency] = useState(50);
  const [amplitude, setAmplitude] = useState(1.0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setWaveformData((prev) => {
        const newData = [...prev.slice(1)];
        const noise = Math.random() * 0.2;
        const sineWave = Math.sin((Date.now() / 500) * Math.PI * 2) * 0.3;
        const randomSpike = Math.random() > 0.97 ? Math.random() * 0.5 + 0.3 : 0;
        newData.push(Math.max(0, Math.min(1, 0.5 + sineWave + noise + randomSpike)));
        return newData;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = "#0a0f1a";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(0, 212, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    for (let i = 0; i < 10; i++) {
      const x = (width / 9) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    ctx.strokeStyle = "#00d4ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    waveformData.forEach((value, index) => {
      const x = (index / waveformData.length) * width;
      const y = height - (value * height * amplitude);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth = 2;
    ctx.beginPath();
    waveformData.forEach((value, index) => {
      const x = (index / waveformData.length) * width;
      const y = height / 2 + ((value - 0.5) * height * 0.3);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

  }, [waveformData, amplitude]);

  return (
    <div className="relative rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gis-cyan-500/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gis-cyan-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-gis-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-6" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">实时波形</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">局部放电信号监测</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isPlaying
                    ? "bg-gis-red-500/20 text-gis-red-500 hover:bg-gis-red-500/30"
                    : "bg-gis-green-500/20 text-gis-green-500 hover:bg-gis-green-500/30"
                }`}
              >
                {isPlaying ? "暂停" : "播放"}
              </button>
              <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-gis-green-500 animate-pulse" : "bg-gray-400"}`} />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-900 dark:bg-gis-dark-900 p-4 border border-gray-800 dark:border-gis-dark-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 rounded-full bg-gis-cyan-500" />
                <span className="text-xs text-gray-400">放电信号</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 rounded-full bg-gis-green-500" />
                <span className="text-xs text-gray-400">参考信号</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">频率:</span>
                <span className="text-gis-cyan-500 font-medium">{frequency} Hz</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">幅度:</span>
                <span className="text-gis-green-500 font-medium">{amplitude.toFixed(1)}x</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <canvas
              ref={canvasRef}
              width={800}
              height={200}
              className="w-full h-auto rounded"
            />
            
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1">
              {[100, 75, 50, 25, 0].map((val) => (
                <span key={val} className="text-xs text-gray-500 dark:text-gray-600">
                  {val}%
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800 dark:border-gis-dark-700">
            <div className="flex items-center gap-4">
              <button className="px-3 py-1.5 rounded-lg bg-gray-800 dark:bg-gis-dark-700 text-gray-300 text-sm hover:bg-gray-700 dark:hover:bg-gis-dark-600 transition-colors">
                放大
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-gray-800 dark:bg-gis-dark-700 text-gray-300 text-sm hover:bg-gray-700 dark:hover:bg-gis-dark-600 transition-colors">
                缩小
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-gray-800 dark:bg-gis-dark-700 text-gray-300 text-sm hover:bg-gray-700 dark:hover:bg-gis-dark-600 transition-colors">
                重置
              </button>
            </div>
            <div className="text-xs text-gray-500">
              采样率: 1MS/s | 分辨率: 16位
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}