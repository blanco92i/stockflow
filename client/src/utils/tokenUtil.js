import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    // Si l'expiration est passée, le token est invalide
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // Erreur de décodage = token invalide
  }
};

// Récupération simplifiée
export const getTokenFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token && !isTokenExpired(user.token)) {
    return user.token; // Retourne le token si valide
  }
  return null;
};

// Sauvegarde cohérente
export const saveTokenToLocalStorage = (token) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  user.token = token;
  localStorage.setItem('user', JSON.stringify(user));
};