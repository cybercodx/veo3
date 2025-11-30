import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePrompt = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setGeneratedPrompt(data.generatedPrompt);
    } catch (error) {
      console.error('Error generating prompt:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-10 text-center text-blue-400">AI Google Veo3 Prompt Generator</h1>
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl">
          <textarea
            className="w-full bg-gray-700 text-white rounded-lg p-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            rows={6}
            placeholder="e.g., A majestic lion roaring on a rocky outcrop at sunset..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-500"
            onClick={handleGeneratePrompt}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Prompt'}
          </button>
        </div>
        {generatedPrompt && (
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl mt-10">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Generated Prompt:</h2>
            <pre className="bg-gray-700 text-white rounded-lg p-6 whitespace-pre-wrap font-mono text-sm">
              {generatedPrompt}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
