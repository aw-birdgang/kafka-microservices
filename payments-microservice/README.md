### 
````
https://developer.paypal.com/api/rest/


````




## paypal order
## https://developer.paypal.com/docs/api/orders/v2/#orders_create
````

>>>>> request

var fetch = require('node-fetch');
fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
        'Authorization': 'Bearer 6V7rbVwmlM1gFZKW_8QtzWXqpcwQ6T5vhEGYNJDAAdn3paCgRpdeMdVYmWzgbKSsECednupJ3Zx5Xd-g'
    },
    body: JSON.stringify({ "intent": "CAPTURE", "purchase_units": [ { "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b", "amount": { "currency_code": "USD", "value": "100.00" } } ], "payment_source": { "paypal": { "experience_context": { "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED", "brand_name": "EXAMPLE INC", "locale": "en-US", "landing_page": "LOGIN", "shipping_preference": "SET_PROVIDED_ADDRESS", "user_action": "PAY_NOW", "return_url": "https://example.com/returnUrl", "cancel_url": "https://example.com/cancelUrl" } } } })
});

>>>>> response
{
  "id": "5O190127TN364715T",
  "status": "PAYER_ACTION_REQUIRED",
  "payment_source": {
    "paypal": {}
  },
  "links": [
    {
      "href": "https://api-m.paypal.com/v2/checkout/orders/5O190127TN364715T",
      "rel": "self",
      "method": "GET"
    },
    {
      "href": "https://www.paypal.com/checkoutnow?token=5O190127TN364715T",
      "rel": "payer-action",
      "method": "GET"
    }
  ]
}

````


