import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "آورو!" },
      { name: "description", content: "قهوه تخصصی، دسرهای هنری و فضایی ساخته شده برای نسل خلاق رشت." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  component: AvroLanding,
});

const SLIDES = [
  { cls: "s1", tag: "قهوه تخصصی", h: ["استخراج", "بی‌نقص."], p: "دانه‌های تک‌منشاء، دم‌آوری شده با دقت توسط باریستاهای ما. هر فنجان، یک آیین." },
  { cls: "s2", tag: "دسرهای هنری", h: ["رویاهای", "شیرین."], p: "شیرینی‌های خانگی تازه‌پزی شده. از کروسان پسته تا تیرامیسوی ماچا." },
  { cls: "s3", tag: "دکور چشم‌نواز", h: ["فضایی برای", "خلق کردن."], p: "نور گرم، گوشه‌های دنج، و فضایی که الهام می‌بخشد. خانه دومت در رشت." },
  { cls: "s4", tag: "جامعه خلاق", h: ["آدم‌هایت را", "اینجا پیدا کن."], p: "محل تجمع جوانان خلاق رشت. قهوه خوب، آدم‌های خوب به هم می‌رسند." },
];

const TABS = {
  hot: {
    label: "بار گرم",
    items: [
      { id: "mi-01", name: "اسپرسو", image: "/menu/mi-01.png" },
      { id: "mi-02", name: "آمریکانو", image: "/menu/mi-02.png" },
      { id: "mi-03", name: "لاته", image: "/menu/mi-03.png" },
    ],
  },
  cold: {
    label: "بار سرد",
    items: [
      { id: "mi-04", name: "آیس آمریکانو", image: "/menu/mi-04.png" },
      { id: "mi-05", name: "آیس لاته", image: "/menu/mi-05.png" },
      { id: "mi-06", name: "بلو منگو لاته", image: "/menu/mi-06.png" },
      { id: "mi-07", name: "بلو منگو", image: "/menu/mi-07.png" },
      { id: "mi-08", name: "آیس لاته سه رنگ", image: "/menu/mi-08.png" },
      { id: "mi-09", name: "ماچا توت فرنگی", image: "/menu/mi-09.png" },
      { id: "mi-10", name: "ماچا انبه", image: "/menu/mi-10.png" },
      { id: "mi-11", name: "آیس ماچا لاته", image: "/menu/mi-11.png" },
      { id: "mi-12", name: "آیس بلو لاته", image: "/menu/mi-12.png" },
      { id: "mi-13", name: "فراپه قهوه", image: "/menu/mi-13.png" },
      { id: "mi-14", name: "فراپه وانیل", image: "/menu/mi-14.png" },
      { id: "mi-15", name: "آیس شکلات", image: "/menu/mi-15.png" },
      { id: "mi-16", name: "شیک بیسکویت", image: "/menu/mi-16.png" },
      { id: "mi-17", name: "شیک کوکی", image: "/menu/mi-17.png" },
      { id: "mi-18", name: "میلک شیک", image: "/menu/mi-18.png" },
      { id: "mi-19", name: "شیک شکلات", image: "/menu/mi-19.png" },
      { id: "mi-20", name: "اسموتی هلو", image: "/menu/mi-20.png" },
      { id: "mi-21", name: "اسموتی توت فرنگی", image: "/menu/mi-21.png" },
      { id: "mi-22", name: "اسموتی شاتوت", image: "/menu/mi-22.png" },
      { id: "mi-23", name: "لیموناد توت فرنگی", image: "/menu/mi-23.png" },
      { id: "mi-24", name: "لیموناد", image: "/menu/mi-24.png" },
      { id: "mi-25", name: "نوشیدنی مخصوص", image: "/menu/mi-25.png" },
    ],
  },
  dessert: {
    label: "کیک و دسر",
    items: [
      { id: "mi-26", name: "تیرامیسو", image: "/menu/mi-26.png" },
      { id: "mi-27", name: "شیرینی ناپلئونی", image: "/menu/mi-27.png" },
      { id: "mi-28", name: "اکلر شکلاتی", image: "/menu/mi-28.png" },
      { id: "mi-29", name: "کوکی پسته", image: "/menu/mi-29.png" },
      { id: "mi-30", name: "کوکی شکلاتی", image: "/menu/mi-30.png" },
      { id: "mi-31", name: "کوکی پسته و شکلات", image: "/menu/mi-31.png" },
      { id: "mi-32", name: "گرانولا بار", image: "/menu/mi-32.png" },
    ],
  },
  sand: {
    label: "ساندویچ",
    items: [
      { id: "mi-33", name: "ساندویچ کروسان", image: "/menu/mi-33.png" },
      { id: "mi-34", name: "ساندویچ فوکاچیا", image: "/menu/mi-34.png" },
      { id: "mi-35", name: "ساندویچ نان چندغله", image: "/menu/mi-35.png" },
    ],
  },
} as const;

type TabKey = keyof typeof TABS;

const GALLERY = [
  ["g1", "بار قهوه"], ["g2", "نوشیدنی سرد"], ["g3", "ماچا"],
  ["g5", "دکور داخلی"],
];

