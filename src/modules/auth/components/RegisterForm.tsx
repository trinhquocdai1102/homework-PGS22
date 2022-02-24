import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { IRegisterParams, IRegisterValidation } from '../../../models/auth';
import { validateRegister, validRegister } from '../utils';

interface location {
  id: number;
  name: string;
}

interface Props {
  onRegister(values: IRegisterParams): void;
  loading: boolean;
  errorMessage: string;
  location: location[];
  state(pid: number): Promise<any>;
}

const RegisterForm = (props: Props) => {
  const { onRegister, loading, errorMessage, location, state } = props;
  const [states, setStates] = useState<location[]>();

  const [formValues, setFormValues] = useState<IRegisterParams>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    gender: '',
    region: 0,
    state: 0,
  });
  const [validate, setValidate] = useState<IRegisterValidation>();

  const onSubmit = useCallback(() => {
    const validate = validateRegister(formValues);
    setValidate(validate);

    if (!validRegister(validate)) {
      return;
    }

    onRegister(formValues);
  }, [formValues, onRegister]);

  useEffect(() => {
    state(formValues.region).then((resp) => {
      setStates(resp);
    });
  }, [formValues.region, state]);

  return (
    <>
      <title>
        <FormattedMessage id="signUp" />
      </title>
      <form
        style={{ maxWidth: '560px', width: '100%' }}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="row g-3 needs-validation"
      >
        {!!errorMessage && (
          <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
            {errorMessage}
          </div>
        )}

        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">
            <FormattedMessage id="email" />
          </label>
          <input
            type="text"
            className="form-control"
            id="inputEmail"
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
          />

          {!!validate?.email && (
            <small className="text-danger">
              <FormattedMessage id={validate?.email} />
            </small>
          )}
        </div>

        <div className="col-md-12">
          <label htmlFor="input-password" className="form-label">
            <FormattedMessage id="password" />
          </label>
          <input
            type="password"
            className="form-control"
            id="input-password"
            value={formValues.password}
            onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
            autoComplete="on"
          />

          {!!validate?.password && (
            <small className="text-danger">
              <FormattedMessage id={validate?.password} />
            </small>
          )}
        </div>

        <div className="col-md-12">
          <label htmlFor="input-confirm-password" className="form-label">
            <FormattedMessage id="confirmPassword" />
          </label>
          <input
            type="password"
            className="form-control"
            id="input-confirm-password"
            value={formValues.confirmPassword}
            onChange={(e) => setFormValues({ ...formValues, confirmPassword: e.target.value })}
            autoComplete="on"
          />

          {!!validate?.confirmPassword && (
            <small className="text-danger">
              <FormattedMessage id={validate?.confirmPassword} />
            </small>
          )}
        </div>

        <div className="col-md-12">
          <label htmlFor="input-name" className="form-label">
            <FormattedMessage id="name" />
          </label>
          <input
            type="text"
            className="form-control"
            id="input-name"
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
          />
          {!!validate?.name && (
            <small className="text-danger">
              <FormattedMessage id={validate?.name} />
            </small>
          )}
        </div>

        <div className="col-md-12">
          <label htmlFor="input-gender" className="form-label">
            <FormattedMessage id="gender" />
          </label>
          <div className="form-control form-gender" style={{ border: 'none' }}>
            <select
              className="form-select"
              aria-label="Default select example"
              id="input-gender"
              onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
            >
              <option defaultValue="defaultValue">-- Chọn giới tính --</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          {!!validate?.gender && (
            <small className="text-danger">
              <FormattedMessage id={validate?.gender} />
            </small>
          )}
        </div>

        <div className="col-md-12">
          <label htmlFor="input-region" className="form-label">
            <FormattedMessage id="region" />
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="input-region"
            onChange={(e) => setFormValues({ ...formValues, region: +e.target.value })}
          >
            <option defaultValue="defaultValue">-- Chọn quốc gia --</option>
            {location.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {!!validate?.region && (
            <small className="text-danger">
              <FormattedMessage id={validate?.region} />
            </small>
          )}
        </div>

        {states && (
          <div className="col-md-12">
            <label htmlFor="input-state" className="form-label">
              <FormattedMessage id="state" />
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="input-state"
              onChange={(e) => setFormValues({ ...formValues, state: +e.target.value })}
            >
              <option defaultValue="defaultValue">-- Chọn thành phố --</option>
              {states?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            {!!validate?.state && (
              <small className="text-danger">
                <FormattedMessage id={validate?.state} />
              </small>
            )}
          </div>
        )}

        <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
          <div className="col-md-auto">
            <button
              className="btn btn-primary register-button"
              type="submit"
              style={{
                minWidth: '160px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              disabled={loading}
            >
              {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
              <FormattedMessage id="signUp" />
            </button>
          </div>
        </div>
      </form>

      <div className="col-md-auto">
        <Link
          to="/login"
          className="registerButton"
          type="submit"
          style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <FormattedMessage id="alreadyHaveAccount" />
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
