import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../logo-420-x-108.png';
import { FormattedMessage } from 'react-intl';
import { avatarMaleDefault, avatarFemaleDefault, ACCESS_TOKEN_KEY, APIpath } from '../../../utils/constants';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import LogoutForm from '../../auth/components/LogoutForm';
import Cookies from 'js-cookie';

const Navbar = () => {
  const { user } = useSelector((state: AppState) => state.profile);
  const checkGender = () => {
    if (user?.gender === 'female') {
      return avatarFemaleDefault;
    } else {
      return avatarMaleDefault;
    }
  };
  const src = user?.avatar ? `${APIpath}/${user?.avatar}` : checkGender();
  const isLogin = Cookies.get(ACCESS_TOKEN_KEY);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <Link className="navbar-brand navbar-logo" to="/home">
            <img src={logo} alt="" style={{ maxWidth: '100px' }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navbar-menu" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">
                  <FormattedMessage id="home" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/listItem">
                  <FormattedMessage id="admin" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/transList">
                  <FormattedMessage id="transaction" />
                </Link>
              </li>
              {isLogin && (
                <li className="nav-item dropdown user-icon">
                  <a
                    className="nav-link dropdown-toggle active"
                    href="#"
                    id="navbar-dropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ margin: '0' }}
                  >
                    <span style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <img src={src} />
                      <span className="nav-item user-name">{user?.name}</span>
                    </span>
                  </a>
                  <div className="dropdown-menu user-dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="/userInfo">
                      <FormattedMessage id="userInfo" />
                    </a>
                    <a className="dropdown-item" href="/contact">
                      Liên lạc
                    </a>
                    <div className="dropdown-divider"></div>

                    <a className="dropdown-item" href="#" style={{ padding: '0' }}>
                      <LogoutForm />
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
