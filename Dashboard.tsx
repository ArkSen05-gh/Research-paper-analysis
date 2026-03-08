import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { searchResearch, generateGrant } from '../services/api';

interface Paper {
  title: string;
  link: string;
  authors: string[];
}

interface AnalysisData {
  research_gap: string;
  papers: Paper[];
}

interface ActiveAnalysis {
  type: string;
  content?: string;
  data?: AnalysisData;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState<string>("");
  const [activeAnalysis, setActiveAnalysis] = useState<ActiveAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const tools = [
    {
      id: 'literature',
      title: 'Literature Mining',
      description: 'Find and summarize the most relevant recent research papers.',
      path: '/literature',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    },
    {
      id: 'trend',
      title: 'Trend Analysis',
      description: 'Identify emerging research topics and trending keywords.',
      path: '/trends',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
    },
    {
      id: 'gap',
      title: 'Gap Identification',
      description: 'Spot unexplored intersections and limitations in research.',
      path: '/gap-detection',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
    },
    {
      id: 'methodology',
      title: 'Methodology Design',
      description: 'Generate datasets, baselines and evaluation metrics.',
      path: '/methodology',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>
    },
    {
      id: 'novelty',
      title: 'Novelty Assessment',
      description: 'Validate the originality of your research concept.',
      path: '/novelty',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
    },
    {
      id: 'grant',
      title: 'Grant / Paper Drafting',
      description: 'Draft structured IEEE/ACM proposals automatically.',
      path: '/grant-generator',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M12 7l0 2"/><path d="M12 15l0 2"/><path d="M7 12l2 0"/><path d="M15 12l2 0"/></svg>
    }

  ];

  const recentTasks = [
    { title: 'Federated Learning in Edge IoT', status: 'Completed', date: '2 days ago', summary: 'Gap analysis and methodology proposal generated using AI research tools.' },
    { title: 'Quantum Cryptography', status: 'Completed', date: '2 days ago', summary: 'Gap analysis and methodology proposal generated using AI research tools.' },
    { title: 'LLMs in Healthcare', status: 'Completed', date: '2 days ago', summary: 'Gap analysis and methodology proposal generated using AI research tools.' }
  ];

  const handleToolClick = (path: string) => {
    navigate(path);
  };

  const handleQuickSearch = async () => {
     if (!topic) return;
     setLoading(true);
     try {
       const res = await searchResearch(topic);
       setActiveAnalysis({ type: 'Instant Insights', data: res.data });
     } catch (e) {
       console.error(e);
     } finally {
       setLoading(false);
     }
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Welcome back, Faculty</h1>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Use AI tools to accelerate your academic research workflow.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <input 
               type="text" 
               placeholder="Current research topic..." 
               value={topic} 
               onChange={(e) => setTopic(e.target.value)}
               className="text-input"
               style={{ width: '300px', background: 'var(--bg-card)', color: 'white', borderColor: 'var(--border)' }}
             />
             <button className="btn btn-primary" style={{ padding: '0.75rem 2rem' }} onClick={handleQuickSearch}>
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
               {loading ? "Analyzing..." : "New Research Task"}
             </button>
          </div>
        </header>

        {activeAnalysis && (
          <div className="glass-card" style={{ marginBottom: '3rem', position: 'relative', border: '1px solid var(--primary)', animation: 'glow 3s infinite' }}>
             <button onClick={() => setActiveAnalysis(null)} style={{ position: 'absolute', right: '1rem', top: '1rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Close</button>
             <h2 style={{ marginBottom: '1rem' }}>{activeAnalysis.type}: {topic}</h2>
             {activeAnalysis.data && (
               <div>
                  <div style={{ marginBottom: '1rem', color: '#a855f7' }}><strong>Gap Detected:</strong> {activeAnalysis.data.research_gap}</div>
                  <div className="task-grid" style={{ gridTemplateColumns: '1fr' }}>
                    {activeAnalysis.data.papers.slice(0, 3).map((p, i) => (
                      <div key={i} className="task-card">
                        <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'white', fontWeight: '600', textDecoration: 'none' }}>{p.title}</a>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>{p.authors?.join(", ") || "Unknown Authors"}</div>
                      </div>
                    ))}
                  </div>
               </div>
             )}
          </div>
        )}

        <div className="dashboard-grid">
          {tools.map(tool => (
            <div key={tool.id} className="glass-card tool-card" onClick={() => handleToolClick(tool.path)} style={{ cursor: 'pointer', border: tool.id === 'grant' ? '1px solid #4f46e5' : '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="tool-icon">{tool.icon}</div>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>AI tool</span>
              </div>
              <div>
                <h3 className="tool-title">{tool.title}</h3>
                <p className="tool-description">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="recent-tasks">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Research Tasks</h2>
          <div className="task-grid">
            {recentTasks.map((task, i) => (
              <div key={i} className="task-card" style={{ transition: '0.3s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#4ade80', fontSize: '0.75rem', padding: '4px 12px', borderRadius: '4px', fontWeight: '600' }}>{task.status}</span>
                  <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{task.date}</span>
                </div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{task.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{task.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;