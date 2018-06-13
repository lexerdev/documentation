# Activity

Using the Activity API, you can retrieve performance data on your team operating within Lexer Engage. Access insightful metrics such as the number of closed cases, average response time, or your overall NPS score for last month. We’ve made your Activity data accessible so you can run bespoke reports or add them to your applications.

Our API is organised into two sections; Get and Post requests. Get requests allow you to access the user, groups and forms information related to your team. These are useful for filtering your reports. Post requests are queries that comprise of particular report types and filter parameters. Reports may be filtered by users, groups, forms and time.

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
id  | user id | number
email  | email account used to login | string
first_name  | first name of the user | string
last_name  | last name of the user | string
timezone | timezone location of user | string
gmtoffset | timezone offset of user | number
sign_in_count | count of logins | number
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
id  | group id | number
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
id  | group id | number
name  | name of the form | string
title  | title of the form | string
archived  | archived flag | boolean
created_at | date this form was created | string
groups | groups that have access to this form | array
nps | is this form an NPS survey? | boolean
form_url | URL to view this form | string


## Summary

Access your teams high level performance metrics - including total objects handled, response times, and classifications on these objects.

![Source Volume](../images/activity/activity_summary.png)


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

**Endpoint**
`https://api.lexer.io/v1/activity/reports`

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
total_volume | total objects handled | number
avg_response_time | average customer to reponse time in seconds | number
min_response_time | min customer to reponse time in seconds | number
max_response_time | max customer to reponse time in seconds | number
avg_action_response_time | average assign to response time in seconds | number
min_action_response_time | min assign to response time in seconds | number
max_action_response_time | max assign to response time in seconds | number
total_responded_to | objects responded to | number
broke_sla | number of objects that exceeded customer SLA time | number
broke_action_sla | number of objects that exceeded agent handle SLA time   | number
avg_response_time_min | average customer response time in minutes | number
avg_action_response_time_min | average agent handle time in minutes | number


<br/><br/><br/><br/><br/><br/>


**Summary Volume**

Daily volume of objects in each workflow state. Your response will contain an array for each state, and within that state an object for each period (i.e. each day).

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "states_volume",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Endpoint**
`https://api.lexer.io/v1/activity/reports`

**Type:** states_volume


```json
{
  "closed": [
    {
      "state": "closed",
      "value": 174,
      "date_range": {
        "date_from": "2018-04-27 00:00"
      }
    },
    {
      "state": "closed",
      "value": 234,
      "date_range": {
        "date_from": "2018-04-28 00:00"
      }
    },
    {
      "state": "closed",
      "value": 255,
      "date_range": {
        "date_from": "2018-04-29 00:00"
      }
    },
    {
      "state": "closed",
      "value": 108,
      "date_range": {
        "date_from": "2018-04-30 00:00"
      }
    }
  ]
}
```

Property | Description | Type |
---------|-------------|------|
state  | workflow state | string
value  | number of objects in this state | number
date_range  | date for value | string

**Notes:**
  Most results will be found in the 'closed' state. We suggest using this volume to map total volume over time.

  If your query range is less than 4 days the time intervals will be reduced from days to hours.


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>


**Classifications (Objects)**

Classifications and the number of objects in each workflow state. You can get the total count for each classification using the 'all_states' value.

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "classifications",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Endpoint**
`https://api.lexer.io/v1/activity/reports`

**Type:** classifications

```json
[
  {
    "classification_id": 123,
    "classification": "amusing",
    "state": "assigned",
    "volume": 1
  },
  {
    "classification_id": 123,
    "classification": "amusing",
    "state": "all_states",
    "volume": 3
  },
  {
    "classification_id": 123,
    "classification": "amusing",
    "state": "closed",
    "volume": 1
  },
  {
    "classification_id": 123,
    "classification": "amusing",
    "state": "responded",
    "volume": 1
  },
  {
    "classification_id": 143,
    "classification": "customer service",
    "state": "responded",
    "volume": 1
  },
  {
    "classification_id": 143,
    "classification": "customer service",
    "state": "all_states",
    "volume": 1
  }
]
```

Property | Description | Type |
---------|-------------|------|
classification_id |  unique id | number
classification |  name | string
state |  workflow state | string
volume |  count of classifications | number



**Response Time**

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "response_volume",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Endpoint**
`https://api.lexer.io/v1/activity/reports`

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

Access your teams individual performance data - including objects handled per agent, response times, and more.

![Source Volume](../images/activity/activity_team.png)


**Agent Volume**

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "user_volume",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Endpoint**
`https://api.lexer.io/v1/activity/reports`

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
**Endpoint**
`https://api.lexer.io/v1/activity/reports`

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


Access performance metrics on the conversations your team are having, which we call cases. This includes total case volume, first response times, resolution times, and case classifications.

![Source Volume](../images/activity/activity_cases.png)


**Case Summary**

```text
curl -H "Content-Type: application/json" -H "Auth-Api-Token: 12345678-1234-1234-1234-123456789" https://api.lexer.io/v1/activity/reports -d '
{
  "type": "case_summary",
  "date_from": "2018-04-01T00:00:00+11:00",
  "date_to": "2018-04-30T23:59:59+11:00"
}'
```
**Endpoint**
`https://api.lexer.io/v1/activity/reports`

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
**Endpoint**
`https://api.lexer.io/v1/activity/reports`

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
**Endpoint**
`https://api.lexer.io/v1/activity/reports`

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

Access your teams NPS performance metrics - including overall score, count of detractors, promoters, passives, and your average response rate.

![Source Volume](../images/activity/activity_nps.png)


**NPS Summary**

Description: 

**Endpoint**
`https://api.lexer.io/v1/activity/reports`

**Type:** nps_summary

**NPS Volume**

Description: 

**Endpoint**
`https://api.lexer.io/v1/activity/reports`

**Type:** nps_volume


## Errors

## Rate Limiting

The API may rate limit requests made by your application. Our rate limits are managed by an allowed number of requests per time window. A single request could be to retrieve a list of users, or query a particular chart endpoint. 

The rate limit is **100 requests per 5 minutes per API Token.**

In the case you are rate limited a "429 Rate limited exceeded" response will be returned.