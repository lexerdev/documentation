# Identity API

The Lexer Identity API allows clients and their partners to read and write Identity information to [Lexer Identify](http://lexer.io).

For details on the capability and project specific implementation of [Lexer Identify](http://lexer.io) please contact support at [support@lexer.io](mailto:support@lexer.io).

Within the Lexer Identify platform an Identity is a person, brand, place or thing.
Each Identity has thousands of attributes which are generated and updated in real-time through the Lexer Identify platform.

Each Identity is made up of:

- **Links**: Unique, personally identifiable attributes including Email addresses, their Mobile number, Twitter handle, Facebook ID, etc.
- **Attributes**: An identity could contain thousands of attributes - each one defining their behaviour, facts and engagements, for example: `age`, `gender`, `favourite food`, `spouse`, etc.

Clients can use the Lexer Identify platform to gather real-time insights on their customers, prospects and competitors by:

1. Linking their proprietary data with one or more identities.
2. Contributing additional information to enrich the identity.
3. Consume an identities attributes into internal or 3rd party platforms for activation.

All this is done within the Identity API.

## Configuration

### Endpoints

```text
https://identity.api.lexer.io/
```

All access to the Lexer Identity API is performed via a single root endpoint. The correct behaviour of the API is determined by various input payload contexts.

All input must be sent via `POST` in JSON format.


### Payload

```json
{
 "api_token": "abc-123-...",
 "consumer_token": "qwe-345-...",
 "contributor_token": "ert-678-...",
 "id": "987-mnb-...",
 "links": {
   "email": "joe.blog@mybrand.com",
   "mobile": "+61404000000"
 },
 "attributes": {
   "com.mybrand.age": {...},
   "com.mybrand.car.color": {...}
 }
}
```

All input must be sent via `POST` in JSON format to the [ROOT endpoint](#root-endpoint) and must contain the following keys:

Key   | Required | Description
----- | --- | ----
api_token | Yes | The api token as provided by Lexer.
consumer_token | No | The consumer token as provided by Lexer.
contributor_token | No | The contributor token as provided by Lexer.
id | No | A Lexer ID if one is known. Is used over `links` if provided.
links | No | A key-value object of [linkage attributes](#links) unique to the Identity - only required if an `id` is not present.
attributes | No | An object of [attributes](#attributes) to be written to the Identity - only required if a `contributor_token` is present.


### Tokens

```shell
curl https://identity.api.lexer.io/identity \
  -XPOST \
  -H "Content-Type: application/json" \
  -d '
{
 "api_token": "your-api-token",
 "consumer_token": "your-consumer-token",
 "contributor_token": "your-contrib-token"
}'
```

```ruby
Lexer::Identity.configure do |config|
  config.api_token = 'lexer-api-token'
  config.contributor_token = 'lexer-contrib-token'
  config.consumer_token = 'lexer-consumer-token'
end
```

As outlined in [Access Tokens](#access-tokens) a set of tokens are required for all communication with the API.
An API token along with a Contributor and/or a Consumer token is required.

You can validate your tokens by making a `curl` request to the API. A `403 Forbidden` will be returned if your tokens are invalid.

Contact [support@lexer.io](mailto:support@lexer.io) if you require assistance.


## Namespaces

Each _Consumer Token_ and _Contributor Token_ is bound to a particular namespace.

A namespace is commonly defined as a reverse domain name. Such as `io.lexer`.

Namespaces are used within the platform to:

1. **Protect Secure Information**: Tokens can only read from defined namespaces, limiting each party's access to only the attributes permitted.
2. **Enforce Business Policy**: Our clients often have many partners with a complex permission tree. Using namespaces we’re able to allow certain partners to access certain attributes.

Each attribute on an Identity has a name within the namespace. For example:

- `io.lexer.age` defines the age of the Identity according to Lexer
- `com.mybrand.age` defines the age of the Identity according to MyBrand
- `com.mybrand.car.colour` defines the colour of the Identities car according to MyBrand

Please refer to the project's documentation on available namespaces for your implementation.

## Links

```json
{
 "links": {
   "email": ["joe.blog@mybrand.com", "joeblog1983@gmail.com"],
   "mobile": "+61404000000",
   "twitter": 1234567890,
   "facebook": 2345678901,
   "instagram": [3456789012, 4567890123],
   "com.mybrand.customer_id": 9876543210,
   "com.mybrand.loyalty_id": 6789054321
 },
 "attributes": {}
}
```

Internally the Lexer Identify platform uses links as a lookup for unique identities. They are also used to unify records across a Client's systems,  partner networks and Lexer's public data sources.

In each case the link must be globally unique - meaning the link must belong to just one identity.
An example of this is a mobile number, which in almost every case belongs to just one person, however an email may belong to more than one person - such as an email address provided by an ISP.

If a link is provided to Lexer which belongs to multiple Identities an [error](#errors) will be returned.

Currently, Lexer supports the following predefined links:

- `email`: the email address of the identity
- `mobile`: the mobile phone number of the identity - written in international format with no spaces i.e. +61404000000
- `twitter`: the Twitter id (not handle) of the identity
- `facebook`: the Facebook id (not username) of the identity
- `instagram`: the Instagram id (not username) of the identity

We also allow clients and partners to write their own identifiers to an identity using the namespaces provided.

This allows you to provide your own shared IDs for distribution through the Identify platform.
Common cases include an internal _customer id_, _device IDs_, _loyalty membership number_, etc.

These links should be named using the following formula `<namespace>.<link name>` i.e. `com.mybrand.customer_id`.

If multiple link values exist for a single identity (i.e. they have more than one email address) then simply provide the multiple values as an array.

## Attributes

```json
{
 "links": {},
 "attributes": {
  "com.mybrand.product.names": {
    "value": ["iphone", "ipad"],
    "confidence": 2
  },
  "com.mybrand.product.versions": {
    "value": ["iphone 6+", "ipad air 2"],
    "confidence": 2
  },
  "com.mybrand.customer_since": {
    "value": "2013-01-07T18:43:21Z",
    "confidence": 2
  },
  "com.mybrand.annual_spend": {
    "value": 2000.00,
    "confidence": 1
  },
  "com.mybrand.churn_risk": {
    "value": "low",
    "confidence": 0
  }
 }
}
```

An identity is made up of thousands of attributes defined by Lexer, our clients and partners.

When a contribution is made the changes becomes available to the client and their partners according to the [namespace](#namespaces) policies defined.

An attribute is defined by a:

Property | Description |
---------|-------------|
name   | The name of an attribute. Prefixed by the designated [namespace](#namespaces)
value  | The value of the attribute. A range of data types are allowed
confidence | The confidence score given by the contributor

### Name

An attribute name must be created following the formula `<namespace>.<attribute name>` i.e. `com.mybrand.products`.

When selecting a name for an attribute rely on the following guidelines:

* A name should only contain `A-Za-z0-9._` characters
* Should answer the question `What is Sarah's <attribute name>?` or `What are Sarah's <attribute name>`. i.e. `What is Sarah's age?` or `What are Sarah's upcoming trips?`

<aside class="notice">
The name needs to be globally unique as each contribution is a write to the system - therefore two attributes with the same name can not exist. An contribution on the same name will overwrite the existing attribute's value.
</aside>

Any contributions to attributes with names that conflict with the [namespace](#namespaces) policy will be rejected.


### Values

The API supports any values supported by the [JSON](http://json.org/) specification:

* Strings: `"hello world"`
* Numbers: `123.45`
* Objects: `{"make": "Tesla", "model": "S"}`
* Arrays: `["hello", "world", 123.45, {"make": "Tesla"}]`

If you wish to merge existing attribute values with a new value; for example the contents of an `array` or `object`; then you must first consume from the API and manage the merge yourself.

<aside class="notice">
All contributions overwrite existing values.

Lexer maintains a change log for security and auditing purposes. This log is not capable of restoring data due to issues with contributions.
</aside>

### Confidence

```ruby
# The following are the Ruby constants you should use
# to specify attribute confidence
Lexer::Identity::CONFIDENCE_INFERRED
Lexer::Identity::CONFIDENCE_CALCULATED
Lexer::Identity::CONFIDENCE_PROVIDED
```

Each attribute on an identity has a confidence score which is a constant defined by Lexer to help all clients understand the accuracy of the source or method of inference.

Score |Description
------|-----------
0     |Attribute is of low confidence - the value is most likely generated using aggregate data.
1     |Attribute has been calculated using one or more other attributes using a validated function or equation.
2     |Value is provided via customer or business data. Is considered factual.


## Contributions

```shell
curl https://identity.api.lexer.io/identity \
  -XPOST \
  -H "Content-Type: application/json" \
  -d '
{
 "api_token": "your-api-token",
 "contributor_token": "your-contrib-token",
 "links": {
  "email": "joe.blog@mybrand.com",
  "mobile": "+61404000000"
 },
 "attributes": {
  "com.mybrand.age": {
    "value": 32,
    "confidence": 2
  }
 }
}'

# Result
# {"id": "862d10d5..."}
```

```ruby
Lexer::Identity.configure do |config|
  config.api_token = 'lexer-api-token'
  config.contributor_token = 'lexer-contrib-token'
end

links = {
  email: 'joe.blog@mybrand.com',
  mobile: '+61404000000',
}

attributes = {
  'com.mybrand.age': {
    value: 32,
    confidence: Lexer::Identity::CONFIDENCE_PROVIDED
  }
}

identity = Lexer::Identity.enrich(links: links, attributes: attributes)
# <Lexer::Identity::EnrichedResult @id="862d10d5...">

identity.id
# 862d10d5...

identity.attributes
# nil
```

A contribution is the process of writing links and/or attributes to an new or existing identity.

The presence of a valid `contributor_token` in the input payload instructs the API to create or update a unique identity. Generally, two or more links, must be provided in order for an identity to be created.

Unless a consumer token is provided only a Lexer ID will be returned upon a successful contribution to the API, otherwise an [error](#status-codes) will be returned.

## Consumption

```shell
curl https://identity.api.lexer.io/identity \
  -XPOST \
  -H "Content-Type: application/json" \
  -d '
{
 "api_token": "your-api-token",
 "consumer_token": "your-consumer-token",
 "links": {
  "email": "joe.blog@mybrand.com",
  "mobile": "+61404000000"
 }
}'

# Result
# {"id": "862d10d5...", "attributes": {"com.mybrand.age": {"value": [32], "confidence": 2, "updated_at":"2015-06-23T11:51:16Z"}}}
```

```ruby
Lexer::Identity.configure do |config|
  config.api_token = 'lexer-api-token'
  config.consumer_token = 'lexer-consumer-token'
end

links = {
  email: "joe.blog@mybrand.com",
  mobile: "+61404000000",
}

identity = Lexer::Identity.enrich(links: links)
# <Lexer::Identity::EnrichedResult @id="862d10d5...", @attributes={"com.mybrand.age"=>{...}}>

identity.id
# 862d10d5...

identity.attributes
# {"com.mybrand.age"=>{"value"=>[32], "confidence"=>2, "updated_at"=>"2015-06-23T11:56:26Z"}}
```

A consumption is the process of reading attributes from an existing identity.

The presence of a valid `consumer_token` in the input payload instructs the API to return all attributes made available to the requester via the namespace policies defined on the account.

A `consumer_token` can be paired with a `contributor_token` which will result in a write then read procedure on the matched identity.


## Status Codes

```json
{"error": "403 Forbidden"}
```

HTTP status codes are returned to indicate the success or failure of a request. In addition, error messages are returned via a JSON object response.

HTTP Status | Description
------------|--------------
200 OK|An existing Identity was found and returned.
201 Created|A new Identity has been created. A Lexer ID will be returned.
400 Bad Request|The payload contained invalid data.
403 Forbidden|Your request has been denied due to an invalid/missing `api_token` and or `contributor_token`/`consumer_token`.
404 Not Found|The Lexer ID provided alongside a `consumer_token` was not found.
406 Not Acceptable|There were not enough valid `links` provided alongside a `contributor_token` for an Identity to be created.
500 Internal Server Error|An internal server error occurred.

