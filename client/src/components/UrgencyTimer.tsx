import { useEffect, useState } from "react";
import { Clock, Package } from "lucide-react";

export default function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 0,
    seconds: 0,
  });

  const [stock, setStock] = useState(18);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset to 2 hours when timer ends
          hours = 2;
          minutes = 0;
          seconds = 0;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    // Decrease stock randomly every 2-5 minutes
    const stockTimer = setInterval(() => {
      setStock((prev) => {
        const newStock = Math.max(8, prev - 1);
        return newStock;
      });
    }, (2 + Math.random() * 3) * 60 * 1000);

    return () => {
      clearInterval(timer);
      clearInterval(stockTimer);
    };
  }, []);

  return (
    <div className="space-y-3">
      {/* Timer de Desconto */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-5 h-5" />
          <p className="font-bold text-sm">⚡ OFERTA TERMINA EM:</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-2 min-w-[60px] text-center">
            <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, "0")}</div>
            <div className="text-xs uppercase">Horas</div>
          </div>
          <div className="text-2xl font-bold">:</div>
          <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-2 min-w-[60px] text-center">
            <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, "0")}</div>
            <div className="text-xs uppercase">Min</div>
          </div>
          <div className="text-2xl font-bold">:</div>
          <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-2 min-w-[60px] text-center">
            <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, "0")}</div>
            <div className="text-xs uppercase">Seg</div>
          </div>
        </div>
      </div>

      {/* Estoque Limitado */}
      <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-3 flex items-center gap-3">
        <Package className="w-6 h-6 text-orange-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-bold text-orange-900">
            🔥 Apenas <span className="text-xl">{stock}</span> unidades restantes!
          </p>
          <p className="text-xs text-orange-700">Estoque limitado - Garanta o seu agora</p>
        </div>
      </div>
    </div>
  );
}
