import React, { useState } from "react";
import { searchResearch, uploadPaper } from "../services/api";
import Navbar from "../components/Navbar";

const GapDetection: React.FC = () => {
  const [topic, setTopic] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDetect = async () => {
    setLoading(true);
    try {
      let data;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await uploadPaper(formData);
        data = res.data.research_gap;
      } else {
        if (!topic) {
          alert("Please enter a research topic or upload a file");
          setLoading(false);
          return;
        }
        const res = await searchResearch(topic);
        data = res.data.research_gap;
      }
      setResult(data);
    } catch (e) {
      console.error(e);
      alert("Error detecting research gaps");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="gradient-text">Gap Identification</h1>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
            Our AI analysis engine scans recent literature to identify unexplored intersections, conflicting findings, and limitations in current research.
          </p>

          <div className="input-group">
            <label className="input-label" style={{ color: '#cbd5e1' }}>Research Area</label>
            <input
              type="text"
              placeholder="e.g., Deep Learning in Medical Imaging"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={!!file}
              className="text-input"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'white', borderColor: 'var(--border)' }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>OR Upload Manuscript (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ color: '#94a3b8' }}
            />
          </div>

          <button 
            onClick={handleDetect} 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem' }}
            disabled={loading}
          >
            {loading ? "Analyzing Landscape..." : "Identify Research Gaps"}
          </button>

          {result && (
            <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--secondary)' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Identified Research Gap</h3>
              <div style={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {result}
              </div>
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <strong>Insight:</strong> This gap represents a high-potential area for a novel thesis or grant proposal.
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GapDetection;
