import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StockService from '../services/StockService';

// =========================
// STOCK DATA THUNKS
// =========================
export const fetchStockData = createAsyncThunk(
    'stock/fetchStockData',
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await StockService.fetchStockData(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateStock = createAsyncThunk(
    'stock/updateStock',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await StockService.updateStock(id, data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// =========================
// TYPE DATA THUNKS
// =========================
export const fetchType = createAsyncThunk(
    'stock/fetchType',
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await StockService.fetchType(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateType = createAsyncThunk(
    'stock/updateType',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await StockService.updateType(id, data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// =========================
// INITIAL STATE
// =========================
const initialState = {
    // Stock Data
    stockData: [],
    stockPagination: {
        current_page: 1,
        limit: 100,
        total_count: 0,
        total_pages: 0
    },
    
    // Type Data
    typeData: [],
    typePagination: {
        current_page: 1,
        limit: 100,
        total_count: 0,
        total_pages: 0
    },
    
    // Loading states
    loading: {
        fetchStockData: false,
        updateStock: false,
        fetchType: false,
        updateType: false,
    },
    
    // Error states
    errors: {},
    
    // Message states
    message: null,
    messageCond: null,
};

// =========================
// SLICE
// =========================
const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
            state.messageCond = null;
        },
        clearErrors: (state) => {
            state.errors = {};
        },
        clearStockData: (state) => {
            state.stockData = [];
            state.stockPagination = initialState.stockPagination;
        },
        clearTypeData: (state) => {
            state.typeData = [];
            state.typePagination = initialState.typePagination;
        }
    },
    extraReducers: (builder) => {
        builder
            // ========== STOCK DATA ==========
            .addCase(fetchStockData.pending, (state) => {
                state.loading.fetchStockData = true;
                state.errors.fetchStockData = null;
            })
            .addCase(fetchStockData.fulfilled, (state, action) => {
                state.loading.fetchStockData = false;
                state.stockData = action.payload.data;
                state.stockPagination = action.payload.pagination;
            })
            .addCase(fetchStockData.rejected, (state, action) => {
                state.loading.fetchStockData = false;
                state.errors.fetchStockData = action.payload;
                state.message = `Failed to fetch stock data: ${action.payload?.detail || action.payload}`;
                state.messageCond = 'error';
            })
            .addCase(updateStock.pending, (state) => {
                state.loading.updateStock = true;
                state.errors.updateStock = null;
            })
            .addCase(updateStock.fulfilled, (state, action) => {
                state.loading.updateStock = false;
                // Update the item in the array
                const index = state.stockData.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.stockData[index] = action.payload;
                }
                state.message = 'Stock updated successfully!';
                state.messageCond = 'success';
            })
            .addCase(updateStock.rejected, (state, action) => {
                state.loading.updateStock = false;
                state.errors.updateStock = action.payload;
                state.message = `Failed to update stock: ${action.payload?.detail || action.payload}`;
                state.messageCond = 'error';
            })
            
            // ========== TYPE DATA ==========
            .addCase(fetchType.pending, (state) => {
                state.loading.fetchType = true;
                state.errors.fetchType = null;
            })
            .addCase(fetchType.fulfilled, (state, action) => {
                state.loading.fetchType = false;
                state.typeData = action.payload.data;
                state.typePagination = action.payload.pagination;
            })
            .addCase(fetchType.rejected, (state, action) => {
                state.loading.fetchType = false;
                state.errors.fetchType = action.payload;
                state.message = `Failed to fetch type data: ${action.payload?.detail || action.payload}`;
                state.messageCond = 'error';
            })
            .addCase(updateType.pending, (state) => {
                state.loading.updateType = true;
                state.errors.updateType = null;
            })
            .addCase(updateType.fulfilled, (state, action) => {
                state.loading.updateType = false;
                const index = state.typeData.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.typeData[index] = action.payload;
                }
                state.message = 'Type updated successfully!';
                state.messageCond = 'success';
            })
            .addCase(updateType.rejected, (state, action) => {
                state.loading.updateType = false;
                state.errors.updateType = action.payload;
                state.message = `Failed to update type: ${action.payload?.detail || action.payload}`;
                state.messageCond = 'error';
            });
    }
});

export const { clearMessage, clearErrors, clearStockData, clearTypeData } = stockSlice.actions;

// Selectors
export const selectStockData = (state) => state.stock.stockData;
export const selectStockPagination = (state) => state.stock.stockPagination;
export const selectTypeData = (state) => state.stock.typeData;
export const selectTypePagination = (state) => state.stock.typePagination;
export const selectStockLoading = (state) => state.stock.loading;
export const selectStockMessage = (state) => ({ 
    message: state.stock.message, 
    cond: state.stock.messageCond 
});

export default stockSlice.reducer;