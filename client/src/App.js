import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import * as authActions from './redux/actions/authAction';
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './views/Home/Home';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Header from './views/Header/Header';
import Account from './views/Account/Account';
import BackDrop from './views/BackDrop/BackDrop';

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.authReducer);

    useEffect(() => {
        dispatch(authActions.authUserAction())
    }, [dispatch])

    return (
    <>  {location.pathname !== '/login' &&
            location.pathname !== '/register'
         && <Header/>}
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/login'} element={<Login />} />
            {selector.isAuthenticated && <Route path={'/account'} element={<Account/>} />}
        </Routes>
        <BackDrop/>
    </>
    );
}

export default App;
