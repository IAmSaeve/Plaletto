import React, { useState, useEffect } from 'react';
import './App.css';
import { extractHexColors } from "./lib/helpers";

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
  });

  return (
    <div className="App">
      <div className='color-grid'>
        {extractHexColors(clipData).map((v, i) =>
          <div key={i} style={{ backgroundColor: v }} className='color-cell'><span>{v}</span></div>
        )}
      </div>
    </div>
  );
}

export default App;
