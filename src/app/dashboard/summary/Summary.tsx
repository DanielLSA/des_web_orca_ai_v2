"use client";

import { useEffect, useState } from "react";
import SummaryChart from "./SummaryChart";


type SummaryData = {
  income: number;
  expense: number;
  balance: number;
};

export default function Summary() {
  const [data, setData] = useState<SummaryData | null>(null);

  useEffect(() => {
    fetch("/api/summary")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
  <section style={{ marginBottom: "2rem" }}>
    <h2>Resumo Financeiro</h2>

    <p>Entradas: <strong>R$ {data.income}</strong></p>
    <p>Saídas: <strong>R$ {data.expense}</strong></p>
    <p>Saldo: <strong>R$ {data.balance}</strong></p>

    <SummaryChart
      income={data.income}
      expense={data.expense}
    />
  </section>
);
}
