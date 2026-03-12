import { useState, useEffect, useRef } from "react";

const GOOGLE_FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;600;700&family=Barlow:wght@300;400;500&display=swap');
`;

const styles = `
  ${GOOGLE_FONTS}

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #0a0a0a;
    --deep: #111111;
    --carbon: #1a1a1a;
    --steel: #2a2a2a;
    --dust: #8a7a6a;
    --ash: #c8b89a;
    --orange: #ff5a00;
    --orange-hot: #ff7a20;
    --white: #f0ece4;
    --muted: #6a6560;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--white);
    font-family: 'Barlow', sans-serif;
    overflow-x: hidden;
    cursor: default;
  }

  /* LOADING SCREEN */
  .loader {
    position: fixed; inset: 0; z-index: 9999;
    background: var(--black);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    transition: opacity 0.8s ease, visibility 0.8s ease;
  }
  .loader.hidden { opacity: 0; visibility: hidden; pointer-events: none; }

  .loader-track {
    width: 260px; height: 2px;
    background: var(--steel);
    position: relative; overflow: hidden;
    margin-top: 32px;
  }
  .loader-bar {
    position: absolute; top: 0; left: -100%;
    height: 100%; width: 100%;
    background: linear-gradient(90deg, transparent, var(--orange), var(--orange-hot));
    animation: loadBar 1.8s ease forwards;
  }
  @keyframes loadBar {
    0% { left: -100%; }
    100% { left: 0%; }
  }

  .loader-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(52px, 10vw, 96px);
    letter-spacing: 0.12em;
    color: var(--white);
    line-height: 0.9;
    text-align: center;
  }
  .loader-title span { color: var(--orange); }

  .loader-sub {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    letter-spacing: 0.4em;
    color: var(--muted);
    text-transform: uppercase;
    margin-top: 12px;
  }

  .loader-pct {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 14px;
    letter-spacing: 0.3em;
    color: var(--orange);
    margin-top: 16px;
    min-width: 50px;
    text-align: center;
  }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 48px;
    background: linear-gradient(to bottom, rgba(10,10,10,0.95), transparent);
    backdrop-filter: blur(2px);
  }
  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    letter-spacing: 0.15em;
    color: var(--white);
  }
  .nav-logo span { color: var(--orange); }

  .nav-links {
    display: flex; gap: 36px; list-style: none;
  }
  .nav-links a {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--ash);
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--orange); }

  .nav-cta {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; letter-spacing: 0.2em;
    text-transform: uppercase;
    background: var(--orange);
    color: var(--black);
    border: none; padding: 10px 24px;
    cursor: pointer; font-weight: 700;
    transition: background 0.2s, transform 0.1s;
  }
  .nav-cta:hover { background: var(--orange-hot); transform: translateY(-1px); }

  /* HERO */
  .hero {
    height: 100vh; min-height: 600px;
    display: flex; flex-direction: column;
    align-items: flex-start; justify-content: flex-end;
    padding: 0 48px 80px;
    position: relative; overflow: hidden;
  }

  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 70% 40%, rgba(255,90,0,0.08) 0%, transparent 60%),
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 40px,
        rgba(255,90,0,0.015) 40px,
        rgba(255,90,0,0.015) 41px
      ),
      linear-gradient(to bottom, #0a0a0a 0%, #111111 50%, #0d0d0d 100%);
  }

  .hero-noise {
    position: absolute; inset: 0; opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 200px;
  }

  .hero-number {
    position: absolute; right: -20px; top: 50%;
    transform: translateY(-50%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(200px, 30vw, 400px);
    color: rgba(255,90,0,0.04);
    line-height: 1;
    user-select: none;
    letter-spacing: -0.02em;
  }

  .hero-eyebrow {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; letter-spacing: 0.5em;
    text-transform: uppercase; color: var(--orange);
    margin-bottom: 16px;
    animation: fadeUp 0.8s ease 0.3s both;
  }

  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(72px, 12vw, 160px);
    line-height: 0.88;
    letter-spacing: 0.04em;
    max-width: 800px;
    animation: fadeUp 0.8s ease 0.5s both;
  }
  .hero-title .accent { color: var(--orange); display: block; }

  .hero-meta {
    display: flex; gap: 48px; margin-top: 32px;
    animation: fadeUp 0.8s ease 0.7s both;
  }
  .hero-meta-item { display: flex; flex-direction: column; gap: 4px; }
  .hero-meta-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px; letter-spacing: 0.4em;
    text-transform: uppercase; color: var(--muted);
  }
  .hero-meta-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px; font-weight: 600;
    letter-spacing: 0.1em; color: var(--white);
  }

  .hero-scroll {
    position: absolute; right: 48px; bottom: 80px;
    display: flex; flex-direction: column;
    align-items: center; gap: 8px;
    animation: fadeUp 0.8s ease 1s both;
  }
  .hero-scroll span {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px; letter-spacing: 0.4em;
    text-transform: uppercase; color: var(--muted);
    writing-mode: vertical-rl;
  }
  .scroll-line {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, var(--orange), transparent);
    animation: scrollPulse 2s ease infinite;
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* SECTION SHARED */
  section { padding: 100px 48px; }
  .section-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; letter-spacing: 0.5em;
    text-transform: uppercase; color: var(--orange);
    margin-bottom: 16px;
  }
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(42px, 6vw, 80px);
    line-height: 0.95; letter-spacing: 0.05em;
    color: var(--white); margin-bottom: 48px;
  }
  .divider {
    width: 60px; height: 2px;
    background: var(--orange);
    margin-bottom: 48px;
  }

  /* ABOUT */
  .about { background: var(--deep); }
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
    max-width: 1200px;
  }
  .about-text {
    font-size: 17px; line-height: 1.8;
    color: var(--ash); font-weight: 300;
  }
  .about-text p + p { margin-top: 20px; }
  .about-stats {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .stat-card {
    border: 1px solid var(--steel);
    padding: 28px 24px;
    position: relative; overflow: hidden;
    transition: border-color 0.3s;
  }
  .stat-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 3px; height: 0;
    background: var(--orange);
    transition: height 0.4s ease;
  }
  .stat-card:hover { border-color: var(--orange); }
  .stat-card:hover::before { height: 100%; }
  .stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px; color: var(--orange);
    line-height: 1; letter-spacing: 0.05em;
  }
  .stat-desc {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--muted);
    margin-top: 6px;
  }

  /* INSCRIPTION */
  .inscription { background: var(--black); }
  .steps-container {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 0; max-width: 1200px;
    border: 1px solid var(--steel);
  }
  .step {
    padding: 40px 32px; border-right: 1px solid var(--steel);
    position: relative; overflow: hidden;
    transition: background 0.3s;
  }
  .step:last-child { border-right: none; }
  .step:hover { background: var(--carbon); }
  .step-number {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 80px; color: rgba(255,90,0,0.1);
    line-height: 1; position: absolute;
    top: -10px; right: 16px;
    transition: color 0.3s;
  }
  .step:hover .step-number { color: rgba(255,90,0,0.2); }
  .step-icon {
    font-size: 28px; margin-bottom: 20px;
  }
  .step-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--white); margin-bottom: 12px;
  }
  .step-desc {
    font-size: 14px; line-height: 1.7;
    color: var(--muted); font-weight: 300;
  }
  .step-tag {
    display: inline-block; margin-top: 20px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--orange);
    border-bottom: 1px solid var(--orange);
    padding-bottom: 2px;
  }

  /* CATEGORIES */
  .categories {
    background: var(--carbon);
    padding: 60px 48px;
  }
  .cats-grid {
    display: flex; gap: 16px; flex-wrap: wrap;
    margin-top: 32px;
  }
  .cat-pill {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px; letter-spacing: 0.2em;
    text-transform: uppercase; font-weight: 600;
    padding: 12px 28px;
    border: 1px solid var(--steel);
    color: var(--ash); cursor: pointer;
    transition: all 0.2s;
    background: transparent;
  }
  .cat-pill:hover, .cat-pill.active {
    background: var(--orange); border-color: var(--orange);
    color: var(--black);
  }

  /* MEDIA GALLERY */
  .media { background: var(--black); }
  .year-toggle {
    display: flex; gap: 0; margin-bottom: 48px;
    border: 1px solid var(--steel); width: fit-content;
  }
  .year-btn {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; letter-spacing: 0.15em;
    padding: 12px 40px; border: none; cursor: pointer;
    transition: all 0.2s; background: transparent;
    color: var(--muted);
  }
  .year-btn.active {
    background: var(--orange); color: var(--black);
  }

  .media-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 8px; max-width: 1200px;
  }
  .media-card {
    position: relative; overflow: hidden;
    background: var(--carbon);
    aspect-ratio: 4/3; cursor: pointer;
    transition: transform 0.3s;
  }
  .media-card:first-child {
    grid-column: span 2; aspect-ratio: 16/9;
  }
  .media-card:hover { transform: scale(1.02); z-index: 2; }
  .media-card:hover .media-overlay { opacity: 1; }

  .media-thumb {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 48px;
    background: var(--carbon);
    position: relative;
  }

  /* Varied background textures for media cards */
  .media-card:nth-child(1) .media-thumb { background: linear-gradient(135deg, #1a1209, #2a1a08, #1a1209); }
  .media-card:nth-child(2) .media-thumb { background: linear-gradient(135deg, #0d1a1a, #0a2020); }
  .media-card:nth-child(3) .media-thumb { background: linear-gradient(135deg, #1a0d0a, #2a1510); }
  .media-card:nth-child(4) .media-thumb { background: linear-gradient(135deg, #0f0f1a, #151520); }
  .media-card:nth-child(5) .media-thumb { background: linear-gradient(135deg, #1a1a0a, #201e08); }
  .media-card:nth-child(6) .media-thumb { background: linear-gradient(135deg, #0d1a10, #0a2012); }

  .media-overlay {
    position: absolute; inset: 0;
    background: rgba(255,90,0,0.85);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.3s;
    flex-direction: column; gap: 8px;
  }
  .media-play {
    width: 56px; height: 56px; border-radius: 50%;
    border: 2px solid var(--black);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
  }
  .media-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--black);
    font-weight: 700;
  }

  .media-card-tag {
    position: absolute; top: 12px; left: 12px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px; letter-spacing: 0.3em;
    text-transform: uppercase;
    background: var(--black); color: var(--orange);
    padding: 4px 10px;
  }

  /* REGISTER CTA */
  .register {
    background: var(--orange);
    padding: 80px 48px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 32px;
  }
  .register-text .section-label { color: rgba(0,0,0,0.5); }
  .register-text .section-title {
    color: var(--black); margin-bottom: 0; font-size: clamp(36px, 5vw, 64px);
  }
  .register-btn {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px; letter-spacing: 0.2em;
    padding: 20px 60px; border: 2px solid var(--black);
    background: var(--black); color: var(--white);
    cursor: pointer; transition: all 0.2s;
  }
  .register-btn:hover { background: transparent; color: var(--black); }

  /* FOOTER */
  footer {
    background: var(--deep); padding: 60px 48px 40px;
    border-top: 1px solid var(--steel);
  }
  .footer-grid {
    display: grid; grid-template-columns: 2fr 1fr 1fr;
    gap: 60px; margin-bottom: 60px;
  }
  .footer-brand {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px; letter-spacing: 0.15em;
    margin-bottom: 16px;
  }
  .footer-brand span { color: var(--orange); }
  .footer-desc {
    font-size: 14px; color: var(--muted); line-height: 1.7;
    font-weight: 300; max-width: 280px;
  }
  .footer-col-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; letter-spacing: 0.4em;
    text-transform: uppercase; color: var(--orange);
    margin-bottom: 20px;
  }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-links a {
    font-size: 14px; color: var(--muted); text-decoration: none;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--white); }
  .footer-bottom {
    padding-top: 32px; border-top: 1px solid var(--steel);
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 12px;
  }
  .footer-copy {
    font-size: 12px; color: var(--muted); letter-spacing: 0.1em;
  }
  .footer-socials { display: flex; gap: 16px; }
  .social-link {
    width: 36px; height: 36px; border: 1px solid var(--steel);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; color: var(--muted); cursor: pointer;
    transition: all 0.2s; text-decoration: none;
  }
  .social-link:hover { border-color: var(--orange); color: var(--orange); }

  /* MODAL */
  .modal-bg {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.92);
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease;
  }
  .modal {
    background: var(--carbon); border: 1px solid var(--steel);
    padding: 48px; max-width: 600px; width: 90%;
    position: relative;
    animation: scaleIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .modal-close {
    position: absolute; top: 16px; right: 16px;
    background: none; border: none; color: var(--muted);
    font-size: 24px; cursor: pointer; transition: color 0.2s;
    line-height: 1;
  }
  .modal-close:hover { color: var(--orange); }
  .modal-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 40px; letter-spacing: 0.1em; margin-bottom: 8px;
  }
  .modal-sub {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--orange);
    margin-bottom: 32px;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--muted);
  }
  .form-group input, .form-group select {
    background: var(--steel); border: 1px solid var(--steel);
    color: var(--white); padding: 12px 16px;
    font-family: 'Barlow', sans-serif; font-size: 15px;
    outline: none; transition: border-color 0.2s;
    appearance: none;
  }
  .form-group input:focus, .form-group select:focus { border-color: var(--orange); }
  .form-group select option { background: var(--carbon); }
  .form-submit {
    width: 100%; margin-top: 24px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px; letter-spacing: 0.3em;
    padding: 16px; background: var(--orange);
    color: var(--black); border: none; cursor: pointer;
    transition: background 0.2s;
  }
  .form-submit:hover { background: var(--orange-hot); }

  @media (max-width: 900px) {
    nav { padding: 16px 24px; }
    .nav-links { display: none; }
    section { padding: 72px 24px; }
    .hero { padding: 0 24px 60px; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .steps-container { grid-template-columns: 1fr 1fr; }
    .step { border-right: none; border-bottom: 1px solid var(--steel); }
    .media-grid { grid-template-columns: 1fr 1fr; }
    .media-card:first-child { grid-column: span 2; }
    .footer-grid { grid-template-columns: 1fr; gap: 32px; }
    .form-row { grid-template-columns: 1fr; }
    .register { flex-direction: column; }
  }
`;

const mediaItems2025 = [
  { type: "VIDEO", icon: "🎬", label: "Final Race Highlights" },
  { type: "PHOTO", icon: "📸", label: "Track Action" },
  { type: "VIDEO", icon: "🎬", label: "Behind the Scenes" },
  { type: "PHOTO", icon: "📸", label: "Podium Ceremony" },
  { type: "VIDEO", icon: "🎬", label: "Rider Interviews" },
  { type: "PHOTO", icon: "📸", label: "Crowd & Atmosphere" },
];
const mediaItems2026 = [
  { type: "VIDEO", icon: "🎬", label: "2026 Teaser Promo" },
  { type: "PHOTO", icon: "📸", label: "New Track Preview" },
  { type: "VIDEO", icon: "🎬", label: "Rider Announcements" },
  { type: "PHOTO", icon: "📸", label: "Venue Setup" },
  { type: "VIDEO", icon: "🎬", label: "Press Conference" },
  { type: "PHOTO", icon: "📸", label: "Sponsors Reveal" },
];

export default function MotocrossApp() {
  const [loaded, setLoaded] = useState(false);
  const [pct, setPct] = useState(0);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ Nombre: "", Apellido: "", Cedula: "", Correo: "", Categoría: "", Piloto: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 12) + 4;
      if (count >= 100) { count = 100; clearInterval(interval); setTimeout(() => setLoaded(true), 400); }
      setPct(count);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const mediaItems = selectedYear === "2025" ? mediaItems2025 : mediaItems2026;
  const categories = ["ALL", "MX1", "MX2", "MX3", "NIÑOS", "VETERANOS"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setShowModal(false); setSubmitted(false); }, 2000);
  };

  return (
    <>
      <style>{styles}</style>

      {/* LOADING SCREEN */}
      <div className={`loader ${loaded ? "hidden" : ""}`}>
        <div className="loader-title">MOTOCROSS<br/></div>
        <div className="loader-sub">CAMPEONATO. 2026</div>
        <div className="loader-track"><div className="loader.bar" /></div>
        <div className="loader-pct">{pct}%</div>
      </div>

      {/* NAV */}
      <nav>
        <div className="nav-logo">MOTOCROSS<span></span></div>
        <ul className="nav-links">
          <li><a href="#about">Acerca de</a></li>
          <li><a href="#inscription">Proceso de Inscripción</a></li>
          <li><a href="#media">Media</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
        <button className="nav-cta" onClick={() => setShowModal(true)}>Registrarme Ahora</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-noise" />
        <div className="hero-number">26</div>
        <div className="hero-eyebrow">Campeonato · Edición 2026</div>
        <h1 className="hero-title">
          BAJO CALIENTE<br />
          <span className="accent">ARANCIBIA</span>
        </h1>
        <div className="hero-meta">
          <div className="hero-meta-item">
            <span className="hero-meta-label">Fecha</span>
            <span className="hero-meta-value">11 de Abril, 2026</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Ubicación</span>
            <span className="hero-meta-value">Bajo caliente, Puntarenas.</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Categorias</span>
            <span className="hero-meta-value">5 Categorias</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Precio Inscripción</span>
            <span className="hero-meta-value">18,000 CRC</span>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="section-label">Acerca del evento</div>
        <div className="about-grid">
          <div>
            <h2 className="section-title">EL EVENTO DE<br />MOTOCROSS <br /> MÁS GRANDE DE LA ZONA</h2>
            <div className="about-text">
              <p>El Campeonato MotoX Extreme reúne a los mejores pilotos de motocross de toda la región para vivir un día de competencia pura y sin filtros. Tramos de montaña intensa hasta curvas técnicas, nuestro circuito está diseñado para llevar a cada piloto al límite.</p>
              <p>Ya seas un profesional experimentado o un aficionado apasionado, este es el lugar para vos.</p>
            </div>
          </div>
          <div className="about-stats">
            {[["200+", "Pilotos"], ["7", "Provincias"], ["3ra", "Edición"], ["18.000 CRC", "Precio Inscripción"]].map(([n, l]) => (
              <div className="stat-card" key={l}>
                <div className="stat-num">{n}</div>
                <div className="stat-desc">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSCRIPTION */}
      <section className="inscription" id="inscription">
        <div className="section-label">Cómo Inscribirse?</div>
        <h2 className="section-title">PROCESO DE<br />INSCRIPCION</h2>
        <div className="steps-container">
          {[
            { icon: "📋", title: "Registrarse en línea", desc: "Completa el formulario de registro con tu información personal y selecciona tu categoría de competencia.", tag: "5 min" },
            { icon: "💳", title: "Pagar la Tarifa de Inscripción", desc: "Asegura tu lugar con nuestro sistema de pago en línea. Las tarifas de inscripción varían por categoría y grupo de edad.", tag: "Instantáneo" },
            { icon: "🏍️", title: "Inspección Técnica", desc: "Lleva tu motocicleta para su inspección técnica el día del evento. Todas las máquinas deben cumplir con los estándares de seguridad.", tag: "En el lugar" },
            { icon: "🏁", title: "Día de la Carrera", desc: "Recoge tu chaleco de piloto, asiste a la reunión de prensa y prepárate para conquistar la pista.", tag: "Día de la carrera" },
          ].map((s, i) => (
            <div className="step" key={i}>
              <div className="step-number">{String(i + 1).padStart(2, "0")}</div>
              <div className="step-icon">{s.icon}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
              <div className="step-tag">{s.tag}</div>
            </div>
          ))}
        </div>

        {/* CATEGORIES */}
        <div style={{ marginTop: 60 }}>
          <div className="section-label">Categorias de Carrera</div>
          <div className="cats-grid">
            {categories.map(c => (
              <button key={c} className={`cat-pill ${activeCategory === c ? "active" : ""}`} onClick={() => setActiveCategory(c)}>{c}</button>
            ))}
          </div>
          {activeCategory !== "ALL" && (
            <div style={{ marginTop: 24, padding: "24px 32px", border: "1px solid #2a2a2a", maxWidth: 600 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 8 }}>Category Info</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, marginBottom: 8 }}>{activeCategory} CLASS</div>
              <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>
                {activeCategory === "MX1" && "Open class for 450cc bikes. Elite amateur and professional riders."}
                {activeCategory === "MX2" && "250cc class for intermediate to advanced riders. Fast and technical."}
                {activeCategory === "MX3" && "125cc class, perfect for developing riders and junior competitors."}
                {activeCategory === "KIDS" && "Youth category for riders aged 6–14. Safety first, fun always."}
                {activeCategory === "VETERANS" && "For riders 40+. Competitive, experienced, and passionate about the sport."}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MEDIA GALLERY */}
      <section className="media" id="media">
        <div className="section-label">Medios del Evento</div>
        <h2 className="section-title">GALERÍA<br />DE IMÁGENES</h2>
        <div className="year-toggle">
          <button className={`year-btn ${selectedYear === "2025" ? "active" : ""}`} onClick={() => setSelectedYear("2025")}>2025</button>
          <button className={`year-btn ${selectedYear === "2026" ? "active" : ""}`} onClick={() => setSelectedYear("2026")}>2026</button>
        </div>
        <div className="media-grid">
          {mediaItems.map((item, i) => (
            <div className="media-card" key={i}>
              <div className="media-thumb">{item.icon}</div>
              <div className="media-card-tag">{item.type}</div>
              <div className="media-overlay">
                <div className="media-play">▶</div>
                <div className="media-label">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    


{/* FOOTER */}
<footer id="contact">
  <div className="footer-grid">

    {/* Marca */}
    <div>
      <div className="footer-brand">MOTOCROSS</div>
      <div className="footer-brand">EVENTO ANUAL</div>

      <p className="footer-desc">
        Competencia anual de motocross en Bajo Caliente. 
        Velocidad, adrenalina y pasión por las motos en un 
        evento único para pilotos y fanáticos.
      </p>
    </div>

    {/* Navegación */}
    <div>
      <div className="footer-col-title">Links Rápidos</div>

      <ul className="footer-links">
        {[
          { name: "Página Principal", link: "#home" },
          { name: "Acerca de", link: "#about" },
          { name: "Inscripción", link: "#signup" },
          { name: "Galería / Medios", link: "#media" },
          { name: "Contacto", link: "#contact" }
        ].map((item) => (
          <li key={item.name}>
            <a href={item.link}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>

    {/* Contacto */}
    <div>
      <div className="footer-col-title">Contacto</div>

      <ul className="footer-links">

        <li>
          <a href="mailto:motocross-bajo-caliente@gmail.com">
            motocross-bajo-caliente@gmail.com
          </a>
        </li>

        <li>
          <a href="tel:+50587781125">
            +(505) 8778-1125
          </a>
        </li>

        <li>
          <a 
            href="https://maps.google.com" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Circuito Motocross
          </a>
        </li>

        <li>
          11 de Abril, 2026
        </li>

      </ul>
    </div>

  </div>


  {/* Footer inferior */}
  <div className="footer-bottom">

    <div className="footer-copy">
      © 2026 Motocross — Todos los derechos reservados
    </div>


    {/* Redes sociales */}
    <div className="footer-socials">

      {[
        {
          icon: "📷",
          link: "https://instagram.com"
        },
        {
          icon: "📘",
          link: "https://www.facebook.com/profile.php?id=61558448635248"
        },
        {
          icon: "▶",
          link: "https://youtube.com"
        },
        {
          icon: "✕",
          link: "https://twitter.com"
        }
      ].map((social, i) => (

        <a
          key={i}
          className="social-link"
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {social.icon}
        </a>

      ))}

    </div>

  </div>

</footer>

      {/* REGISTRATION MODAL */}
      {showModal && (
        <div className="modal-bg" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🏁</div>
                <div className="modal-title">INSCRITO!</div>
                <div style={{ color: "var(--muted)", fontSize: 15 }}>Solicitud de regiatro recibida, por favor revise su correo electrónico.</div>
              </div>
            ) : (
              <>
                <div className="modal-title">FOMULARIO DE REGISTRO</div>
                <div className="modal-sub">CAMPEONATO 2026</div>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre</label>
                      <input required value={formData.Nombre} onChange={e => setFormData({ ...formData, Nombre: e.target.value })} placeholder="Jorge" />
                    </div>
                    <div className="form-group">
                      <label>Apellido</label>
                      <input required value={formData.Apellido} onChange={e => setFormData({ ...formData, Apellido: e.target.value })} placeholder="Martínez" />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <label>Cédula</label>
                    <input required value={formData.Cedula} onChange={e => setFormData({ ...formData, Cedula: e.target.value })} placeholder="1-0345-0789" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <label>Correo Electrónico</label>
                    <input type="email" required value={formData.Correo} onChange={e => setFormData({ ...formData, Correo: e.target.value })} placeholder="jorge@email.com" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Categoría</label>
                      <select required value={formData.Categoría} onChange={e => setFormData({ ...formData, Categoría: e.target.value })}>
                        <option value="">Seleccione Categoría</option>
                        {["MX1 (450cc)", "MX2 (250cc)", "MX3 (125cc)", "Niños", "Veteranos"].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Piloto</label>
                      <input type="number" value={formData.Piloto} onChange={e => setFormData({ ...formData, Piloto: e.target.value })} placeholder="42" min="1" max="999" />
                    </div>
                  </div>
                  <button type="submit" className="form-submit">CONFIRMAR REGISTRO →</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