const TESTIMONIALS = [
  { txt: "«صادقانه بهترین قهوه تخصصی خارج از تهران که خوردم. لاته شیر جو دوسر عالیه و دکور داخلی خیلی خوشگله. جای ثابتمه برای کار ریموت.»", name: "سارا م.", handle: "@saramirz · رشت", initial: "س", color: "#243d67" },
  { txt: "«تیرامیسوی ماچا خارق‌العاده‌ست. تو رشت همچین چیزی نخورده بودم. آورو جای خودشه. دنج و شیک — هم برای قرار و هم برای دورهمی عالیه.»", name: "آریان ک.", handle: "@aryan.codes · رشت", initial: "آ", color: "#f46036" },
  { txt: "«بالاخره یه کافه تو رشت که حالیشه! موسیقی خوب، قهوه خوب، و بچه‌های پشت بار می‌دونن موج سوم قهوه یعنی چی. حداقل هفته‌ای سه بار اینجام.»", name: "نیکا ه.", handle: "@nikahstudios · رشت", initial: "ن", color: "#5c7a3e" },
  { txt: "«همه چیز این مکان واضحه که با دقت انتخاب شده. کلد برو امضایشون حرف نداره. بیرون بارون، داخل گرم — دقیقاً همون انرژی رشتی که دوسش دارم.»", name: "دانیال ر.", handle: "@danialrasht · رشت", initial: "د", color: "#1e3820" },
];

