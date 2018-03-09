# Content API

Our Content API allows you to access social and news content the data powering each chart in a simple JSON format. Access to these endpoints is retrieved via the charts themselves by clicking on the small link button in the top right corner of each chart, which can be seen in edit mode.

For details on how to build a Command Screen please read our [learn article](https://learn.lexer.io/export-and-report/command/command-screens) or contact support via live chat or at [support@lexer.io](mailto:support@lexer.io).

## Prerequisites

- **Listen**: to create your saved dives the define your search
- **Command**: to creat the screens to display various charts. Here you will access the endpoints for each chart.


## Configuration

Access is performed via endpoints generated from live screens. Generate your screens to display the information that your require, and retrieve the constructed endpoint by clicking on the link button in the top right corner.

### Endpoints

Endpoints look like the example displayed to the right. They always include the account id, screen id, chart id, and finally the client token. Note that Command screens are designed for public use and can be accessed without authentication.

```text
https://clients.lexer.io/api/clients/{account_id}/screens/{screen_id}/charts/{chart_id}/result?client_token={client token}
```
All of your requests should match this format.


### Parameters

Requests can be modified with two paramaters to adjust the date range or filter for specific terms.

```text
;date_ending=2018-02-21
```

Append date_ending to adjust the ending date of your query. This will adjust the time window of your chart to finish at this day or time.

```text
;terms=lexer
;terms=lexer%20OR%20data
```

Append terms to filter your saved dive even further. Here we're filtering for mentions of *Lexer OR Data*. Tip: it's easier to define this from your saved dive within Listen!



## Live Stream Volume

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
}
```

The Live Stream Volume chart will return a data object for each filter presented in the chart. In this example we're just looking at the Nintendo filter. Within this object are the count of mentions for each time interval.

Also included in this response is the total number of mentions and various other information to render this in the chart interface.


## Terms Volume
