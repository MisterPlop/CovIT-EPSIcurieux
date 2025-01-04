import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Pages tout publique */
import HOC from "./Components/HOC";
import Home from "./Components/Pages/Home";
import Stats from "./Components/Pages/Stats";
import Imprints from "./Components/Pages/Imprints";

import NotFound from "./Components/Pages/NotFound";

function App() {


  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HOC child={Home} />} />
        <Route path="/*" element={<HOC child={NotFound} />} />
        
        <Route path="/stats" element={<HOC child={Stats} />} />
        <Route path="/mentions_legales" element={<HOC child={Imprints} />} />

      </Routes>
    </BrowserRouter>

  )
};

export default App;