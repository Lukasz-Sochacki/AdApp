import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const AdForm = ({ action, actionText, ...props }) => {
  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [price, setPrice] = useState(props.price || '');
  const [location, setLocation] = useState(props.location || '');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // create FormData
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    fd.append('price', price);
    fd.append('location', location);
    if (image) fd.append('image', image);

    action(fd); //it will be AdAdd or AdEdit
  };

  return (
    <Form onSubmit={handleSubmit} className='col-12 col-md-8 mx-auto mb-5'>
      <Form.Group className='mb-3' controlId='formTitle'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter title (min. 10 chars)'
          required
          minLength={10}
          maxLength={50}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formContent'>
        <Form.Label>Content</Form.Label>
        <Form.Control
          type='textarea'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Enter description (min. 20 chars)'
          required
          minLength={20}
          maxLength={1000}
        />
      </Form.Group>

      <Row className='mb-3'>
        <Form.Group as={Col} controlId='formPrice'>
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId='formLocation'>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Form.Group>
      </Row>

      <Form.Group className='mb-4' controlId='formImage'>
        <Form.Label>image</Form.Label>
        <Form.Control
          type='file'
          onChange={(e) => setImage(e.target.files[0])}
          required={!props.title}
        />
      </Form.Group>

      <Button variant='primary' type='submit' size='lg' className='w-100'>
        {actionText}
      </Button>
    </Form>
  );
};

export default AdForm;
