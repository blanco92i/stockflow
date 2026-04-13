import api from '../../services/api';

const dashboardService = {
  getStats: async () => {
    return api.get('/dashboard');
  },
};

export default dashboardService;
