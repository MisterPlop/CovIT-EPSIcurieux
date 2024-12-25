import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Pages tout publique */
import HOC from "./Components/HOC";
import Home from "./Components/Home";

import NotFound from "./Components/NotFound";

function App() {


  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HOC child={Home} />} />
        <Route path="/*" element={<HOC child={NotFound} />} />

      </Routes>
    </BrowserRouter>

  )
};

export default App;