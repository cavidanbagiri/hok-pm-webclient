
import $api from '../http/api';

class CommonService {

    // =========================
    // Generic request helpers
    // =========================
    async get(url, params = {}) {
        try {
            const response = await $api.get(url, { params });
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }

    async post(url, data = {}) {
        try {
            const response = await $api.post(url, data);
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
    // AREA
    // =========================
    fetchArea(params = {}) {
        return this.get('/common/fetch_area', params);
    }
    
    createArea(data) {
        return this.post('/common/create_area', data);
    }
    
    async updateArea(id, data) {
        return this.put(`/common/update_area/${id}`, data);
    }


    // =========================
    // LOCATION
    // =========================
    fetchLocation(params = {}) {
        return this.get('/common/fetch_location', params);
    }

    createLocation(data) {
        return this.post('/common/create_location', data);
    }

    async updateLocation(id, data) {
        return this.put(`/common/update_location/${id}`, data);
    }

    // =========================
    // UOM
    // =========================
    fetchUom(params = {}) {
        return this.get('/common/fetch_uom', params);
    }

    createUom(data) {
        return this.post('/common/create_uom', data);
    }

    async updateUom(id, data) {
        return this.put(`/common/update_uom/${id}`, data);
    }

    // =========================
    // SIZE 1
    // =========================
    fetchSize1(params = {}) {
        return this.get('/common/fetch_size1', params);
    }

    createSize1(data) {
        return this.post('/common/create_size1', data);
    }

    async updateSize1(id, data) {
        return this.put(`/common/update_size1/${id}`, data);
    }

    // =========================
    // SIZE 2
    // =========================
    fetchSize2(params = {}) {
        return this.get('/common/fetch_size2', params);
    }

    createSize2(data) {
        return this.post('/common/create_size2', data);
    }

    async updateSize2(id, data) {
        return this.put(`/common/update_size2/${id}`, data);
    }

    // =========================
    // MATERIAL
    // =========================
    fetchMaterial(params = {}) {
        return this.get('/common/fetch_material', params);
    }

    createMaterial(data) {
        return this.post('/common/create_material', data);
    }

    async updateMaterial(id, data) {
        return this.put(`/common/update_material/${id}`, data);
    }

    // =========================
    // DESCRIPTION
    // =========================
    fetchDescription(params = {}) {
        return this.get('/common/fetch_description', params);
    }

    createDescription(data) {
        return this.post('/common/create_description', data);
    }

    async updateDescription(id, data) {
        return this.put(`/common/update_description/${id}`, data);
    }

    // =========================
    // SUBTYPE
    // =========================
    fetchSubtype(params = {}) {
        return this.get('/common/fetch_subtype', params);
    }

    createSubtype(data) {
        return this.post('/common/create_subtype', data);
    }

    async updateSubtype(id, data) {
        return this.put(`/common/update_subtype/${id}`, data);
    }

    // =========================
    // ITEM TYPES
    // =========================
    fetchItemTypes(params = {}) {
        return this.get('/common/fetch_item_types', params);
    }

    createItemTypes(data) {
        return this.post('/common/create_item_types', data);
    }

    async updateItemTypes(id, data) {
        return this.put(`/common/update_item_types/${id}`, data);
    }

    // =========================
    // TYPE
    // =========================
    fetchType(params = {}) {
        return this.get('/common/fetch_type', params);
    }

    createType(data) {
        return this.post('/common/create_type', data);
    }

    // =========================
    // STOCK
    // =========================
    fetchStockData(params = {}) {
        return this.get('/common/fetch_stock_data', params);
    }

    createStock(data) {
        return this.post('/common/create_stock', data);
    }
}

export default new CommonService();