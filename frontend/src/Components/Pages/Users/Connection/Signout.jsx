import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signout } from '../../../../store/slices/user'

function SignOut() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { info } = useSelector((state) => state.user);

  dispatch(signout(info.username));

  function navigateToHome() {
    localStorage.removeItem("auth");
    navigate("/")
  };
  navigateToHome();

  return <h2>Retour à l'accueil</h2>
};

export default SignOut;