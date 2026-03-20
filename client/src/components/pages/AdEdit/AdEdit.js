import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdById, editAdRequest } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/usersRedux';
import AdForm from '../../features/AdForm/AdForm';

const AdEdit = () => {
  const { id } = useParams();
  const ad = useSelector((state) => getAdById(state, id));
  const user = useSelector(getUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //if there is no ad in state (for example: refresh the page)
  if (!ad) return <Navigate to='/' />;

  //if user is not logged in or if user is not an author
  if (!user || user.id !== ad.author._id) return <Navigate to='/' />;

  const handleSubmit = (fd) => {
    dispatch(editAdRequest(fd, id)).then(() => {
      navigate(`/ad/${id}`);
    });
  };

  return (
    <div style={{ width: '70%', margin: 'auto' }}>
      <h1 className='text-center my-4'>Edit Advertisement</h1>
      <AdForm
        action={handleSubmit}
        actionText='Update Ad'
        title={ad.title}
        content={ad.content}
        price={ad.price}
        location={ad.location}
      />
    </div>
  );
};

export default AdEdit;