function AvroLanding() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>("cold");
  const [slide, setSlide] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("lang", "fa");
    document.documentElement.setAttribute("dir", "rtl");
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("vis")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    // spawn particles
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 24; i++) {
      const p = document.createElement("div");
      p.className = "ptcl";
      const sz = Math.random() * 3.5 + 1.5;
      const hue = Math.random() > 0.6 ? "rgba(244,96,54," : "rgba(255,180,80,";
      p.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;bottom:${Math.random() * 40 + 5}%;background:${hue}${Math.random() * 0.55 + 0.25});animation-duration:${Math.random() * 5 + 4}s;animation-delay:${Math.random() * 6}s;`;
      hero.appendChild(p);
      particles.push(p);
    }
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      const a = hero.querySelector<HTMLElement>(".orb-a");
      const b = hero.querySelector<HTMLElement>(".orb-b");
      const c = hero.querySelector<HTMLElement>(".orb-c");
      if (a) a.style.transform = `translate(${x * -38}px,${y * 28}px)`;
      if (b) b.style.transform = `translate(${x * 28}px,${y * -22}px)`;
      if (c) c.style.transform = `translate(${x * -18}px,${y * 18}px)`;
    };
    hero.addEventListener("mousemove", onMove);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      particles.forEach((p) => p.remove());
    };
  }, []);

  const tickerItems = ["قهوه تخصصی", "رشت، گیلان", "دسرهای هنری", "انرژی مثبت", "AVRO!", "کلد برو", "اینستاگرامیک", "موج سوم قهوه"];

  return (
    <>
      <style>{CSS}</style>

      <nav id="nav" className={navSolid ? "solid" : ""}>
        <a href="#hero" className="nav-logo" aria-label="AVRO!">
          <img src="/logo.png" alt="AVRO!" className="logo-img logo-light" />
          <img src="/logo-dark.png" alt="" className="logo-img logo-dark" aria-hidden="true" />
        </a>
        <ul className="nav-links">
          <li><a href="#hero">صفحه اصلی</a></li>
          <li><a href="#menu">منو</a></li>
          <li><a href="#about">درباره ما</a></li>
          <li><a href="#gallery">گالری</a></li>
          <li><a href="#footer">تماس</a></li>
          <li><a href="#cta" className="nav-cta">رزرو</a></li>
        </ul>
        <button className="ham" aria-label="منو" onClick={() => setMobOpen(true)}>
          <span /><span /><span />
        </button>
      </nav>

      {mobOpen && (
        <div id="mob" style={{ display: "flex" }}>
          <button className="mob-x" onClick={() => setMobOpen(false)}>✕</button>
          <ul>
            {[["#hero", "صفحه اصلی"], ["#menu", "منو"], ["#about", "درباره ما"], ["#gallery", "گالری"], ["#footer", "تماس"]].map(([h, l]) => (
              <li key={h}><a href={h} onClick={() => setMobOpen(false)}>{l}</a></li>
            ))}
            <li><a href="#cta" style={{ color: "var(--orange)" }} onClick={() => setMobOpen(false)}>رزرو میز ←</a></li>
          </ul>
        </div>
      )}

      <section id="hero" ref={heroRef}>
        <div className="hero-bg" />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
        <div className="hero-ring" aria-hidden="true">
          <svg viewBox="0 0 380 380" fill="none">
            <circle cx="190" cy="190" r="180" stroke="#fff9f0" strokeWidth=".8" />
            <circle cx="190" cy="190" r="145" stroke="#fff9f0" strokeWidth=".5" />
            <circle cx="190" cy="190" r="110" stroke="#fff9f0" strokeWidth=".8" />
            <circle cx="190" cy="190" r="75" stroke="#fff9f0" strokeWidth=".5" />
            <circle cx="190" cy="190" r="40" stroke="#fff9f0" strokeWidth=".8" />
            <circle cx="190" cy="190" r="10" fill="#fff9f0" opacity=".4" />
            <line x1="190" y1="10" x2="190" y2="370" stroke="#fff9f0" strokeWidth=".4" opacity=".5" />
            <line x1="10" y1="190" x2="370" y2="190" stroke="#fff9f0" strokeWidth=".4" opacity=".5" />
          </svg>
        </div>

        <div className="hero-inner">
          <div className="hero-badge"><span className="bdot" /> در کنار شماییم · بلوار دیلمان</div>
          <h1 className="hero-h1">
            <span className="hero-line"><span>جایی که هر</span></span>
            <span className="hero-line"><span>جرعه یک</span></span>
            <span className="hero-line"><span><em className="accent-word">داستانه.</em></span></span>
          </h1>
          <p className="hero-p">قهوه تخصصی، دسرهای هنری و فضایی ساخته شده برای نسل خلاق رشت. به آورو خوش آمدید.</p>
          <div className="hero-btns">
            <a href="#menu" className="btn-fill">مشاهده منو</a>
            <a href="#about" className="btn-ghost">داستان ما</a>
          </div>
          <div className="hero-stats">
            <div><div className="stn">۳۴<em>+</em></div><div className="stl">ترکیب قهوه</div></div>
            <div><div className="stn">۱.۴<em>ه+</em></div><div className="stl">مهمان راضی</div></div>
            <div><div className="stn">۴.۹<em>★</em></div><div className="stl">امتیاز گوگل</div></div>
          </div>
        </div>
        <div className="scroll-cue"><div className="sc-line" /><span className="sc-txt">اسکرول</span></div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i}>{t}<span className="sep"> · </span></span>
          ))}
        </div>
      </div>

      <section id="slider">
        {SLIDES.map((s, i) => (
          <div key={s.cls} className={`slide ${s.cls} ${i === slide ? "on" : ""}`}>
            <div className="slide-bg" />
            <div className="slide-grid" />
            <div className="slide-left" />
            <div className="slide-btm" />
            <div className="slide-info">
              <div className="s-tag">{s.tag}</div>
              <div className="s-h">{s.h[0]}<br />{s.h[1]}</div>
              <div className="s-p">{s.p}</div>
            </div>
          </div>
        ))}
        <button className="s-arrow s-prev" onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)} aria-label="قبلی">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button className="s-arrow s-next" onClick={() => setSlide((s) => (s + 1) % SLIDES.length)} aria-label="بعدی">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="s-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`s-dot ${i === slide ? "on" : ""}`} onClick={() => setSlide(i)} aria-label={`slide ${i + 1}`} />
          ))}
        </div>
      </section>

      <section id="menu" className="section">
        <div className="wrap">
          <div className="menu-top rv">
            <div><div className="eye">منو تخصصی آورو</div><h2 className="sec-h">منوی <span style={{ color: "var(--orange)" }}>آورو</span></h2></div>
          </div>
          <div className="menu-tabs rv d1">
            {(Object.keys(TABS) as TabKey[]).map((k) => (
              <button key={k} className={`mtab ${tab === k ? "on" : ""}`} onClick={() => setTab(k)}>{TABS[k].label}</button>
            ))}
          </div>
          <div className="tpane on rv d2">
            <div className="mi-grid">
              {TABS[tab].items.map(({ id, name, image }) => (
                <div key={id} className="mi">
                  <div className="mi-img" style={{ backgroundImage: `url('${image}')` }}><div className="mi-shine" /><div className="mi-rim" /></div>
                  <div className="mi-name">{name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-txt rv">
              <div className="eye">داستان ما</div>
              <h2 className="ab-h">متولد شده در باران،<br />دم کشیده با <em>عشق.</em></h2>
              <p className="ab-pull">«رشت همیشه شهری بوده گرم زیر باران. ما می‌خواستیم آن حس را در یک فنجان بریزیم.»</p>
              <p className="ab-body">آورو از یک وسواس ساده متولد شد — قهوه تخصصی رشت را به چیزی که بایستی بود تبدیل کنیم. درهایمان را در گلسار، بلوار دیلمان گشودیم با یک هدف: فضایی بسازیم که فرهنگ قهوه تخصصی و انرژی خلاق نسل جدید به هم برخورد کنند.<br /><br />هر جزئیاتی عمدی است. از منوهایی که حول طعم‌های فصلی ساخته شده تا پلی‌لیست‌هایی برای تمرکز و خلق. این فقط یک کافه نیست — پناهگاه خلاقیت است.</p>
              <div className="ab-stats">
                <div><div className="as-n">۳۴<em>+</em></div><div className="as-l">ترکیب قهوه</div></div>
                <div><div className="as-n">۱.۴<em>ه+</em></div><div className="as-l">مهمان راضی</div></div>
                <div><div className="as-n">۴.۹<em>★</em></div><div className="as-l">امتیاز گوگل</div></div>
              </div>
            </div>
            <div className="about-vis rv d2">
              <div className="ab-img-a" />
              <div className="ab-img-b" />
              <div className="ab-badge">+۲<br />سال<br />قدرت</div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="section">
        <div className="wrap">
          <div className="gal-top rv">
            <div><div className="eye">حال و هوای ما</div><h2 className="sec-h">گالری <span style={{ color: "var(--orange)" }}>آورو</span></h2></div>
            <a href="https://www.instagram.com/avrocafe/" className="ig-link" target="_blank" rel="noreferrer">avrocafe@ ↗</a>
          </div>
          <div className="gal-grid rv d1">
            {GALLERY.map(([cls, label]) => (
              <div key={cls} className="gi">
                <div className={`gi-bg ${cls}`} />
                <div className="gi-lbl">{label}</div>
                <div className="gi-ov"><div className="gi-ico">♥</div><span>مشاهده پست</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="section">
        <div className="wrap">
          <div className="rv" style={{ marginBottom: "3rem" }}>
            <div className="eye">نظرات مشتریان</div>
            <h2 className="sec-h">محبوب <span style={{ color: "var(--orange)" }}>رشت.</span></h2>
          </div>
          <div className="ttrack rv d1">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="tcard">
                <div className="t-stars">★★★★★</div>
                <p className="t-txt">{t.txt}</p>
                <div className="t-auth">
                  <div className="t-av" style={{ background: t.color }}>{t.initial}</div>
                  <div><div className="t-name">{t.name}</div><div className="t-handle">{t.handle}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta">
        <div className="cta-in rv">
          <h2 className="cta-h">آماده‌ی نوشیدنی<br />بعدی‌ات هستی؟</h2>
          <p className="cta-p">بیا یا میز رزرو کن. مشتاق دیدنتیم.</p>
          <div className="cta-btns">
            <a href="tel:+989129530911" className="btn-wh">رزرو میز</a>
            <a href="https://www.instagram.com/avrocafe/" target="_blank" rel="noreferrer" className="btn-ow">دنبال کردن در اینستاگرام</a>
          </div>
        </div>
      </section>

      <footer id="footer">
        <div className="ft-grid">
          <div className="ft-logo">
            <img src="/logo-dark.png" alt="AVRO!" className="ft-logo-img" />
            <p className="ft-tag">قهوه تخصصی، دسرهای هنری و جامعه‌ای که حالیشه. ما را در قلب رشت بیابید — جایی که باران با گرما ملاقات می‌کند.</p>
            <div className="ft-socs">
              <a href="https://www.instagram.com/avrocafe/" className="ft-soc" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" fill="currentColor" /></svg>
              </a>
              <a href="#" className="ft-soc" aria-label="Telegram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.5 3.5 2.8 10.8c-1.2.5-1.2 1.2-.2 1.5l4.8 1.5 1.8 5.5c.2.6.8.8 1.3.3l2.6-2.4 4.9 3.6c.9.5 1.5.2 1.7-.9L22.8 5c.3-1.2-.5-1.7-1.3-1.5z" fill="currentColor" /></svg>
              </a>
              <a href="https://wa.me/989129530911" className="ft-soc" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm5.3 14.3c-.2.6-1.1 1.1-1.8 1.2-.5.1-1.1.2-3.7-.8-3.1-1.3-5.1-4.4-5.3-4.6-.2-.2-1.2-1.6-1.2-3.1s.8-2.2 1.1-2.5c.3-.3.7-.4 1-.4h.7c.2 0 .5-.1.8.6.3.7 1 2.5 1.1 2.7.1.2.1.4 0 .6-.1.2-.2.3-.4.5-.2.2-.4.3-.6.5-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.2 2.6 1.6 3 1.8.4.2.6.2.8-.1.2-.3.9-1.1 1.1-1.5.2-.4.5-.3.8-.2.3.1 2 .9 2.3 1.1.3.2.5.3.6.5.1.2.1 1-.1 1.6z" fill="currentColor" /></svg>
              </a>
              <a href="#" className="ft-soc" aria-label="X">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.8L5.4 22H2.3l7.3-8.4L1 2h6.9l4.7 6.2L18.9 2zm-1.2 18h1.9L7.2 3.9H5.2L17.7 20z" fill="currentColor" /></svg>
              </a>
            </div>
          </div>
          <div className="ft-col">
            <h4>آورو</h4>
            <ul className="ft-links">
              <li><a href="#hero">صفحه اصلی</a></li>
              <li><a href="#menu">منوی ما</a></li>
              <li><a href="#about">درباره آورو</a></li>
              <li><a href="#gallery">گالری</a></li>
            </ul>
          </div>
          <div className="ft-col">
            <h4>ساعات کاری</h4>
            <ul className="ft-links">
              <li><a href="#">شنبه تا پنج‌شنبه: ۷ تا ۲۳</a></li>
              <li><a href="#">جمعه: ۹ تا ۲۳</a></li>
            </ul>
          </div>
          <div className="ft-col">
            <h4>آدرس</h4>
            <ul className="ft-links">
              <li><a href="#">گلسار، بلوار دیلمان</a></li>
              <li><a href="#">روبروی کوچه بوستان</a></li>
              <li><a href="#">رشت، گیلان، ایران</a></li>
              <li><a href="tel:+989129530911" dir="ltr">+98 912 953 0911</a></li>
            </ul>
          </div>
        </div>
        <div className="ft-bot">
          <span>© ۱۴۰۵ کافه آورو. تمامی حقوق محفوظ است.</span>
          <img src="/logo.png" alt="" className="ft-brand-img" aria-hidden="true" />
        </div>
      </footer>
    </>
  );
}

const CSS = `
:root{--navy:#243d67;--cream:#fff9f0;--orange:#f46036;--ink:#0c0905;--text:#1c150d;--mid:#6b5a48;--border:rgba(0,0,0,.07);}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Vazirmatn',sans-serif;background:var(--cream);color:var(--text);overflow-x:hidden}
img{max-width:100%;display:block}
a{text-decoration:none;color:inherit}
h1,h2,h3,h4{font-family:'Vazirmatn',sans-serif;font-weight:800;line-height:1.2}
ul{list-style:none}
button{font-family:inherit}

#nav{position:fixed;top:0;inset-inline:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:1.75rem 5%;transition:padding .4s,background .4s,backdrop-filter .4s,box-shadow .4s;}
#nav.solid{padding:1rem 5%;background:rgba(255,249,240,.92);backdrop-filter:blur(24px);box-shadow:0 1px 0 var(--border)}
.nav-logo{display:flex;align-items:center}
.nav-logo .logo-img{height:2.1rem;width:auto;transition:opacity .4s}
.nav-logo .logo-dark{display:none}
#nav.solid .nav-logo .logo-light{display:none}
#nav.solid .nav-logo .logo-dark{display:block}
.nav-links{display:flex;gap:2rem}
.nav-links a{font-weight:600;font-size:.9rem;letter-spacing:.02em;color:var(--cream);transition:color .2s}
#nav.solid .nav-links a{color:var(--text)}
.nav-links a:hover{color:var(--orange)!important}
.nav-cta{background:var(--orange);color:#fff!important;padding:.5rem 1.4rem;border-radius:100px;transition:transform .2s,box-shadow .2s}
.nav-cta:hover{transform:scale(1.04);box-shadow:0 4px 20px rgba(244,96,54,.45)!important}
.ham{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
.ham span{display:block;width:22px;height:2px;border-radius:2px;background:var(--cream);transition:background .3s}
#nav.solid .ham span{background:var(--text)}

#mob{display:none;position:fixed;inset:0;z-index:199;background:rgba(12,9,5,.97);flex-direction:column;justify-content:center;padding:0 8%}
#mob ul{display:flex;flex-direction:column;gap:1.5rem}
#mob a{font-weight:800;font-size:clamp(2rem,7vw,3rem);color:var(--cream)}
#mob a:hover{color:var(--orange)}
.mob-x{position:absolute;top:1.5rem;left:5%;background:none;border:none;cursor:pointer;color:rgba(255,249,240,.5);font-size:2rem;font-weight:300}

#hero{position:relative;height:100vh;min-height:640px;display:flex;align-items:center;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 65% 80% at 85% 70%,rgba(244,96,54,.22) 0%,transparent 58%),radial-gradient(ellipse 50% 60% at 15% 20%,rgba(36,61,103,.38) 0%,transparent 60%),linear-gradient(155deg,rgba(12,8,4,.72) 0%,rgba(20,14,8,.58) 50%,rgba(10,8,5,.72) 100%),url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=85') center/cover no-repeat;animation:bg-breathe 16s ease-in-out infinite alternate;}
@keyframes bg-breathe{0%{filter:brightness(1) contrast(1)}50%{filter:brightness(1.06) contrast(1.04)}100%{filter:brightness(.97) contrast(.98)}}
.hero-bg::after{content:'';position:absolute;inset:0;opacity:.28;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E");}
.orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;transition:transform .15s ease-out}
.orb-a{width:650px;height:650px;background:rgba(244,96,54,.11);top:-180px;left:5%;animation:drift-a 11s ease-in-out infinite alternate}
.orb-b{width:380px;height:380px;background:rgba(255,180,80,.07);bottom:0;right:8%;animation:drift-b 14s ease-in-out infinite alternate}
.orb-c{width:280px;height:280px;background:rgba(36,61,103,.2);top:20%;right:20%;animation:drift-c 9s ease-in-out infinite alternate}
@keyframes drift-a{to{transform:translate(-30px,35px)}}
@keyframes drift-b{to{transform:translate(25px,-30px)}}
@keyframes drift-c{to{transform:translate(15px,20px)}}
#hero::before{content:'';position:absolute;inset:0;z-index:1;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,.03) 0px,rgba(0,0,0,.03) 1px,transparent 1px,transparent 3px);}
.ptcl{position:absolute;border-radius:50%;pointer-events:none;animation:ptcl-up linear infinite}
@keyframes ptcl-up{0%{transform:translateY(0) scale(1);opacity:.7}100%{transform:translateY(-120px) scale(0);opacity:0}}
.hero-inner{position:relative;z-index:2;width:100%;max-width:1400px;margin:0 auto;padding:0 5%;}
.hero-badge{display:inline-flex;align-items:center;gap:.75rem;background:rgba(244,96,54,.1);border:1px solid rgba(244,96,54,.22);color:var(--orange);font-size:.75rem;font-weight:600;letter-spacing:.1em;padding:.45rem 1rem;border-radius:100px;margin-bottom:2rem;opacity:0;transform:translateY(20px) scale(.95);animation:badge-in .9s cubic-bezier(.16,1,.3,1) forwards .1s;}
@keyframes badge-in{to{opacity:1;transform:translateY(0) scale(1)}}
.bdot{width:6px;height:6px;border-radius:50%;background:var(--orange);animation:blink 2s infinite}
@keyframes blink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.7)}}
.hero-h1{font-size:clamp(3.4rem,9.5vw,9.5rem);color:var(--cream);line-height:1.0;letter-spacing:-.02em;margin-bottom:1.75rem;}
.hero-line{display:block;overflow:hidden}
.hero-line span{display:block;opacity:0;transform:translateY(100%) rotate(2deg);animation:line-up 1s cubic-bezier(.16,1,.3,1) forwards;}
.hero-line:nth-child(1) span{animation-delay:.25s}
.hero-line:nth-child(2) span{animation-delay:.42s}
.hero-line:nth-child(3) span{animation-delay:.58s}
@keyframes line-up{to{opacity:1;transform:translateY(0) rotate(0deg)}}
.accent-word{color:var(--orange);text-shadow:0 0 30px rgba(244,96,54,.3);animation:glow-pulse 3.5s ease-in-out infinite alternate;font-style:normal}
@keyframes glow-pulse{from{text-shadow:0 0 15px rgba(244,96,54,.2)}to{text-shadow:0 0 60px rgba(244,96,54,.6),0 0 100px rgba(244,96,54,.2)}}
.hero-p{font-size:clamp(.95rem,1.5vw,1.15rem);font-weight:300;color:rgba(255,249,240,.58);max-width:480px;line-height:1.85;margin-bottom:2.5rem;opacity:0;transform:translateY(20px);animation:up .9s cubic-bezier(.16,1,.3,1) forwards .75s;}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap;opacity:0;transform:translateY(18px);animation:up .9s cubic-bezier(.16,1,.3,1) forwards .9s;}
@keyframes up{to{opacity:1;transform:translateY(0)}}
.btn-fill{background:var(--orange);color:#fff;padding:.9rem 2.2rem;border-radius:100px;font-weight:700;font-size:.97rem;position:relative;overflow:hidden;transition:transform .25s,box-shadow .25s;display:inline-block}
.btn-fill::after{content:'';position:absolute;top:-50%;left:-80%;width:40%;height:200%;background:rgba(255,255,255,.18);transform:skewX(-20deg);animation:shimmer 3.5s ease-in-out infinite;}
@keyframes shimmer{0%{left:-80%}100%{left:150%}}
.btn-fill:hover{transform:translateY(-3px);box-shadow:0 12px 35px rgba(244,96,54,.45)}
.btn-ghost{border:1.5px solid rgba(255,249,240,.22);color:var(--cream);padding:.9rem 2.2rem;border-radius:100px;font-weight:600;font-size:.97rem;transition:background .25s,border-color .25s,transform .25s;display:inline-block}
.btn-ghost:hover{background:rgba(255,249,240,.08);border-color:rgba(255,249,240,.5);transform:translateY(-2px)}
.hero-stats{position:absolute;bottom:3rem;left:5%;display:flex;gap:3rem;opacity:0;animation:up .9s cubic-bezier(.16,1,.3,1) forwards 1.1s;z-index:3}
.stn{font-weight:800;font-size:2.3rem;color:var(--cream);line-height:1}
.stn em{font-style:normal;color:var(--orange)}
.stl{font-size:.7rem;letter-spacing:.06em;color:rgba(255,249,240,.4);margin-top:.2rem}
.scroll-cue{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:.5rem;opacity:0;animation:fadein .8s forwards 1.5s;z-index:3}
.sc-line{width:1px;height:52px;background:linear-gradient(to bottom,rgba(255,249,240,.4),transparent);animation:breathe 2.2s ease-in-out infinite}
.sc-txt{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,249,240,.3)}
@keyframes breathe{0%,100%{opacity:1}50%{opacity:.2}}
@keyframes fadein{to{opacity:1}}
.hero-ring{position:absolute;right:5%;top:50%;transform:translateY(-50%);width:380px;height:380px;pointer-events:none;z-index:1;opacity:0;animation:ring-in 1.4s cubic-bezier(.16,1,.3,1) forwards .5s;}
@keyframes ring-in{to{opacity:.07}}
.hero-ring svg{animation:ring-spin 60s linear infinite;width:100%;height:100%}
@keyframes ring-spin{to{transform:rotate(360deg)}}

