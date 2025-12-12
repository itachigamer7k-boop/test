import { NextResponse } from "next/server";
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export async function POST(req) {
  const { token, email, valor, pedidoId } = await req.json();

  try {
    const pagamento = await mercadopago.payment.create({
      transaction_amount: Number(valor),
      token: token,
      description: `Pedido #${pedidoId}`,
      payment_method_id: "credit_card",
      installments: 1,
      payer: { email },
    });

    return NextResponse.json(pagamento.body);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao pagar com cartão" },
      { status: 500 }
    );
  }
}
