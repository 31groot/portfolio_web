export const RESUME_URL =
  "https://drive.google.com/file/d/1HypZlEntxd2vCZdR7Wazs-Tbc-XTwt85/view?usp=drive_link";

// id = section id used for scrolling + scroll-spy
export const NAV_ITEMS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const EXPERIENCE = {
  company: "Axturo",
  role: "Full Stack Engineer",
  date: "Jan 2026 – Mar 2026",
  // [plain text, optional highlighted text, trailing text]
  bullets: [
    ["Built TableMitra, a scalable ", "full-stack hospitality", " platform integrated with the WhatsApp Business API for real-time guest communication and automated hotel workflow"],
    ["Deployed QR-based guest workflows ", "across 100+ hotels", ", automating digital service requests and streamlining real-time communication between guests and hotel staff"],
  ],
};

export const PROJECTS = [
  {
    title: "ArthaVani",
    meta: "AI Agents · Real-Time Voice AI · LangGraph · WebSockets · FastAPI · AI Evaluation",
    description: "Full-duplex financial voice agent with WebSocket streaming, Silero VAD, Deepgram STT, Edge TTS, and barge-in support. A LangGraph agent with 10+ market-data tools, secure authentication, and persistent session state, validated by evals with 100% routing accuracy (30/30) and 100% answer grounding (20/20).",
    links: [
      { label: "Demo", href: "https://arthavani-1.onrender.com/auth" },
      { label: "Code", href: "https://github.com/31groot/ArthaVani" },
    ],
  },
  {
    title: "FinIntelAI",
    meta: "Hybrid RAG · LangSmith · BM25 · Cross-Encoder Reranking · AI Evaluation · ChromaDB",
    description: "A hybrid RAG and verification agent for financial research, combining query decomposition, BM25 and vector retrieval, and cross-encoder reranking. Diagnosed 6 systemic failure classes and raised accuracy from 77% to 89% across 52 benchmarks.",
    links: [
      { label: "Demo", href: "https://finintelai.streamlit.app/" },
      { label: "Code", href: "https://github.com/31groot/finintelai" },
    ],
  },
  {
    title: "AgentShield",
    meta: "AI Safety · Backend Systems · FastAPI · SQLite · Cryptography · AI Evaluation",
    description: "A secure transaction control plane for AI agents, where the model proposes and the server decides. Cryptographically bound mandates, idempotent execution, and hash-chained audit trails, validated by 352 tests and 20 adversarial scenarios with zero unsafe executions.",
    links: [{ label: "Code", href: "https://github.com/31groot/agentshield" }],
  },
  {
    title: "Memory Engine",
    meta: "Python · Temporal Indexing · BM25 · Retrieval · Agent Safety · AI Evaluation",
    description: "A time-aware memory engine and dry-run action planner over 7 data sources, with no database or vector store. Enforces temporal visibility at every step, redacts injections and credentials, and requires confirmation for destructive actions. 83.3% answer accuracy and 100% action accuracy on a blind split, 40 passing tests.",
    links: [{ label: "Code", href: "https://github.com/31groot/memory-engine" }],
  },
];

export const CONTACT_LINKS = [
  { label: "Email", href: "mailto:agrawalparv13@gmail.com" },
  { label: "GitHub", href: "https://github.com/31groot" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/parv-agrawal-a43298282/" },
  { label: "X", href: "https://x.com/groot0x_" },
];
