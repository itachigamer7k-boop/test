import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  // Quando o pagamento for aprovado
  if (body.type === "payment") {
    const pagamentoId = body.data.id;

    // 🔥 Aqui você conecta com seu banco (Prisma, Supabase, Firebase...)
    // Exemplo:
    // await prisma.pedido.update({
    //   where: { idPagamento: pagamentoId },
    //   data: { status: "pago" },
    // });

    console.log("Pagamento confirmado:", pagamentoId);
  }

  return NextResponse.json({ received: true });
}
