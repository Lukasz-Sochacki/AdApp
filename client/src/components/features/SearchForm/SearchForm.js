import { useState } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    //redirect user to new subpage by adding phrase to URL
    if (searchPhrase) {
      navigate(`/search/${searchPhrase}`);
    }
  };

  return (
    <Row className='justify-content-center my-4'>
      <Col md={6}>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              placeholder='Search for ads...'
              value={searchPhrase}
              onChange={(e) => setSearchPhrase(e.target.value)}
            />
            <Button variant='primary' type='submit'>
              Search
            </Button>
          </InputGroup>
        </Form>
      </Col>
    </Row>
  );
};

export default SearchForm;
