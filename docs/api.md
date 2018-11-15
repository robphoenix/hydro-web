# Mock API

<!-- TOC depthFrom:2 -->

- [Monitors](#monitors)
  - [List Monitors](#list-monitors)
  - [Get Monitor](#get-monitor)
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
    "id": "4bb9918a-da0b-42c9-a651-bebdab9a42e8",
    "topic": "Car Barbados Dollar Quality-focused",
    "queryBody": "Quis quasi vero architecto excepturi quisquam nemo natus id harum. Omnis incidunt dignissimos libero delectus id voluptatem cupiditate doloribus cumque. Vero voluptate est.",
    "queryDescription": "Harum numquam molestias aut explicabo iusto ut ut.",
    "dateCreated": "2018-09-26T16:25:41.811Z",
    "expires": "2019-01-22T16:25:41.811Z",
    "categories": [
      {
        "id": "3babdf76-5760-4992-a05b-c4d30601544f",
        "value": "Datacenter",
        "dateCreated": "2018-11-14T07:54:25.201Z"
      },
      {
        "id": "2e21688d-8e1a-49f3-a211-138d506e622a",
        "value": "GavinEdwards",
        "dateCreated": "2018-05-19T16:16:36.912Z"
      },
      {
        "id": "fa080886-1a3a-4dec-be9c-83408b4f20f2",
        "value": "Bookmaker",
        "dateCreated": "2018-10-24T14:01:06.653Z"
      }
    ],
    "groups": [
      {
        "id": "131017cb-859a-4bfd-ba21-0587c0bf708b",
        "name": "Forensic Monitoring"
      },
      {
        "id": "c525249c-17cd-43f9-9eee-dd7a2ab825c8",
        "name": "Infrastructure"
      }
    ],
    "actionGroups": [
      {
        "name": "email",
        "actions": [
          {
            "id": "33be18f2-7246-47eb-95d4-440761748955",
            "name": "Multiple Logins Email Alert"
          },
          {
            "id": "6d722874-93cc-412e-accc-e8a262a7ebb0",
            "name": "FRM - Email - Generic"
          },
          {
            "id": "b0923019-a025-413d-b598-9872d00dc6c9",
            "name": "Email Test Service"
          }
        ]
      },
      {
        "name": "block",
        "actions": [
          {
            "id": "897acd3e-a98f-45b1-9c8d-389808b4cfe6",
            "name": "block sip 2 mins - Delay 20 seconds"
          },
          {
            "id": "e394d887-c22c-4e1a-a5e8-8717eb0307ee",
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
  "id": "4bb9918a-da0b-42c9-a651-bebdab9a42e8",
  "topic": "Car Barbados Dollar Quality-focused",
  "queryBody": "Quis quasi vero architecto excepturi quisquam nemo natus id harum. Omnis incidunt dignissimos libero delectus id voluptatem cupiditate doloribus cumque. Vero voluptate est.",
  "queryDescription": "Harum numquam molestias aut explicabo iusto ut ut.",
  "dateCreated": "2018-09-26T16:25:41.811Z",
  "expires": "2019-01-22T16:25:41.811Z",
  "categories": [
    {
      "id": "3babdf76-5760-4992-a05b-c4d30601544f",
      "value": "Datacenter",
      "dateCreated": "2018-11-14T07:54:25.201Z"
    },
    {
      "id": "2e21688d-8e1a-49f3-a211-138d506e622a",
      "value": "GavinEdwards",
      "dateCreated": "2018-05-19T16:16:36.912Z"
    },
    {
      "id": "fa080886-1a3a-4dec-be9c-83408b4f20f2",
      "value": "Bookmaker",
      "dateCreated": "2018-10-24T14:01:06.653Z"
    }
  ],
  "groups": [
    {
      "id": "131017cb-859a-4bfd-ba21-0587c0bf708b",
      "name": "Forensic Monitoring"
    },
    {
      "id": "c525249c-17cd-43f9-9eee-dd7a2ab825c8",
      "name": "Infrastructure"
    }
  ],
  "actionGroups": [
    {
      "name": "email",
      "actions": [
        {
          "id": "33be18f2-7246-47eb-95d4-440761748955",
          "name": "Multiple Logins Email Alert"
        },
        {
          "id": "6d722874-93cc-412e-accc-e8a262a7ebb0",
          "name": "FRM - Email - Generic"
        },
        {
          "id": "b0923019-a025-413d-b598-9872d00dc6c9",
          "name": "Email Test Service"
        }
      ]
    },
    {
      "name": "block",
      "actions": [
        {
          "id": "897acd3e-a98f-45b1-9c8d-389808b4cfe6",
          "name": "block sip 2 mins - Delay 20 seconds"
        },
        {
          "id": "e394d887-c22c-4e1a-a5e8-8717eb0307ee",
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
  "id": "c6b82033-807e-4985-9ffd-3d9256682392",
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
