import axios from "axios";
import { z } from "zod";

const INFINITEPAY_API_URL = "https://api.infinitepay.io/invoices/public/checkout/links";
const INFINITEPAY_HANDLE = "ecasanovs";

export const infinitepayInputSchema = z.object({
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  description: z.string(),
  redirectUrl: z.string().url(),
  imageUrl: z.string().url().optional(),
});

export type InfinitepayInput = z.infer<typeof infinitepayInputSchema>;

export interface InfinitepayResponse {
  url: string;
}

/**
 * Gera um link de checkout do Infinitepay
 */
export async function generateInfinitepayCheckoutLink(
  input: InfinitepayInput
): Promise<InfinitepayResponse> {
  const orderNsu = `MAOLUZ-${Date.now()}`;

  const payload = {
    handle: INFINITEPAY_HANDLE,
    items: [
      {
        quantity: input.quantity,
        price: Math.round(input.price * 100), // Converter para centavos
        description: input.description,
        ...(input.imageUrl && { image_url: input.imageUrl }),
      },
    ],
    order_nsu: orderNsu,
    redirect_url: input.redirectUrl,
  };

  try {
    const response = await axios.post<InfinitepayResponse>(
      INFINITEPAY_API_URL,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 segundos
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao gerar link Infinitepay:", error);
    throw new Error("Falha ao gerar link de pagamento");
  }
}
