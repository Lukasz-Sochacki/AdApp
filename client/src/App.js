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
import Ad from './components/pages/Ad/Ad';
import AdEdit from './components/pages/AdEdit/AdEdit';
import AdAdd from './components/pages/AdAdd/AdAdd';
import AdRemove from './components/pages/AdRemove/AdRemove';
import NotFound from './components/pages/NotFound/NotFound';
import Search from './components/pages/Search/Search';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import Register from './components/pages/Register/Register';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchAds(), [dispatch]));

  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ad/:id' element={<Ad />} />
        <Route path='/ad/add' element={<AdAdd />} />
        <Route path='/ad/edit/:id' element={<AdEdit />} />
        <Route path='/ad/remove/:id' element={<AdRemove />} />
        <Route path='/search/:searchPhrase' element={<Search />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='logout' element={<Logout />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
