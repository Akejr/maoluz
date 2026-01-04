import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Aceitar OPTIONS para CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Apenas aceitar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Transformar dados do frontend para o formato correto da API InfinityPay
    const { handle, items, redirect_url, description } = req.body;

    // Validação básica
    if (!handle || !items || !redirect_url) {
      return res.status(400).json({ 
        error: 'Dados inválidos. É necessário handle, items e redirect_url' 
      });
    }

    // Formatar items corretamente (price_cents -> price)
    const formattedItems = items.map((item: any) => ({
      quantity: item.quantity,
      price: item.price_cents || Math.round(item.price * 100), // Aceita price_cents ou price
      description: item.description,
      ...(item.image_url && { image_url: item.image_url }),
    }));

    // Gerar order_nsu único
    const orderNsu = `MAOLUZ-${Date.now()}`;

    // Payload no formato correto da API InfinityPay
    const payload = {
      handle,
      items: formattedItems,
      order_nsu: orderNsu,
      redirect_url,
    };

    console.log('Enviando para InfinityPay:', JSON.stringify(payload, null, 2));

    // Fazer requisição para Infinitepay
    const response = await fetch('https://api.infinitepay.io/invoices/public/checkout/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    console.log('Resposta da InfinityPay:', JSON.stringify(data, null, 2));

    // Adicionar headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Retornar resposta
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Erro no proxy:', error);
    return res.status(500).json({ error: 'Erro ao processar pagamento' });
  }
}
