import React from 'react';
import QRCode from 'react-qr-code';

interface QRCodeDisplayProps {
  pixCode: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ pixCode }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        QR Code PIX
      </h2>
      
      <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
        <QRCode
          value={pixCode}
          size={200}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          viewBox={`0 0 200 200`}
        />
      </div>
      
      <p className="text-sm text-gray-600 mt-4">
        Aponte a câmera do seu celular para o QR Code
      </p>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          💡 <strong>Dica:</strong> Abra o app do seu banco e use a função "Pagar com QR Code"
        </p>
      </div>
    </div>
  );
};

export default QRCodeDisplay;