import $api from '../http/api';

class StockService {
    async get(url, params = {}) {
        try {
            const response = await $api.get(url, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async put(url, data = {}) {
        try {
            const response = await $api.put(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // =========================
    // STOCK DATA
    // =========================
    async fetchStockData(params = {}) {
        return this.get('/common/fetch_stock_data', params);
    }

    async updateStock(id, data) {
        return this.put(`/common/update_stock/${id}`, data);
    }

    // =========================
    // TYPE DATA
    // =========================
    async fetchType(params = {}) {
        return this.get('/common/fetch_type', params);
    }

    async updateType(id, data) {
        return this.put(`/common/update_type/${id}`, data);
    }
}

export default new StockService();