import { NextResponse } from "next/server";
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export async function POST(req) {
  const { pedidoId, nomeCliente, valor } = await req.json();

  try {
    const pagamento = await mercadopago.payment.create({
      transaction_amount: Number(valor),
      description: `Pedido #${pedidoId}`,
      payment_method_id: "pix",
      payer: {
        first_name: nomeCliente,
        email: "cliente@email.com",
      },
    });

    return NextResponse.json({
      idPagamento: pagamento.body.id,
      qrCodeBase64:
        pagamento.body.point_of_interaction.transaction_data.qr_code_base64,
      copiaCola:
        pagamento.body.point_of_interaction.transaction_data.qr_code,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao gerar PIX" },
      { status: 500 }
    );
  }
}
