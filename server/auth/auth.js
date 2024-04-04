import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
});

const User = mongoose.model('User', UserSchema);

const YourComponent = () => {
  const handleLogin = async (credentialResponse) => {
    try {
      
      const decodedToken = jwtDecode(credentialResponse.credential);
      const email = decodedToken.email;

      
      await User.create({ email });
      console.log('User added:', email);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="797994969255-kr1sg4ps7itt30qpcsvvt3cd1du3vfso.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLogin}
      />
    </GoogleOAuthProvider>
  );
};

export default YourComponent;
