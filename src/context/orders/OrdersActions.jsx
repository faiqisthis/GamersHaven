import orders from '../../api/orders'
export const getOrders=async () => {
    try {
        const response=await orders.get('/api/v1/orders')
        if (response.data.success){
          return response.data
    }
 } catch (error) {
       console.log("Error fetching orders: ",error) 
    }
  }

export const deleteOrder=async(id)=>{
    try {
        const response=await orders.delete(`/api/v1/orders/${id}`)
        if(response){
            return response.data
        }
    } catch (error) {
        console.log("Error while deleting order:",error)
    }
}

// Create an order (user-facing)
export const createOrder = async (dispatch, payload) => {
    try {
        const response = await orders.post('/api/v1/orders', payload);
        if (response?.data?.success) {
            // Dispatch newly created order to state
            dispatch && dispatch({ type: 'ADD_ORDER', payload: response.data.data });
            return response.data;
        }
        return { success: false };
    } catch (error) {
        console.log('Error while creating order:', error);
        return { success: false, error: error?.response?.data || error.message };
    }
}

// Get current user's orders
export const getMyOrders = async (dispatch) => {
    try {
        const response = await orders.get('/api/v1/orders/my');
        if (response?.data?.success) {
            dispatch && dispatch({ type: 'SET_ORDERS', payload: response.data.data });
            return response.data;
        }
        return { success: false };
    } catch (error) {
        console.log('Error while fetching my orders:', error);
        return { success: false, error: error?.response?.data || error.message };
    }
}

