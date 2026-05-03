import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import ProjectDetail from './pages/ProjectDetail';
import ComingSoonPage from './pages/ComingSoonPage';
import { useState } from 'react';

function App() {
  const [language, setLanguage] = useState('fr');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage language={language} setLanguage={setLanguage} />} />
        <Route path="/project/:slug" element={<ProjectDetail language={language} setLanguage={setLanguage} />} />
        <Route path="*" element={<ComingSoonPage language={language} />} />
      </Routes>
    </Router>
  );
}

export default App; 