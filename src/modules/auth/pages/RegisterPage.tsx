import React, { useCallback, useEffect, useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import logo from '../../../logo-420-x-108.png';
import { IRegisterParams } from '../../../models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';

const RegisterPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [location, setLocation] = useState([]);

  const onRegister = useCallback(
    async (values: IRegisterParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.register, 'post', {
          email: values.email,
          password: values.password,
          repeatPassword: values.confirmPassword,
          name: values.name,
          gender: values.gender,
          region: values.region,
          state: values.state,
        }),
      );

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data));
        Cookies.set(ACCESS_TOKEN_KEY, json.data.token);
        alert('Đăng ký thành công !');
        dispatch(replace(ROUTES.login));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  useEffect(() => {
    const fetchLocation = async () => {
      const resp = await dispatch(fetchThunk(API_PATHS.location, 'get'));
      if (resp.code === RESPONSE_STATUS_SUCCESS) {
        setLocation(resp.data);
        return;
      }

      return;
    };

    fetchLocation();
  }, [dispatch]);

  const fetchState = useCallback(
    async (pid: number) => {
      if (pid) {
        const resp = await dispatch(fetchThunk(`${API_PATHS.location}?pid=${pid}`, 'get'));

        if (resp.code === RESPONSE_STATUS_SUCCESS) {
          return resp.data;
        }
        return resp;
      }
    },
    [dispatch],
  );

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

      <RegisterForm
        onRegister={onRegister}
        loading={loading}
        errorMessage={errorMessage}
        location={location}
        state={fetchState}
      />
    </div>
  );
};

export default RegisterPage;