.ticker{background:var(--orange);overflow:hidden;padding:.85rem 0;display:flex;direction:ltr}
.ticker-track{display:flex;white-space:nowrap;animation:tick 28s linear infinite;gap:0}
.ticker-track > span{font-family:'Syne',sans-serif;font-weight:700;font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;color:#fff;padding:0 2rem;display:inline-flex;align-items:center}
.ticker-track .sep{color:rgba(255,255,255,.35);padding:0}
@keyframes tick{to{transform:translateX(-50%)}}

#slider{position:relative;height:78vh;min-height:480px;overflow:hidden}
.slide{position:absolute;inset:0;opacity:0;transition:opacity .9s ease;pointer-events:none}
.slide.on{opacity:1;pointer-events:auto}
.slide-bg{position:absolute;inset:0;transform:scale(1.06);transition:transform 9s ease}
.slide.on .slide-bg{transform:scale(1)}
.s1 .slide-bg{background:url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80') center/cover;background-color:#200a00}
.s2 .slide-bg{background:url('https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1600&q=80') center/cover;background-color:#1c0d06}
.s3 .slide-bg{background:url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80') center/cover;background-color:#161a07}
.s4 .slide-bg{background:url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80') center/cover;background-color:#0d1830}
.slide-grid{position:absolute;inset:0;opacity:.04;background-image:linear-gradient(rgba(255,249,240,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,249,240,1) 1px,transparent 1px);background-size:56px 56px}
.slide-left{position:absolute;inset:0;background:linear-gradient(to left,rgba(0,0,0,.7) 0%,rgba(0,0,0,.2) 50%,transparent 100%)}
.slide-btm{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.85) 0%,transparent 62%)}
.slide-info{position:absolute;bottom:0;right:0;left:0;padding:4rem 6%}
.s-tag{display:inline-block;background:var(--orange);color:#fff;font-weight:700;font-size:.72rem;letter-spacing:.12em;padding:.3rem .85rem;border-radius:100px;margin-bottom:1rem}
.s-h{font-size:clamp(2.4rem,5.5vw,5.2rem);color:var(--cream);line-height:1.1;font-weight:800}
.s-p{color:rgba(255,249,240,.62);font-size:.97rem;font-weight:300;margin-top:.75rem;max-width:440px;line-height:1.7}
.s-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;width:52px;height:52px;border-radius:50%;background:rgba(255,249,240,.08);backdrop-filter:blur(12px);border:1px solid rgba(255,249,240,.12);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--cream);transition:background .25s}
.s-arrow:hover{background:rgba(244,96,54,.38)}
.s-prev{right:2rem}.s-next{left:2rem}
.s-dots{position:absolute;bottom:2.5rem;left:5%;z-index:10;display:flex;gap:.5rem;direction:ltr}
.s-dot{width:8px;height:8px;border-radius:100px;background:rgba(255,249,240,.28);cursor:pointer;border:none;transition:width .35s,background .35s;padding:0}
.s-dot.on{width:28px;background:var(--orange)}

.section{padding:7rem 5%}
.wrap{max-width:1400px;margin:0 auto}
.eye{font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--orange);font-weight:600;margin-bottom:.6rem}
.sec-h{font-size:clamp(2.2rem,5vw,4.2rem);letter-spacing:-.01em;line-height:1.15}
.rv{opacity:0;transform:translateY(36px);transition:opacity .85s,transform .85s}
.rv.vis{opacity:1;transform:translateY(0)}
.d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}

