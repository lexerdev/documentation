# Activity

Using the Activity API, you can retrieve performance data on your team operating within Lexer Engage. Access insightful metrics such as the number of closed cases, average response time, or your overall NPS score for last month. We’ve made your Activity data accessible so you can run bespoke reports or add them to your custom applications.

Our API is organised into two sections; Get and Post requests. Get requests allow you to access the user, groups and forms information related to your team. These are useful for filtering your reports. Post requests are queries that comprise of particular report types and filter parameters. Reports may be filtered by users, groups, forms or time.

## API Tokens

You will need an API token to access your Activity data. Tokens are managed within the Settings area of the Hub, and require Manager permissions to access. All endpoints require an API token to authenticate your requests.

## GET Users

Retrieve a list of users that have access to your Lexer account. You can use these user details to filter any of the Activity queries for agent specific metrics. Here we'll describe how you request and interpret this information.

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" -X GET https://api.lexer.io/v1/users
```

**Endpoint**
`https://api.lexer.io/v1/users`

```json
  {
    "id": 12345,
    "email": "jane@business.io",
    "first_name": "Jane",
    "last_name": "Remington",
    "timezone": "Australia/Sydney",
    "gmtoffset": 10,
    "sign_in_count": 76,
    "last_sign_in_at": "2018-03-21T06:09:01Z",
    "archived": false,
    "groups": [
      123,
      456,
      789,
    ]
  }
```


Property | Description | Type |
---------|-------------|------|
id  | user id | integer
email  | email account used to login | string
first_name  | first name of the user | string
last_name  | last name of the user | string
timezone | timezone location of user | string
gmtoffset | timezone offset of user | integer
sign_in_count | count of logins | integer
last_sign_in_at | date of users last login | string
archived | archived flag for user | boolean
groups | groups the user is in | array


## GET Groups

Retrieve a list of groups that exist in your Lexer account. You can use these group details to filter any of the Activity queries for team specific metrics. Here we'll describe how you request and interpret this information.

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" -X GET https://api.lexer.io/v1/groups
```

**Endpoint**
`https://api.lexer.io/v1/groups`

```json

  {
    "id": 123,
    "name": "Social Customer Care",
    "comment": "Social customer care team members"
  }
```


Property | Description | Type |
---------|-------------|------|
id  | group id | integer
name  | name of the group | string
comment  | description of the group | string



## GET Forms

Retrieve a list of forms/surveys that exist in your Lexer account. These include NPS surveys, authentication forms, and competition surveys. You need to specifiy the NPS Survey id when requesting the NPS Summary or NPS Volume data. Here we'll describe how you request and interpret this information.

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" -X GET https://api.lexer.io/v1/forms
```

**Endpoint**
`https://api.lexer.io/v1/forms`

```json
  {
    "id": 55,
    "name": "NPS Survey",
    "title": "Lexer NPS Survey",
    "archived": false,
    "created_at": "2018-05-26T21:54:19Z",
    "groups": [
      123
    ],
    "nps": false,
    "form_url": "https://d1z1wrkt4y2iqm.cloudfront.net/123455678899876543/1/form"
  }
```


Property | Description | Type |
---------|-------------|------|
id  | group id | integer
name  | name of the form | string
title  | title of the form | string
archived  | archived flag | boolean
created_at | date this form was created | string
groups | groups that have access to this form | array
nps | is this form an NPS survey? | boolean
form_url | URL to view this form | string


## Summary


**Summary Metrics**

Access the summary metrics that are used to power the big number metrics you can see in Activity. This includes the number of objects handled, response count, average response time, agent handle time and a few others.



```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "summary",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Type:** summary

```json
{
  "total_volume": 7526,
  "avg_response_time": 1315.27098046203,
  "min_response_time": 50.702796,
  "max_response_time": 200663.392234,
  "avg_action_response_time": 509.337687048021,
  "min_action_response_time": 4.908278,
  "max_action_response_time": 199826.523834,
  "total_responded_to": 3582,
  "broke_sla": 166,
  "broke_action_sla": 45,
  "avg_response_time_min": 21.9211830077005,
  "avg_action_response_time_min": 8.48896145080035
}
```
Property | Description | Type |
---------|-------------|------|
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type



**Summary Volume**

Description: daily volume of objects in each workflow state.

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "states_volume",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Type:** states_volume

Property | Description | Type |
---------|-------------|------|
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type




**Classifications (Objects)**

Description: classifications and their associated count of objects.

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "classifications",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Type:** classifications

Property | Description | Type |
---------|-------------|------|
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type



**Response Time**

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "response_volume",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Type:** response_volume

Property | Description | Type |
---------|-------------|------|
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type





## Team 

**Agent Volume**

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "user_volume",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Type:** user_volume

Property | Description | Type |
---------|-------------|------|
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type




**Agent Summary**

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "user_summary",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Type:** user_summary

Property | Description | Type |
---------|-------------|------|
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type






## Cases

**Case Summary**

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "case_summary",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Type:** case_summary

Property | Description | Type |
---------|-------------|------|
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type





**Case Volume**

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "case_volume",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Type:** case_volume


Property | Description | Type |
---------|-------------|------|
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type





**Case Classifications**

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "case_classifications",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Type:** case_classifications

Property | Description | Type |
---------|-------------|------|
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type
field  | description | type




## NPS

**NPS Summary**

Description: 

Request: 

**NPS Volume**

Description: 

Request: 


## Errors

## Rate Limiting

The API may rate limit requests made by your application. Our rate limits are managed by an allowed number of requests per time window. A single request could be to retrieve a list of users, or query a particular chart endpoint. 

The rate limit is **100 requests per 5 minutes per API Token.**

In the case you are rate limited a "429 Rate limited exceeded" response will be returned.