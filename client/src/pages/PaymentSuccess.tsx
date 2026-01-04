import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Página de sucesso após pagamento no Infinitepay
 */

export default function PaymentSuccess() {
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Extrair parâmetros da URL
    const params = new URLSearchParams(window.location.search);
    const orderNsu = params.get("order_nsu");
    const receiptUrl = params.get("receipt_url");
    const slug = params.get("slug");
    const captureMethod = params.get("capture_method");

    setOrderData({
      orderNsu,
      receiptUrl,
      slug,
      captureMethod,
      timestamp: new Date().toLocaleString("pt-BR"),
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center space-y-6">
        {/* Ícone de Sucesso */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <Check className="w-10 h-10 text-green-600" />
          </div>
        </div>

        {/* Título */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pagamento Confirmado!</h1>
          <p className="text-gray-600">Obrigado pela sua compra do MãoLuz</p>
        </div>

        {/* Detalhes do Pedido */}
        {orderData && (
          <div className="bg-gray-50 rounded-lg p-4 text-left space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Pedido:</span>
              <span className="font-semibold text-gray-900">{orderData.orderNsu}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Método:</span>
              <span className="font-semibold text-gray-900">
                {orderData.captureMethod === "pix" ? "PIX" : "Cartão de Crédito"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data/Hora:</span>
              <span className="font-semibold text-gray-900">{orderData.timestamp}</span>
            </div>
          </div>
        )}

        {/* Mensagem */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            ✓ Seu pedido foi confirmado! Você receberá um email com os detalhes da entrega em breve.
          </p>
        </div>

        {/* Botões */}
        <div className="space-y-3">
          {orderData?.receiptUrl && (
            <a href={orderData.receiptUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                📄 Ver Comprovante
              </Button>
            </a>
          )}
          <a href="/">
            <Button variant="outline" className="w-full">
              ← Voltar para Loja
            </Button>
          </a>
        </div>

        {/* Informações de Entrega */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>Entrega prevista: 7 dias úteis</p>
          <p>Você receberá código de rastreamento por email</p>
        </div>
      </div>
    </div>
  );
}