#menu{background:var(--cream)}
.menu-top{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:2.5rem;flex-wrap:wrap;gap:1.5rem}
.menu-tabs{display:flex;justify-content:center;gap:.4rem;margin-bottom:3.5rem;background:rgba(0,0,0,.05);border-radius:100px;padding:.35rem;width:fit-content;margin-inline:auto;flex-wrap:wrap;}
.mtab{padding:.7rem 1.75rem;border-radius:100px;border:none;background:transparent;font-weight:600;font-size:.95rem;cursor:pointer;color:var(--mid);transition:all .3s cubic-bezier(.16,1,.3,1);white-space:nowrap;}
.mtab.on{background:var(--orange);color:#fff;box-shadow:0 4px 20px rgba(244,96,54,.4);transform:scale(1.03);}
.mtab:hover:not(.on){color:var(--text);background:rgba(0,0,0,.07)}
.tpane{animation:tab-fade .4s cubic-bezier(.16,1,.3,1)}
@keyframes tab-fade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.mi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem 2rem}
.mi{text-align:center;cursor:pointer;padding:1.5rem 1rem;border-radius:20px;transition:all .35s cubic-bezier(.16,1,.3,1)}
.mi:hover{background:rgba(0,0,0,.03);transform:translateY(-6px)}
.mi-img{width:160px;height:160px;border-radius:50%;margin:0 auto 1.25rem;position:relative;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.18),0 4px 12px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.12);transition:box-shadow .35s,transform .35s;}
.mi:hover .mi-img{box-shadow:0 20px 60px rgba(0,0,0,.24);transform:scale(1.06)}
.mi-shine{position:absolute;top:18%;right:22%;width:28%;height:14%;background:rgba(255,255,255,.22);border-radius:50%;filter:blur(4px);transform:rotate(-15deg)}
.mi-rim{position:absolute;inset:0;border-radius:50%;box-shadow:inset 0 -4px 12px rgba(0,0,0,.25),inset 0 2px 6px rgba(255,255,255,.06)}
.mi-img{background-size:cover;background-position:center}
.mi-name{font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:.4rem}

