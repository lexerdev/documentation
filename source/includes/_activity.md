# Activity

Using the Activity API, you can retrieve performance metrics on your team operating within Lexer Engage. Access insightful metrics such as the number of closed cases, average response time, or your overall NPS score for last month. We’ve made your Activity data accessible so you can run bespoke reports or add them to your custom applications.

Our API is organised into two sections; Get and Post requests. Get requests allow you to access the user, groups and forms information related to your team. These are useful for filtering your reports. Post requests are queries that comprise of particular report types and filter parameters. Reports may be filtered by users, groups, forms or time.

## API Tokens

You will need an API token to access your Activity data. Tokens are managed within the Settings area of the Hub, and require Manager permissions to access and manage. All requests require an API token to authenticate you.

## GET Users
Request: https://api.lexer.io/v1/users


## GET Groups
Request: https://api.lexer.io/v1/groups


## GET Forms
Request: https://api.lexer.io/v1/forms


## Summary

**Summary Metrics**
Description: count of objects handled, count of objects responded to, average response time, longest response time, count of objects that exceeded the SLA period.
Request: summary

**Summary Volume**
Description: daily volume of objects in each workflow state.
Request: states_volume

**Classifications (Objects)**
Description: classifications and their associated count of objects.
Request: classifications

**Response Time**
Description: daily average response time.
Request: response_volume

## Team 

**Agent Volume**
Description: count of states for objects currently assigned to individual agents.
Request: user_volume

**Agent Summary**
Description: count of states for objects currently assigned to individual agents.
Request: user_summary

## Cases

**Case Summary**
Description: 
Request: 

**Case Volume**
Description: 
Request: 

**Case Classifications**
Description: 
Request: 

## NPS

**NPS Summary**
Description: 
Request: 

**NPS Volume**
Description: 
Request: 


## Errors

**Error Responses**

**Rate Limiting**