import React, { useState, useEffect } from 'react';
import { Play, Coins, Sparkles, Star } from 'lucide-react';

interface MoneyPrizeModalProps {
  isOpen: boolean;
  amount: number;
  onClose: () => void;
}

export const MoneyPrizeModal: React.FC<MoneyPrizeModalProps> = ({ isOpen, amount, onClose }) => {
  const [confetti, setConfetti] = useState(true);
  const isRarePrize = amount >= 200;

  useEffect(() => {
    if (isOpen) {
      if ('vibrate' in navigator) {
        const vibrationPattern = isRarePrize
          ? [200, 100, 200, 100, 200, 100, 300]
          : [200, 100, 200, 100, 200];
        navigator.vibrate(vibrationPattern);
      }

      const confettiTimeout = setTimeout(() => setConfetti(false), isRarePrize ? 6000 : 5000);

      return () => clearTimeout(confettiTimeout);
    }
  }, [isOpen, isRarePrize]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 z-50">
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {Array.from({ length: isRarePrize ? 80 : 50 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${
                isRarePrize ? 'animate-bounce' : 'animate-bounce'
              } ${
                i % 4 === 0 ? 'w-3 h-3 bg-accent' :
                i % 4 === 1 ? 'w-2 h-2 bg-green-400' :
                i % 4 === 2 ? 'w-4 h-4 bg-yellow-400' : 'w-2 h-2 bg-green-300'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      {isRarePrize && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`firework-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${10 + (i % 3) * 20}%`,
                animation: `firework ${2 + Math.random()}s ease-out infinite`,
                animationDelay: `${i * 0.3}s`,
                background: `radial-gradient(circle, ${
                  i % 3 === 0 ? '#01D375' :
                  i % 3 === 1 ? '#fbbf24' :
                  '#ffffff'
                } 0%, transparent 70%)`,
                boxShadow: `0 0 20px ${
                  i % 3 === 0 ? '#01D375' :
                  i % 3 === 1 ? '#fbbf24' :
                  '#ffffff'
                }`
              }}
            />
          ))}
        </div>
      )}

      <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-xs overflow-hidden ${
        isRarePrize ? 'animate-scale-in' : ''
      }`}>
        {isRarePrize && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse z-10 uppercase tracking-wide">
            Premio Raro
          </div>
        )}

        {isRarePrize && (
          <div className="absolute top-2 right-2 z-10">
            <div className="flex gap-0.5">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 animate-pulse" />
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 animate-pulse" style={{ animationDelay: '0.1s' }} />
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        )}

        <div className="bg-accent p-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/80"></div>
          <div className="relative">
            <div className={`w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 ${
              isRarePrize ? 'animate-bounce' : 'animate-bounce'
            }`}>
              <Coins className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">🎉 PARABÉNS! 🎉</h1>
            <p className="text-white/90 text-base">
              {isRarePrize ? 'Você ganhou um prêmio RARO!' : 'Você ganhou dinheiro!'}
            </p>
          </div>
        </div>

        <div className="p-4 text-center">
          {isRarePrize && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-2 mb-3">
              <div className="flex items-center justify-center gap-1.5 mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
                <span className="font-bold text-yellow-800 text-[11px]">Premio Exclusivo</span>
              </div>
              <p className="text-yellow-700 text-[10px] font-medium">
                Apenas 1% dos jogadores ganham este valor!
              </p>
            </div>
          )}

          <div className={`bg-accent/20 rounded-2xl p-4 mb-4 border ${
            isRarePrize ? 'border-2 border-yellow-400/50' : 'border-accent/50'
          } relative overflow-hidden`}>
            {isRarePrize && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400/10 rounded-full blur-xl"></div>
            )}
            <div className={`text-4xl mb-3 ${isRarePrize ? 'animate-bounce' : ''}`}>💰</div>
            <div className={`text-3xl font-bold text-accent mb-2 ${
              isRarePrize ? 'animate-pulse' : ''
            }`}>
              R$ {amount.toFixed(2).replace('.', ',')}
            </div>
            <p className="text-gray-600 font-medium">
              Adicionado ao seu saldo!
            </p>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Saldo atualizado automaticamente</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Continue jogando para ganhar mais</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Próximo prêmio pode ser o iPhone!</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-accent text-white font-bold py-3 rounded-2xl hover:bg-accent-hover transition-all duration-300 active:scale-95 shadow-modern"
            style={{ touchAction: 'manipulation' }}
          >
            <div className="flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              <span>CONTINUAR JOGANDO</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
