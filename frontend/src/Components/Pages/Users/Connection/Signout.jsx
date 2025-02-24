import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signout } from '../../../../store/slices/user'
import { useEffect } from 'react';

function SignOut() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { info } = useSelector((state) => state.user);

  /**
   * Sign out
   * @returns {Promise<void>}
   * @param {string} username
   * Username is removed from the store
   * User is redirected to the home page
   */
  
  useEffect(() => {
      dispatch(signout());
      navigate("/")
  }, [navigate, dispatch, info.username]);

  return <h2>Retour à l'accueil</h2>
};

export default SignOut;