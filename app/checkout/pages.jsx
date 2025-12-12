"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [metodo, setMetodo] = useState(null);
  const [qrCodeBase64, setQrCodeBase64] = useState(null);
  const [copiaCola, setCopiaCola] = useState("");

  const valorPedido = 39.90;
  const pedidoId = "ABC123";

  const gerarPix = async () => {
    const res = await fetch("/api/pagamentos/pix", {
      method: "POST",
      body: JSON.stringify({
        pedidoId,
        nomeCliente: "Cliente Teste",
        valor: valorPedido,
      }),
    });

    const data = await res.json();

    setQrCodeBase64(data.qrCodeBase64);
    setCopiaCola(data.copiaCola);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pagamento do Pedido</h1>
      <p className="text-lg mb-4">Total: R$ {valorPedido}</p>

      {!metodo && (
        <div className="flex gap-4">
          <button
            onClick={() => setMetodo("pix")}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Pagar com PIX
          </button>

          <button
            onClick={() => setMetodo("card")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Cartão de Crédito
          </button>
        </div>
      )}

      {metodo === "pix" && (
        <div className="mt-6">
          <button
            onClick={gerarPix}
            className="px-4 py-2 bg-green-700 text-white rounded"
          >
            Gerar PIX
          </button>

          {qrCodeBase64 && (
            <div className="mt-4 text-center">
              <img
                src={`data:image/png;base64,${qrCodeBase64}`}
                className="mx-auto w-48"
              />
              <p className="mt-4 break-all">{copiaCola}</p>

              <button
                className="px-4 py-2 mt-2 bg-gray-800 text-white rounded"
                onClick={() => navigator.clipboard.writeText(copiaCola)}
              >
                Copiar código PIX
              </button>
            </div>
          )}
        </div>
      )}

      {metodo === "card" && (
        <iframe
          src="/pagamentos/cartao"
          className="w-full h-[600px] border mt-6 rounded"
        ></iframe>
      )}
    </div>
  );
}
