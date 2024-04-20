import React from 'react';
import './profileNavBar.css'; 

class ProfileNavBar extends React.Component {
  render() {
    return (
      <div className="profile-navbar">
        <ul>
          <li><a href="/profilePrueba">General Info</a></li>
          <li>{/*<a href="/change-data">Change Data</a>*/}</li>
          <li><a href="/changePassword">Reset Password</a></li>
          <li>{/* <a href="/logout">Log out</a> */}</li>
        </ul>
      </div>
    );
  }
}

export default ProfileNavBar;
