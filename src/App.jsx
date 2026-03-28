import { useState, useEffect } from "react";

const cars = [
  {
    name: "BMW M3 Competition",
    type: "Esportivo",
    year: 2023,
    km: "12.000 km",
    price: "R$ 589.000",
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e"
  },
  {
    name: "Mercedes GLC 300",
    type: "SUV",
    year: 2022,
    km: "18.500 km",
    price: "R$ 420.000",
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8"
  },
  {
    name: "Audi A4 S-Line",
    type: "Sedan",
    year: 2021,
    km: "25.000 km",
    price: "R$ 265.000",
    img: "https://images.unsplash.com/photo-1726003536800-b9ec0888cf36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXVkaSUyMGE0fGVufDB8fDB8fHww"
  }
];

function App() {
  const [filter, setFilter] = useState("Todos");
  const [scrollY, setScrollY] = useState(0);

  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    interesse: ""
  });

  // ===== SCROLL =====
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===== REVEAL =====
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("active");
      });
    });

    els.forEach((el) => obs.observe(el));
  }, []);

  // ===== CURSOR MAGNÉTICO =====
  useEffect(() => {
    const buttons = document.querySelectorAll("button");

    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
      });
    });
  }, []);

  const filteredCars =
    filter === "Todos"
      ? cars
      : cars.filter((car) => car.type === filter);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.nome || !form.whatsapp) {
      alert("Preencha Nome e WhatsApp");
      return;
    }

    const leads = JSON.parse(localStorage.getItem("leads")) || [];

    leads.push({
      ...form,
      data: new Date().toLocaleString()
    });

    localStorage.setItem("leads", JSON.stringify(leads));

    alert("Mensagem enviada!");

    setForm({
      nome: "",
      whatsapp: "",
      email: "",
      interesse: ""
    });
  };

  // ===== APPLE PARALLAX =====
  const videoStyle = {
    transform: `scale(${1 + scrollY * 0.0004}) translateY(${scrollY * 0.4}px)`
  };

  const textStyle = {
    transform: `translateY(${scrollY * 0.2}px)`,
    opacity: `${1 - scrollY * 0.0015}`
  };

  return (
    <div className="app">

      {/* HERO */}
      <div className="hero">
        <video className="hero-video" autoPlay muted loop playsInline style={videoStyle}>
          {/* O BASE_URL agora vai entender sozinho se é '/' ou '/Rio-Elite-Cars/' */}
          <source src={`${import.meta.env.BASE_URL}video/car.mp4`} type="video/mp4" />
        </video>

        <div className="hero-content" style={textStyle}>
          <h1>Mais que um carro. Um símbolo de conquista.</h1>

          <p className="mt-10">
            Exclusividade, potência e elegância no mais alto nível.
          </p>

          <button
            className="cta-primary"
            onClick={() =>
              document.querySelector(".grid").scrollIntoView({
                behavior: "smooth"
              })
            }
          >
            Explorar Veículos
          </button>
        </div>
      </div>

      {/* AUTORIDADE */}
      <div className="reveal" style={{ padding: "40px", textAlign: "center" }}>
        <h2 className="gold">Experiência premium no Rio de Janeiro</h2>
        <p className="mt-10">
          +120 veículos vendidos • Clientes exigentes • Atendimento exclusivo
        </p>
      </div>

      {/* FILTROS */}
      <div className="filters reveal">
        {["Todos", "SUV", "Sedan", "Esportivo"].map((item) => (
          <button
            key={item}
            className={`filter-btn ${filter === item ? "active" : ""}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid reveal">
        {filteredCars.map((car) => (
          <div key={car.name} className="card">
            {/* AJUSTE AQUI: Imagens do Unsplash são links externos, funcionam direto */}
            <img src={car.img} alt={car.name} />

            <div className="card-content">
              <h3 className="card-title">{car.name}</h3>
              <p className="card-info">{car.year} • {car.km}</p>
              <p className="card-price">{car.price}</p>

              <button
                className="card-cta"
                onClick={() => {
                  setForm({ ...form, interesse: car.name });
                  document.querySelector(".form-section").scrollIntoView({ behavior: "smooth" });
                }}
              >
                Tenho interesse
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA FINAL */}
      <div className="reveal" style={{ textAlign: "center", padding: "80px" }}>
        <h2>Pronto para um novo nível?</h2>

        <button
          className="cta-primary"
          onClick={() =>
            document.querySelector(".form-section").scrollIntoView({
              behavior: "smooth"
            })
          }
        >
          Falar com Consultor
        </button>
      </div>

      {/* FORM */}
      <div className="form-section reveal">
        <h2 className="text-center gold">Fale com um Consultor</h2>

        <div className="form-container">
          <input className="input" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
          <input className="input" name="whatsapp" placeholder="WhatsApp" value={form.whatsapp} onChange={handleChange} />
          <input className="input" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
          <input className="input" name="interesse" placeholder="Interesse" value={form.interesse} onChange={handleChange} />

          <button className="submit" onClick={handleSubmit}>
            Enviar
          </button>
        </div>
      </div>

      {/* WHATS */}
      <a href="https://wa.me" target="_blank" className="whatsapp">
        💬
      </a>

    </div>
  );
}

export default App;
