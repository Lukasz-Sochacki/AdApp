import { useSelector, useDispatch } from 'react-redux';
import { getAllAds, fetchAds } from '../../../redux/adsRedux';
import { Row, Container, Button } from 'react-bootstrap';
import AdCard from '../../features/AdCard/AdCard';
import { Link } from 'react-router-dom';
import SearchForm from '../../features/SearchForm/SearchForm';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  return (
    <Container>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1>All ads</h1>
        <Button as={Link} to='/ad/add' variant='outline-info'>
          Add Advertisement
        </Button>
      </div>
      <SearchForm />

      <Row xs={1} md={3} className='g-4'>
        {ads.map((ad) => (
          <AdCard key={ad._id} {...ad} />
        ))}
      </Row>
    </Container>
  );
};

export default Home;
