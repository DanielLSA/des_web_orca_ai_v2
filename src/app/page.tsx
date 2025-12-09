import Card from "@/components/Card";

export default function HomePage() {
  return (
    <section className="grid" style={{ gridTemplateColumns: "1.1fr 1fr" }}>
      <Card>
        <h1>Seu plano financeiro começa aqui.</h1>
        <p>Entenda seu dinheiro, simule metas e siga um plano realista com um coach financeiro inteligente — feito para a realidade brasileira.</p>
        <div style={{ marginTop: 12 }}>
          <a className="btn" href="/(app)/dashboard">Ver Demo</a>
          <a className="btn outline" style={{ marginLeft: 8 }} href="#">Como funciona</a>
        </div>
      </Card>
      <Card>
        <img src="/hero-placeholder.png" alt="Painel financeiro ilustrativo" />
      </Card>
    </section>
  );
}
