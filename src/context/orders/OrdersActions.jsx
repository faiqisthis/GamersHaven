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

