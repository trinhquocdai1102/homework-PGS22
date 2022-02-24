import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import { validateLogin, validLogin } from '../utils';

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;

  const [formValues, setFormValues] = useState<ILoginParams>({ email: '', password: '', rememberMe: false });
  const [validate, setValidate] = useState<ILoginValidation>();

  const onSubmit = useCallback(() => {
    const validate = validateLogin(formValues);

    setValidate(validate);

    if (!validLogin(validate)) {
      return;
    }

    onLogin(formValues);
  }, [formValues, onLogin]);

  return (
    <>
      <title>
        <FormattedMessage id="signIn" />
      </title>
      <form
        style={{ maxWidth: '560px', width: '100%' }}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="row g-3 needs-validation login-form"
      >
        {!!errorMessage && (
          <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
            {errorMessage}
          </div>
        )}

        <div className="col-md-12">
          <label htmlFor="input-email" className="form-label">
            <FormattedMessage id="email" />
          </label>
          <input
            type="text"
            className="form-control"
            id="input-email"
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

        <div className="col-12">
          <div className="form-check">
            <input
              type="checkbox"
              id="invalidCheck"
              value=""
              checked={formValues.rememberMe}
              onChange={(e) => setFormValues({ ...formValues, rememberMe: !!e.target.checked })}
            />
            <label className="form-check-label" htmlFor="invalidCheck">
              <FormattedMessage id="rememberMe" />
            </label>
          </div>
        </div>

        <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
          <div className="col-md-auto">
            <button
              className="btn btn-primary login-button"
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
              <FormattedMessage id="signIn" />
            </button>
          </div>
        </div>
      </form>

      <div className="col-md-auto">
        <Link
          to="/register"
          className="registerButton"
          type="submit"
          style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <FormattedMessage id="signUp" />
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
