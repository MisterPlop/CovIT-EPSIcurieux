import { useNavigate } from 'react-router-dom';

function SignOut() {

  const navigate = useNavigate();

  function navigateToHome() {
    localStorage.removeItem("fakeauth");
    setTimeout(()=>
    {navigate("/")}
    , 500);
  };
  navigateToHome();

  return <h2>Retour à l'accueil</h2>
};

export default SignOut;