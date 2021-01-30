import { useEffect, useState } from 'react';

export default function Home() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
  });
  const [asyncStatus, setAsyncStatus] = useState('idle');

  useEffect(() => {
    if (asyncStatus === 'resolved') {
      setTimeout(() => {
        setAsyncStatus('idle');
      }, 2000);
    }
  }, [asyncStatus]);

  function handleChange(el) {
    setFormValues({ ...formValues, [el.target.name]: el.target.value });
  }

  async function handleSubmit(el) {
    el.preventDefault();
    setAsyncStatus('pending');
    const res = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });

    if (res.status === 200) {
      setFormValues({ name: '', email: '' });
      return setAsyncStatus('resolved');
    }

    return setAsyncStatus('rejected');
  }

  return (
    <div className="content-area">
      <main className="sub-formWrap-start">
        <header className="sub-form__header">
          <span className="form-title">
            {asyncStatus === 'idle' && 'Subscribe to this Newsletter'}
            {asyncStatus === 'pending' && 'Subscribe to this Newsletter'}
            {asyncStatus === 'resolved' && 'Credentials sent'}
            {asyncStatus === 'rejected' && 'Error sending credentials'}
          </span>
        </header>
        <form className="sub-form__form" onSubmit={handleSubmit}>
          <div className="form-field__wrap">
            <input
              value={formValues.name}
              onChange={handleChange}
              type="name"
              name="name"
              id="name"
              className="form-field"
              placeholder="Name"
            />
          </div>
          <div className="form-field__wrap">
            <input
              value={formValues.email}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="form-field"
              placeholder="Email"
              spellCheck="false"
            />
          </div>
          <button
            type="submit"
            className="submit-form__cta form-field"
            disabled={formValues.name.length === 0 || formValues.email.length === 0}
          >
            {asyncStatus === 'idle' && 'Submit credentials'}
            {asyncStatus === 'pending' && 'Submitting crendentials...'}
            {asyncStatus === 'resolved' && 'Submit credentials'}
            {asyncStatus === 'rejected' && 'Submit credentials'}
          </button>
        </form>
      </main>
    </div>
  );
}
