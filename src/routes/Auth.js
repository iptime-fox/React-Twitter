import { authService, firebaseInstance } from 'fbase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import React, { useState } from 'react';
import { styled } from 'styled-components';

const AuthWrapper = styled.div`
  display: flex;
  max-width: 500px;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Logo = styled.div`
  i {
    color: #1d9bf0;
    font-size: 45px;
  }
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  padding: 0.875rem;
  outline: none;
  border: 1px solid #dcdcdc;
  border-radius: 1.5rem;
`;

const SubmitInput = styled.input`
  width: 330px;
  padding: 0.875rem;
  border: none;
  background-color: #1d9bf0;
  color: white;
  border-radius: 1.5rem;
  font-weight: 500;
`;
const Span = styled.span`
  color: #1d9bf0;
  margin: 1rem 0;
  font-weight: 500;
`;

const Social = styled.div`
  display: flex;
  column-gap: 1rem;
`;

const Button = styled.button`
  border-radius: 1.5rem;
  padding: 0.65rem 0.875rem;
  border: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  i {
    font-size: 20px;
  }
`;

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  return (
    <AuthWrapper>
      <Logo>
        <i class='ri-twitter-fill'></i>
      </Logo>
      <Form onSubmit={onSubmit}>
        <Input
          name='email'
          type='text'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
        />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
        />
        <SubmitInput
          type='submit'
          value={newAccount ? 'Create Account' : 'Log In'}
        />
        {error}
      </Form>
      <Span onClick={toggleAccount}>
        {newAccount ? 'Go to Sign in' : 'Go to Create Account'}
      </Span>
      <Social>
        <Button onClick={onSocialClick} name='github'>
          Continue with <i class='ri-github-fill'></i>
        </Button>
        <Button onClick={onSocialClick} name='google'>
          Continue with <i class='ri-google-fill'></i>
        </Button>
      </Social>
    </AuthWrapper>
  );
};

export default Auth;
