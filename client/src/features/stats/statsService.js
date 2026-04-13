import api from "../../services/api";

const statsService = {
  getStats: async () => {
    return api.get('/dashboard/stats');
  },
};


export default statsService;