import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { AppState } from '../../../redux/reducer';
import { avatarMaleDefault, avatarFemaleDefault, APIpath, ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { generateAvatarUpload } from '../utils';
import { setUserInfo } from '../../auth/redux/authReducer';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { ROUTES } from '../../../configs/routes';
import Cookies from 'js-cookie';
import axios from 'axios';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const UserInfoPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const location = useLocation();
  const { user } = useSelector((state: AppState) => state.profile);
  const [image, setImage] = useState<any>();
  const imgRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({ unit: 'px', width: 160, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const inputRef = useRef<any>();

  const checkGender = () => {
    if (user?.gender === 'female') {
      return avatarFemaleDefault;
    } else {
      return avatarMaleDefault;
    }
  };

  const src = user?.avatar ? `${APIpath}/${user?.avatar}` : checkGender();
  const getUserData = useCallback(async () => {
    if (location.pathname === ROUTES.userInfo) {
      const resp = await dispatch(fetchThunk(API_PATHS.userProfile, 'get'));
      if (resp.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(resp.data));
      }
    }
  }, [dispatch, location.pathname]);

  const selectAvatar = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);

      setOpenModal(true);
    }
  };

  const uploadAvatar = async () => {
    const file = await generateAvatarUpload(previewCanvasRef.current, completedCrop);
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
        },
      };
      const json = await axios.put(API_PATHS.userProfile, formData, config);
      if (json.data && json.data.code === RESPONSE_STATUS_SUCCESS) {
        console.log(json);
        dispatch(setUserInfo(json.data.data));
      }

      console.log(json);
    }
  };

  const onLoad = useCallback((img: any) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );
  }, [completedCrop]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);
  return (
    <>
      <title>
        <FormattedMessage id="user-info" />
      </title>
      <div
        style={{ backgroundColor: '#000', marginTop: '-20px', padding: '60px 0 0', minHeight: 'calc(100vh - 50px)' }}
      >
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="g-1 needs-validation"
        >
          <div className="user-info-page">
            <div className="text-center user-avatar">
              <p className="user-avatar-detail" onClick={() => selectAvatar()}>
                Click to change avatar
              </p>
              <img src={src} onClick={() => selectAvatar()} />
              <input
                type="file"
                ref={inputRef}
                hidden
                accept=".jpeg, .png, .jpg"
                onChange={(e) => {
                  onSubmit(e);
                }}
              ></input>
            </div>
            <div className="text-center user-info-list">
              <div>
                <h3>Email</h3>
                <h4>{user?.email}</h4>
              </div>
              <div>
                <h3>User Name</h3>
                <h4>{user?.name}</h4>
              </div>
              <div>
                <h3>Gender</h3>
                <h4>{user?.gender}</h4>
              </div>
              <div>
                <h3>State</h3>
                <h4>{user?.state}</h4>
              </div>
              <div>
                <h3>Region</h3>
                <h4>{user?.region}</h4>
              </div>
            </div>
          </div>
        </form>
        {openModal && (
          <>
            <div
              className="modal-chooseAvatar"
              onClick={() => {
                setOpenModal(false);
              }}
            ></div>
            <div className="modal-chooseAvatar-box" style={{ overflowY: 'auto' }}>
              <div className="modal-chooseAvatar-content d-flex" style={{ gap: '100px' }}>
                <ReactCrop
                  style={{ maxWidth: '600px', marginBottom: '40px', marginTop: '0 !important' }}
                  src={image ? image : ''}
                  onImageLoaded={onLoad}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                />
                <div>
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      width: Math.round(completedCrop?.width ?? 0),
                      height: Math.round(completedCrop?.height ?? 0),
                    }}
                  />
                </div>
              </div>
              <div className="btn d-flex modal-button" style={{ marginTop: '20px', position: 'unset' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    uploadAvatar();
                    setOpenModal(false);
                  }}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserInfoPage;
