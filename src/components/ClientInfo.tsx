import React from 'react';
import { User, DollarSign, FileText } from 'lucide-react';

interface ClientInfoProps {
  cliente: string;
  valor: string;
  pedido: string;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ cliente, valor, pedido }) => {
  const formatCurrency = (value: string) => {
    // Remove caracteres não numéricos e converte para número
    const numericValue = parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.'));
    
    if (isNaN(numericValue)) {
      return value; // Retorna o valor original se não conseguir converter
    }
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numericValue);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Informações do Pagamento
      </h2>
      
      <div className="space-y-4">
        {/* Cliente */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={16} className="text-blue-600" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">Cliente</p>
            <p className="text-lg text-gray-800 font-semibold">{cliente}</p>
          </div>
        </div>

        {/* Valor */}
        {/* <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign size={16} className="text-green-600" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">Valor</p>
            <p className="text-2xl text-green-600 font-bold">{formatCurrency(valor)}</p>
          </div>
        </div> */}

        {/* Pedido */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <FileText size={16} className="text-purple-600" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">Número do Pedido</p>
            <p className="text-lg text-gray-800 font-semibold">#{pedido}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-blue-700 font-medium">
            Aguardando confirmação do pagamento...
          </p>
        </div>
        <p className="text-xs text-blue-600 mt-1">
          O pagamento será confirmado automaticamente após a transação.
        </p>
      </div>
    </div>
  );
};

export default ClientInfo;