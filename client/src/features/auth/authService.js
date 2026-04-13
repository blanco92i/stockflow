import api from '../../services/api';

//register user
const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if(response.data) {
    //extraire les données correctement du serveur
    const { token } = response.data;
    const userWithToken = { ...response.data, token };
    localStorage.setItem('user', JSON.stringify(userWithToken));
    return userWithToken;
  }
  return response.data;
};

//login user
const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  if(response.data) {
    //extraire les données correctement du serveur
    const { accessToken } = response.data;
    const userWithToken = { ...response.data, token: accessToken };
    localStorage.setItem('user', JSON.stringify(userWithToken));
    return userWithToken;
  }
  return response.data;
};

//logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
}

const authService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default authService;
