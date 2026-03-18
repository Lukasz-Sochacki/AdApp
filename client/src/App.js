import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAds } from './redux/adsRedux';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
// Pages
import Home from './components/pages/Home/Home';
// Views
import Footer from './components/views/Footer/Footer';
import Header from './components/views/Header/Header';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchAds(), [dispatch]));

  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
