import React, { useState, useEffect } from 'react';
import './App.css';
import { extractHexColors, getContrastYIQ } from "./lib/helpers";

function App() {
  const [clipData, setClipData] = useState<string>("");
  const loadClipboard = async () => {
    try {
      let v = await navigator.clipboard.readText() ?? "";
      if (!v || extractHexColors(v).length <= 0) return;
      setClipData(v);
    } catch {
      /* Ignore errors */
      // Most errors are caused by trying to read clipboard,
      // when document is not in focus.
    };
  };

  useEffect(() => {
    loadClipboard();
    document.onmouseleave = () => loadClipboard();
    document.onmouseenter = () => loadClipboard();
    window.onfocus = () => loadClipboard();
  }, []);

  return (
    <main>
      <header className='header'>
        <h1>Plaletto 🎨</h1>
      </header>
      <div className='color-grid'>
        {[...new Set(extractHexColors(clipData))].map((v, i) =>
          <div key={i} style={{ backgroundColor: v, color: getContrastYIQ(v) }} className='color-cell'>
            <span>{`${v}`.toLocaleUpperCase()}</span>
          </div>
        )}
      </div>
      <footer className='footer'>
        <div>
          <a href='https://github.com/sebkirller/Plaletto' target={'_blank'}>GitHub</a>
        </div>
      </footer>
    </main>
  );
}

export default App;
