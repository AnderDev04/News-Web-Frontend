import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false, // Colocar true en producción pero cuando se tenga un certificado SSL con HTTPS
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider store={store}>
    <App />
  </AuthProvider>,
)
