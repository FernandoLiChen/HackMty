
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton from './components/loginButton';
import LogoutButton from './components/logoutButton';
import Scene from './models/Scene';
import Phone from "./components/Phone.jsx"


function App() {
  return (
    <Auth0Provider
      domain="dev-dfd7qvhsfiu2nhid.us.auth0.com"
      clientId="XGIE1XTU8T8dizhG2i5BXpp1UJfJTgt6"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Scene/>
      <Phone />
    </Auth0Provider>
  );
}

export default App;
