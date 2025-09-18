import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface PixCodeDisplayProps {
  pixCode: string;
}

const PixCodeDisplay: React.FC<PixCodeDisplayProps> = ({ pixCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = pixCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Código PIX Copia e Cola
      </h2>
      
      <div className="relative">
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 pr-12">
          <p className="text-sm text-gray-700 font-mono break-all leading-relaxed">
            {pixCode}
          </p>
        </div>
        
        <button
          onClick={handleCopy}
          className={`absolute top-2 right-2 p-2 rounded-lg transition-all duration-200 ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          title={copied ? 'Copiado!' : 'Copiar código'}
        >
          {copied ? (
            <Check size={16} />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>
      
      {copied && (
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700 text-center">
            ✅ Código copiado com sucesso!
          </p>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
        <p className="text-xs text-yellow-700">
          📋 <strong>Como usar:</strong> Cole este código no app do seu banco na opção "PIX Copia e Cola"
        </p>
      </div>
    </div>
  );
};

export default PixCodeDisplay;