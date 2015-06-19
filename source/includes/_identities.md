# Identities API

TODO - identities spiel.

### ROOT Endpoint

All access to the Lexer Identity API is performed via a single root endpoint. The correct behavior of the API is determined by various input payload contexts. All input must be securely `POST`ed in JSON format to this URL:

`https://identity.api.lexer.io/`

### Namespaces

TODO - namespace stuff.


## Contributions

The presence of a valid <code>contributor_token</code> in the input payload instructs the Identity API to create or update a unique identity. Generally, two or more _linkage attributes_, or `links`, that are unique to an identity, must be provided in order for an identity to be created.

### Links

### Attributes

### Updates

## Consumption


## Errors
