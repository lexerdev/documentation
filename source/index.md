---
title: Lexer API Reference

language_tabs:
  - shell
  - ruby

toc_footers:
  - <a href='http://lexer.io'>Find out more about Lexer</a>
  - <a href='http://github.com/tripit/slate'>(Docs Powered by Slate)</a>

includes:
  - identities

search: true
---

# Introduction

Welcome to the Lexer API documentation.

We currently offer the following APIs to our clients:

- Identities: Allowing clients to Contribute and Consume Identity data from the Lexer platform.

All of our APIs communicate via HTTPS and JSON data. We offer Ruby Gems for most of our APIs.


## Fair Use

Lexer operates a fair use policy on all of its APIs.

Refer to your project's terms of service for details on rate limiting, performance limitations, maintenance windows and SLAs.

For further details please [contact support](mailto:support@lexer.io).


# Access Tokens

> Tokens are used as part of the JSON request body:

```shell
curl https://identity.lexer.io/identity \
  -XPOST \
  -H "Content-Type: application/json" \
  -d '
{
 "api_token": "lexer-api-token",
 "consumer_token": "lexer-consumer-token",
 "contributor_token":"lexer-contrib-token"
}'
```

```ruby
require 'lexer'

Lexer::Identity.configure do |config|
  config.api_token = 'lexer-api-token'
  config.contributor_token = 'lexer-contrib-token'
  config.consumer_token = 'lexer-consumer-token'
end
```

> Make sure to replace the tokens with those provided.

To access any Lexer API you will require unique `access tokens` which will be provided to you. Please [contact support](mailto:support@lexer.io) if you have not received these.

There are at least two of three possible tokens which you will need to communicate with the APIs:

* API Token + Consumer Token: Read only access to Lexer APIs
* API + Contributor Tokens: Write only access to Lexer APIs
* API + Consumer + Contributor Tokens: Read _and_ Write access to Lexer APIs

### API Token

An API token is required to communicate with our API.

All requests require an API token and a unique token will be provided to each party who wishes to communicate with the Lexer APIs.

An API token alone offers no access to the Lexer APIs. You need at least a Consumer or Contributor token to make a valid request. Both a Consumer and Contributor token can be provided in a single request payload for simultaneous read/write access.

### Consumer Token

A Consumer Token is supplied if the party requires **read** access to the Lexer APIs.

When created, a Consumer Token is locked to a specific namespace only granting that token access to a specific dataset.

A Consumer token does not allow a party to **write** data to a Lexer API. For that a Contributor token is required.

### Contributor Token

A Contributor token is supplied if the party requires **write** access to the Lexer APIs.

When created, a Contributor Token is locked to a specific namespace only granting that token access to a specific dataset.

<aside class="notice">
All contributor requests made to a Lexer API will have limited responses unless a Contributor token (<code>write</code> access) is paired with a Consumer token (<code>read</code> access).
</aside>

