# Command API

Lexer Command allows you to access the underlying data that powers each chart displayed on a screen via an API. Access to these endpoints is retrieved via the charts themselves by clicking on the small link button in the top right corner of each chart.

For details on how to build a Command Screen please read our [learn article](https://learn.lexer.io/export-and-report/command/command-screens) or contact support via live chat or at [support@lexer.io](mailto:support@lexer.io).

## Prerequisites




## Configuration

Access to the Command API is performed via endpoints generated from live screens. Generate your screens to display the information that your require, and retrieve the constructed endpoint by clicking on the link button in the top right corner.

Next we'll look at the various charts and the response formats they provide.

### Endpoints

```text
https://clients.lexer.io/api/clients/{account_id}/screens/{screen_id}/charts/{chart_id}/result?client_token={client token}
```

All access to the Command API is performed via a single root endpoint, extended by the parameters that define the account id, screen id, chart id and the client token.



### Parameters

All endpoints can be modified with specific paramaters to adjust the date range or filter for specific terms.

```text
;date_ending=2018-02-21
```

Updating the date ending time:


```text
;terms=lexer
```

```text
;terms=lexer%20OR%20data
```

Adding a terms filter to your query:


### Live Stream Volume

```json
{
  "id": 17633606,
  "updated_at": "2018-02-22T03:14:51Z",
  "data": {
    "Nintendo": {
      "data": {
        "1519185600000": 1459,
        "1519189200000": 1284,
        "1519192800000": 1243,
        "1519196400000": 1123,
        "1519200000000": 1422,
        "1519203600000": 1295,
        "1519207200000": 1388,
        "1519210800000": 1764,
        "1519214400000": 1899,
        "1519218000000": 1748,
        "1519221600000": 1956,
        "1519225200000": 2111,
        "1519228800000": 2185,
        "1519232400000": 2243,
        "1519236000000": 2044,
        "1519239600000": 2082,
        "1519243200000": 2174,
        "1519246800000": 2024,
        "1519250400000": 1825,
        "1519254000000": 1701,
        "1519257600000": 1514,
        "1519261200000": 1427,
        "1519264800000": 1289,
        "1519268400000": 364
      },
      "original": [...],
      
      "summary": {
        "current": {
          "mentions": 39564
        }
      },
      "id": 5448,
      "color": "#ed1941"
    }
  }
}```

The Live Stream Volume chart will return a data object for each filter presented in the chart. In this example we're just looking at the Nintendo filter. Within this object are the count of mentions for each time interval.

Also included in this response is the total number of mentions and the color code of the line chart.


### Terms Volume
