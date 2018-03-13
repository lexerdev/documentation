# Content

Our Content API allows you to access social and news content in a simple JSON format. Your queries are defined by saved dives within Listen, and your endpoints are retrieved from the Command charts they are connected to. Once you have a chart displaying in Command, simply click on the small link button in the top right corner.

Read our [help article](https://learn.lexer.io/export-and-report/command/command-screens) for details on building a Command screen or contact support via live chat or at [support@lexer.io](mailto:support@lexer.io).

## Prerequisites

- **Listen**: to create your saved dives that define your search.
- **Command**: to create the charts using your saved dives.


## Configuration

Unlike traditional APIs, your requests for the Content API must be created from our live dashboard feature Command. Your Command screen allows you to test and visualise the results before retrieving the API endpoint. Once you're happy with the results, simply click the link button on the top right corner of the chart and your request will be provided in the URL.

### Endpoints
```text
https://clients.lexer.io/api/clients/{account_id}/screens/{screen_id}/charts/{chart_id}/result?client_token={client token}
```
Retrieved from each chart in your screen, endpoints look like the example displayed to the right. They always include the account id, screen id, chart id, and your client token. Note that Command screens are designed for public use and can be accessed without authentication.

All of your requests should match this format.


### Parameters
```text
;date_ending=2018-02-21
```
Requests can be modified with two paramaters to adjust the date range or filter for specific terms.

Append date_ending to adjust the ending date of your query. This will adjust the time window of your chart to finish at this day or time.

```text
;terms=lexer
;terms=lexer%20OR%20data
```

Append terms to filter your saved dive even further. Here we're filtering for mentions of *Lexer OR Data*. Tip: it's easier to define this from your saved dive within Listen!


## Summary Metrics

Here we'll describe the summary bar and live stream volume charts.

```json
{
  "id": 18041857,
  "updated_at": "2018-03-13T02:04:04Z",
  "data": {
    "mentions": 67700,
    "sources": 3,
    "authors": 46134,
    "reach": 284297204,
    "influence": 13139,
    "average_engagements": 1.4674643430008236
  }
}
```
### Summary Bar

The summary bar displays the headline metrics for your saved dive. Each of the individual big number charts (i.e. Matches, Authors) uses the same query and will return all of the results.

- `mentions`: the total number of objects matching your query.

- `sources`: where the content has come from i.e. Twitter.

- `authors`: unique authors that have published this content.

- `reach`: sum of the followers for each author.

- `influence`: Lexer calculated influence score for this result (not displayed in chart). Calculated using followers, following, count of posts and lists on Twitter.

- `average_engagements`: mentions divided by authors.



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
### Live Stream Volume
The Live Stream Volume chart will return a data object for each filter presented in the chart. In this example we're just looking at the Nintendo filter. Within this object are the count of mentions for each time interval.

Also included in this response is the total number of mentions and various other information to render this in the chart interface.

Our volume charts bucket counts into time intervals based on the period covered in the report. Here is a summary of the query ranges and corresponding time intervals returned.
- `<2 days`: results are grouped into 1 hour intervals.
- `2-3 days`: results are grouped into 3 hour intervals.
- `7 days`: results are grouped into 12 hour intervals.
- `8+ days`: results are grouped into 1 day intervals.

Note: all of our volume over time charts are returned using unix time.

## Mentions
Let's take a closer look at the mention objects that are displayed in the Recent Mentions, Influential Mentions, and Recent Media charts. Each of these charts returns the top 100 hits for the query, allowing you to recreate a display feed of content in your app.

<%= image_tag 'example_tweet.png %>

Here we'll review a Tweet from the @camplexer account. All of the information that is displayed in our charts is found in the _data_ section of the payload. Let's take a closer look in the table below.

Property | Description |
---------|-------------|
content  | Body of the message.
geography | Location details about the message.
geography.accuracy | Supplied if specifically provided with the content. Guessed if inferred from the account settings. Uknown if no location data is provided.
geography.code | State and city code provided for this location.
geography.point | Latitude and longitude points.
mentions | Details on links or authors mentioned in the content.
mentions.links | Array of links in the content.
mentions.mentions | Other objects mentioned i.e. a retweet.
mentions.authors | Other authors tagged in the content.


## Terms

Terms volume, top terms table

## Sources

Top sources, source types, source groups

## Authors

Influential authors, engaged authors

## Locations

Top locations

## Classifications

Classification counts

