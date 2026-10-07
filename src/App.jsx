import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { BrowserRouter, Link, useLocation, useNavigate } from "react-router-dom";
import { CONTACT_LINKS, EXPERIENCE, NAV_ITEMS, PROJECTS, RESUME_URL } from "./data.js";

/* ---------- hooks ---------- */

// Instant jump to top (html has scroll-behavior:smooth, and "instant" isn't supported everywhere)
function jumpToTop() {
  const root = document.documentElement;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = "";
}

// Tracks which section is "current" while scrolling (null = hero / top of page)
function useScrollSpy(ids, enabled = true) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!enabled) return;
    const update = () => {
      const y = window.scrollY + 120;
      let current = null;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      });
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? ids[ids.length - 1] : current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, enabled]);

  return [active, setActive];
}

/* ---------- small reusable pieces ---------- */

const Hl = ({ children }) => <span className="hl">{children}</span>;

const ExternalLink = ({ href, children, className = "link" }) => (
  <a className={className} href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

// "A · B · C" style inline link lists
const InlineLinks = ({ items, separator = " · " }) =>
  items.map((item, i) => (
    <Fragment key={item.label}>
      {i > 0 && separator}
      <ExternalLink href={item.href}>{item.label}</ExternalLink>
    </Fragment>
  ));

/* ---------- nav ---------- */

function Nav({ active, onNavigate }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  // Close the phone menu on outside click, Escape, or when growing past the phone breakpoint
  useEffect(() => {
    const onDown = (e) => navRef.current && !navRef.current.contains(e.target) && setOpen(false);
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 561px)");
    const onMq = (e) => e.matches && setOpen(false);
    document.addEventListener("click", onDown);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("click", onDown);
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const handle = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    onNavigate(id);
  };
  const cls = (id) => (active === id ? "active" : undefined);

  return (
    <header className="nav" ref={navRef}>
      <nav className="wrap" aria-label="Primary">
        <a className="brand" href="#top" onClick={handle("top")}>i_m_groot</a>
        <ul id="nav-menu" className={open ? "open" : undefined}>
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cls(id)}
                aria-current={active === id ? "true" : undefined}
                onClick={handle(id)}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a className="ext" href={RESUME_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Resume</a>
          </li>
        </ul>
        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </nav>
    </header>
  );
}

/* ---------- sections ---------- */

function Intro() {
  return (
    <section className="intro">
      <div>
        <h1 className="name">Parv Agrawal</h1>
        <p className="role">AI · Systems · Evals</p>
      </div>
      <div>
        <p className="bio">
          Hi, I'm Parv. I'm an undergraduate at <Hl>IIT Roorkee</Hl>, driven by curiosity about AI
          and how to build it properly. I build <Hl>agents, retrieval pipelines</Hl>, and the{" "}
          <Hl>backends</Hl> behind them, and I test them hard: <Hl>evaluation</Hl>, accuracy,
          groundedness, and failure cases. If there's a new tool worth learning, I learn it by
          building something real.
        </p>
        <p className="bio">
          Outside of code: i enjoy cricket, philosophy, and travelling to new places.
        </p>
      </div>
    </section>
  );
}

function Experience({ data }) {
  return (
    <section id="experience">
      <h2>Experience</h2>
      <div className="row">
        <h3 className="title">{data.company}</h3>
        <span className="date">{data.date}</span>
      </div>
      <p className="sub">{data.role}</p>
      <ul className="exp-body">
        {data.bullets.map(([pre, hl, post]) => (
          <li key={hl}>
            {pre}
            <Hl>{hl}</Hl>
            {post}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="entry">
      <div className="row">
        <h3 className="title">{project.title}</h3>
        <span className="links">
          <InlineLinks
            items={project.links}
            separator={<>{" "}<b>|</b>{" "}</>}
          />
        </span>
      </div>
      <p className="meta">{project.meta}</p>
      <p className="desc">{project.description}</p>
    </article>
  );
}

function Projects({ projects, limit }) {
  const shown = limit ? projects.slice(0, limit) : projects;
  const hasMore = Boolean(limit) && projects.length > limit;
  return (
    <div id="projects" aria-label="Projects">
      {shown.map((p, i) => {
        const cls = ["project", i === 0 && "projects-first", hasMore && i === shown.length - 1 && "no-rule"]
          .filter(Boolean)
          .join(" ");
        return (
          <section className={cls} key={p.title}>
            {i === 0 && <h2>Projects</h2>}
            <ProjectCard project={p} />
          </section>
        );
      })}
      {hasMore && (
        <div className="more">
          <Link className="btn" to="/projects">View more</Link>
        </div>
      )}
    </div>
  );
}

function Contact() {
  return (
    <section id="contact">
      <h2>Get in Touch</h2>
      <p>
        If you're working on  systems, agents, or evals, or just want to talk about how software
        behaves when things go wrong, I'd like to hear from you.
      </p>
      <p>
        <InlineLinks items={CONTACT_LINKS} />
      </p>
    </section>
  );
}

/* ---------- pages ---------- */

const Home = () => (
  <main className="wrap" id="top">
    <Intro />
    <Experience data={EXPERIENCE} />
    <Projects projects={PROJECTS} limit={3} />
    <Contact />
  </main>
);

const ProjectsPage = () => (
  <main className="wrap page-projects" id="top">
    <Projects projects={PROJECTS} />
  </main>
);

/* ---------- app ---------- */

const IDS = NAV_ITEMS.map((n) => n.id);

function Shell() {
  const { pathname, state } = useLocation();
  const routerNavigate = useNavigate();
  const isHome = pathname === "/";
  const [spyActive, setSpyActive] = useScrollSpy(IDS, isHome);
  const active = isHome ? spyActive : "projects";

  // Scroll to the right place after every route change
  useEffect(() => {
    const top = () => jumpToTop();
    const id = isHome && state?.scrollTo;
    if (!id || id === "top") return top();
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      el ? el.scrollIntoView({ behavior: "smooth" }) : top();
    });
  }, [pathname, state, isHome]);

  const navigate = useCallback(
    (id) => {
      if (!isHome) {
        // on /projects: "Projects" scrolls up, everything else goes back to the home page
        if (id === "projects") window.scrollTo({ top: 0, behavior: "smooth" });
        else routerNavigate("/", { state: { scrollTo: id } });
        return;
      }
      const target = id === "top" ? document.body : document.getElementById(id);
      target?.scrollIntoView({ behavior: "smooth" });
      setSpyActive(id === "top" ? null : id);
    },
    [isHome, routerNavigate, setSpyActive]
  );

  return (
    <>
      <Nav active={active} onNavigate={navigate} />
      {isHome ? <Home /> : <ProjectsPage />}
      <footer className="wrap">
        <p>© 2026 Parv Agrawal</p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
