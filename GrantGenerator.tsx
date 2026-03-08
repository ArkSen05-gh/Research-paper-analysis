import React, { useState } from "react";
import { generateGrant, uploadPaper } from "../services/api";
import Navbar from "../components/Navbar";

const GrantGenerator: React.FC = () => {
  const [topic, setTopic] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      let data;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const uploadRes = await uploadPaper(formData);
        // Use the grant proposal already generated during upload
        data = uploadRes.data.grant_proposal;
      } else {
        if (!topic) {
          alert("Please enter a research topic or upload a file");
          setLoading(false);
          return;
        }
        const res = await generateGrant({ topic });
        data = res.data.proposal;
      }
      setResult(data);
    } catch (e) {
      console.error(e);
      alert("Error generating grant proposal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 className="gradient-text">Grant / Paper Drafting</h1>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
            Automatically generate structured IEEE/ACM-style grant proposals and research paper drafts based on your research topic.
          </p>

          <div className="input-group">
            <label className="input-label" style={{ color: '#cbd5e1' }}>Research Topic</label>
            <input
              type="text"
              placeholder="e.g., Quantum-Resistant Cryptography..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={!!file}
              className="text-input"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'white', borderColor: 'var(--border)' }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>OR Upload Manuscript (PDF)</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="file"
                accept=".pdf"
                id="file-upload"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                style={{ display: 'none' }}
              />
              <label 
                htmlFor="file-upload" 
                className="btn btn-outline" 
                style={{ cursor: 'pointer', background: file ? 'rgba(99, 102, 241, 0.1)' : 'transparent' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                {file ? "Change PDF" : "Browse PDF"}
              </label>
              {file && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4ade80', fontSize: '0.875rem' }}>
                  <span>{file.name}</span>
                  <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: '4px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={handleGenerate} 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem' }}
            disabled={loading || (!topic && !file)}
          >
            {loading ? "Drafting Proposal (this may take up to 20s)..." : "Generate Grant Proposal"}
          </button>

          {result && (
            <div className="glass-card" style={{ marginTop: '2rem', background: '#020617', border: '1px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--primary)' }}>Drafted Proposal</h3>
                <button className="btn btn-outline" style={{ fontSize: '0.75rem' }} onClick={() => navigator.clipboard.writeText(result)}>
                  Copy to Clipboard
                </button>
              </div>
              <div style={{ 
                whiteSpace: 'pre-wrap', 
                fontSize: '0.95rem', 
                color: '#e2e8f0',
                fontFamily: 'inherit',
                lineHeight: '1.8',
                background: 'rgba(255,255,255,0.02)',
                padding: '1.5rem',
                borderRadius: '0.5rem'
              }}>
                {result}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GrantGenerator;
