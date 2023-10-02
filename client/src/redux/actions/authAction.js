import {
    setIsFetching,
    setIsFetchingAuth,
    setAuthenticated,
    setUser,
    setToken,
} from '../reducer/authReducer'
import axios from 'axios'

const URL = 'http://localhost:3001/api';

const authUserAction = () => {
    return async function(dispatch) {
        dispatch(setIsFetchingAuth(true));
        dispatch(setIsFetching(true));
        try {
            let result = await axios.post(
                `${URL}/user`,
                {},
                {withCredentials: true}
            );
            dispatch(setAuthenticated(true))
            dispatch(setUser(result.data))

            dispatch(setIsFetchingAuth(false));
            dispatch(setIsFetching(false));
        } catch (error) {            
            dispatch(setAuthenticated(false))
            dispatch(setUser(null))
            dispatch(setToken(null))

            dispatch(setIsFetchingAuth(false));
            dispatch(setIsFetching(false));
        }
    }
}

const registerUserAction = (name, last, email, password, repeatPassword) => {
	return async function (dispatch) {
		dispatch(setIsFetching(true));
		try {
			await axios.post(`${URL}/auth/register`, { name, last, email, password, repeatPassword });
			dispatch(setIsFetching(false));
		} catch (error) {
			dispatch(setIsFetching(false));
		}
	};
};

const loginUserAction = (email, password) => {
	return async function (dispatch) {
        dispatch(setIsFetchingAuth(true));
        dispatch(setIsFetching(true));
        try {
            let result = await axios.post(
				`${URL}/auth/login`,
				{ email, password },
				{ withCredentials: true },
            );
            dispatch(setToken(result.data.token))

            dispatch(authUserAction())
            dispatch(setIsFetchingAuth(false));
            dispatch(setIsFetching(false));
        } catch (error) {
            dispatch(setAuthenticated(false));
            dispatch(setUser(null));
            dispatch(setToken(null));

            dispatch(setIsFetchingAuth(false));
            dispatch(setIsFetching(false));
        }
	};
};

const logoutUserAction = () => {
    return async function (dispatch) {        
        dispatch(setIsFetchingAuth(true));
        dispatch(setIsFetching(true));

        try {
            await axios.post(
                `${URL}/auth/logout`,
                {},
                { withCredentials: true }
            )

            dispatch(setAuthenticated(false));
            dispatch(setUser(null));
            dispatch(setToken(null));

            dispatch(setIsFetchingAuth(false));
            dispatch(setIsFetching(false));
        } catch {
            dispatch(setIsFetchingAuth(false));
            dispatch(setIsFetching(false));
        }
    }
}

const updateAvatarAction = (file) => {
    return async function (dispatch) {
        dispatch(setIsFetching(true));
        try {
            let result = await axios.post(
				`${URL}/user/upload`,
				file,
				{ withCredentials: true },
            );

            dispatch(authUserAction())
            dispatch(setIsFetchingAuth(false));
            dispatch(setIsFetching(false));
        } catch (error) {
            dispatch(setIsFetchingAuth(false));
            dispatch(setIsFetching(false));
        }
    }
}

const updateUserAction = (name, last) => {
    return async function (dispatch) {
        dispatch(setIsFetching(true));
        try {
            await axios.post(
                `${URL}/user/edit`,
                {name, last},
                { withCredentials: true },
            )

            dispatch(authUserAction())
            dispatch(setIsFetchingAuth(false));
            dispatch(setIsFetching(false));
        } catch {

            dispatch(setIsFetchingAuth(false));
            dispatch(setIsFetching(false));
        }
    }
}

export {
    authUserAction,
    registerUserAction,
    loginUserAction,
    updateAvatarAction,
    updateUserAction,
    logoutUserAction,
}