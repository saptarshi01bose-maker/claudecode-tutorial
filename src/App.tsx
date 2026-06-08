// @ts-nocheck

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Terminal, CheckCircle, ChevronRight, Moon, Sun, 
  Code, PlayCircle, Settings, FileText, Zap, Shield, ArrowRight,
  Layers, Cpu, GitBranch, Sparkles, Loader2, Compass, LayoutDashboard, Link,
  Mic, Target, LineChart, Search, ListTodo, Activity, ExternalLink
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

const apiKey = ""; // Injected by runtime

async function fetchWithRetry(url, options, retries = 5) {
  const delays = [1000, 2000, 4000, 8000, 16000];
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(res => setTimeout(res, delays[i]));
    }
  }
}

async function generateGeminiText(prompt, systemInstruction = "You are a helpful AI assistant.") {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };
  const data = await fetchWithRetry(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
}

// --- CSS Variables & Animations injection for Claude Design System ---
const globalStyles = `
  @import url('https://fonts.cdnfonts.com/css/aptos');

  :root {
    --bg: #FAF9F5;
    --surface: #FFFFFF;
    --surface-alt: #F5F4EE;
    --border: #E5E3DA;
    --text: #141413;
    --text-secondary: #6B6A63;
    --text-muted: #9B9A93;
    --accent: #D97757;
    --accent-hover: #C15F3C;
    --accent-soft: #E89177;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 24px;
  }

  .dark {
    --bg: #1F1E1D;
    --surface: #262624;
    --surface-alt: #30302E;
    --border: #3D3D3A;
    --text: #F5F4EE;
    --text-secondary: #A3A299;
    --text-muted: #7A7973;
  }

  body {
    background-color: var(--bg);
    color: var(--text);
    font-family: 'Aptos', system-ui, -apple-system, sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .brand-btn {
    background-color: var(--accent);
    color: #FFFFFF;
    transition: all 0.2s ease;
  }
  .brand-btn:hover {
    background-color: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(217, 119, 87, 0.3);
  }

  .glass-card {
    background-color: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 12px rgba(20,20,19,0.03);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }
  
  .glass-card:hover {
    box-shadow: 0 8px 24px rgba(20,20,19,0.06);
    border-color: var(--accent-soft);
  }

  /* Custom Animations for Workflow Diagram */
  @keyframes flow-line {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .animate-flow {
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    background-size: 200% 100%;
    animation: flow-line 3s infinite linear;
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(217, 119, 87, 0.4); }
    50% { box-shadow: 0 0 20px 5px rgba(217, 119, 87, 0.6); }
  }
  .node-glow {
    animation: pulse-glow 3s infinite ease-in-out;
  }
`;

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('home'); 
  const [activeModule, setActiveModule] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navigateToHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <style>{globalStyles}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--bg)]/90 border-b border-[var(--border)] px-6 py-4 flex justify-between items-center shadow-sm">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={navigateToHome}
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white font-extrabold text-2xl group-hover:scale-105 transition-transform shadow-md">
            C
          </div>
          <span className="font-bold text-2xl tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">AI Tutorials</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setView('quiz'); setCurrentView('quiz'); window.scrollTo(0, 0); }}
            className="hidden md:flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] font-medium text-sm transition-colors mr-4"
          >
            <Compass size={16} /> Readiness Quiz
          </button>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all text-[var(--text-secondary)] hover:text-[var(--accent)] shadow-sm"
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="w-full">
        {currentView === 'home' && <HomeView setView={setCurrentView} setActiveModule={setActiveModule} />}
        {currentView === 'quiz' && <div className="max-w-7xl mx-auto px-4 py-12"><QuizView setView={setCurrentView} /></div>}
        {currentView === 'tutorial' && (
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <TutorialView activeModule={activeModule} setActiveModule={setActiveModule} />
          </div>
        )}
      </main>
      <Analytics />
    </div>
  );
}

