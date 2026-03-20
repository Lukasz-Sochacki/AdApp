import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdById, removeAdRequest } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/usersRedux';
import { Container, Row, Col, Button, Card, NavItem } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';

const Ad = () => {
  const { id } = useParams();
  const ad = useSelector((state) => getAdById(state, id));
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!ad) return <Navigate to='/' />;

  const handleDelete = (event) => {
    event.preventDefault();

    if (window.confirm('Are you sure you want to remove this ad?')) {
      dispatch(removeAdRequest(id)).then(() => {
        navigate('/');
      });
    }
  };

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col md={8}>
          <Card className='shadow-sm'>
            <Card.Img
              variant='top'
              src={`${IMGS_URL}/${ad.image}`}
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
            <Card.Body>
              <div className='d=flex justify-content-between align-items-start'>
                <h1>{ad.title}</h1>
                {/* Buttons visible only for authors */}
                {user && user.id === ad.author._id && (
                  <div>
                    <Button
                      as={Link}
                      to={`/ad/edit/${id}`}
                      variant='outline-info'
                      className='me-2'
                    >
                      Edit
                    </Button>
                    <Button variant='outline-danger' onClick={handleDelete}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>

              <h4 className='text-primary mt-3'>Price: {ad.price} $</h4>
              <p className='text-muted'>Location: {ad.location}</p>
              <p className='mt-4'>{ad.content}</p>

              <hr />

              {/* Information about seller (populate 'author') */}
              <div className='d-flex align-items-center mt-4'>
                <img
                  src={`${IMGS_URL}/${ad.author.avatar}`}
                  alt='avatar'
                  className='rounded-circle me-3'
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
                <div>
                  <h5>Seller: {ad.author.login}</h5>
                  <p className='mb-0 text-muted'>
                    Phone: {ad.author.phoneNumber}
                  </p>
                </div>
              </div>
              <p className='text-muted mt-3 small'>
                Published: {new Date(ad.date).toLocaleDateString()}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Ad;
