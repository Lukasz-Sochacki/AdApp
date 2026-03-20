import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { addAdRequest } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/usersRedux';
import AdForm from '../../features/AdForm/AdForm';

const AdAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const handleSubmit = (fd) => {
    dispatch(addAdRequest(fd)).then(() => {
      navigate('/');
    });
  };

  //block for not logged in users
  if (!user) return <Navigate to='/' />;

  return (
    <div>
      <h1 className='text-center my-4'>Add New Advertisement</h1>
      <AdForm action={handleSubmit} actionText='Ad add' />
    </div>
  );
};

export default AdAdd;
