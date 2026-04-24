const { useState, useEffect, useRef } = React;

// Brand tokens
const BRAND = {
  yellow: '#FDB913',
  yellowDeep: '#E5A310',
  navy: '#1A3638',
  navyDeep: '#0F2526',
  cream: '#FFFBF0',
  softGray: '#F4F1EA',
  line: 'rgba(26, 54, 56, 0.12)',
};

const WHATSAPP = 'https://wa.me/2347062358122';
const PHONE = '+234 706 235 8122';

// ---------- Small primitives ----------
const SunIcon = ({ size = 20, color = BRAND.yellow }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4.5" fill={color} />
    {[...Array(8)].map((_, i) => {
      const a = (i * Math.PI) / 4;
      const x1 = 12 + Math.cos(a) * 7;
      const y1 = 12 + Math.sin(a) * 7;
      const x2 = 12 + Math.cos(a) * 10;
      const y2 = 12 + Math.sin(a) * 10;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeLinecap="round" />;
    })}
  </svg>
);

const WhatsAppGlyph = ({ size = 18, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .9 3.6.8.6-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.6a11.9 11.9 0 0 0 5.7 1.5c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.5zM12 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.8.9 1-3.7-.3-.4a9.8 9.8 0 0 1 14.6-13.3 9.7 9.7 0 0 1 2.9 7 9.9 9.9 0 0 1-8.9 11.1z"/>
  </svg>
);

const CheckDot = ({ color = BRAND.yellow, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="11" fill={color} />
    <path d="M7 12.5l3.2 3.2L17 9" stroke={BRAND.navy} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Chevron = ({ open }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 260ms cubic-bezier(.2,.8,.2,1)' }}>
    <path d="M6 9l6 6 6-6" stroke={BRAND.navy} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ---------- WhatsApp Button ----------
function WhatsAppButton({ label = 'Get a Free Quote on WhatsApp', large = true, block = true, tone = 'green', onClick }) {
  const bg = tone === 'green' ? '#25D366' : tone === 'yellow' ? BRAND.yellow : BRAND.navy;
  const fg = tone === 'yellow' ? BRAND.navy : '#fff';
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      style={{
        display: block ? 'flex' : 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: block ? '100%' : 'auto',
        padding: large ? '18px 22px' : '12px 18px',
        borderRadius: 14,
        background: bg,
        color: fg,
        fontWeight: 700,
        fontSize: large ? 17 : 15,
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        boxShadow: tone === 'green' ? '0 8px 22px -6px rgba(37, 211, 102, 0.5)' : '0 6px 18px -6px rgba(0,0,0,0.25)',
        transition: 'transform 180ms ease, box-shadow 180ms ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <WhatsAppGlyph color={fg} size={large ? 20 : 17} />
      <span>{label}</span>
    </a>
  );
}

// ---------- Top Bar ----------
function TopBar({ onOpenMenu }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 30,
      background: 'rgba(255, 251, 240, 0.92)',
      backdropFilter: 'saturate(1.2) blur(10px)',
      WebkitBackdropFilter: 'saturate(1.2) blur(10px)',
      borderBottom: `1px solid ${BRAND.line}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="assets/logo.png" alt="Sunergy Light Services" style={{ height: 36, width: 'auto', display: 'block' }} />
        </div>
        <a href={`tel:${PHONE.replace(/\s/g, '')}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, fontWeight: 600, color: BRAND.navy,
          padding: '7px 12px', borderRadius: 999,
          border: `1px solid ${BRAND.line}`,
          background: '#fff',
          textDecoration: 'none',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.8.6a2 2 0 0 1 1.7 2z" stroke={BRAND.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Call
        </a>
      </div>
    </header>
  );
}

// ---------- Hero ----------
function Hero({ heroImage }) {
  return (
    <section style={{ position: 'relative', background: BRAND.navy, color: '#fff', overflow: 'hidden' }}>
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '3 / 4', width: '100%', overflow: 'hidden' }}>
        <img
          src={heroImage}
          alt="A family in Ota in front of their solar-powered home"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Gradient overlay for text legibility at bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, rgba(26,54,56,0.05) 0%, rgba(26,54,56,0.15) 45%, rgba(26,54,56,0.92) 88%, ${BRAND.navy} 100%)`,
        }} />

        {/* Location pill top */}
        <div style={{
          position: 'absolute', top: 18, left: 18,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.95)', color: BRAND.navy,
          padding: '7px 12px', borderRadius: 999,
          fontSize: 12, fontWeight: 600, letterSpacing: '0.02em',
          boxShadow: '0 4px 14px -4px rgba(0,0,0,0.2)',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }} />
          Serving Ota, Ogun State
        </div>

        {/* Yellow sun badge top-right */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          width: 56, height: 56, borderRadius: '50%',
          background: BRAND.yellow,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 20px -4px rgba(253,185,19,0.55)',
          border: '3px solid rgba(255,255,255,0.9)',
        }}>
          <div style={{ textAlign: 'center', lineHeight: 1, color: BRAND.navy, fontWeight: 800, fontSize: 10, letterSpacing: '0.04em' }}>
            24/7<br/><span style={{ fontSize: 8 }}>CLEAN POWER</span>
          </div>
        </div>
      </div>

      {/* Hero text block */}
      <div style={{ padding: '24px 22px 34px', position: 'relative' }}>
        <h1 style={{
          fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
          fontSize: 'clamp(30px, 8.4vw, 42px)',
          lineHeight: 1.08,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          margin: '0 0 18px',
          textWrap: 'balance',
        }}>
          Reliable solar power for your family & business in <span style={{ color: BRAND.yellow, fontStyle: 'italic' }}>Ota</span>.
        </h1>
        <p style={{
          fontSize: 16, lineHeight: 1.55,
          color: 'rgba(255,255,255,0.82)',
          margin: '0 0 22px',
          maxWidth: 440,
        }}>
          Stop wasting money on fuel and noisy generators. Get 24/7 clean energy with professional installation.
        </p>
        <WhatsAppButton label="Get a free quote on WhatsApp" />
        {/* Trust strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: 8, marginTop: 22,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 18,
        }}>
          {[
            { n: '500+', l: 'Homes powered' },
            { n: '25yr', l: 'Panel warranty' },
            { n: '2–3yr', l: 'Payback period' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: BRAND.yellow, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4, letterSpacing: '0.02em' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- About ----------
function About() {
  return (
    <section style={{ padding: '52px 22px 44px', background: BRAND.cream }}>
      <div style={{ fontSize: 11, letterSpacing: '0.18em', fontWeight: 700, color: BRAND.yellowDeep, textTransform: 'uppercase', marginBottom: 14 }}>
        ◆ The local advantage
      </div>
      <h2 style={{
        fontFamily: "'Fraunces', serif",
        fontSize: 30, lineHeight: 1.1, fontWeight: 500,
        letterSpacing: '-0.02em', color: BRAND.navy,
        margin: '0 0 18px', textWrap: 'balance',
      }}>
        Lighting up Nigeria, <em style={{ color: BRAND.yellowDeep }}>one rooftop at a time.</em>
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: '#2c4446', margin: 0, maxWidth: 520 }}>
        Based right here in Ota, Sunergy Light Services understands local energy challenges. Our mission is expert engineering, premium Tier‑1 equipment, and dedicated local support — from survey to switch‑on.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 28 }}>
        {[
          { t: 'Local', s: 'Ota-based team' },
          { t: 'Tier‑1', s: 'Premium panels only' },
          { t: 'Certified', s: 'Licensed engineers' },
          { t: 'Support', s: 'After-sales care' },
        ].map((c, i) => (
          <div key={i} style={{
            background: '#fff', padding: '16px 14px', borderRadius: 14,
            border: `1px solid ${BRAND.line}`,
          }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: BRAND.navy }}>{c.t}</div>
            <div style={{ fontSize: 13, color: '#5a6e6f', marginTop: 3 }}>{c.s}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- Packages ----------
const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Home',
    tagline: 'Essentials that stay on',
    ideal: 'Lighting, fans, TV, gadget charging',
    includes: ['2–4 solar panels', 'Inverter', 'Battery storage'],
    benefit: 'No more darkness during blackouts.',
    accent: false,
  },
  {
    id: 'family',
    name: 'Family Comfort',
    tagline: 'Most chosen in Ota',
    ideal: 'Fridges, freezers, water pumps, entertainment',
    includes: ['6–10 solar panels', 'Hybrid inverter', 'Lithium LiFePO₄ battery'],
    benefit: 'Full comfort 24/7 without "NEPA" stress.',
    accent: true,
  },
  {
    id: 'business',
    name: 'Business Pro',
    tagline: 'For shops, offices, industry',
    ideal: 'ACs, offices, shops, industrial equipment',
    includes: ['Scalable solar array', 'High-capacity battery bank', 'Remote monitoring'],
    benefit: 'Zero fuel costs. Maximum productivity.',
    accent: false,
  },
];

function Packages() {
  const [active, setActive] = useState('family');
  return (
    <section id="packages" style={{ padding: '52px 0 48px', background: '#fff' }}>
      <div style={{ padding: '0 22px' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', fontWeight: 700, color: BRAND.yellowDeep, textTransform: 'uppercase', marginBottom: 14 }}>
          ◆ Service packages
        </div>
        <h2 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 30, lineHeight: 1.1, fontWeight: 500,
          letterSpacing: '-0.02em', color: BRAND.navy,
          margin: '0 0 8px', textWrap: 'balance',
        }}>
          Pick the system sized for <em style={{ color: BRAND.yellowDeep }}>your life.</em>
        </h2>
        <p style={{ color: '#5a6e6f', fontSize: 15, margin: '0 0 22px' }}>
          Every install includes a free site survey, load audit, and engineer walkthrough.
        </p>

        {/* Tabs */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          background: BRAND.softGray,
          borderRadius: 14, padding: 4, gap: 2,
          marginBottom: 18,
        }}>
          {PACKAGES.map(p => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              style={{
                padding: '10px 6px',
                border: 'none',
                borderRadius: 10,
                background: active === p.id ? BRAND.navy : 'transparent',
                color: active === p.id ? '#fff' : BRAND.navy,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '-0.01em',
                transition: 'all 220ms ease',
              }}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Active card */}
      <div style={{ padding: '0 22px' }}>
        {PACKAGES.map(p => (
          <div key={p.id} style={{ display: active === p.id ? 'block' : 'none' }}>
            <PackageCard pkg={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function PackageCard({ pkg }) {
  return (
    <div style={{
      position: 'relative',
      background: pkg.accent ? BRAND.navy : '#fff',
      color: pkg.accent ? '#fff' : BRAND.navy,
      border: `1px solid ${pkg.accent ? BRAND.navy : BRAND.line}`,
      borderRadius: 22,
      padding: '26px 22px 24px',
      boxShadow: pkg.accent ? '0 20px 40px -20px rgba(26,54,56,0.4)' : '0 6px 20px -12px rgba(26,54,56,0.2)',
      overflow: 'hidden',
    }}>
      {pkg.accent && (
        <>
          <div style={{
            position: 'absolute', top: 18, right: 18,
            background: BRAND.yellow, color: BRAND.navy,
            fontSize: 10, fontWeight: 800, letterSpacing: '0.08em',
            padding: '5px 10px', borderRadius: 999,
          }}>
            RECOMMENDED
          </div>
          {/* Decorative corner sun */}
          <div style={{
            position: 'absolute', bottom: -60, right: -60,
            width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(253,185,19,0.18) 0%, rgba(253,185,19,0) 70%)',
            pointerEvents: 'none',
          }} />
        </>
      )}

      <div style={{ fontSize: 11, letterSpacing: '0.15em', fontWeight: 700, textTransform: 'uppercase', color: pkg.accent ? BRAND.yellow : BRAND.yellowDeep, marginBottom: 8 }}>
        {pkg.tagline}
      </div>
      <h3 style={{
        fontFamily: "'Fraunces', serif",
        fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em',
        margin: '0 0 14px', lineHeight: 1,
      }}>
        {pkg.name}
      </h3>

      <div style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.05em',
        color: pkg.accent ? 'rgba(255,255,255,0.6)' : '#8a9999',
        textTransform: 'uppercase', marginBottom: 6, marginTop: 4,
      }}>
        Ideal for
      </div>
      <div style={{ fontSize: 15, marginBottom: 18, lineHeight: 1.5, opacity: pkg.accent ? 0.92 : 1 }}>
        {pkg.ideal}
      </div>

      <div style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.05em',
        color: pkg.accent ? 'rgba(255,255,255,0.6)' : '#8a9999',
        textTransform: 'uppercase', marginBottom: 10,
      }}>
        Includes
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {pkg.includes.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15 }}>
            <CheckDot color={pkg.accent ? BRAND.yellow : BRAND.yellow} size={18} />
            {item}
          </li>
        ))}
      </ul>

      <div style={{
        padding: '14px 16px',
        background: pkg.accent ? 'rgba(253,185,19,0.12)' : BRAND.cream,
        borderRadius: 12,
        borderLeft: `3px solid ${BRAND.yellow}`,
        fontSize: 14, fontStyle: 'italic',
        color: pkg.accent ? '#fff' : BRAND.navy,
        marginBottom: 20,
      }}>
        "{pkg.benefit}"
      </div>

      <WhatsAppButton label={`Ask about ${pkg.name}`} tone={pkg.accent ? 'yellow' : 'green'} />
    </div>
  );
}

// ---------- Lithium vs Gel ----------
function BatteryCompare() {
  const [tab, setTab] = useState('lithium');
  const rows = [
    { label: 'Lifespan', lithium: '10+ years', gel: '~2 years', winner: 'lithium' },
    { label: 'Usable capacity', lithium: '90% discharge', gel: '50% discharge', winner: 'lithium' },
    { label: 'Charge speed', lithium: 'Fast', gel: 'Slow', winner: 'lithium' },
    { label: 'Maintenance', lithium: 'None', gel: 'Regular', winner: 'lithium' },
    { label: 'Upfront cost', lithium: 'Higher', gel: 'Lower', winner: 'gel' },
  ];

  return (
    <section style={{ padding: '52px 22px 48px', background: BRAND.softGray }}>
      <div style={{ fontSize: 11, letterSpacing: '0.18em', fontWeight: 700, color: BRAND.yellowDeep, textTransform: 'uppercase', marginBottom: 14 }}>
        ◆ Technical expertise
      </div>
      <h2 style={{
        fontFamily: "'Fraunces', serif",
        fontSize: 30, lineHeight: 1.1, fontWeight: 500,
        letterSpacing: '-0.02em', color: BRAND.navy,
        margin: '0 0 8px', textWrap: 'balance',
      }}>
        Lithium vs gel. <em style={{ color: BRAND.yellowDeep }}>It's not close.</em>
      </h2>
      <p style={{ color: '#5a6e6f', fontSize: 15, margin: '0 0 22px' }}>
        Stop buying batteries every 2 years. Invest once in lithium for long‑term savings.
      </p>

      {/* Visual bars */}
      <div style={{ background: '#fff', borderRadius: 18, padding: 18, border: `1px solid ${BRAND.line}`, marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: '#5a6e6f', marginBottom: 8, fontWeight: 600 }}>Lifespan (years)</div>
        <Bar value={10} max={12} label="Lithium LiFePO₄" sub="10+ years" color={BRAND.yellow} dark />
        <div style={{ height: 12 }} />
        <Bar value={2} max={12} label="Gel / AGM" sub="~2 years" color="#c7cfcf" />
      </div>

      {/* Toggle */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        background: '#fff', borderRadius: 12, padding: 4,
        border: `1px solid ${BRAND.line}`, marginBottom: 14,
      }}>
        {['lithium', 'gel'].map(t => (
          <button key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '10px', border: 'none',
              borderRadius: 9, cursor: 'pointer',
              background: tab === t ? BRAND.navy : 'transparent',
              color: tab === t ? '#fff' : BRAND.navy,
              fontWeight: 700, fontSize: 13, textTransform: 'capitalize',
              transition: 'all 200ms',
            }}
          >{t === 'lithium' ? 'Lithium LiFePO₄' : 'Gel / AGM'}</button>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', border: `1px solid ${BRAND.line}` }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            padding: '14px 18px',
            borderBottom: i < rows.length - 1 ? `1px solid ${BRAND.line}` : 'none',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 13, color: '#5a6e6f' }}>{r.label}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: BRAND.navy, marginTop: 2 }}>
                {tab === 'lithium' ? r.lithium : r.gel}
              </div>
            </div>
            <div style={{
              fontSize: 11, fontWeight: 700,
              padding: '5px 9px', borderRadius: 6,
              background: r.winner === tab ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.08)',
              color: r.winner === tab ? '#15803d' : '#b91c1c',
            }}>
              {r.winner === tab ? '✓ Better' : '– Worse'}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Bar({ value, max, label, sub, color, dark }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setW((value / max) * 100); });
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, max]);
  return (
    <div ref={ref}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
        <span style={{ fontWeight: 600, color: BRAND.navy }}>{label}</span>
        <span style={{ color: '#5a6e6f' }}>{sub}</span>
      </div>
      <div style={{ height: 14, background: BRAND.softGray, borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          width: `${w}%`,
          height: '100%',
          background: dark ? `linear-gradient(90deg, ${BRAND.yellow}, ${BRAND.yellowDeep})` : color,
          borderRadius: 99,
          transition: 'width 1.1s cubic-bezier(.2,.8,.2,1)',
        }} />
      </div>
    </div>
  );
}

// ---------- Trusted Brands ----------
function TrustedBrands() {
  const brands = ['Jinko Solar', 'Canadian Solar', 'Victron Energy', 'Growatt', 'Deye', 'Felicity Solar'];
  return (
    <section style={{ padding: '44px 22px', background: BRAND.navy, color: '#fff' }}>
      <div style={{ fontSize: 11, letterSpacing: '0.18em', fontWeight: 700, color: BRAND.yellow, textTransform: 'uppercase', marginBottom: 14 }}>
        ◆ Trusted equipment
      </div>
      <h2 style={{
        fontFamily: "'Fraunces', serif",
        fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em',
        margin: '0 0 20px', lineHeight: 1.15,
      }}>
        Tier‑1 brands, straight from the manufacturer.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {brands.map(b => (
          <div key={b} style={{
            padding: '16px 14px',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.04)',
            fontSize: 14, fontWeight: 600,
            textAlign: 'center',
            letterSpacing: '-0.01em',
          }}>
            {b}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, fontSize: 12, color: 'rgba(255,255,255,0.55)', textAlign: 'center', fontStyle: 'italic' }}>
        Authentic equipment. Full warranties honored.
      </div>
    </section>
  );
}

// ---------- FAQ ----------
const FAQS = [
  { q: 'Will solar work during the rainy season?', a: 'Yes. Panels generate power from daylight — not direct sun — so they still work under cloud cover. On rainy days your batteries cover the gap, and a hybrid inverter can blend solar, battery, and grid automatically.' },
  { q: 'Can I run my air conditioner on solar?', a: "Absolutely. We design special high-load systems sized for ACs, with hybrid inverters and lithium batteries that handle the surge and sustain runtime. We'll do a free load audit to size it right." },
  { q: 'What warranty do you offer?', a: 'Solar panels carry a 25-year performance warranty. Lithium batteries are covered 5–10 years depending on brand. Inverters typically 5 years. All installation work is warrantied by Sunergy directly.' },
  { q: 'Generator vs solar — which is cheaper?', a: 'A generator keeps costing you fuel, oil, servicing, and noise. A solar system pays for itself in 2–3 years. After that, your energy is effectively free for the next 20+ years.' },
  { q: 'Is there local support after installation?', a: 'Yes — we are based in Ota. Our engineers are a local call or WhatsApp message away, and most systems include remote monitoring so we can diagnose issues before you even notice them.' },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ padding: '52px 22px 48px', background: BRAND.cream }}>
      <div style={{ fontSize: 11, letterSpacing: '0.18em', fontWeight: 700, color: BRAND.yellowDeep, textTransform: 'uppercase', marginBottom: 14 }}>
        ◆ Frequently asked
      </div>
      <h2 style={{
        fontFamily: "'Fraunces', serif",
        fontSize: 30, lineHeight: 1.1, fontWeight: 500,
        letterSpacing: '-0.02em', color: BRAND.navy,
        margin: '0 0 24px',
      }}>
        Questions from <em style={{ color: BRAND.yellowDeep }}>real neighbors.</em>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{
              background: '#fff', borderRadius: 14,
              border: `1px solid ${isOpen ? BRAND.yellow : BRAND.line}`,
              overflow: 'hidden',
              transition: 'border-color 220ms',
            }}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                style={{
                  width: '100%', padding: '18px 18px',
                  border: 'none', background: 'transparent',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14,
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 600, color: BRAND.navy, letterSpacing: '-0.01em', flex: 1 }}>
                  {f.q}
                </span>
                <Chevron open={isOpen} />
              </button>
              <div style={{
                maxHeight: isOpen ? 400 : 0,
                overflow: 'hidden',
                transition: 'max-height 340ms cubic-bezier(.2,.8,.2,1)',
              }}>
                <div style={{ padding: '0 18px 18px', fontSize: 15, lineHeight: 1.6, color: '#3c5455' }}>
                  {f.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ---------- Footer CTA + Footer ----------
function FooterCTA() {
  return (
    <section style={{
      padding: '56px 22px 48px',
      background: `linear-gradient(180deg, ${BRAND.navyDeep} 0%, ${BRAND.navy} 100%)`,
      color: '#fff',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Sun flourish */}
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(253,185,19,0.22) 0%, rgba(253,185,19,0) 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative' }}>
        <SunIcon size={44} />
        <h2 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 34, fontWeight: 500, letterSpacing: '-0.02em',
          lineHeight: 1.05, margin: '16px 0 14px',
          textWrap: 'balance',
        }}>
          Ready for <em style={{ color: BRAND.yellow }}>energy independence?</em>
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(255,255,255,0.78)', margin: '0 0 26px', maxWidth: 440 }}>
          Join hundreds of happy families in Ota. Let's build your system today.
        </p>

        <WhatsAppButton label="Chat with us on WhatsApp" />

        <div style={{ marginTop: 14 }}>
          <a href={`tel:${PHONE.replace(/\s/g, '')}`} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 10, padding: '16px 22px',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 14,
            color: '#fff', textDecoration: 'none',
            fontSize: 16, fontWeight: 600,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.8.6a2 2 0 0 1 1.7 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Call {PHONE}
          </a>
        </div>

        <div style={{ marginTop: 34, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: 13, color: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="assets/logo.png" alt="" style={{ height: 26, filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
          </div>
          <div>Sunergy Light Services · Ota, Ogun State, Nigeria</div>
          <div style={{ opacity: 0.7 }}>© 2026 Sunergy Light Services. All rights reserved.</div>
        </div>
      </div>
    </section>
  );
}

// ---------- Sticky WhatsApp FAB ----------
function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 500;
      // Hide near bottom so it doesn't overlap the footer CTAs
      const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 420;
      setVisible(scrolled && !nearBottom);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a href={WHATSAPP} target="_blank" rel="noreferrer" style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 40,
      width: 58, height: 58, borderRadius: '50%',
      background: '#25D366',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 10px 30px -6px rgba(37,211,102,0.55), 0 4px 10px rgba(0,0,0,0.15)',
      transform: visible ? 'scale(1) translateY(0)' : 'scale(0.6) translateY(20px)',
      opacity: visible ? 1 : 0,
      transition: 'transform 360ms cubic-bezier(.2,.8,.2,1), opacity 260ms',
      pointerEvents: visible ? 'auto' : 'none',
    }} aria-label="Chat on WhatsApp">
      <WhatsAppGlyph size={28} />
      <span style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        boxShadow: '0 0 0 0 rgba(37,211,102,0.6)',
        animation: 'pulse 2s infinite',
      }} />
    </a>
  );
}

// ---------- Main App (mobile-first) ----------
const DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "vertical",
  "packageHighlight": "family",
  "showStickyCTA": true,
  "accentColor": "#FDB913"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweaks] = useTweaks ? useTweaks(DEFAULTS) : [DEFAULTS, () => {}];
  const heroImage = tweaks.heroVariant === 'horizontal' ? 'assets/family-horizontal.png' : 'assets/family-vertical.png';

  return (
    <div style={{ background: BRAND.cream, minHeight: '100vh' }}>
      <TopBar />
      <Hero heroImage={heroImage} />
      <About />
      <Packages />
      <BatteryCompare />
      <TrustedBrands />
      <FAQ />
      <FooterCTA />
      {tweaks.showStickyCTA && <StickyCTA />}

      {window.TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection title="Hero image">
            <TweakRadio
              value={tweaks.heroVariant}
              onChange={v => setTweaks({ heroVariant: v })}
              options={[{ value: 'vertical', label: 'Vertical (mobile)' }, { value: 'horizontal', label: 'Horizontal' }]}
            />
          </TweakSection>
          <TweakSection title="Utilities">
            <TweakToggle
              label="Sticky WhatsApp button"
              value={tweaks.showStickyCTA}
              onChange={v => setTweaks({ showStickyCTA: v })}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </div>
  );
}

// Mobile viewport frame: render full-bleed but max 480px for desktop-preview comfort
function MobileStage() {
  return (
    <div style={{ minHeight: '100vh', background: '#e6e2d7', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 440, background: BRAND.cream, boxShadow: '0 0 60px -20px rgba(0,0,0,0.2)', minHeight: '100vh', position: 'relative' }}>
        <App />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MobileStage />);
