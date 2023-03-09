// import React from 'react';
// // import { useParams } from 'react-router-dom';
// import { useAuthContext } from '../../hooks/useAuthContext';
// import UserProfiles from './UserProfiles';

// const Profile = () => {
//   // const { id } = useParams();
//   const { user } = useAuthContext();
//   console.log(user)
//   return (
//     <>
//       <div className="page-container">
//         <div className="content-container">
//           <div className="profile-container">
//             <div className="profile-header">
//               <img src={user.image} alt={user.name} className="profile-image" style={{ width: '60px', height: "60px" }} />
//               <div className="profile-info">
//                 <h1 className="profile-name">{user.name}</h1>
//                 <p className="profile-email">{user.email}</p>
//               </div>
//             </div>
//             <div className="profile-bio">
//               <p>{user.bio}</p>
//             </div>
//           </div>
//           <div className="user-profiles-container">
//             {/* <UserProfiles /> */}
//           </div>
//         </div>
//       </div>

//       {/* {<UserProfiles />} */}
//     </>
//   );
// };

// export default Profile;


import './ProfileStyles.css'
import React, { useState, useRef } from 'react';

function Profile() {
  const [name, setName] = useState('Ram Doe');
  const [username, setUsername] = useState('johndoe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [location, setLocation] = useState('UttarPradesh, India');
  const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  const [contact, setContact] = useState('1234567890')
  const [website, setWebsite] = useState('https://www.example.com');
  const [profilePhoto, setProfilePhoto] = useState('https://avatars.githubusercontent.com/u/84857474?v=4');

  function handlePhotoChange(event) {
    setProfilePhoto(event.target.files[0]);
  }


  function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission (e.g. send data to server)
  }
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleCancelClick() {
    setIsEditing(false);
  }

  function handleSaveClick() {
    // Handle saving changes
    setIsEditing(false);
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-contents">
          <div className="profile-photo">
            <img src={profilePhoto || 'default-profile-photo.jpg'} alt="Profile" />
            <input type="file" id="profile-photo" onChange={handlePhotoChange} />
          </div>
        </div>
        <button className="edit-profile-btn" onClick={handleEditClick}>Edit Profile</button>
      </div>
      {isEditing ? (
        <div className="profile-contents">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="form-row">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="form-row">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" value={location} onChange={(event) => setLocation(event.target.value)} />
            </div>
            <div className="form-row">
              <label htmlFor="bio">Bio</label>
              <textarea id="bio" value={bio} onChange={(event) => setBio(event.target.value)}></textarea>
            </div>
            <div className="form-row">
              <label htmlFor="contact-input"> Contact</label>
              <input type="text" id="contact-input" name="contact" onChange={(event) => setContact(event.target.value)} />
            </div>
            <div className="form-row">
              <label htmlFor="website">Website</label>
              <input type="url" id="website" value={website} onChange={(event) => setWebsite(event.target.value)} />
            </div>
            <div className="form-row">
              <button type="submit" onClick={handleSaveClick}>Save changes</button>
              <button type="button" onClick={handleCancelClick}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="profile-content">
          <div className="profile-details">
            <h1><strong>Name: </strong>{name}</h1>
            <h2><strong>Username: </strong> @{username}</h2>
            <p><strong>Bio:</strong> {bio}</p>
            <ul>
              <li><strong>Email:</strong>{email}</li>
              <li><strong>Location:</strong> {location}</li>
              <li><strong>Contact:</strong> {contact}</li>
              <li><strong>Website: </strong><a href={website}>{website}</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;