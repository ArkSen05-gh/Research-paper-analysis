import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { checkNovelty, uploadPaper } from '../services/api';

const NoveltyCheck: React.FC = () => {

    const [topic, setTopic] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleCheck = async () => {

        if (!topic && !file) {
            alert("Please enter a research topic or upload a paper");
            return;
        }

        setLoading(true);

        try {

            let data;

            if (file) {

                const formData = new FormData();
                formData.append("file", file);

                const uploadRes = await uploadPaper(formData);

                data = uploadRes.data.novelty;

            } else {

                const res = await checkNovelty({ topic });

                data = res.data;
            }

            setResult(data);

        } catch (error) {

            console.error("Novelty check failed:", error);

            alert("Error while checking novelty");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">

            <Navbar />

            <main className="main-content">

                <div className="glass-card" style={{ maxWidth: "800px", margin: "0 auto" }}>

                    <h1 className="gradient-text">Novelty Assessment</h1>

                    <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
                        Evaluate the originality of your research idea compared to existing literature.
                    </p>

                    <div style={{ marginBottom: "2rem" }}>
                        <label>Research Topic</label>

                        <input
                            type="text"
                            className="text-input"
                            placeholder="Enter your research topic..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            disabled={!!file}
                        />
                    </div>

                    <div style={{ marginBottom: "2rem" }}>
                        <label>OR Upload Manuscript (PDF)</label>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleCheck}
                        disabled={loading}
                        style={{ width: "100%" }}
                    >
                        {loading ? "Analyzing Novelty..." : "Check Novelty"}
                    </button>

                </div>

                {result && (

                    <div className="glass-card" style={{ maxWidth: "800px", margin: "2rem auto" }}>

                        <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>

                            <div
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "50%",
                                    border: "4px solid #a855f7",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    marginRight: "1.5rem",
                                    color: "white"
                                }}
                            >
                                {result.novelty_score}%
                            </div>

                            <div>
                                <h2 style={{ margin: 0 }}>Novelty Score</h2>
                                <p style={{ color: "#94a3b8", margin: 0 }}>
                                    AI comparison with existing research
                                </p>
                            </div>

                        </div>

                        <div style={{
                            background: "rgba(255,255,255,0.05)",
                            padding: "1.5rem",
                            borderRadius: "8px"
                        }}>

                            <h3 style={{ color: "#a855f7", marginTop: 0 }}>
                                AI Assessment
                            </h3>

                            <div style={{
                                whiteSpace: "pre-wrap",
                                lineHeight: "1.6",
                                color: "#e2e8f0"
                            }}>
                                {result.justification}
                            </div>

                        </div>

                    </div>

                )}

            </main>

        </div>
    );
};

export default NoveltyCheck;