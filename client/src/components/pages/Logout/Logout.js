import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../redux/usersRedux';
import { API_URL } from '../../../config';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };

    fetch(`${API_URL}/auth/logout`, options)
      .then((res) => {
        if (res.status === 200) {
          dispatch(logOut());
          navigate('/');
        }
      })
      .catch((err) => console.error('Logout error: ', err));
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
