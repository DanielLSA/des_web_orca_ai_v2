"use client";

import { useEffect, useState } from "react";

type FixedExpense = {
  id: number;
  description: string;
  amount: number;
};

type Props = {
  refresh: number;
};

export default function FixedExpenseList({ refresh }: Props) {
  const [expenses, setExpenses] = useState<FixedExpense[]>([]);

  useEffect(() => {
    fetch("/api/fixed-expenses")
      .then((res) => res.json())
      .then(setExpenses);
  }, [refresh]);

  return (
    <ul>
      {expenses.map((e) => (
        <li key={e.id}>
          {e.description} — R$ {e.amount}
        </li>
      ))}
    </ul>
  );
}