#about{background:var(--navy)}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center}
.about-vis{position:relative;height:580px;order:2}
.ab-img-a{position:absolute;top:0;right:0;width:72%;height:72%;border-radius:18px;overflow:hidden;background:url('https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=800&q=80') center/cover}
.ab-img-b{position:absolute;bottom:0;left:0;width:54%;height:52%;border-radius:18px;overflow:hidden;border:4px solid var(--navy);background:url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80') center/cover}
.ab-badge{position:absolute;top:50%;left:-2.5rem;transform:translateY(-50%);width:112px;height:112px;border-radius:50%;background:var(--orange);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:800;font-size:1rem;line-height:1.15;text-align:center;z-index:2;animation:spin 28s linear infinite;}
@keyframes spin{to{transform:translateY(-50%) rotate(360deg)}}
.about-txt{color:var(--cream);order:1}
.about-txt .eye{color:var(--orange)}
.ab-h{font-size:clamp(2rem,4vw,3.6rem);color:var(--cream);margin-bottom:1.5rem;line-height:1.2}
.ab-h em{font-style:normal;color:var(--orange)}
.ab-pull{font-size:clamp(1.05rem,1.7vw,1.45rem);color:var(--orange);font-weight:600;line-height:1.55;font-style:italic;margin-bottom:1.5rem}
.ab-body{color:rgba(255,249,240,.6);line-height:1.95;font-weight:300;font-size:.96rem}
.ab-stats{display:flex;gap:2.5rem;margin-top:2.5rem;padding-top:2rem;border-top:1px solid rgba(255,249,240,.1)}
.as-n{font-weight:800;font-size:1.9rem;color:var(--cream)}
.as-n em{font-style:normal;color:var(--orange)}
.as-l{font-size:.7rem;letter-spacing:.06em;color:rgba(255,249,240,.42);margin-top:.2rem}

#gallery{background:var(--cream)}
.gal-top{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:2.5rem;flex-wrap:wrap;gap:1.5rem}
.ig-link{font-weight:700;font-size:.85rem;color:var(--navy);border-bottom:2px solid var(--orange);padding-bottom:.2rem;transition:color .2s}
.ig-link:hover{color:var(--orange)}
.gal-grid{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:268px;gap:10px}
.gal-grid .gi:nth-child(1){grid-row:span 2}
.gal-grid .gi:nth-child(4){grid-column:span 2}
.gi{border-radius:14px;overflow:hidden;position:relative;cursor:pointer}
.gi-bg{position:absolute;inset:0;transition:transform .5s}
.gi:hover .gi-bg{transform:scale(1.08)}
.gi-ov{position:absolute;inset:0;background:rgba(0,0,0,.52);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.4rem;opacity:0;transition:opacity .3s;color:#fff;font-weight:700;font-size:.78rem;letter-spacing:.08em}
.gi:hover .gi-ov{opacity:1}
.gi-ico{font-size:1.5rem}
.gi-lbl{position:absolute;bottom:.7rem;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.38);backdrop-filter:blur(6px);color:rgba(255,249,240,.55);font-size:.6rem;letter-spacing:.1em;padding:.18rem .55rem;border-radius:100px;white-space:nowrap;z-index:2}
.g1{background:url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=75') center/cover}
.g2{background:url('https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=600&q=75') center/cover}
.g3{background:url('https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=75') center/cover}
.g5{background:url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=75') center/cover}

#testimonials{background:#ece7da;overflow:hidden}
.ttrack{display:flex;gap:1.25rem;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:.5rem}
.ttrack::-webkit-scrollbar{display:none}
.tcard{flex:0 0 340px;scroll-snap-align:start;background:rgba(255,249,240,.65);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.75);border-radius:22px;padding:1.75rem;box-shadow:0 8px 32px rgba(0,0,0,.07);transition:transform .3s}
.tcard:hover{transform:translateY(-5px)}
.t-stars{color:var(--orange);font-size:.92rem;letter-spacing:.06em;margin-bottom:.9rem}
.t-txt{font-size:.94rem;line-height:1.82;color:var(--text);font-style:italic;margin-bottom:1.4rem}
.t-auth{display:flex;align-items:center;gap:.7rem}
.t-av{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;color:#fff}
.t-name{font-weight:700;font-size:.9rem}
.t-handle{font-size:.76rem;color:var(--mid)}

#cta{background:var(--orange);padding:9rem 5%;text-align:center;position:relative;overflow:hidden}
#cta::before{content:'AVRO!';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(7rem,20vw,18rem);letter-spacing:-.03em;color:rgba(255,255,255,.07);white-space:nowrap;pointer-events:none}
.cta-in{position:relative;z-index:2}
.cta-h{font-size:clamp(2.8rem,7vw,7rem);color:#fff;line-height:1.05;margin-bottom:1rem}
.cta-p{color:rgba(255,255,255,.72);font-size:1.1rem;font-weight:300;margin-bottom:2.5rem}
.cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn-wh{background:#fff;color:var(--orange);padding:1rem 2.5rem;border-radius:100px;font-weight:800;font-size:1rem;transition:transform .25s,box-shadow .25s;display:inline-block}
.btn-wh:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,0,0,.14)}
.btn-ow{border:2px solid rgba(255,255,255,.42);color:#fff;padding:1rem 2.5rem;border-radius:100px;font-weight:700;font-size:1rem;transition:background .25s,border-color .25s;display:inline-block}
.btn-ow:hover{background:rgba(255,255,255,.15);border-color:#fff}

footer{background:#0a0804;color:rgba(255,249,240,.52);padding:5rem 5% 2rem}
.ft-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:4rem;margin-bottom:4rem}
.ft-logo-img{height:3.2rem;width:auto;margin-bottom:1.1rem}
.ft-tag{font-size:.86rem;line-height:1.8;max-width:280px}
.ft-socs{display:flex;gap:.65rem;margin-top:1.5rem}
.ft-soc{width:38px;height:38px;border-radius:50%;background:rgba(255,249,240,.07);border:1px solid rgba(255,249,240,.09);display:flex;align-items:center;justify-content:center;color:rgba(255,249,240,.52);transition:background .2s,color .2s,border-color .2s}
.ft-soc svg{width:18px;height:18px;display:block}
.ft-soc:hover{background:var(--orange);color:#fff;border-color:var(--orange)}
.ft-col h4{font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--cream);margin-bottom:1.2rem;font-weight:700}
.ft-links{display:flex;flex-direction:column;gap:.65rem}
.ft-links a{font-size:.86rem;color:rgba(255,249,240,.48);transition:color .2s}
.ft-links a:hover{color:var(--orange)}
.ft-bot{border-top:1px solid rgba(255,249,240,.06);padding-top:2rem;display:flex;justify-content:space-between;align-items:center;font-size:.76rem}
.ft-brand-img{height:2.2rem;width:auto}

@media(max-width:900px){
  .nav-links{display:none}.ham{display:flex}
  .about-grid{grid-template-columns:1fr}
  .about-vis{height:320px;order:1}
  .about-txt{order:2}
  .ab-img-a{right:auto;left:0}
  .ab-img-b{left:auto;right:0}
  .ab-badge{left:auto;right:-1rem;width:90px;height:90px;font-size:.82rem}
  .ft-grid{grid-template-columns:1fr 1fr;gap:2rem}
  .ft-logo{grid-column:span 2}
  .gal-grid{grid-template-columns:repeat(2,1fr)}
  .gal-grid .gi:nth-child(1){grid-row:span 1}
  .gal-grid .gi:nth-child(4){grid-column:span 1}
  .mi-grid{grid-template-columns:repeat(2,1fr)}
  .hero-ring{display:none}
}
@media(max-width:640px){
  .hero-stats{position:static;margin-top:2.5rem;gap:2rem}
  .mi-grid{grid-template-columns:repeat(2,1fr);gap:1.5rem 1rem}
  .mi-img{width:120px;height:120px}
  .gal-grid{grid-template-columns:1fr;grid-auto-rows:220px}
  .ft-grid{grid-template-columns:1fr}.ft-logo{grid-column:span 1}
  .s-arrow{display:none}
  .section{padding:5rem 5%}
  .menu-tabs{gap:.25rem}
  .mtab{padding:.6rem 1.1rem;font-size:.88rem}
}
`;
