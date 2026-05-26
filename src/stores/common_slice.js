import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CommonService from '../services/CommonService';

// Async thunks for Area
export const fetchArea = createAsyncThunk(
    'common/fetchArea',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CommonService.fetchArea();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createArea = createAsyncThunk(
    'common/createArea',
    async (data, { rejectWithValue }) => {
        try {
            const response = await CommonService.createArea(data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunks for Location
export const fetchLocation = createAsyncThunk(
    'common/fetchLocation',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CommonService.fetchLocation();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createLocation = createAsyncThunk(
    'common/createLocation',
    async (data, { rejectWithValue }) => {
        try {
            const response = await CommonService.createLocation(data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunks for UOM
export const fetchUom = createAsyncThunk(
    'common/fetchUom',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CommonService.fetchUom();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createUom = createAsyncThunk(
    'common/createUom',
    async (data, { rejectWithValue }) => {
        try {
            const response = await CommonService.createUom(data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunks for Size1
export const fetchSize1 = createAsyncThunk(
    'common/fetchSize1',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CommonService.fetchSize1();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createSize1 = createAsyncThunk(
    'common/createSize1',
    async (data, { rejectWithValue }) => {
        try {
            const response = await CommonService.createSize1(data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunks for Size2
export const fetchSize2 = createAsyncThunk(
    'common/fetchSize2',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CommonService.fetchSize2();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createSize2 = createAsyncThunk(
    'common/createSize2',
    async (data, { rejectWithValue }) => {
        try {
            const response = await CommonService.createSize2(data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunks for Material
export const fetchMaterial = createAsyncThunk(
    'common/fetchMaterial',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CommonService.fetchMaterial();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createMaterial = createAsyncThunk(
    'common/createMaterial',
    async (data, { rejectWithValue }) => {
        try {
            const response = await CommonService.createMaterial(data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunks for Description
export const fetchDescription = createAsyncThunk(
    'common/fetchDescription',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CommonService.fetchDescription();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createDescription = createAsyncThunk(
    'common/createDescription',
    async (data, { rejectWithValue }) => {
        try {
            const response = await CommonService.createDescription(data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunks for Subtype
export const fetchSubtype = createAsyncThunk(
    'common/fetchSubtype',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CommonService.fetchSubtype();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createSubtype = createAsyncThunk(
    'common/createSubtype',
    async (data, { rejectWithValue }) => {
        try {
            const response = await CommonService.createSubtype(data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunks for Item Types
export const fetchItemTypes = createAsyncThunk(
    'common/fetchItemTypes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CommonService.fetchItemTypes();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createItemTypes = createAsyncThunk(
    'common/createItemTypes',
    async (data, { rejectWithValue }) => {
        try {
            const response = await CommonService.createItemTypes(data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunks for Type (CreateTypeSchema)
export const fetchType = createAsyncThunk(
    'common/fetchType',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CommonService.fetchType();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createType = createAsyncThunk(
    'common/createType',
    async (data, { rejectWithValue }) => {
        try {
            const response = await CommonService.createType(data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunks for Stock Data
export const fetchStockData = createAsyncThunk(
    'common/fetchStockData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CommonService.fetchStockData();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createStock = createAsyncThunk(
    'common/createStock',
    async (data, { rejectWithValue }) => {
        try {
            const response = await CommonService.createStock(data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Initial state
const initialState = {
    // Data states
    areas: [],
    locations: [],
    uoms: [],
    size1: [],
    size2: [],
    materials: [],
    descriptions: [],
    subtypes: [],
    itemTypes: [],
    types: [],
    stockData: [],
    
    // Loading states
    loading: {
        fetchArea: false,
        createArea: false,
        fetchLocation: false,
        createLocation: false,
        fetchUom: false,
        createUom: false,
        fetchSize1: false,
        createSize1: false,
        fetchSize2: false,
        createSize2: false,
        fetchMaterial: false,
        createMaterial: false,
        fetchDescription: false,
        createDescription: false,
        fetchSubtype: false,
        createSubtype: false,
        fetchItemTypes: false,
        createItemTypes: false,
        fetchType: false,
        createType: false,
        fetchStockData: false,
        createStock: false,
    },
    
    // Error states
    errors: {},
    
    // Message states for MessageBox
    message: null,
    messageCond: null,
};

// Create slice
const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
            state.messageCond = null;
        },
        clearErrors: (state) => {
            state.errors = {};
        },
        clearAllData: (state) => {
            state.areas = [];
            state.locations = [];
            state.uoms = [];
            state.size1 = [];
            state.size2 = [];
            state.materials = [];
            state.descriptions = [];
            state.subtypes = [];
            state.itemTypes = [];
            state.types = [];
            state.stockData = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // ========== Area Reducers ==========
            .addCase(fetchArea.pending, (state) => {
                state.loading.fetchArea = true;
                state.errors.fetchArea = null;
            })
            .addCase(fetchArea.fulfilled, (state, action) => {
                state.loading.fetchArea = false;
                state.areas = action.payload;
            })
            .addCase(fetchArea.rejected, (state, action) => {
                state.loading.fetchArea = false;
                state.errors.fetchArea = action.payload;
                state.message = `Failed to fetch areas: ${action.payload}`;
                state.messageCond = 'error';
            })
            .addCase(createArea.pending, (state) => {
                state.loading.createArea = true;
                state.errors.createArea = null;
            })
            .addCase(createArea.fulfilled, (state, action) => {
                state.loading.createArea = false;
                state.areas.push(action.payload);
                state.message = 'Area created successfully!';
                state.messageCond = 'success';
            })
            .addCase(createArea.rejected, (state, action) => {
                state.loading.createArea = false;
                state.errors.createArea = action.payload;
                state.message = `Failed to create area: ${action.payload?.detail}`;
                state.messageCond = 'error';
            })

            // ========== Location Reducers ==========
            .addCase(fetchLocation.pending, (state) => {
                state.loading.fetchLocation = true;
                state.errors.fetchLocation = null;
            })
            .addCase(fetchLocation.fulfilled, (state, action) => {
                state.loading.fetchLocation = false;
                state.locations = action.payload;
            })
            .addCase(fetchLocation.rejected, (state, action) => {
                state.loading.fetchLocation = false;
                state.errors.fetchLocation = action.payload;
                state.message = `Failed to fetch locations: ${action.payload}`;
                state.messageCond = 'error';
            })
            .addCase(createLocation.pending, (state) => {
                state.loading.createLocation = true;
                state.errors.createLocation = null;
            })
            .addCase(createLocation.fulfilled, (state, action) => {
                state.loading.createLocation = false;
                state.locations.push(action.payload);
                state.message = 'Location created successfully!';
                state.messageCond = 'success';
            })
            .addCase(createLocation.rejected, (state, action) => {
                state.loading.createLocation = false;
                state.errors.createLocation = action.payload;
                state.message = `Failed to create location: ${action.payload?.detail}`;
                state.messageCond = 'error';
            })

            // ========== UOM Reducers ==========
            .addCase(fetchUom.pending, (state) => {
                state.loading.fetchUom = true;
                state.errors.fetchUom = null;
            })
            .addCase(fetchUom.fulfilled, (state, action) => {
                state.loading.fetchUom = false;
                state.uoms = action.payload;
            })
            .addCase(fetchUom.rejected, (state, action) => {
                state.loading.fetchUom = false;
                state.errors.fetchUom = action.payload;
                state.message = `Failed to fetch UOMs: ${action.payload}`;
                state.messageCond = 'error';
            })
            .addCase(createUom.pending, (state) => {
                state.loading.createUom = true;
                state.errors.createUom = null;
            })
            .addCase(createUom.fulfilled, (state, action) => {
                state.loading.createUom = false;
                state.uoms.push(action.payload);
                state.message = 'UOM created successfully!';
                state.messageCond = 'success';
            })
            .addCase(createUom.rejected, (state, action) => {
                state.loading.createUom = false;
                state.errors.createUom = action.payload;
                state.message = `Failed to create UOM: ${action.payload?.detail}`;
                state.messageCond = 'error';
            })

            // ========== Size1 Reducers ==========
            .addCase(fetchSize1.pending, (state) => {
                state.loading.fetchSize1 = true;
                state.errors.fetchSize1 = null;
            })
            .addCase(fetchSize1.fulfilled, (state, action) => {
                state.loading.fetchSize1 = false;
                state.size1 = action.payload;
            })
            .addCase(fetchSize1.rejected, (state, action) => {
                state.loading.fetchSize1 = false;
                state.errors.fetchSize1 = action.payload;
                state.message = `Failed to fetch size1: ${action.payload}`;
                state.messageCond = 'error';
            })
            .addCase(createSize1.pending, (state) => {
                state.loading.createSize1 = true;
                state.errors.createSize1 = null;
            })
            .addCase(createSize1.fulfilled, (state, action) => {
                state.loading.createSize1 = false;
                state.size1.push(action.payload);
                state.message = 'Size1 created successfully!';
                state.messageCond = 'success';
            })
            .addCase(createSize1.rejected, (state, action) => {
                state.loading.createSize1 = false;
                state.errors.createSize1 = action.payload;
                state.message = `Failed to create size1: ${action.payload?.detail}`;
                state.messageCond = 'error';
            })

            // ========== Size2 Reducers ==========
            .addCase(fetchSize2.pending, (state) => {
                state.loading.fetchSize2 = true;
                state.errors.fetchSize2 = null;
            })
            .addCase(fetchSize2.fulfilled, (state, action) => {
                state.loading.fetchSize2 = false;
                state.size2 = action.payload;
            })
            .addCase(fetchSize2.rejected, (state, action) => {
                state.loading.fetchSize2 = false;
                state.errors.fetchSize2 = action.payload;
                state.message = `Failed to fetch size2: ${action.payload}`;
                state.messageCond = 'error';
            })
            .addCase(createSize2.pending, (state) => {
                state.loading.createSize2 = true;
                state.errors.createSize2 = null;
            })
            .addCase(createSize2.fulfilled, (state, action) => {
                state.loading.createSize2 = false;
                state.size2.push(action.payload);
                state.message = 'Size2 created successfully!';
                state.messageCond = 'success';
            })
            .addCase(createSize2.rejected, (state, action) => {
                state.loading.createSize2 = false;
                state.errors.createSize2 = action.payload;
                state.message = `Failed to create size2: ${action.payload?.detail}`;
                state.messageCond = 'error';
            })

            // ========== Material Reducers ==========
            .addCase(fetchMaterial.pending, (state) => {
                state.loading.fetchMaterial = true;
                state.errors.fetchMaterial = null;
            })
            .addCase(fetchMaterial.fulfilled, (state, action) => {
                state.loading.fetchMaterial = false;
                state.materials = action.payload;
            })
            .addCase(fetchMaterial.rejected, (state, action) => {
                state.loading.fetchMaterial = false;
                state.errors.fetchMaterial = action.payload;
                state.message = `Failed to fetch materials: ${action.payload}`;
                state.messageCond = 'error';
            })
            .addCase(createMaterial.pending, (state) => {
                state.loading.createMaterial = true;
                state.errors.createMaterial = null;
            })
            .addCase(createMaterial.fulfilled, (state, action) => {
                state.loading.createMaterial = false;
                state.materials.push(action.payload);
                state.message = 'Material created successfully!';
                state.messageCond = 'success';
            })
            .addCase(createMaterial.rejected, (state, action) => {
                state.loading.createMaterial = false;
                state.errors.createMaterial = action.payload;
                state.message = `Failed to create material: ${action.payload?.detail}`;
                state.messageCond = 'error';
            })

            // ========== Description Reducers ==========
            .addCase(fetchDescription.pending, (state) => {
                state.loading.fetchDescription = true;
                state.errors.fetchDescription = null;
            })
            .addCase(fetchDescription.fulfilled, (state, action) => {
                state.loading.fetchDescription = false;
                state.descriptions = action.payload;
            })
            .addCase(fetchDescription.rejected, (state, action) => {
                state.loading.fetchDescription = false;
                state.errors.fetchDescription = action.payload;
                state.message = `Failed to fetch descriptions: ${action.payload}`;
                state.messageCond = 'error';
            })
            .addCase(createDescription.pending, (state) => {
                state.loading.createDescription = true;
                state.errors.createDescription = null;
            })
            .addCase(createDescription.fulfilled, (state, action) => {
                state.loading.createDescription = false;
                state.descriptions.push(action.payload);
                state.message = 'Description created successfully!';
                state.messageCond = 'success';
            })
            .addCase(createDescription.rejected, (state, action) => {
                state.loading.createDescription = false;
                state.errors.createDescription = action.payload;
                state.message = `Failed to create description: ${action.payload?.detail}`;
                state.messageCond = 'error';
            })

            // ========== Subtype Reducers ==========
            .addCase(fetchSubtype.pending, (state) => {
                state.loading.fetchSubtype = true;
                state.errors.fetchSubtype = null;
            })
            .addCase(fetchSubtype.fulfilled, (state, action) => {
                state.loading.fetchSubtype = false;
                state.subtypes = action.payload;
            })
            .addCase(fetchSubtype.rejected, (state, action) => {
                state.loading.fetchSubtype = false;
                state.errors.fetchSubtype = action.payload;
                state.message = `Failed to fetch subtypes: ${action.payload}`;
                state.messageCond = 'error';
            })
            .addCase(createSubtype.pending, (state) => {
                state.loading.createSubtype = true;
                state.errors.createSubtype = null;
            })
            .addCase(createSubtype.fulfilled, (state, action) => {
                state.loading.createSubtype = false;
                state.subtypes.push(action.payload);
                state.message = 'Subtype created successfully!';
                state.messageCond = 'success';
            })
            .addCase(createSubtype.rejected, (state, action) => {
                state.loading.createSubtype = false;
                state.errors.createSubtype = action.payload;
                state.message = `Failed to create subtype: ${action.payload?.detail}`;
                state.messageCond = 'error';
            })

            // ========== Item Types Reducers ==========
            .addCase(fetchItemTypes.pending, (state) => {
                state.loading.fetchItemTypes = true;
                state.errors.fetchItemTypes = null;
            })
            .addCase(fetchItemTypes.fulfilled, (state, action) => {
                state.loading.fetchItemTypes = false;
                state.itemTypes = action.payload;
            })
            .addCase(fetchItemTypes.rejected, (state, action) => {
                state.loading.fetchItemTypes = false;
                state.errors.fetchItemTypes = action.payload;
                state.message = `Failed to fetch item types: ${action.payload}`;
                state.messageCond = 'error';
            })
            .addCase(createItemTypes.pending, (state) => {
                state.loading.createItemTypes = true;
                state.errors.createItemTypes = null;
            })
            .addCase(createItemTypes.fulfilled, (state, action) => {
                state.loading.createItemTypes = false;
                state.itemTypes.push(action.payload);
                state.message = 'Item type created successfully!';
                state.messageCond = 'success';
            })
            .addCase(createItemTypes.rejected, (state, action) => {
                state.loading.createItemTypes = false;
                state.errors.createItemTypes = action.payload;
                state.message = `Failed to create item type: ${action.payload?.detail}`;
                state.messageCond = 'error';
            })

            // ========== Type Reducers (CreateTypeSchema) ==========
            .addCase(fetchType.pending, (state) => {
                state.loading.fetchType = true;
                state.errors.fetchType = null;
            })
            .addCase(fetchType.fulfilled, (state, action) => {
                state.loading.fetchType = false;
                state.types = action.payload;
            })
            .addCase(fetchType.rejected, (state, action) => {
                state.loading.fetchType = false;
                state.errors.fetchType = action.payload;
                state.message = `Failed to fetch types: ${action.payload}`;
                state.messageCond = 'error';
            })
            .addCase(createType.pending, (state) => {
                state.loading.createType = true;
                state.errors.createType = null;
            })
            .addCase(createType.fulfilled, (state, action) => {
                state.loading.createType = false;
                state.types.push(action.payload);
                state.message = 'Type created successfully!';
                state.messageCond = 'success';
            })
            .addCase(createType.rejected, (state, action) => {
                state.loading.createType = false;
                state.errors.createType = action.payload;
                state.message = `Failed to create type: ${action.payload}`;
                state.messageCond = 'error';
            })

            // ========== Stock Data Reducers ==========
            .addCase(fetchStockData.pending, (state) => {
                state.loading.fetchStockData = true;
                state.errors.fetchStockData = null;
            })
            .addCase(fetchStockData.fulfilled, (state, action) => {
                state.loading.fetchStockData = false;
                state.stockData = action.payload;
            })
            .addCase(fetchStockData.rejected, (state, action) => {
                state.loading.fetchStockData = false;
                state.errors.fetchStockData = action.payload;
                state.message = `Failed to fetch stock data: ${action.payload}`;
                state.messageCond = 'error';
            })
            .addCase(createStock.pending, (state) => {
                state.loading.createStock = true;
                state.errors.createStock = null;
            })
            .addCase(createStock.fulfilled, (state, action) => {
                state.loading.createStock = false;
                state.stockData.push(action.payload);
                state.message = 'Stock created successfully!';
                state.messageCond = 'success';
            })
            .addCase(createStock.rejected, (state, action) => {
                state.loading.createStock = false;
                state.errors.createStock = action.payload;
                state.message = `Failed to create stock: ${action.payload}`;
                state.messageCond = 'error';
            });
    }
});

// Export actions
export const { clearMessage, clearErrors, clearAllData } = commonSlice.actions;

// Export selectors
export const selectAreas = (state) => state.common.areas;
export const selectLocations = (state) => state.common.locations;
export const selectUoms = (state) => state.common.uoms;
export const selectSize1 = (state) => state.common.size1;
export const selectSize2 = (state) => state.common.size2;
export const selectMaterials = (state) => state.common.materials;
export const selectDescriptions = (state) => state.common.descriptions;
export const selectSubtypes = (state) => state.common.subtypes;
export const selectItemTypes = (state) => state.common.itemTypes;
export const selectTypes = (state) => state.common.types;
export const selectStockData = (state) => state.common.stockData;
export const selectLoading = (state) => state.common.loading;
export const selectMessage = (state) => ({ 
    message: state.common.message, 
    cond: state.common.messageCond 
});

// Export reducer
export default commonSlice.reducer;