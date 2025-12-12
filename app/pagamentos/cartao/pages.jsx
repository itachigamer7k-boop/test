"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function PagamentoCartao() {
  useEffect(() => {
    if (window.MercadoPago) {
      iniciarMP();
    }
  }, []);

  const iniciarMP = () => {
    const mp = new MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);
    const cardForm = mp.cardForm({
      amount: "39.90",
      autoMount: true,
      form: {
        cardholderName: { id: "name" },
        cardNumber: { id: "number" },
        securityCode: { id: "cvv" },
        expirationDate: { id: "exp" },
        identificationType: { id: "docType" },
        identificationNumber: { id: "doc" },
      },
      callbacks: {
        onSubmit: async (e) => {
          e.preventDefault();
          const { token } = cardForm.getCardFormData();

          await fetch("/api/pagamentos/cartao", {
            method: "POST",
            body: JSON.stringify({
              token,
              valor: 39.9,
              email: "cliente@email",
              pedidoId: "ABC123",
            }),
          });

          alert("Pagamento enviado!");
        },
      },
    });
  };

  return (
    <div className="p-4">
      <Script src="https://sdk.mercadopago.com/js/v2" />

      <form id="form" className="flex flex-col gap-3">
        <input id="name" placeholder="Nome" className="border p-2" />
        <input id="number" placeholder="Número do cartão" className="border p-2" />
        <input id="exp" placeholder="Validade" className="border p-2" />
        <input id="cvv" placeholder="CVV" className="border p-2" />
        <input id="docType" placeholder="Tipo de doc" className="border p-2" />
        <input id="doc" placeholder="Documento" className="border p-2" />

        <button
          className="bg-blue-600 text-white p-2 rounded"
          type="submit"
        >
          Pagar
        </button>
      </form>
    </div>
  );
}
