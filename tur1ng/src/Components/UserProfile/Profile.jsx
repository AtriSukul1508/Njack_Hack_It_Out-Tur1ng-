import React from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const Profile = () => {
  const {id} = useParams();
  const {user} = useAuthContext();
  
  return (
    <div>Profile</div>
  )
}

export default Profile;