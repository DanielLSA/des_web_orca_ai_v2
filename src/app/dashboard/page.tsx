import Card from "@/components/Card";

const kpis = [
  { title: "Renda", value: "R$ 5.000,00" },
  { title: "Despesas", value: "R$ 3.200,00" },
  { title: "Saldo", value: "R$ 1.800,00" },
];

export default function DashboardPage() {
  return (
    <section className="grid" style={{ gap: 16 }}>
      <h2>Dashboard</h2>

      <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {kpis.map((k) => (
          <Card key={k.title}>
            <h4>{k.title}</h4>
            <p style={{ fontSize: 22, fontWeight: 700 }}>{k.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <Card>
          <h4>Gastos por categoria</h4>
          <div style={{ height: 220, background: "rgba(255,255,255,.04)", borderRadius: 12 }} />
        </Card>
        <Card>
          <h4>Saldo acumulado</h4>
          <div style={{ height: 220, background: "rgba(255,255,255,.04)", borderRadius: 12 }} />
        </Card>
      </div>
    </section>
  );
}
