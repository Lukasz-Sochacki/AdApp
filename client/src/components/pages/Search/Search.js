import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAdsByPhrase, getAllAds } from '../../../redux/adsRedux';
import { Row, Container } from 'react-bootstrap';
import AdCard from '../../features/AdCard/AdCard';

const Search = () => {
  const { searchPhrase } = useParams();
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);

  useEffect(() => {
    dispatch(fetchAdsByPhrase(searchPhrase));
  }, [dispatch, searchPhrase]);

  return (
    <Container>
      <h1 className='my-4'>Search results for: "{searchPhrase}"</h1>
      {ads.length === 0 && <p>No ads found for this phrase...</p>}
      <Row xs={1} md={3} className='g-4'>
        {ads.map((ad) => (
          <AdCard key={ad._id} {...ad} />
        ))}
      </Row>
    </Container>
  );
};

export default Search;
