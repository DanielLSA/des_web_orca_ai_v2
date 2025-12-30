"use client";

type Props = {
  totalIn: number;
  totalOut: number;
};

export default function SummaryCards({ totalIn, totalOut }: Props) {
  const saldo = totalIn - totalOut;

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
      <Card title="Entradas" value={totalIn} />
      <Card title="Saídas" value={totalOut} />
      <Card title="Saldo" value={saldo} />
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #333",
        borderRadius: "8px",
        minWidth: "150px",
      }}
    >
      <h3>{title}</h3>
      <strong>R$ {value.toFixed(2)}</strong>
    </div>
  );
}
