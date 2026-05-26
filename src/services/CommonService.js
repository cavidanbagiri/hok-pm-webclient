import $api from '../http/api'

class CommonService {
    
    // Area endpoints
    async fetchArea() {
        try {
            const response = await $api.get('/common/fetch_area');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createArea(data) {
        try {
            const response = await $api.post('/common/create_area', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Location endpoints
    async fetchLocation() {
        try {
            const response = await $api.get('/common/fetch_location');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createLocation(data) {
        try {
            const response = await $api.post('/common/create_location', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // UOM endpoints
    async fetchUom() {
        try {
            const response = await $api.get('/common/fetch_uom');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createUom(data) {
        try {
            const response = await $api.post('/common/create_uom', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Size1 endpoints
    async fetchSize1() {
        try {
            const response = await $api.get('/common/fetch_size1');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createSize1(data) {
        try {
            const response = await $api.post('/common/create_size1', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Size2 endpoints
    async fetchSize2() {
        try {
            const response = await $api.get('/common/fetch_size2');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createSize2(data) {
        try {
            const response = await $api.post('/common/create_size2', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Material endpoints
    async fetchMaterial() {
        try {
            const response = await $api.get('/common/fetch_material');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createMaterial(data) {
        try {
            const response = await $api.post('/common/create_material', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Description endpoints
    async fetchDescription() {
        try {
            const response = await $api.get('/common/fetch_description');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createDescription(data) {
        try {
            const response = await $api.post('/common/create_description', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Subtype endpoints
    async fetchSubtype() {
        try {
            const response = await $api.get('/common/fetch_subtype');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createSubtype(data) {
        try {
            const response = await $api.post('/common/create_subtype', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Item Types endpoints
    async fetchItemTypes() {
        try {
            const response = await $api.get('/common/fetch_item_types');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createItemTypes(data) {
        try {
            const response = await $api.post('/common/create_item_types', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Type endpoints (for CreateTypeSchema)
    async fetchType() {
        try {
            const response = await $api.get('/common/fetch_type');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createType(data) {
        try {
            const response = await $api.post('/common/create_type', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Stock Data endpoints
    async fetchStockData() {
        try {
            const response = await $api.get('/common/fetch_stock_data');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createStock(data) {
        try {
            const response = await $api.post('/common/create_stock', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new CommonService();