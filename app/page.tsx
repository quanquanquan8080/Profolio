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
};

// Replace these placeholder entries when Tony's writing pieces are ready.
const writingPieces: WritingPiece[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Writing Piece ${String(index + 1).padStart(2, "0")}`,
  category: "Category to be added",
  date: "Date to be added",
  topic: "Topic to be added",
  summary: "A short introduction to this writing piece will be added here.",
  content:
    "The full writing piece will appear here. This reading view is ready for the final title, date, summary, and complete text.",
  image: `/images/writing-placeholder-${String(index + 1).padStart(2, "0")}.jpg`,
  pdf: "",
}));

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
      <div className="writing-thumbnail" aria-label={`Placeholder thumbnail for ${piece.title}`}>
        <span>{String(piece.id).padStart(2, "0")}</span>
        <div aria-hidden="true" />
      </div>
      <div className="writing-card-body">
        <p className="writing-meta">{piece.category} · {piece.date}</p>
        <h3>{piece.title}</h3>
        <p>{piece.summary}</p>
        <button type="button" onClick={() => onOpen(piece)}>
          Read more <span aria-hidden="true">↗</span>
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
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close writing piece">×</button>
        <p className="eyebrow">Writing portfolio / {String(piece.id).padStart(2, "0")}</p>
        <h2 id="writing-modal-title">{piece.title}</h2>
        <div className="modal-details">
          <span>{piece.category}</span><span>{piece.date}</span><span>{piece.topic}</span>
        </div>
        <div className="modal-rule" />
        <p className="modal-summary">{piece.summary}</p>
        <p>{piece.content}</p>
        <aside>
          <span>Portfolio note</span>
          This is a placeholder reading view. Tony&apos;s completed piece and optional PDF will be added here later.
        </aside>
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
            title="A growing collection of ideas."
            intro="Ten pieces will be added here. Each card is prepared for the final title, category, summary, full text, and optional PDF."
          />
          <p className="collection-count"><span>10</span> pieces reserved</p>
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
