import React, { useEffect, useState } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import PixCodeDisplay from './PixCodeDisplay';
import ClientInfo from './ClientInfo';
import logo from '../assets/acal-logo.png'

interface PixData {
  codigo: string;
  cliente: string;
  valor: string;
  pedido: string;
}

const PixViewer: React.FC = () => {
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codigo = urlParams.get('codigo');
    const cliente = urlParams.get('cliente');
    const valor = urlParams.get('valor');
    const pedido = urlParams.get('pedido');

    // Debug logs para identificar os parâmetros recebidos
    console.log('URL atual:', window.location.href);
    console.log('Parâmetros recebidos:', {
      codigo: codigo,
      cliente: cliente,
      valor: valor,
      pedido: pedido
    });

    // Validação mais flexível - apenas o código PIX é obrigatório
    if (!codigo) {
      setError('Código PIX não fornecido. Verifique se o parâmetro "codigo" está presente na URL.');
      setLoading(false);
      return;
    }

    setPixData({
      codigo: decodeURIComponent(codigo),
      cliente: cliente ? decodeURIComponent(cliente) : 'Cliente não informado',
      valor: valor ? decodeURIComponent(valor) : 'Valor não informado',
      pedido: pedido ? decodeURIComponent(pedido) : 'Pedido não informado'
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados do PIX...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Erro ao carregar dados</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <img src={logo} width={140} alt="Logo" className="mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Pagamento PIX
          </h1>
          <p className="text-gray-600">
            Escaneie o QR Code ou copie o código para realizar o pagamento
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* QR Code Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <QRCodeDisplay pixCode={pixData!.codigo} />
            </div>

            {/* PIX Code and Client Info Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <PixCodeDisplay pixCode={pixData!.codigo} />
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <ClientInfo 
                  cliente={pixData!.cliente}
                  valor={pixData!.valor}
                  pedido={pixData!.pedido}
                />
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>© 2025 - Sistema de Pagamento PIX</p>
        </footer>
      </div>
    </div>
  );
};

export default PixViewer;