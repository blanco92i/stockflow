import api from '../../services/api';

const saleService = {
  getAll: async () => {
    return api.get('/sales');
  },

  getById: async (id) => {
    return api.get(`/sales/${id}`);
  },

  create: async (saleData) => {
    return api.post('/sales', saleData);
  },

  update: async (id, saleData) => {
    return api.put(`/sales/${id}`, saleData);
  },

  delete: async (id) => {
    return api.delete(`/sales/${id}`);
  },
};

export default saleService;
