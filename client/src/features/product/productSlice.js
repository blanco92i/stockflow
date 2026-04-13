import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import productService from './productService';

const productDefaultState = {
    _id: null,
    name: '',
    price: 0,
    stock: 0,
}

const initialState = {
    products: [],
    product: productDefaultState,
    loading: false,
    error: null,
    isSuccess: false,
};


export const getAllProducts = createAsyncThunk(
    'products/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await productService.getProducts();
            console.log('🔍 Réponse serveur produits:', response);
            return response;
        } catch (error) {
            console.error('❌ Erreur produits:', error);
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Get product by ID
export const getProductById = createAsyncThunk(
    'products/getById',
    async (id, thunkAPI) => {
        try {
            const response = await productService.getProductById(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Create a new product
export const createProduct = createAsyncThunk(
    'products/create',
    async (productData, thunkAPI) => {
        try {
            const response = await productService.createProduct(productData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);


// Update a product
export const updateProduct = createAsyncThunk(
    'products/update',
    async ({ id, productData }, thunkAPI) => {
        try {
            const response = await productService.updateProduct(id, productData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id, thunkAPI) => {
        try {
            const response = await productService.deleteProduct(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data || action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle other cases for getProductById, createProduct, updateProduct, deleteProduct similarly
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.products = [...state.products, action.payload];
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = [...state.products, action.payload];
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map((product) =>
                    product.id === action.payload.id ? action.payload : product
                );
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((product) => product.id !== action.payload.id);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default productSlice.reducer;