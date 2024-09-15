import { Auth0Provider } from '@auth0/auth0-react';
import Landing from './Landing.jsx';
import Dashboard from './components/dashboard.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <Auth0Provider
        domain="dev-dfd7qvhsfiu2nhid.us.auth0.com"
        clientId="XGIE1XTU8T8dizhG2i5BXpp1UJfJTgt6"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <BrowserRouter> 
          <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </div>
  );
}

export default App;
