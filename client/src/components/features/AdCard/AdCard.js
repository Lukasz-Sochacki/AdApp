import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMGS_URL } from '../../../config';

const AdCard = ({ _id, title, image, location }) => {
  return (
    <Col className='mb-4'>
      <Card className='h-100 shadow-sm'>
        <Card.Img
          variant='top'
          src={`${IMGS_URL}/${image}`}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body className='d-flex flex-column'>
          <Card.Title>{title}</Card.Title>
          <Card.Text className='text-muted'>{location}</Card.Text>
          <Button
            as={Link}
            to={`/ad/${_id}`}
            variant='primary'
            className='mt-auto'
          >
            Read more
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AdCard;
