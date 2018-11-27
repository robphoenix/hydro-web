# Mock API

<!-- TOC depthFrom:2 -->

- [Monitors](#monitors)
  - [List Monitors](#list-monitors)
  - [Get Monitor](#get-monitor)
  - [Create Monitor](#create-monitor)
  - [Remove Monitor](#remove-monitor)
  - [Get Monitor Data](#get-monitor-data)

<!-- /TOC -->

## Monitors

### List Monitors

```
GET /monitors
```

**Response**

```
Status: 200 OK
```

```json
[
  {
    "id": 1269,
    "name": "Car Barbados Dollar Quality-focused",
    "queryBody": "Quis quasi vero architecto excepturi quisquam nemo natus id harum. Omnis incidunt dignissimos libero delectus id voluptatem cupiditate doloribus cumque. Vero voluptate est.",
    "queryDescription": "Harum numquam molestias aut explicabo iusto ut ut.",
    "type": "standard",
    "status": "live",
    "dateCreated": "2018-09-26T16:25:41.811Z",
    "expires": "2019-01-22T16:25:41.811Z",
    "categories": [
      {
        "id": 1,
        "name": "Datacenter"
      },
      {
        "id": 2,
        "name": "GavinEdwards"
      },
      {
        "id": 3,
        "name": "Bookmaker"
      }
    ],
    "groups": [
      {
        "id": 1,
        "name": "Forensic Monitoring"
      },
      {
        "id": 2,
        "name": "Infrastructure"
      }
    ],
    "actionGroups": [
      {
        "name": "email",
        "actions": [
          {
            "id": 1,
            "name": "Multiple Logins Email Alert"
          },
          {
            "id": 2,
            "name": "FRM - Email - Generic"
          },
          {
            "id": 3,
            "name": "Email Test Service"
          }
        ]
      },
      {
        "name": "block",
        "actions": [
          {
            "id": 4,
            "name": "block sip 2 mins - Delay 20 seconds"
          },
          {
            "id": 5,
            "name": "Block stk or sip for 2 hours"
          }
        ]
      }
    ]
  }
]
```

### Get Monitor

```
GET /monitors/:id
```

**Response**

```
Status: 200 OK
```

```json
{
  "id": 12689,
  "name": "Car Barbados Dollar Quality-focused",
  "queryBody": "Quis quasi vero architecto excepturi quisquam nemo natus id harum. Omnis incidunt dignissimos libero delectus id voluptatem cupiditate doloribus cumque. Vero voluptate est.",
  "queryDescription": "Harum numquam molestias aut explicabo iusto ut ut.",
  "type": "system",
  "status": "live",
  "dateCreated": "2018-09-26T16:25:41.811Z",
  "expires": "2019-01-22T16:25:41.811Z",
  "categories": [
    {
      "id": 1,
      "name": "Datacenter"
    },
    {
      "id": 2,
      "name": "GavinEdwards"
    },
    {
      "id": 3,
      "name": "Bookmaker"
    }
  ],
  "groups": [
    {
      "id": 1,
      "name": "Forensic Monitoring"
    },
    {
      "id": 2,
      "name": "Infrastructure"
    }
  ],
  "actionGroups": [
    {
      "name": "email",
      "actions": [
        {
          "id": 1,
          "name": "Multiple Logins Email Alert"
        },
        {
          "id": 2,
          "name": "FRM - Email - Generic"
        },
        {
          "id": 3,
          "name": "Email Test Service"
        }
      ]
    },
    {
      "name": "block",
      "actions": [
        {
          "id": 4,
          "name": "block sip 2 mins - Delay 20 seconds"
        },
        {
          "id": 5,
          "name": "Block stk or sip for 2 hours"
        }
      ]
    }
  ]
}
```

### Create Monitor

```
POST /monitors
```

**Example**

```json
{
  "name": "Car Barbados Dollar Quality-focused",
  "queryBody": "Quis quasi vero architecto excepturi quisquam nemo natus id harum. Omnis incidunt dignissimos libero delectus id voluptatem cupiditate doloribus cumque. Vero voluptate est.",
  "queryDescription": "Harum numquam molestias aut explicabo iusto ut ut.",
  "type": "standard",
  "categories": [
    {
      "id": 1,
      "name": "Datacenter"
    },
    {
      "id": 2,
      "name": "GavinEdwards"
    },
    {
      "id": 3,
      "name": "Bookmaker"
    }
  ],
  "groups": [
    {
      "id": 1,
      "name": "Forensic Monitoring"
    },
    {
      "id": 2,
      "name": "Infrastructure"
    }
  ],
  "actionGroups": [
    {
      "name": "email",
      "actions": [
        {
          "id": 1,
          "name": "Multiple Logins Email Alert"
        },
        {
          "id": 2,
          "name": "FRM - Email - Generic"
        },
        {
          "id": 3,
          "name": "Email Test Service"
        }
      ]
    },
    {
      "name": "block",
      "actions": [
        {
          "id": 4,
          "name": "block sip 2 mins - Delay 20 seconds"
        },
        {
          "id": 5,
          "name": "Block stk or sip for 2 hours"
        }
      ]
    }
  ]
}
```

**Response**

```
Status: 201 Created
```

```json
{
  "id": 12384,
  "name": "Car Barbados Dollar Quality-focused",
  "queryBody": "Quis quasi vero architecto excepturi quisquam nemo natus id harum. Omnis incidunt dignissimos libero delectus id voluptatem cupiditate doloribus cumque. Vero voluptate est.",
  "queryDescription": "Harum numquam molestias aut explicabo iusto ut ut.",
  "type": "standard",
  "status": "live",
  "dateCreated": "2018-09-26T16:25:41.811Z",
  "expires": "2019-01-22T16:25:41.811Z",
  "categories": [
    {
      "id": 1,
      "name": "Datacenter"
    },
    {
      "id": 2,
      "name": "GavinEdwards"
    },
    {
      "id": 3,
      "name": "Bookmaker"
    }
  ],
  "groups": [
    {
      "id": 1,
      "name": "Forensic Monitoring"
    },
    {
      "id": 2,
      "name": "Infrastructure"
    }
  ],
  "actionGroups": [
    {
      "name": "email",
      "actions": [
        {
          "id": 1,
          "name": "Multiple Logins Email Alert"
        },
        {
          "id": 2,
          "name": "FRM - Email - Generic"
        },
        {
          "id": 3,
          "name": "Email Test Service"
        }
      ]
    },
    {
      "name": "block",
      "actions": [
        {
          "id": 4,
          "name": "block sip 2 mins - Delay 20 seconds"
        },
        {
          "id": 5,
          "name": "Block stk or sip for 2 hours"
        }
      ]
    }
  ]
}
```

### Remove Monitor

```
DELETE /monitors/:id
```

**Response**

```
Status: 204 No Content
```

### Get Monitor Data

```
GET /monitors/:id/data
```

**Response**

```
Status: 200 OK
```

```json
{
  "id": 12673,
  "headers": [
    "parse",
    "Branding",
    "Spurs",
    "web-readiness",
    "Human",
    "Plastic"
  ],
  "timeStamp": "2018-11-15T06:04:26.118Z",
  "esperItems": [
    [
      {
        "key": "parse",
        "value": "green"
      },
      {
        "key": "Branding",
        "value": "73.83.31.16"
      },
      {
        "key": "Spurs",
        "value": "Plastic success Orchestrator Investment Account"
      },
      {
        "key": "web-readiness",
        "value": "Research"
      },
      {
        "key": "Human",
        "value": "EXE Future-proofed"
      },
      {
        "key": "Plastic",
        "value": "68.178.222.245"
      }
    ],
    [
      {
        "key": "parse",
        "value": "ubiquitous"
      },
      {
        "key": "Branding",
        "value": "175.149.104.128"
      },
      {
        "key": "Spurs",
        "value": "bypassing Romania Tasty bus"
      },
      {
        "key": "web-readiness",
        "value": "Sleek"
      },
      {
        "key": "Human",
        "value": "repurpose GB Books neural"
      },
      {
        "key": "Plastic",
        "value": "233.247.128.160"
      }
    ],
    [
      {
        "key": "parse",
        "value": "Kansas"
      },
      {
        "key": "Branding",
        "value": "77.252.202.251"
      },
      {
        "key": "Spurs",
        "value": "Florida Granite Yuan Renminbi Underpass"
      },
      {
        "key": "web-readiness",
        "value": "Diverse"
      },
      {
        "key": "Human",
        "value": "Shoes pink Plaza Robust"
      },
      {
        "key": "Plastic",
        "value": "243.104.208.120"
      }
    ]
  ]
}
```
