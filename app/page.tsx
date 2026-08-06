"use client";

import { FormEvent, useEffect, useState } from "react";

type WritingPiece = {
  id: number;
  title: string;
  category: string;
  date: string;
  topic: string;
  summary: string;
  content: string;
  image: string;
  pdf: string;
  pages: number;
  words: number;
};

// Tony's essays are stored here so titles and descriptions remain easy to update.
const writingPieces: WritingPiece[] = [
  {
    id: 1,
    title: "Is a Farmer Still a Farmer?",
    category: "AI & Rural Life",
    date: "2026",
    topic: "AI drones in the Mekong Delta",
    summary:
      "This essay examines whether AI crop-spraying drones protect Mekong Delta farmers while changing the knowledge and attention tied to working the land.",
    content:
      "Farmers may gain steadier harvests and financial security from agricultural drones. The essay asks what happens to a farmer's identity when personal knowledge of the land is increasingly transferred to software.",
    image: "/images/writing/01-ai-drones-and-vietnamese-farming.webp",
    pdf: "/writing/01-ai-drones-and-vietnamese-farming.pdf",
    pages: 4,
    words: 1691,
  },
  {
    id: 2,
    title: "Calculated or Sacred?",
    category: "AI & Tradition",
    date: "2026",
    topic: "AI horoscope applications and Tử Vi",
    summary:
      "This essay considers whether an AI horoscope app offers useful objectivity or removes the human wisdom and mystery central to Vietnamese fortune telling.",
    content:
      "The discussion compares calculated predictions with the judgement of a traditional thầy tử vi. It asks whether spiritual guidance comes from an accurate system or from the experience of the person interpreting it.",
    image: "/images/writing/02-ai-horoscopes-and-fortune-telling.webp",
    pdf: "/writing/02-ai-horoscopes-and-fortune-telling.pdf",
    pages: 4,
    words: 1444,
  },
  {
    id: 3,
    title: "Can Filial Piety Be Automated?",
    category: "AI & Family",
    date: "2026",
    topic: "Voice assistants and Hiếu Thảo",
    summary:
      "This essay explores whether voice assistants can help adult children care for elderly parents while economic migration separates Vietnamese families.",
    content:
      "An AI assistant can support daily check-ins and health monitoring from a distance. The essay weighs that practical help against the warmth and moral reciprocity of direct human care.",
    image: "/images/writing/03-ai-and-filial-piety.webp",
    pdf: "/writing/03-ai-and-filial-piety.pdf",
    pages: 4,
    words: 1708,
  },
  {
    id: 4,
    title: "Can a Machine Be Honored?",
    category: "AI & Remembrance",
    date: "2026",
    topic: "AI avatars and ancestor worship",
    summary:
      "This essay studies the use of AI avatars during Vietnamese death anniversaries and asks whether a digital replica can carry genuine spiritual meaning.",
    content:
      "Griefbots may help families remember a loved one and process loss. The essay considers consent and sincere ritual effort when deciding whether such technology supports the practice of Hiếu.",
    image: "/images/writing/04-ai-avatars-and-ancestor-worship.webp",
    pdf: "/writing/04-ai-avatars-and-ancestor-worship.pdf",
    pages: 4,
    words: 1417,
  },
  {
    id: 5,
    title: "When AI Tells the Story of a Handmade Product",
    category: "AI & Craft",
    date: "2026",
    topic: "AI marketing in Vietnamese craft villages",
    summary:
      "This essay asks whether AI-written product stories preserve an artisan's voice or turn a handmade object into an ordinary online product.",
    content:
      "Digital tools may hide the personal history behind a craft. They can also help family workshops reach customers and remain financially active, which gives communities a difficult choice about cultural preservation.",
    image: "/images/writing/05-ai-and-the-artisans-voice.webp",
    pdf: "/writing/05-ai-and-the-artisans-voice.pdf",
    pages: 4,
    words: 1675,
  },
  {
    id: 6,
    title: "When a Machine Learning Tool Locks an Oral Epic into a Digital Script",
    category: "AI & Heritage",
    date: "2026",
    topic: "Speech-to-text tools and oral epics",
    summary:
      "This essay examines whether transcribing Vietnam's oral epics protects endangered traditions or prevents them from changing through live performance.",
    content:
      "A digital record can help minority communities preserve stories as migration threatens language transmission. The essay argues that the community itself should decide how a transcript supports the living tradition.",
    image: "/images/writing/06-ai-and-oral-epics.webp",
    pdf: "/writing/06-ai-and-oral-epics.pdf",
    pages: 4,
    words: 1753,
  },
  {
    id: 7,
    title: "Can an AI Assistant Generate True Phước?",
    category: "AI & Buddhism",
    date: "2026",
    topic: "Robot chanting and spiritual merit",
    summary:
      "This essay considers whether robotic chanting can generate Phước when a machine lacks the intention and discipline associated with a traditional monk.",
    content:
      "The technology cannot form a purposeful mind of its own. It may still act as a tool that helps listeners become mindful, raising a question about whether merit begins with the chant or within the listener.",
    image: "/images/writing/07-ai-and-phuoc.webp",
    pdf: "/writing/07-ai-and-phuoc.pdf",
    pages: 4,
    words: 1463,
  },
  {
    id: 8,
    title: "Migration, AI Guardian Spirits, and the Vietnamese Communal House",
    category: "AI & Community",
    date: "2026",
    topic: "Digital guardian spirits and the đình",
    summary:
      "This essay explores whether an online village guardian spirit helps young people maintain their heritage after moving away from rural communities.",
    content:
      "Digital access can keep local memory present across distance. The essay also considers how solitary interaction with an app may weaken the physical community that gives village ritual its meaning.",
    image: "/images/writing/08-ai-guardian-spirits.webp",
    pdf: "/writing/08-ai-guardian-spirits.pdf",
    pages: 4,
    words: 1511,
  },
  {
    id: 9,
    title: "Can a Machine Give a Blessing?",
    category: "AI & Ritual",
    date: "2026",
    topic: "AI calligraphy and the Tết tradition of Xin Chữ",
    summary:
      "This essay asks whether robotic calligraphy can offer a meaningful Tết blessing when it removes the personal conversation with an Ông Đồ.",
    content:
      "Automation can reproduce precise characters while losing the effort behind the original ritual. The essay considers whether sincerity belongs to the calligrapher's hand or to the recipient's own intention.",
    image: "/images/writing/09-ai-calligraphy-and-xin-chu.webp",
    pdf: "/writing/09-ai-calligraphy-and-xin-chu.pdf",
    pages: 4,
    words: 1429,
  },
  {
    id: 10,
    title: "AI Résumé Screening and the Limits of Rule-Based Fairness",
    category: "AI & Ethics",
    date: "2026",
    topic: "Automated hiring in Vietnam",
    summary:
      "This essay compares the consistency of automated résumé screening with the human judgement needed to recognise an applicant's individual circumstances.",
    content:
      "Algorithms may reduce some forms of personal bias while introducing hidden standards. The essay asks whether fair hiring should follow fixed criteria or make room for human equity through direct conversation.",
    image: "/images/writing/10-ai-resume-screening.webp",
    pdf: "/writing/10-ai-resume-screening.pdf",
    pages: 4,
    words: 1605,
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Interests", href: "#interests" },
  { label: "My Goal", href: "#goal" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

const interests = [
  {
    number: "01",
    symbol: "↗",
    title: "Badminton",
    description:
      "Badminton helps me improve my focus and reactions. It also teaches me to stay disciplined and calm under pressure.",
  },
  {
    number: "02",
    symbol: "≈",
    title: "Swimming",
    description:
      "Swimming helps me build endurance and consistency while giving me time to think, reset, and return with confidence.",
  },
  {
    number: "03",
    symbol: "“ ”",
    title: "Debating",
    description:
      "I enjoy debating because it encourages me to examine different perspectives and build clear arguments. It also helps me speak with confidence.",
  },
  {
    number: "04",
    symbol: "Aa",
    title: "Writing & Ideas",
    description:
      "Writing gives me space to explore questions and organise my thoughts. I enjoy sharing ideas in ways that others can understand.",
  },
];

const values = [
  { name: "Curiosity", note: "Asking meaningful questions" },
  { name: "Communication", note: "Expressing ideas with care" },
  { name: "Creativity", note: "Finding fresh possibilities" },
  { name: "Discipline", note: "Showing up consistently" },
  { name: "Empathy", note: "Listening to other perspectives" },
  { name: "Responsibility", note: "Following ideas with action" },
];

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeOnWideScreen = () => {
      if (window.innerWidth > 860) setOpen(false);
    };
    window.addEventListener("resize", closeOnWideScreen);
    return () => window.removeEventListener("resize", closeOnWideScreen);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`} aria-label="Main navigation">
      <div className="nav-inner">
        <a className="brand" href="#home" onClick={() => setOpen(false)} aria-label="Tony Quan, home">
          <span className="brand-mark" aria-hidden="true">TQ</span>
          <span className="brand-name">Tony Quan</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
        <div className={`nav-links ${open ? "nav-links-open" : ""}`} id="site-menu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function PortraitPlaceholder({ variant = "hero" }: { variant?: "hero" | "about" }) {
  return (
    <div className={`portrait-placeholder portrait-${variant}`} role="img" aria-label="Placeholder for a portrait of Tony">
      <div className="portrait-grid" aria-hidden="true" />
      <div className="portrait-initials" aria-hidden="true">TQ</div>
      <p>Portrait placeholder</p>
      <span>Replace with Tony&apos;s photo</span>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero section-shell" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Hello, I&apos;m Tony</p>
        <h1>
          Tran Minh Quan <span>(Tony)</span>
        </h1>
        <p className="hero-role">Student · Writer · Debater · Future Educator</p>
        <p className="hero-intro">
          I explore ideas through writing and debate, then share what I learn through thoughtful conversations. I hope to bring these skills to younger students across Vietnam.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#about">Explore my portfolio <span aria-hidden="true">↘</span></a>
          <a className="button button-secondary" href="#writing">View my writing</a>
        </div>
        <div className="hero-facts" aria-label="Quick facts">
          <div><span>14</span><small>years old</small></div>
          <div><span>Vietnam</span><small>home</small></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <PortraitPlaceholder />
        <div className="floating-note note-top"><span>Currently studying at</span>The American School</div>
        <div className="floating-note note-bottom"><span>Interested in</span>Ideas worth sharing</div>
      </div>
    </section>
  );
}

function AboutSection() {
  const facts = [
    ["Age", "14 years old"],
    ["School", "The American School"],
    ["Location", "Vietnam"],
    ["Main interests", "Writing & debate"],
    ["Sports", "Badminton & swimming"],
  ];

  return (
    <section className="about section section-shell" id="about">
      <div className="about-visual">
        <PortraitPlaceholder variant="about" />
        <div className="margin-note" aria-hidden="true">Learning through<br />questions & exchange</div>
      </div>
      <div className="about-copy">
        <SectionHeading eyebrow="01 / About me" title="A curious student who enjoys exchanging ideas." />
        <p>
          My name is Tran Minh Quan, and most people call me Tony. I am a 14-year-old student at The American School. I learn best through discussion and writing, especially when a question gives me a chance to look beyond the first answer.
        </p>
        <p>
          I am interested in the way communication and creativity can make difficult topics easier to understand. Outside the classroom, badminton and swimming help me build discipline. Debating encourages me to consider other perspectives and explain my own ideas clearly.
        </p>
        <dl className="fact-panel">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function InterestsSection() {
  return (
    <section className="section interests" id="interests">
      <div className="section-shell">
        <SectionHeading
          eyebrow="02 / Interests & activities"
          title="The activities that shape how I learn."
          intro="Each interest gives me a different way to practise focus and expression while staying open to new perspectives."
        />
        <div className="interest-grid">
          {interests.map((interest) => (
            <article className="interest-card" key={interest.title}>
              <span className="card-number">{interest.number}</span>
              <div className="interest-icon" aria-hidden="true">{interest.symbol}</div>
              <h3>{interest.title}</h3>
              <p>{interest.description}</p>
              <span className="card-line" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="section values-section">
      <div className="section-shell values-layout">
        <div className="values-copy">
          <SectionHeading eyebrow="03 / Values in progress" title="Qualities I am working to develop." />
          <p>
            I want to keep developing as a student who listens carefully and asks meaningful questions. Learning feels more valuable to me when I can use it to support other people.
          </p>
        </div>
        <div className="values-list">
          {values.map((value, index) => (
            <div className="value-row" key={value.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{value.name}</h3>
              <p>{value.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoalRoadmap() {
  const steps = [
    ["01", "Plan", "Design beginner-friendly lessons"],
    ["02", "Create", "Prepare activities and learning materials"],
    ["03", "Teach", "Work with small groups of students"],
    ["04", "Grow", "Reflect, improve, and expand the program"],
  ];

  return (
    <ol className="roadmap">
      {steps.map(([number, title, text]) => (
        <li key={number}>
          <span className="roadmap-number">{number}</span>
          <div><h3>{title}</h3><p>{text}</p></div>
        </li>
      ))}
    </ol>
  );
}

function GoalSection() {
  return (
    <section className="section goal-section" id="goal">
      <div className="section-shell">
        <div className="goal-intro">
          <SectionHeading eyebrow="04 / My goal" title="Help younger students find confidence in their ideas." />
          <div className="goal-copy">
            <p>
              My long-term goal is to create a teaching program for younger students in Vietnam. I want to introduce critical thinking and creative writing through approachable lessons, discussions, games, and small projects.
            </p>
            <p>
              Critical thinking can help students examine evidence and ask better questions. Creative writing can give them room to express their imagination and experiences with confidence. I hope the program makes learning engaging and accessible in ways that stay meaningful to each student.
            </p>
          </div>
        </div>
        <GoalRoadmap />
        <div className="project-placeholder">
          <div className="project-placeholder-art" aria-hidden="true">
            <span>Lesson</span><span>Idea</span><span>Story</span><span>Question</span>
          </div>
          <div>
            <p className="eyebrow">Coming in the future</p>
            <h3>Teaching Program Photos & Projects</h3>
            <p>This space is ready for lesson plans, student work, event photos, and program updates.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WritingCard({ piece, onOpen }: { piece: WritingPiece; onOpen: (piece: WritingPiece) => void }) {
  return (
    <article className="writing-card">
      <div className="writing-thumbnail">
        <img src={piece.image} alt={`First page of ${piece.title}`} loading="lazy" />
        <span aria-hidden="true">{String(piece.id).padStart(2, "0")}</span>
      </div>
      <div className="writing-card-body">
        <p className="writing-meta">{piece.category} · {piece.date}</p>
        <h3>{piece.title}</h3>
        <p>{piece.summary}</p>
        <button type="button" onClick={() => onOpen(piece)}>
          Read essay <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}

function WritingModal({ piece, onClose }: { piece: WritingPiece | null; onClose: () => void }) {
  useEffect(() => {
    if (!piece) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [piece, onClose]);

  if (!piece) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <article
        className="writing-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="writing-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close writing piece" autoFocus>×</button>
        <p className="eyebrow">Writing portfolio / {String(piece.id).padStart(2, "0")}</p>
        <h2 id="writing-modal-title">{piece.title}</h2>
        <div className="modal-details">
          <span>{piece.category}</span><span>{piece.date}</span><span>{piece.pages} pages</span><span>{piece.words.toLocaleString()} words</span>
        </div>
        <div className="modal-rule" />
        <p className="modal-summary">{piece.summary}</p>
        <p>{piece.content}</p>
        <p className="modal-topic">Topic: {piece.topic}</p>
        <div className="modal-actions">
          <a className="button button-primary" href={piece.pdf} target="_blank" rel="noreferrer">Open full PDF <span aria-hidden="true">↗</span></a>
          <a className="button button-secondary" href={piece.pdf} download>Download essay</a>
        </div>
        <iframe className="pdf-reader" src={`${piece.pdf}#view=FitH`} title={`Full essay: ${piece.title}`} />
      </article>
    </div>
  );
}

function WritingSection() {
  const [selectedPiece, setSelectedPiece] = useState<WritingPiece | null>(null);

  return (
    <section className="section writing-section" id="writing">
      <div className="section-shell">
        <div className="writing-heading-row">
          <SectionHeading
            eyebrow="05 / Writing portfolio"
            title="Ten essays exploring technology and culture."
            intro="Each essay begins with a question about how artificial intelligence may affect Vietnamese traditions and everyday life. Open any card to read the complete paper."
          />
          <p className="collection-count"><span>10</span> completed essays</p>
        </div>
        <div className="writing-grid">
          {writingPieces.map((piece) => (
            <WritingCard key={piece.id} piece={piece} onOpen={setSelectedPiece} />
          ))}
        </div>
      </div>
      <WritingModal piece={selectedPiece} onClose={() => setSelectedPiece(null)} />
    </section>
  );
}

function ReflectionSection() {
  return (
    <section className="reflection section">
      <div className="section-shell reflection-inner">
        <p className="eyebrow">06 / What writing means to me</p>
        <blockquote>
          “Writing helps me understand my own ideas more clearly.”
        </blockquote>
        <p>
          It gives me an opportunity to explore questions and reflect on experiences. Through writing, I hope to keep developing my voice while learning how stories and arguments can influence the way people think.
        </p>
        <span className="reflection-signature">— Tony Quan</span>
      </div>
    </section>
  );
}

function ContactSection() {
  const [status, setStatus] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("This form is ready to connect when Tony's contact details are added.");
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="section-shell contact-layout">
        <div className="contact-copy">
          <SectionHeading eyebrow="07 / Contact" title="Thank you for visiting my portfolio." />
          <p>
            I look forward to adding new writing and sharing the first steps of my teaching program here.
          </p>
          <a href="mailto:email@example.com" className="contact-email">email@example.com <span aria-hidden="true">↗</span></a>
          <small>Placeholder email — replace before publishing publicly.</small>
        </div>
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="field-row">
            <label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
          </div>
          <label>Message<textarea name="message" rows={5} placeholder="Write a short message" required /></label>
          <button className="button button-primary" type="submit">Send message <span aria-hidden="true">↗</span></button>
          <p className="form-status" aria-live="polite">{status}</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="section-shell footer-main">
        <div>
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark">TQ</span>
            <span><strong>Tran Minh Quan</strong><small>Student Portfolio</small></span>
          </a>
          <p>Created to share my learning, writing, and future goals.</p>
        </div>
        <div className="footer-links" aria-label="Footer navigation">
          {navLinks.slice(1).map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <span>© {new Date().getFullYear()} Tran Minh Quan</span>
        <span>The American School · Vietnam</span>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <InterestsSection />
        <ValuesSection />
        <GoalSection />
        <WritingSection />
        <ReflectionSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
