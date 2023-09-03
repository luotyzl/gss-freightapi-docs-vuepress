
# GoSweetSpot Freight Api

<img src="https://gosweetspot.com/wp-content/uploads/2022/09/GSS-LOGO-tagline-2.svg"/>

Freight API provides programmatic access to GSS functionality and content.

The API is REST API and uses single token key authentication. Currently, return format for all endpoints is JSON.

## Authentication

We only support authenticated requests. Every api request needs to contain the following headers:

- **access_key** : your unqiue api key provided by GSS
- **site_id** : which site you are requesting action for
- **supportemail** :your developer email address, that we may email, if a high level of failures or request issues are encountered.
    

You can get your API access key by signing in to GoSweetSpot at [https://ship.gosweetspot.com](https://ship.gosweetspot.com) and going to your Administration > Preferences & Settings page, then expanding Advanced Settings and your API access key is at the bottom. Note that API access keys are different for each user and each account. It helps the API identify which client account and user to use.

## Rate Limiting

Presently we are not enforcing any rate-limiting. If you find that you are hitting our API at the rate of more than 60 calls per minute or 1000 calls per hour, then your usage needs to be reviewed. More often or not, there could be a better way to deal with the problem.

## Sandbox Account

You can create a sandbox account by visiting [https://ship.gosweetspot.com/opensandbox](https://ship.gosweetspot.com/opensandbox).

## Data Types and Formats

- All requests and responses are JSON format only.
- Date & Time, when not specified on the endpoint, the timezone will be NZ Timezone.
    

## Concepts

Customer orders and shipments are two important but different concepts in GoSweetSpot, where a customer order maps one-to-one with an order from an e-commerce system, whereas a shipment is one or more packages going to the same destination on the same carrier.

GoSweetSpot dispatches a customer order as one or more shipments depending on the nature, dimensions and weight of the items in the order. e.g. a single order with a large 30kg plant pot and some seed packets might be split into two shipments - 1 bulk carrier shipment for the plant pot and 1 courier shipment for the seed packets.

If you are integrating with an e-commerce, most likely youu will want to create customer orders rather than shipments, and the user will use GoSweetSpot's system to create the shipments from the orders.

## Common Use Cases

- You have a custom bespoke e-commerce or orders platform

<img src="https://gosweetspotcdn.blob.core.windows.net/images/GSS_FreightAPI_Case1.png">

Your site does not allow external systems to feed information into it directly.  
Your approach will be to publish orders to GSS once the orders are ready for dispatch/labelling. On the GSS system your user would process the order.  
At some stage your system will request the order status update from GSS.  
The api interactions would be:

1. **`PUT`** [api/customerorders](#customer-orders-get) - triggered from your site when order is ready for ticketting
2. Using the GSS web portal, your dispatcher tickets the goods.
3. **`GET`** [api/customerorders](#b6f8627d-2f2e-44ad-afa1-87bfcb1ce488) - triggered by your system every 6 hours, to get status update on the order published earlier.
    

- You have a very specialised dispatch workflow

<img src="https://gosweetspotcdn.blob.core.windows.net/images/GSS_FreightAPI_Case2.png">

You might have a special requirement to integrate the ticketing directly into your existing system. Using a external system to do one part of the workflow may affect performance and may not be acceptable. You can use the GSS api to build the ticketing into your system.  
The api interactions would be:

1. **`POST`** [**api/rates**](#993c59c1-f65f-4f7c-bdc0-0b7ae51e3b16) - your system at dispatch, calls the api to get all available freight options and rates
2. **`POST`** [**api/shipments**](#3f880b0c-f96b-4eb5-b182-9f1b7cecabc5) - the dispatcher reviews the freight options from (1) and makes a selection. A second call to generate the shipment is triggered.
    

- You use an open source platform

<img src="https://gosweetspotcdn.blob.core.windows.net/images/GSS_FreightAPI_Case3.png">

A lot of open source systems, also have a open API platform that GSS is able to tap into to build the integration directly from within GSS. We would consider any platform that our customers are using. However depending on platform popularity the implementation time frames would be considered. In the case that there are very few users on the platform, it may not be a sufficient business case for us to undertake the integration.

- Others

Surely there will be other cases that the api can be applied to. Talk to us, and we will be able to help.

## Endpoints

- Customer Orders

Using this endpoint, you can publish from your ERP or orders system, into the GSS orders queue. Once published, your operators on GSS will be able to search/scan/click on the order number, to automatically populate the order delivery details. This saves time entering the delivery details.

- **`GET`** [**api/customerorders**](/docs/2.1-Customer-Orders-Get.md)  
    Retreives the list of orders already published to GSS. This can be filtered on multiple criteria.
- **`PUT`** [**api/customerorders**](/docs/2.2-Customer-Orders-Put.md)  
    Publish into the GSS queue your orders.
    

- Price Enquiry / Rates Query

- **`POST`** [**api/rates**](#4472f15f-0c5b-4834-9b23-8a48ae1d6008) Returns your available rates for the origin to destination specified.
    

- Creating Shipments

- **`GET`** [**api/shipments**](#cb6128f9-dd7f-4a93-a9c7-210537f7fe54) Retreives all your historically created shipments, including current status details.
- **`POST`** [**api/shipments**](#3f880b0c-f96b-4eb5-b182-9f1b7cecabc5) Create a new shipment using a rate or with auto rating. Printing can be automatically triggered as well.
- **`DELETE`** [**api/shipments**](#f6275a2a-4028-4701-9f40-3b0b837d20e2) Deletes the specified shipment.
    

- Manifesting

- **`POST`** [**v2/publishmanifest**](#9e2ed754-66dd-4651-b9d0-0594a2e725e4) Batch and manifest your current shipments ready for collection. Available on certain carriers only.
    

- Printing

- **`GET`** [**/api/printers**](#743a6eda-315e-4bb5-856a-c20c6961aacd) returns a list of available printers
- **`GET`** [**/api/labels**](#8e98b732-be36-49e5-921c-1d17c170c495) download the labels as png or pdf
- **`POST`** [**/api/labels**](#449b0560-91d0-4b8f-bd0b-987f93258799) enqueues the supplied shipment for printing
- **`POST`** [**/api/labels/enqueue**](#58e399ec-bf1c-43ec-97ff-7517a8802003) enqueues a raw image into the print queue for printing
    

- Pickup Booking

- **`POST`** [**/api/pickupbooking**](#2a7a4323-975d-46b0-ac0d-068a6ad91d7b) book a driver to collect your parcels.
    

- Webhooks

GSS is able to provide feedback to your site using webhooks for certain action triggers.  
Actions that can be subscibed to include:

- Shipment created
- Shipment pickup registered by courier
- Shipment delivery registered by courier  
    [Configuration & Post data](#a9aa51a2-268f-46fc-a6cf-7a74c1ec1b80)
    

## Tracing Your Calls

We allow you to view your most recent api calls to us. To view use [https://ship.gosweetspot.com/developer/apitrace](https://ship.gosweetspot.com/developer/apitrace)  
This is provided to help you develop/debug your code.

## FAQ

- How do I connect to the API?

The API is only available to authenticated clients. Clients should authenticate users using an access_key obtained from the Preferences & Settings screen. Once authenticated, you need to request a resource from one of the endpoints using HTTP. Generally, reading any data is done through a request with GET method.

If the user with the access_key has access to multiple sites in the account, a `site_id` HTTP header with the site id is also required, e.g. `site_id: 123456`.

- What return formats do you support?

Freight API currently returns data in [JSON](http:/json.org/) format. Some methods may return \[XML\] data, however we don't actively test for XML compatibility.

- What kind of authentication is required?

Applications must identify themselves to access any resource.  
You need to contact your account manager to obtain a test access key.  
Every request requires a http header property `access_key`, as well as `support_email`. The Support Email should contain the IT Level contact for the organisation. This will be used to contacting you, should we find your requests need attention.

If the user with the access_key has access to multiple sites in the account, a `site_id` HTTP header with the site id is also required.

- Is there a request rate limit?

Presently there is no rate limiting on the api. We however reserve the right to enforce limits or block calls at our discretion. We request that you limit your requests to 60 calls per minute. If you expect to call at a higher rates, please contact us.

- Backwards Compatibility

We try to make every effort to ensure all our functions are backwards compatible. However as our system evolves, we cannot guarrantee that we will be able to support all old/deprecated functions forever. If you implementation breaks due to a change on our system, it will be your responsibility to update the functionality on your system.

- Should I crack on?

Sure, fire away, however, we do suggest you talk to us, prior to starting so we can understand your requirements and explain how best to use this api.