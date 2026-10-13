import { useCallback, useEffect, useState } from 'react';

const characterGroups = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

const defaultOptions = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false
};

function App() {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState(defaultOptions);
  const [generatedString, setGeneratedString] = useState('');
  const [history, setHistory] = useState([]);
  const [copyStatus, setCopyStatus] = useState('Copy');

  const buildCharacterPool = useCallback(() => {
    const selectedCharacters = Object.entries(options)
      .filter(([, isEnabled]) => isEnabled)
      .map(([key]) => characterGroups[key])
      .join('');

    return selectedCharacters || characterGroups.lowercase;
  }, [options]);

  const generateRandomString = useCallback(() => {
    const pool = buildCharacterPool();
    let nextString = '';

    for (let index = 0; index < length; index += 1) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      nextString += pool[randomIndex];
    }

    setGeneratedString(nextString);
    setHistory((previousHistory) => [nextString, ...previousHistory].slice(0, 5));
    setCopyStatus('Copy');
  }, [buildCharacterPool, length]);

  useEffect(() => {
    generateRandomString();
  }, [generateRandomString]);

  const updateOption = useCallback((optionName) => {
    setOptions((currentOptions) => ({
      ...currentOptions,
      [optionName]: !currentOptions[optionName]
    }));
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!generatedString) {
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedString);
      setCopyStatus('Copied!');
    } catch {
      setCopyStatus('Copy failed');
    }
  }, [generatedString]);

  return (
    <main className="app-shell">
      <section className="generator-panel" aria-labelledby="page-title">
        <div className="header">
          <p className="eyebrow">React Hooks Demo</p>
          <h1 id="page-title">Random String Generator</h1>
          <p className="subtitle">
            Create quick random strings with custom length and character choices.
          </p>
        </div>

        <div className="result-box" aria-live="polite">
          <span>{generatedString}</span>
          <button type="button" onClick={copyToClipboard}>
            {copyStatus}
          </button>
        </div>

        <div className="controls">
          <label className="length-control" htmlFor="length">
            <span>Length: {length}</span>
            <input
              id="length"
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(event) => setLength(Number(event.target.value))}
            />
          </label>

          <div className="option-grid">
            {Object.keys(characterGroups).map((optionName) => (
              <label className="option-card" key={optionName}>
                <input
                  type="checkbox"
                  checked={options[optionName]}
                  onChange={() => updateOption(optionName)}
                />
                <span>{optionName}</span>
              </label>
            ))}
          </div>

          <button className="generate-button" type="button" onClick={generateRandomString}>
            Generate String
          </button>
        </div>

        <section className="history" aria-labelledby="history-title">
          <h2 id="history-title">Recent Strings</h2>
          <ul>
            {history.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export default App;
