
import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("https://YOUR-RENDER-API.onrender.com/generate-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setVideoUrl(data.video_url);
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🧠 توليد فيديو من نص</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="أدخل وصف الفيديو"
        style={{ width: '100%', padding: '10px' }}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "يتم التوليد..." : "توليد الفيديو"}
      </button>

      {videoUrl && (
        <div>
          <h3>🎥 الفيديو الناتج:</h3>
          <video src={videoUrl} controls width="100%" />
        </div>
      )}
    </div>
  );
}

export default App;
