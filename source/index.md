---
title: Lexer API Reference

language_tabs:
  - shell
  - ruby

toc_footers:
  - <a href='http://lexer.io'>Find out more about Lexer</a>
  - <a href='http://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - identities
  - events
  - publish

search: true
---

# Introduction

Welcome to the Lexer API.

We offer three APIs to our clients:

- Identities: Allowing clients to Contribute and Consume Identity data from the Lexer platform.
- Events: Allowing clients to push Event data to the Lexer platform.
- Publish: Allowing clients to extract and publish search results and other insights from the Lexer platform.

To access any of the APIs you will require `access tokens` which may have been provided to you. Please [contact support](mailto:support@lexer.io) if you have not received these.

All our API's communicate via HTTPS using RESTful and [JSON](http://json.org/) data. We offer Ruby Gems for most of our APIs.


# Fair Use

Lexer operates a fair use policy on all it's APIs.

Refer to your projects terms of service for details on rate limiting, performance limitations, maintenance windows and SLAs.

For further details please [contact support](mailto:support@lexer.io).


# Access Tokens

> Tokens are used as part of the JSON request body:

```shell
curl -X POST -H "Content-Type: application/json" --data '{"api_token":"lexer-api-token","consumer_token":"lexer-consumer-token","contributor_token":"lexer-contrib-token", ... }' https://identity.apis.lexer.io
```

```ruby
# Using the `lexer-identity` Gem:
Lexer::Identity.configure do |config|
  config.api_token = 'lexer-api-token'
  config.consumer_token = 'lexer-consumer-token'
  config.contributor_token = 'lexer-contrib-token'
end
```

> Make sure to replace the tokens with those provided.

Lexer protects it's APIs through access tokens.

In all cases a unique token should be generated for each party who should communicate with the APIs.

Lexer can dispose of and recreate API tokens whenever required should a token be feared to have been leaked or a party should no longer require access to the APIs.

There are at least two of three possible tokens which you will need to communicate with the APIs:

* API Token + Consumer Token: Read only access to Lexer APIs
* API + Contributor Tokens: Write only access to Lexer APIs
* API + Consumer + Contributor Tokens: Read and Write access to Lexer APIs

## API Token

An API token is required to communicate with our API.

All requests require an API token and a unique token will be provided to each party who wishes to communicate with the Lexer APIs.

An API token alone offers no access to the Lexer APIs you need at lease a Consumer or Contributor (or one of each) tokens to make a valid request.

## Consumer Token

A Consumer Token is supplied if the party requires `read` access to the Lexer APIs.

When created a Consumer Token is locked to a specific namespace only granting that token access to a specific dataset.

A Consumer token does not allow a party to `write` data to a Lexer API.
For that a Contributor token is required.

## Contributor Token

A Contributor token is supplied if the party requires `write` access to the Lexer APIs.

When created a Contributor Token is locked to a specific namespace only granting that token access to a specific dataset.

All requests made to the Lexer API will have limited responses unless a Contributor token (`write` access) is paired with a Consumer token (`read` access).

