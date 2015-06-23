# Identity API

The Lexer Identity API allows clients and their partners to read and write Identity information to [Lexer Identify](http://lexer.io).

For details on the capability and project specific implementation of [Lexer Identify](http://lexer.io) please contact support at [support@lexer.io](mailto:support@lexer.io).
  
An Identity is a person, brand, place or thing.
Each Identity has thousands of attributes which are generated and updated in real-time through the Lexer Identify platform.

Each Identity is made up of:

- **Links**: Highly personal and unique attributes such as Email address, Mobile number, Twitter handle, Facebook ID, etc. These attributes belong to a single identity.
- **Attributes**: An identity could contain thousands of attributes - each one defining their behaviour, facts and engagements. Examples are `age`, `gender`, `favourite food`, `spouse`, etc.

Clients can use the Lexer Identify platform to gather real-time insights on their customers, prospects and competitors by:

1. Linking their proprietary data with a Lexer Identity
2. Contributing additional information to enrich the Lexer Identity
3. Consume the Identities attributes into internal or 3rd party platforms for activation

All this is done within the Identity API.

## Configuration

### ROOT Endpoint

```text
https://identity.api.lexer.io/
```

All access to the Lexer Identity API is performed via a single root endpoint. The correct behaviour of the API is determined by various input payload contexts. All input must be securely `POST`ed in JSON format to this URL:

### Payload

```json
{
 "api_token": "abc-123-...",
 "consumer_token": "qwe-345-...",
 "contributor_token": "ert-678-...",
 "id": "987-mnb-...",
 "links": {
   "email": "joe.blog@mybrand.com",
   "mobile": "+61404555444"
 },
 "attributes": {
   "com.mybrand.age": 32,
   "com.mybrand.car.colour": "red"
 }
}
```

All input must be securely `POST`ed in JSON format to the [ROOT endpoint](#root-endpoint) and must contain the following keys:

Key   | Required | Description
----- | --- | ----
api_token | Yes | The api token as provided by Lexer.
consumer_token | No | The consumer token as provided by Lexer.
contributor_token | No | The contributor token as provided by Lexer.
id | No | A Lexer ID if one is known. Is used over `links` if provided.
links | No | A hash of [linkage attributes](#links) unique to the Identity. Only required if an `id` is not present.
attributes | No | A hash of [attributes](#attributes) to be written to the Identity. Only required if a `contributior_token` is present.


### Tokens

```shell
curl https://identity.api.lexer.io/identity \
  -XPOST \
  -H "Content-Type: application/json" \
  -d ‘
{
 "api_token": "your-api-token",
 "consumer_token": "your-consumer-token",
 "contributor_token": "your-contrib-token"
}’
```

```ruby
curl https://identity.api.lexer.io/identity \
  -XPOST \
  -H "Content-Type: application/json" \
  -d ‘
{
 "api_token": "your-api-token",
 "consumer_token": "your-consumer-token",
 "contributor_token": "your-contrib-token"
}’
```

As outlined in [Access Tokens](#access-tokens) a set of tokens are required for all communication with the API.

An API token along with a Contributor and/or a Consumer token is required.

You can validate your tokens by making a `curl` request to the API.

A `403 Forbidden` will be returned if your tokens are invalid.

Contact [support@lexer.io](mailto:support@lexer.io) if you require assistance.


## Contributions

The presence of a valid `contributor_token` in the input payload instructs the Identity API to create or update a unique identity. Generally, two or more _linkage attributes_, or `links`, that are unique to an identity, must be provided in order for an identity to be created.

### Namespaces

Each _Consumer Token_ and _Contributor Token_ is bound to a particular namespace.

A namespace is commonly defined as a reverse domain name. Such as `io.lexer.*`.

Namespaces are used within the platform to:

1. **Protect Secure Information**: Tokens can only read from defined namespaces, limiting each parties access to only the attributes permitted.
2. **Enforce Business Policy**: Our clients often have many partners with a complex permission tree. Using namespaces we’re able to allow certain partners to access certain attributes.

Each attribute on an Identity has a name within the namespace. For example:

- `io.lexer.age` defines the age of the Identity according to Lexer
- `com.mybrand.age` defines the age of the Identity according to MyBrand
- `com.mybrand.car.colour` defines the colour of the Identities car according to MyBrand

Please refer to the projects documentation on available namespaces for your implementation.

### Links

### Attributes

### Updates

## Consumption

## Status Codes

HTTP status codes are returned to indicate the success or failure of a request. In addition, error messages are returned via a JSON object response.

```
{"error":"403 Forbidden"}
```


HTTP Status|Description
----|---
200 OK|An existing Identity was found and returned.
201 Created|A new Identity has been created. A Lexer ID will be returned.
400 Bad Request|The payload contained invalid data.
403 Forbidden|Your request has been denied due to an invalid/missing `api_token` and or `contributor_token`/`consumer_token`.
404 Not Found|The Lexer ID provided alongside a `consumer_token` was not found.
406 Not Acceptable|There were not enough valid `links` provided alongside a `contributor_token` for an Identity to be created.
500 Internal Server Error|An internal server error occurred.


# Examples
