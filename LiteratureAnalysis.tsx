import React, { useState, type ChangeEvent } from "react";
import { searchResearch, uploadPaper } from "../services/api";
import Navbar from "../components/Navbar";

interface Paper {
  title: string;
  summary: string;
  authors: string[];
  link: string;
  source?: string;
}

const LiteratureAnalysis: React.FC = () => {
  const [topic, setTopic] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAction = async () => {
    setLoading(true);
    try {
      let data;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await uploadPaper(formData);
        data = res.data.papers;
      } else {
        if (!topic) {
          alert("Please enter a research topic or upload a file");
          setLoading(false);
          return;
        }
        const res = await searchResearch(topic);
        data = res.data.papers;
      }
      setPapers(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching papers");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <div className="glass-card" style={{ marginBottom: '2rem' }}>
          <h1 className="gradient-text">Literature Mining</h1>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
            Fetch relevant research papers from ArXiv and Semantic Scholar. Supports both keyword search and PDF context analysis.
          </p>
          
          <div className="input-group" style={{ marginBottom: '1.5rem' }}>
            <label className="input-label">Research Topic</label>
            <input
              type="text"
              placeholder="Enter research topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={!!file}
              className="text-input"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>OR Upload Research Paper (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{ color: '#94a3b8' }}
            />
          </div>

          <button onClick={handleAction} className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? "Processing..." : (file ? "Analyze Uploaded Paper" : "Search Literature")}
          </button>
        </div>

        {papers.length > 0 && (
          <div className="task-grid" style={{ gridTemplateColumns: '1fr' }}>
            <h2 style={{ marginBottom: '1.5rem', gridColumn: '1/-1' }}>Found {papers.length} Relevant Papers</h2>
            {papers.map((paper, index) => (
              <div key={index} className="glass-card" style={{ marginBottom: '1rem' }}>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>{paper.title}</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.6' }}>{paper.summary}</p>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                  <strong>Authors:</strong> {paper.authors?.join(", ") || "Unknown Authors"}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
                 <strong>Source:</strong> <span style={{ color: '#a855f7' }}>{paper.source}</span>
                </div>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  style={{ textDecoration: 'none', fontSize: '0.8rem', display: 'inline-block' }}
                >
                  View Paper
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default LiteratureAnalysis;