// ==========================================
// HOME VIEW 
// ==========================================
function HomeView({ setView, setActiveModule }) {
  return (
    <div className="w-full animate-in fade-in duration-700 flex flex-col items-center">
      
      {/* PERFECT UNALTERED IMAGE HERO */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 flex justify-center z-10">
        <div className="w-full max-w-6xl rounded-[1.5rem] overflow-hidden shadow-2xl bg-[#1A1A18] relative min-h-[350px] md:min-h-[550px] border border-[var(--border)]">
          {/* Using object-cover to ensure the image gracefully fills the space without squishing or breaking */}
          <img 
            src="Gemini_Generated_Image_9rnv089rnv089rnv.png" 
            alt="AI Hyper-realistic Agentic Workspace" 
            className="absolute inset-0 w-full h-full object-cover block"
            onError={(e) => {
              e.target.onerror = null; 
              // Silent fallback to prevent a broken file icon from showing in the live preview
              e.target.src = "https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=2564&auto=format&fit=crop";
            }}
          />
        </div>
      </section>

      {/* CONTENT BELOW IMAGE */}
      <section className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center mt-12 z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--surface-alt)] text-[var(--accent)] text-sm font-bold uppercase tracking-widest border border-[var(--border)] mb-6 shadow-sm">
          <Sparkles size={16} /> The Exhaustive 2026 Curriculum
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--text)] tracking-tight leading-[1.1] mb-6">
          Master the <span className="text-[var(--accent)]">Agentic Shift</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-10">
          Synthesized from 15+ hours of top-tier developer workflows and official Anthropic masterclasses. Go beyond autocomplete and learn how to build autonomous coding systems.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button 
            onClick={() => { setActiveModule(0); setView('tutorial'); window.scrollTo(0, 0); }}
            className="brand-btn px-10 py-5 rounded-[var(--radius-lg)] font-bold flex items-center justify-center gap-3 text-xl"
          >
            <Terminal size={24} /> Enter the Course
          </button>
          <button 
            onClick={() => { setView('quiz'); window.scrollTo(0, 0); }}
            className="bg-[var(--surface)] text-[var(--text)] border-2 border-[var(--border)] hover:border-[var(--accent)] px-10 py-5 rounded-[var(--radius-lg)] font-bold flex items-center justify-center gap-3 text-xl transition-all"
          >
            <Shield size={24} /> Take Readiness Quiz
          </button>
        </div>
      </section>

      {/* CONTINUOUS CONNECTOR LINE */}
      <div className="w-1 h-24 bg-gradient-to-b from-transparent via-[var(--border)] to-[var(--accent)] my-8"></div>

      {/* ANIMATED WORKFLOW DIAGRAM */}
      <section className="w-full max-w-6xl mx-auto px-4 py-8 mb-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[var(--text)] mb-3">How Claude Code Works</h2>
          <p className="text-lg text-[var(--text-secondary)]">The Continuous Agentic Loop you will master in this course.</p>
        </div>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full glass-card p-10 md:p-16 overflow-hidden">
          {/* Animated Connecting Line Background */}
          <div className="absolute top-1/2 left-16 right-16 h-1 hidden md:block -translate-y-1/2 bg-[var(--surface-alt)] rounded-full overflow-hidden">
             <div className="w-full h-full animate-flow"></div>
          </div>
          {/* Vertical line for mobile */}
          <div className="absolute top-16 bottom-16 left-1/2 w-1 md:hidden -translate-x-1/2 bg-[var(--surface-alt)] rounded-full overflow-hidden">
             <div className="w-full h-full animate-flow bg-gradient-to-b"></div>
          </div>

          {/* Nodes */}
          <WorkflowNode icon={<Terminal />} title="1. Prompt" desc="You assign a task" delay="0s" />
          <WorkflowNode icon={<Search />} title="2. Observe" desc="Reads your codebase" delay="0.5s" />
          <WorkflowNode icon={<ListTodo />} title="3. Plan" desc="Architects multi-file strategy" delay="1s" />
          <WorkflowNode icon={<Code />} title="4. Execute" desc="Writes & saves code locally" delay="1.5s" />
          <WorkflowNode icon={<Activity />} title="5. Evaluate" desc="Runs tests & self-corrects" delay="2s" isLast />
        </div>
      </section>

      {/* CONTINUOUS CONNECTOR LINE */}
      <div className="w-1 h-24 bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-transparent mb-8"></div>

      {/* CURRICULUM OVERVIEW SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[var(--text)] mb-4">Course Modules</h2>
          <p className="text-xl text-[var(--text-secondary)]">Deep dives into real-world applications, plugins, and Anthropic's internal workflows.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Terminal />}
            title="1. Agentic Foundation"
            desc="Master the CLI. Learn Code Harnesses, Sandboxing, the new /voice command, and how to remote-control Claude from your mobile device."
            onClick={() => { setActiveModule(1); setView('tutorial'); window.scrollTo(0, 0); }}
          />
          <FeatureCard 
            icon={<BookOpen />}
            title="2. Project Memory"
            desc="Construct the 'claude.md' project brain. Master the Verification Rule to force automated testing and prevent lazy syntax."
            onClick={() => { setActiveModule(2); setView('tutorial'); window.scrollTo(0, 0); }}
          />
          <FeatureCard 
            icon={<FileText />}
            title="3. Build & Sell"
            desc="Build an Excel Automator and a Lead Generation Agent (Texas Roofers). Learn how non-engineers list tools on BOOTH."
            onClick={() => { setActiveModule(3); setView('tutorial'); window.scrollTo(0, 0); }}
          />
          <FeatureCard 
            icon={<Layers />}
            title="4. Skills & Compounding"
            desc="Stop writing prompts. Build a UI Generator Skill and learn the 'Compounding Loop' Anthropic engineers use to self-correct."
            onClick={() => { setActiveModule(4); setView('tutorial'); window.scrollTo(0, 0); }}
          />
          <FeatureCard 
            icon={<Cpu />}
            title="5. MCP, Hooks & Ultraplan"
            desc="Use Context 7 MCP for live docs. Set up pre-tool hooks to protect .env files, and use Ultraplan to spin up parallel review agents."
            onClick={() => { setActiveModule(5); setView('tutorial'); window.scrollTo(0, 0); }}
          />
          <FeatureCard 
            icon={<Link />}
            title="6. References & Sources"
            desc="Interactive links to all 15+ hours of curriculum material. Verify our strategies directly against the original Anthropic masterclasses."
            onClick={() => { setActiveModule(7); setView('tutorial'); window.scrollTo(0, 0); }}
          />
        </div>
      </section>
    </div>
  );
}

function WorkflowNode({ icon, title, desc, delay, isLast }) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center my-6 md:my-0 group">
      <div 
        className={`w-16 h-16 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] flex items-center justify-center text-[var(--accent)] mb-4 ${isLast ? 'node-glow bg-[var(--accent)] text-white' : 'shadow-lg'}`}
        style={{ animationDelay: delay }}
      >
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h4 className="font-bold text-lg text-[var(--text)] bg-[var(--bg)] px-2">{title}</h4>
      <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-[120px] bg-[var(--bg)] px-2">{desc}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="glass-card p-8 text-left group relative flex flex-col h-full bg-[var(--surface)] hover:bg-[var(--surface-alt)]"
    >
      <div className="w-14 h-14 rounded-2xl bg-[var(--surface-alt)] flex items-center justify-center text-[var(--accent)] mb-6 border border-[var(--border)] group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-300">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h3 className="text-xl font-bold mb-3 text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">{title}</h3>
      <p className="text-[var(--text-secondary)] leading-relaxed">{desc}</p>
    </button>
  );
}

// ==========================================
// QUIZ VIEW
// ==========================================
function QuizView({ setView }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      q: "When an AI-generated script throws a massive terminal error, what is your current reaction?",
      options: [
        { text: "I manually copy the error, paste it back into the web chat, and wait.", points: 1 },
        { text: "I try to manually debug it line-by-line in my IDE.", points: 2 },
        { text: "I want a system that reads the terminal error and automatically fixes its own code.", points: 3 }
      ]
    },
    {
      q: "How do you currently handle repetitive coding tasks?",
      options: [
        { text: "I write a long, detailed prompt every single time.", points: 1 },
        { text: "I keep a text file of prompts that I copy and paste.", points: 2 },
        { text: "I want to build reusable 'Skills' (SOPs + reference code) that load automatically.", points: 3 }
      ]
    },
    {
      q: "What is the primary bottleneck in your current development process?",
      options: [
        { text: "Figuring out the exact syntax for a specific function.", points: 1 },
        { text: "Setting up boilerplate and configuring environments.", points: 2 },
        { text: "Managing multi-file refactors and ensuring the whole system compiles.", points: 3 }
      ]
    }
  ];

  const handleAnswer = (points) => {
    setScore(score + points);
    setStep(step + 1);
  };

  if (step < questions.length) {
    return (
      <div className="max-w-3xl mx-auto glass-card p-10 md:p-16 animate-in slide-in-from-bottom-8 duration-500 mt-12 border-t-4 border-t-[var(--accent)]">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Compass className="text-[var(--accent)]" size={24} />
            <p className="text-sm font-bold text-[var(--accent)] tracking-widest uppercase">Diagnostic {step + 1} of {questions.length}</p>
          </div>
          <h2 className="text-4xl font-bold text-[var(--text)] leading-tight">{questions[step].q}</h2>
        </div>
        <div className="space-y-4">
          {questions[step].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt.points)}
              className="w-full text-left p-6 md:p-8 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-alt)] hover:border-[var(--accent)] hover:shadow-md transition-all flex items-center justify-between group"
            >
              <span className="text-xl font-medium text-[var(--text-secondary)] group-hover:text-[var(--text)] pr-6">{opt.text}</span>
              <div className="w-8 h-8 rounded-full border-2 border-[var(--border)] group-hover:border-[var(--accent)] flex items-center justify-center flex-shrink-0 transition-colors">
                <div className="w-4 h-4 rounded-full bg-transparent group-hover:bg-[var(--accent)] transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto glass-card p-12 md:p-20 text-center animate-in zoom-in-95 duration-500 mt-12 border-t-4 border-t-green-500">
      <div className="w-28 h-28 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
        <CheckCircle size={56} />
      </div>
      <h2 className="text-5xl font-extrabold mb-6 text-[var(--text)]">You Are Ready for Agentic Coding</h2>
      <p className="text-2xl text-[var(--text-secondary)] mb-12 leading-relaxed">
        Based on your workflow bottlenecks, you are the exact target audience for Claude Code. You need a terminal-native tool that reads errors, runs tests, and executes multi-file strategies autonomously.
      </p>
      <button 
        onClick={() => { setView('tutorial'); window.scrollTo(0, 0); }}
        className="brand-btn px-12 py-6 rounded-[var(--radius-lg)] font-bold text-2xl w-full shadow-lg"
      >
        Start the Complete Course
      </button>
    </div>
  );
}

// ==========================================
// GEMINI INTERACTIVE LAB COMPONENTS
// ==========================================

function PromptTransformer() {
  const [input, setInput] = useState("Explain Docker to me.");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTransform = async () => {
    setIsLoading(true);
    const sysPrompt = "You are an expert Anthropic prompt engineer. Rewrite the user's weak prompt into a 'Gold Standard' agentic prompt using these rules: 1. Assign a persona. 2. Give specific constraints/context. 3. Define the exact output format. Output ONLY the rewritten prompt, nothing else.";
    try {
      const result = await generateGeminiText(input, sysPrompt);
      setOutput(result);
    } catch (e) {
      setOutput("Error generating prompt. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-[var(--surface-alt)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)] sm:col-span-2 mt-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="text-[var(--accent)]" size={28} />
        <h4 className="font-bold text-[var(--text)] text-2xl">Interactive Lab: AI Prompt Engineer</h4>
      </div>
      <p className="text-lg text-[var(--text-secondary)] mb-6">
        Type a weak, generic prompt below. The Gemini API will transform it into an Anthropic-grade engineering prompt using the "Anti-Slop" rules.
      </p>
      <textarea 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] p-5 text-[var(--text)] text-lg focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all mb-6 resize-none h-32 shadow-inner"
      />
      <button 
        onClick={handleTransform}
        disabled={isLoading || !input.trim()}
        className="brand-btn w-full py-4 rounded-[var(--radius-md)] font-bold text-lg flex items-center justify-center gap-3 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
        {isLoading ? "Engineering Prompt..." : "✨ Engineer My Prompt"}
      </button>
      
      {output && (
        <div className="bg-[#141413] p-6 rounded-[var(--radius-md)] border border-[#3D3D3A] shadow-xl relative animate-in fade-in zoom-in-95 duration-300 mt-6">
          <div className="absolute -top-4 left-6 bg-[var(--accent)] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
            Gold Standard Output
          </div>
          <p className="text-base font-mono text-[#4AF626] leading-relaxed mt-4 whitespace-pre-wrap">
            {output}
          </p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// TUTORIAL VIEW & CONTENT (Deeply Exhaustive)
// ==========================================

const TUTORIAL_MODULES = [
  {
    title: "1. The Agentic Shift",
    icon: <PlayCircle size={20} />,
    content: () => (
      <div className="space-y-8 text-lg">
        <Badge text="Concept Overview" />
        <h2 className="text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight mb-6">The Agentic Loop & Sandboxing</h2>
        
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Traditional AI integration (like GitHub Copilot) operates <strong>passively</strong>—suggesting syntax while you type. According to Anthropic's official 7-hour course, <strong>Claude Code represents the Agentic Shift.</strong>
        </p>

        <p className="text-[var(--text-secondary)] leading-relaxed">
          It is a terminal-native system utilizing <strong>Code Harnesses and Sandboxing</strong> to operate safely at the project level. It doesn't just write code; it reads your directory tree, parses file dependencies, executes terminal commands, and runs automated debugging cycles on its own.
        </p>

        <div className="bg-[var(--surface-alt)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)] mt-10 shadow-sm">
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 border-b border-[var(--border)] pb-4">
            <Settings className="text-[var(--accent)]" size={32} /> 
            Gather ➔ Plan ➔ Execute
          </h3>
          <p className="text-[var(--text-secondary)] mb-8">When you give Claude Code a prompt, it enters a continuous, self-correcting loop derived directly from Anthropic's internal models:</p>
          
          <ul className="space-y-6">
            <li className="flex items-start gap-5 bg-[var(--surface)] p-6 rounded-[var(--radius-md)] border border-[var(--border)] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
              <div>
                <strong className="text-[var(--text)] block text-xl mb-2">Gather Context</strong> 
                <span className="text-[var(--text-secondary)]">It runs <code>ls</code> or <code>grep</code> to understand your folder structure before writing anything.</span>
              </div>
            </li>
            <li className="flex items-start gap-5 bg-[var(--surface)] p-6 rounded-[var(--radius-md)] border border-[var(--border)] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
              <div>
                <strong className="text-[var(--text)] block text-xl mb-2">Formulate a Plan</strong> 
                <span className="text-[var(--text-secondary)]">It creates a multi-file strategy. By passing the <code>--plan</code> flag, you can force it into "Plan Mode" to verify its architecture before it writes code.</span>
              </div>
            </li>
            <li className="flex items-start gap-5 bg-[var(--surface)] p-6 rounded-[var(--radius-md)] border border-[var(--border)] shadow-sm border-l-4 border-l-green-500">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
              <div>
                <strong className="text-[var(--text)] block text-xl mb-2">Take Action & Evaluate</strong> 
                <span className="text-[var(--text-secondary)]">It uses local tools to edit files and runs your build tools. If it hits a compiler error, it reads the terminal output, feeds the error back to Step 1, and fixes its own mistake.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "2. CLI Setup & The Arsenal",
    icon: <Terminal size={20} />,
    content: () => (
      <div className="space-y-8 text-lg">
        <Badge text="Technical Setup" />
        <h2 className="text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight mb-6">Environment & Command Mastery</h2>
        
        <div className="bg-[var(--surface-alt)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)] mt-8">
          <h3 className="text-2xl font-bold mb-4 text-[var(--accent)]">Step 1: Installation & Auth</h3>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-[var(--surface)] p-5 rounded-[var(--radius-md)] border border-[var(--border)]">
              <h4 className="font-bold text-sm uppercase tracking-widest mb-3">Mac / Linux</h4>
              <CodeBlock code="npm install -g @anthropic-ai/claude-code&#10;export CLAUDE_API_KEY=&quot;sk-ant-...&quot;" />
            </div>
            <div className="bg-[var(--surface)] p-5 rounded-[var(--radius-md)] border border-[var(--border)]">
              <h4 className="font-bold text-sm uppercase tracking-widest mb-3">Windows (PowerShell)</h4>
              <CodeBlock code="npm install -g @anthropic-ai/claude-code&#10;setx CLAUDE_API_KEY &quot;sk-ant-...&quot;" />
            </div>
          </div>
        </div>

        <h3 className="text-3xl font-bold mt-12 mb-6 border-b border-[var(--border)] pb-3">Mobile Remote Control</h3>
        <p className="text-[var(--text-secondary)] mb-6">
          You don't have to babysit your terminal. Install the Claude mobile app (iOS/Android), open a new session in your terminal, and type <code>add remote</code>. You can now step away and monitor/approve Claude's autonomous terminal commands from your phone.
        </p>

        <h3 className="text-3xl font-bold mt-12 mb-6 border-b border-[var(--border)] pb-3">The Extended Command Arsenal</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h4 className="font-mono font-bold text-xl mb-2 text-[var(--accent)] flex items-center gap-2"><Mic size={20}/> /voice</h4>
            <p className="text-[var(--text-secondary)] text-sm">Claude Code now supports native voice input. You can literally talk to your terminal to dictate complex logic and let it parse your speech into executable plans.</p>
          </div>
          <div className="glass-card p-6">
            <h4 className="font-mono font-bold text-xl mb-2 text-[var(--accent)] flex items-center gap-2"><Target size={20}/> /effort [low | max]</h4>
            <p className="text-[var(--text-secondary)] text-sm">Opus 4.8 defaults to High. For complex architectural changes across multiple files, use <code>/effort max</code>. It spends more tokens but solves much harder logic.</p>
          </div>
          <div className="glass-card p-6">
            <h4 className="font-mono font-bold text-xl mb-2 text-[var(--accent)] flex items-center gap-2"><LineChart size={20}/> /cost & /st</h4>
            <p className="text-[var(--text-secondary)] text-sm">Use <code>/cost</code> to check your session billing in real-time. Use <code>/st</code> to set up a persistent status line at the bottom of the terminal tracking your context limits.</p>
          </div>
          <div className="glass-card p-6">
            <h4 className="font-mono font-bold text-xl mb-2 text-[var(--accent)] flex items-center gap-2"><GitBranch size={20}/> /btw</h4>
            <p className="text-[var(--text-secondary)] text-sm">"By The Way". If Claude is running a 3-minute refactor, open a new terminal tab and type <code>/btw How is it going?</code> It answers in parallel without interrupting the main task.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "3. Project Memory (claude.md)",
    icon: <BookOpen size={20} />,
    content: () => (
      <div className="space-y-8 text-lg">
        <Badge text="Architecture" />
        <h2 className="text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight mb-6">Building the Project Brain</h2>
        
        <p className="text-[var(--text-secondary)] leading-relaxed">
          The biggest mistake beginners make is treating the CLI like a web chatbot. <strong>Claude has no persistent memory between sessions.</strong> The solution is the <code>claude.md</code> file. Placed in the root directory, Claude automatically ingests it every time it boots.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed font-bold">
          Pro Tip: You don't have to write this yourself. Simply type: <em>"Generate my claude.md file based on a React/Vite stack."</em>
        </p>

        <h3 className="text-3xl font-bold mt-12 mb-6 border-b border-[var(--border)] pb-3">The Gold Standard claude.md</h3>
        <p className="text-[var(--text-secondary)] mb-6">
          Anthropic engineers do not put generic prompts here. They establish architectural constraints and <strong>Verification Rules</strong>.
        </p>
        
        <div className="relative shadow-2xl rounded-[var(--radius-lg)] overflow-hidden">
          <div className="absolute top-0 right-0 bg-[var(--accent)] text-white text-xs font-bold px-4 py-2 rounded-bl-[var(--radius-md)] z-10 shadow-md uppercase tracking-wider">
            Root Directory: /claude.md
          </div>
          <CodeBlock 
            language="markdown"
            code={`# Project Overview
This is a responsive React dashboard for financial tracking.

# Directory Architecture
- /frontend/ : React 18, Vite, Tailwind CSS
- /backend/ : Node.js, Express
- /tests/ : Jest suites

# Operational Directives
1. Never delete existing comments during refactoring.
2. VERIFICATION: Before telling the user a task is complete, you MUST run \`npm run build\` and \`npm run test\`. 
3. If the build fails, do not stop. Read the error and fix it yourself.`}
          />
        </div>
        
        <div className="bg-[var(--surface-alt)] border-l-4 border-l-[var(--accent)] p-8 mt-8 rounded-r-[var(--radius-md)]">
          <h4 className="font-bold text-2xl text-[var(--text)] mb-3">Why Directive #2 is Magic</h4>
          <p className="text-[var(--text-secondary)]">
            By enforcing a verification command, you force the agentic loop to validate its own code. It cannot lazily generate broken syntax and stop billing you. It must prove its work compiles.
          </p>
        </div>
      </div>
    )
  },
  {
    title: "4. Build & Sell (Labs)",
    icon: <FileText size={20} />,
    content: () => (
      <div className="space-y-8 text-lg">
        <Badge text="Application Lab" />
        <h2 className="text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight mb-6">Real-World Builds</h2>
        
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Overseas developers are making thousands by generating tools with Claude Code and selling them on platforms like BOOTH or Coconala. Here are two real-world builds derived directly from the curriculum.
        </p>

        <h3 className="text-3xl font-bold mt-12 mb-6 border-b border-[var(--border)] pb-3">Lab A: The Excel Automator</h3>
        <p className="text-[var(--text-secondary)]">A Python script that takes a messy CSV, cleans the formatting, calculates totals, and exports a formatted Excel file.</p>

        <div className="space-y-6 mt-6">
          <div className="glass-card p-6 border-t-4 border-t-[var(--accent)]">
            <h4 className="font-bold text-lg text-[var(--text)] mb-2">1. The Prompt</h4>
            <TerminalOutput>
              <span className="text-white">❯ Analyze messy_sales.csv. Write a Python script using pandas that drops empty rows, standardizes 'Date', sums revenue by month, and saves an Excel file with a bold header. Write the script to process.py, install required pip packages, and run the script to prove it works.</span>
            </TerminalOutput>
          </div>
          <div className="glass-card p-6 border-t-4 border-t-green-500">
            <h4 className="font-bold text-lg text-[var(--text)] mb-2">2. The Execution</h4>
            <p className="text-[var(--text-secondary)] text-sm mb-4">Claude runs <code>cat</code> to read the headers, writes the Python code, runs <code>pip install pandas openpyxl</code> itself, and executes it.</p>
            <CodeBlock language="python" code={`import pandas as pd
from openpyxl.styles import Font
# ... Claude writes the code autonomously ...
df['Month'] = pd.to_datetime(df['Date']).dt.to_period('M')`} />
          </div>
        </div>

        <h3 className="text-3xl font-bold mt-16 mb-6 border-b border-[var(--border)] pb-3">Lab B: Lead Generation Agent</h3>
        <p className="text-[var(--text-secondary)] mb-6">As demonstrated in the "Build Your First AI Agent" source, you can build an outreach agent.</p>
        <div className="bg-[var(--surface-alt)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)]">
          <TerminalOutput>
            <span className="text-white">❯ Build a Node.js script that searches for "Texas Roofers", finds 20 leads lacking a website, drafts a personalized LinkedIn DM for each, and connects to my local calendar API to schedule follow-ups for Monday and Tuesday.</span>
          </TerminalOutput>
          <p className="text-[var(--text-secondary)] text-sm mt-4">Claude will pull the necessary scraping packages, structure the output, and draft the calendar integration autonomously.</p>
        </div>
      </div>
    )
  },
  {
    title: "5. Skills & The Compounding Loop",
    icon: <Layers size={20} />,
    content: () => (
      <div className="space-y-8 text-lg">
        <Badge text="Advanced Workflow" />
        <h2 className="text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight mb-6">Progressive Disclosure via Skills</h2>
        
        <p className="text-[var(--text-secondary)] leading-relaxed">
          The top 1% of developers don't write generic prompts repeatedly; they build <strong>Skills</strong>. Loading thousands of rules into every chat is expensive. Skills utilize <em>progressive disclosure</em>—Claude only reads the instructions when the task explicitly requires it.
        </p>

        <h3 className="text-3xl font-bold mt-12 mb-6 border-b border-[var(--border)] pb-3">The 3 Layers of a Skill</h3>
        <p className="text-[var(--text-secondary)] mb-6">
          Create a hidden folder: <code>.claude/skills/ui-generator/</code>.
        </p>

        <div className="grid gap-6">
          <div className="bg-[var(--surface-alt)] p-6 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm border-l-4 border-l-[var(--accent)]">
            <h4 className="font-mono text-lg font-bold text-[var(--text)] mb-3">1. skill.md (The SOP)</h4>
            <p className="text-[var(--text-secondary)] mb-4">Contains frontmatter (which Claude checks first) and the Standard Operating Procedure.</p>
            <CodeBlock language="markdown" code={`---
description: Use this skill whenever asked to build a new React UI component.
---
# Process
1. Read the \`reference.tsx\` file to understand our company's styling standards.
2. Generate the component using Tailwind CSS.
3. Save the new component to \`/src/components/\`.`} />
          </div>

          <div className="bg-[var(--surface-alt)] p-6 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm border-l-4 border-l-blue-500">
            <h4 className="font-mono text-lg font-bold text-[var(--text)] mb-3">2. reference.tsx (The Context)</h4>
            <p className="text-[var(--text-secondary)]">A perfectly formatted example of your company's Button component that Claude studies.</p>
          </div>
        </div>

        <h3 className="text-3xl font-bold mt-12 mb-6 border-b border-[var(--border)] pb-3">The Compounding Loop</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Anthropic engineers do something brilliant: <strong>They ask Claude to update its own skill files.</strong>
        </p>
        <div className="glass-card p-6 border-l-4 border-l-[var(--accent)]">
          <p className="text-[var(--text)] italic font-medium">
            "Review the conversation we just had. You made a mistake formatting the import paths. Update your own <code>skill.md</code> file so you never make that mistake again."
          </p>
          <p className="text-[var(--text-secondary)] text-sm mt-3">This creates a compounding loop where your agent gets demonstrably smarter every session.</p>
        </div>
      </div>
    )
  },
  {
    title: "6. Hooks, MCP & Ultraplan",
    icon: <Cpu size={20} />,
    content: () => (
      <div className="space-y-8 text-lg">
        <Badge text="Integrations" />
        <h2 className="text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight mb-6">Bypassing Limitations</h2>
        
        <p className="text-[var(--text-secondary)] leading-relaxed">
          <strong>Model Context Protocol (MCP)</strong> servers fix the AI knowledge cutoff by connecting your CLI to live external tools.
        </p>

        <h3 className="text-3xl font-bold mt-10 mb-6 border-b border-[var(--border)] pb-3">Lab: The Context 7 Setup</h3>
        <div className="glass-card p-8">
          <p className="font-bold text-xl text-[var(--text)] mb-4">1. Initialize the project with Context 7 MCP:</p>
          <CodeBlock code="claude mcp init context7&#10;claude mcp load /your_project" />
          
          <p className="font-bold text-xl text-[var(--text)] mt-8 mb-4">2. The MCP Prompt:</p>
          <TerminalOutput>
            <span className="text-white">❯ Use Context 7 to pull the live Next.js 15 docs. Read them, then build my layout.tsx file.</span>
          </TerminalOutput>
        </div>

        <h3 className="text-3xl font-bold mt-12 mb-6 border-b border-[var(--border)] pb-3">Automated Guardrails (Hooks)</h3>
        <p className="text-[var(--text-secondary)] mb-6">
          Hooks intercept commands. In the official Anthropic certification quiz, developers are taught to protect sensitive variables:
        </p>
        <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-[var(--radius-lg)]">
          <h4 className="font-bold text-2xl text-red-500 mb-3 flex items-center gap-2">
            <Shield size={24} /> The Pre-Tool Use Hook
          </h4>
          <p className="text-[var(--text)] leading-relaxed mb-4">
            If you want to prevent Claude from reading your <code>.env</code> files and leaking API keys into the chat context, you must set up a <code>pre-tool use hook</code>.
          </p>
          <p className="text-[var(--text)] font-bold">The exact tools you must match/block are: <code>read</code> and <code>grep</code>.</p>
        </div>

        <h3 className="text-3xl font-bold mt-12 mb-6 border-b border-[var(--border)] pb-3">Ultraplan (Multiple Agents)</h3>
        <p className="text-[var(--text-secondary)] mb-6">
          Using the command <code>ultraplan</code> (or explicitly prompting for it) triggers multiple sub-agents under the hood. 
        </p>
        <TerminalOutput>
          <span className="text-white">❯ Use three deep dive explorer agents to review this implementation in parallel. Ensure there are no gaps in the logic before you write the final file.</span>
        </TerminalOutput>
      </div>
    )
  },
  {
    title: "7. Prompt Engineering & Costs",
    icon: <Zap size={20} />,
    content: () => (
      <div className="space-y-8 text-lg">
        <Badge text="Optimization" />
        <h2 className="text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight mb-6">How Anthropic Engineers Prompt</h2>
        
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Every token sent costs money and eats into session limits. Bloated context is the #1 reason users hit limits early.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[var(--surface-alt)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm lg:col-span-2">
            <h4 className="font-bold text-[var(--accent)] text-2xl mb-4">Model Switching Strategy</h4>
            <p className="text-[var(--text-secondary)] text-base mb-4">
              Do not use Opus 4.8 for everything. Anthropic recommends using <strong>Sonnet</strong> for everyday coding and simple refactors. Switch to <strong>Opus</strong> (with <code>/effort max</code>) ONLY for cases that demand deep reasoning or complex cross-file architecture.
            </p>
          </div>

          <div className="bg-[var(--surface-alt)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm">
            <h4 className="font-bold text-[var(--accent)] text-2xl mb-4">1. The Anti-Slop Agreement</h4>
            <p className="text-[var(--text-secondary)] text-base mb-4">Never write a 2-word prompt ("Explain Docker"). Build personas and exact formats.</p>
            <p className="text-[var(--text)] text-sm font-medium italic border-l-4 border-[var(--accent)] pl-4 py-2 bg-[var(--bg)] rounded-r-md">
              "I'm a junior dev whose team uses Docker. Explain it to me like a patient senior engineer. Use a concrete analogy. End with one concrete thing I could try."
            </p>
          </div>

          <div className="bg-[var(--surface-alt)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm">
            <h4 className="font-bold text-[var(--accent)] text-2xl mb-4">2. Ruthless Context Control</h4>
            <p className="text-[var(--text-secondary)] text-base mb-4">
              Point Claude explicitly to file paths: <em>"Refactor ONLY frontend/app.jsx"</em>.
            </p>
            <CodeBlock code="/clear&#10;/compact" />
            <p className="text-sm text-[var(--text-muted)] mt-4">
              Use <code>/clear</code> to wipe memory entirely. Use <code>/compact</code> to shrink a long thread into a small summary, trimming the token load massively.
            </p>
          </div>
          
          <PromptTransformer />
        </div>
      </div>
    )
  },
  {
    title: "8. References & Bibliography",
    icon: <Link size={20} />,
    content: () => (
      <div className="space-y-8 text-lg">
        <Badge text="Sources" />
        <h2 className="text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight mb-6">Curriculum Sources</h2>
        
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          This tutorial was synthesized from the most authoritative, long-form masterclasses and official documentation available. Click any of the links below to access the full 4-to-12 hour courses and verify the strategies taught in this tutorial.
        </p>

        <div className="space-y-4">
          <SourceItem 
            number="1"
            title="CLAUDE CODE FULL COURSE 12 HOURS: Build Real AI Projects"
            author="Comprehensive Masterclass"
            desc="The ultimate 12-hour deep dive. This exhaustive course covers building real-world applications from scratch, deploying them, and mastering the complete agentic architecture."
            url="https://www.youtube.com/results?search_query=CLAUDE+CODE+FULL+COURSE+12+HOURS+Build+Real+AI+Projects"
            isTop={true}
          />
          <SourceItem 
            number="2"
            title="Claude Code in Action"
            author="Coursera (Stephen Grider)"
            desc="Official academic backing for context management, Sandboxing, Code Harnesses, and tool-calling. Includes hands-on examples and realistic quizzes."
            url="https://www.coursera.org/learn/claude-code-in-action"
          />
          <SourceItem 
            number="3"
            title="CLAUDE CODE FULL COURSE 4 HOURS: Build & Sell"
            author="Nick Saraev"
            desc="The foundational viral hit (1.43M views). Provided the Excel Automation Lab and Coconala/BOOTH selling frameworks for non-engineers."
            url="https://www.youtube.com/results?search_query=CLAUDE+CODE+FULL+COURSE+4+HOURS+Build+and+Sell"
          />
          <SourceItem 
            number="4"
            title="Claude Code | Anthropic's Agentic Coding System"
            author="Anthropic Official Documentation"
            desc="The primary source of truth for installation, the Model Context Protocol (MCP), and enterprise-grade security guardrails."
            url="https://www.anthropic.com/claude-code"
          />
          <SourceItem 
            number="5"
            title="Anthropic’s 7 Hour Claude Code Course in 27 Minutes"
            author="Curriculum Breakdown"
            desc="A condensed masterclass explaining the core architectural understanding of the Agentic Loop and specific hook configurations."
            url="https://www.youtube.com/results?search_query=Anthropic+7+Hour+Claude+Code+Course+in+27+Minutes"
          />
          <SourceItem 
            number="6"
            title="Building and Selling an Excel Automation Tool in 4 Hours"
            author="Note.com Case Study"
            desc="A detailed written breakdown of how a non-engineer used Claude Code to build a highly demanded Excel automation tool and list it for sale."
            url="https://note.com/"
          />
        </div>
      </div>
    )
  }
];

function SourceItem({ number, title, author, desc, url, isTop = false }) {
  return (
    <div className={`p-6 rounded-[var(--radius-md)] border flex gap-6 items-start relative group transition-all duration-300 ${isTop ? 'bg-[var(--accent)]/5 border-[var(--accent)]/30 hover:border-[var(--accent)]' : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--text-muted)] hover:shadow-md'}`}>
      <div className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl shrink-0 transition-colors ${isTop ? 'bg-[var(--accent)] text-white shadow-md group-hover:bg-[var(--accent-hover)]' : 'bg-[var(--surface-alt)] text-[var(--text-secondary)] group-hover:text-[var(--text)]'}`}>
        {number}
      </div>
      <div className="flex-1 pr-12">
        <h4 className="font-bold text-xl text-[var(--text)] mb-1 group-hover:text-[var(--accent)] transition-colors">{title}</h4>
        <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider block mb-3">{author}</span>
        <p className="text-base text-[var(--text-secondary)]">{desc}</p>
      </div>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="absolute top-6 right-6 p-3 rounded-full bg-[var(--surface-alt)] text-[var(--text-secondary)] hover:bg-[var(--accent)] hover:text-white transition-all shadow-sm group-hover:scale-110"
        title="Open Source"
      >
        <ExternalLink size={20} />
      </a>
    </div>
  );
}

function TutorialView({ activeModule, setActiveModule }) {
  const [summary, setSummary] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    setSummary(null);
  }, [activeModule]);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const contentText = document.getElementById('module-content-area')?.innerText || "";
    const sysPrompt = "You are a helpful AI tutor. Provide a concise, 3-bullet-point TL;DR summary of the provided tutorial text. Keep it punchy and easy to read. Output only the bullets.";
    try {
      const result = await generateGeminiText(`Summarize this text:\n\n${contentText}`, sysPrompt);
      setSummary(result);
    } catch (e) {
      setSummary("Failed to generate summary. Please try again.");
    }
    setIsSummarizing(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 animate-in fade-in duration-700 w-full">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-80 flex-shrink-0">
        <div className="sticky top-28 glass-card p-6 overflow-hidden shadow-lg border-t-4 border-t-[var(--accent)]">
          <h3 className="text-sm font-extrabold text-[var(--text-muted)] uppercase tracking-widest mb-6 px-2 flex items-center gap-2">
            <LayoutDashboard size={18} /> Course Modules
          </h3>
          <nav className="space-y-2">
            {TUTORIAL_MODULES.map((mod, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveModule(idx); window.scrollTo(0, 0); }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 font-bold ${
                  activeModule === idx 
                  ? 'bg-[var(--accent)] text-white shadow-[0_4px_12px_rgba(217,119,87,0.3)] transform scale-[1.02]' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] hover:text-[var(--text)]'
                }`}
              >
                <span className={activeModule === idx ? 'text-white' : 'text-[var(--accent)]'}>
                  {React.cloneElement(mod.icon, { size: 22 })}
                </span>
                <span className="text-sm leading-tight">{mod.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 glass-card p-8 md:p-16 min-h-[800px] shadow-xl flex flex-col border-t-4 border-t-[var(--border)]">
        <div id="module-content-area" className="flex-1">
          {TUTORIAL_MODULES[activeModule].content()}
        </div>

        {/* Gemini Summarizer Feature */}
        <div className="mt-16 pt-10 border-t border-[var(--border)]">
          {!summary ? (
             <button 
               onClick={handleSummarize}
               disabled={isSummarizing}
               className="w-full py-5 rounded-[var(--radius-lg)] border-2 border-[var(--accent)] text-[var(--accent)] font-bold text-xl hover:bg-[var(--accent)] hover:text-white transition-all flex items-center justify-center gap-3 group shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {isSummarizing ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} className="group-hover:animate-pulse" />}
               {isSummarizing ? "Generating Summary..." : "✨ TL;DR - AI Summarize this Module"}
             </button>
          ) : (
             <div className="bg-[var(--surface-alt)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-inner animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center gap-3 mb-4 border-b border-[var(--border)] pb-3">
                 <Sparkles className="text-[var(--accent)]" size={24} />
                 <h4 className="font-bold text-2xl text-[var(--text)]">Module Summary</h4>
               </div>
               <div className="text-lg text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap pl-4 border-l-4 border-[var(--accent)]">
                 {summary}
               </div>
             </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-6">
          <button 
            onClick={() => { setActiveModule(Math.max(0, activeModule - 1)); window.scrollTo(0, 0); }}
            disabled={activeModule === 0}
            className={`px-8 py-4 font-bold text-lg rounded-[var(--radius-md)] transition-all w-full sm:w-auto ${
              activeModule === 0 
              ? 'opacity-40 cursor-not-allowed text-[var(--text-muted)] bg-[var(--surface-alt)]' 
              : 'hover:bg-[var(--surface-alt)] text-[var(--text)] border border-[var(--border)]'
            }`}
          >
            ← Previous Lab
          </button>
          
          <span className="text-base font-extrabold text-[var(--text-muted)] bg-[var(--surface-alt)] px-6 py-2 rounded-full border border-[var(--border)]">
            {activeModule + 1} / {TUTORIAL_MODULES.length}
          </span>

          <button 
            onClick={() => { setActiveModule(Math.min(TUTORIAL_MODULES.length - 1, activeModule + 1)); window.scrollTo(0, 0); }}
            disabled={activeModule === TUTORIAL_MODULES.length - 1}
            className={`px-8 py-4 font-bold text-lg rounded-[var(--radius-md)] transition-all shadow-md w-full sm:w-auto ${
              activeModule === TUTORIAL_MODULES.length - 1 
              ? 'opacity-40 cursor-not-allowed text-white bg-[var(--text-muted)]' 
              : 'brand-btn'
            }`}
          >
            Next Lab →
          </button>
        </div>
      </div>

    </div>
  );
}

// ==========================================
// REUSABLE UI COMPONENTS
// ==========================================

function Badge({ text }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-sm font-bold text-[var(--accent)] mb-6 uppercase tracking-widest shadow-sm">
      <Compass size={16} /> {text}
    </div>
  );
}

function CodeBlock({ code, language = "bash" }) {
  return (
    <div className="my-6 rounded-[var(--radius-lg)] overflow-hidden border border-[#3D3D3A] shadow-2xl">
      <div className="bg-[#1F1E1D] px-5 py-3 border-b border-black/40 flex justify-between items-center">
        <span className="text-xs font-mono text-gray-400 font-bold tracking-wider uppercase">{language}</span>
        <div className="flex gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
        </div>
      </div>
      <div className="bg-[#0A0A0A] p-6 overflow-x-auto">
        <pre className="text-base font-mono text-[#F5F4EE] leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function TerminalOutput({ children }) {
  return (
    <div className="my-6 rounded-[var(--radius-lg)] overflow-hidden border border-[#3D3D3A] shadow-2xl font-mono text-base">
      <div className="bg-[#0A0A0A] p-6 overflow-x-auto leading-relaxed border-l-4 border-l-blue-500">
        {children}
      </div>
    </div>
  );
}