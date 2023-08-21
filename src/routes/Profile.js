import { authService } from 'fbase';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  return (
    <div>
      <Helmet>
        <title>Nwitter</title>
      </Helmet>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
};

export default Profile;
