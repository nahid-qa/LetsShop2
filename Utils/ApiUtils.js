class ApiUtils {
   
    constructor(apiContext,loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }


    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: this.loginPayload
        });
        
        const loginReponseJson = await loginResponse.json();
        const token = loginReponseJson.token;
       return token;
    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
                data: orderPayload,
                headers: {
                    'authorization': response.token,
                    'content-type': 'application/json'
                }
            });
            
        
            const orderResponseJson = await orderResponse.json();
            const orderId = orderResponseJson.orders[0];
            console.log(`This is the OrderId ${orderId}`)
            response.orderId = orderId
            return response;
    }

}
module.exports = {ApiUtils};
