import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Pages tout publique */
import HOC from "./Components/HOC";
import Home from "./Components/Pages/Home";
import Stats from "./Components/Pages/Statitics";
import AddDatas from "./Components/Pages/AddDatas";
import Imprints from "./Components/Pages/Imprints";

/* Pages Users */

import Signup from "./Components/Pages/Users/Connection/Signup";
import Signin from "./Components/Pages/Users/Connection/Signin";
import SignOut from "./Components/Pages/Users/Connection/Signout";

import NotFound from "./Components/Pages/NotFound";

function App() {

  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HOC child={Home} />} />
        <Route path="/*" element={<HOC child={NotFound} />} />
        
        <Route path="/statistiques" element={<HOC child={Stats} title={"Statistiques"} />} />
        <Route path="/ajouter_des_donnees" element={<HOC child={AddDatas} title={"Ajouter des données"} />} />
        <Route path="/mentions_legales" element={<HOC child={Imprints} title={"Mentions légales"} />} />


        <Route path="utilisateurs">
          <Route path="creer-un-compte" element={<HOC child={Signup} title={"S'enregistrer"}/>} />
          <Route path="connexion" element={<HOC child={Signin} title={"Se connecter"}/>} />
          <Route path="deconnexion" element={<HOC child={SignOut} title={"Se déconnecter"}/>} />
        </Route>

      </Routes>
    </BrowserRouter>

  )
};

export default App;