# API Spec Transaction

## Get All Transaction

Endpoint : GET /api/transaction

Query Params : 
- page : Number, default = 1
- limit : Number, default = 10

Response Success :

```json
{
  "success" : true,
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 14,
    "totalpages": 2
  },
  "data": [
    {
      "_id": "123456789123456789546123",
      "date": "1970-01-01T03:20:12.026Z",
      "sub_total": 15000,
      "name": "Makan Siang",
      "type": "pengeluaran"
    },
  ],
  "message": "Success get transactions"
}
```

Response Error :

```json
{
  "message": "Failed get data transaction"
}
```

## Get Transaction By Date

Endpoint : GET /api/transaction/date

Query params :
- startDate : Date, default = first date on this month, format = Y-m-d
- endDate : Date, default = end date on this month, format = Y-m-d
- page : Number, default = 1
- limit : Number, default = 10

Response Success :

```json
{
    "success" : true,
    "data" : [
      {
        "transactions": [
          {
            "name": "Makan Siang",
            "type": "pengeluaran",
            "sub_total": 15000,
            "information": "Pecel yutun"
          },
          {
            "name": "Makan Siang",
            "type": "pengeluaran",
            "sub_total": 15000,
            "information": "Pecel Mbah mir"
          },
        ],
        "date": "19-01-2026"
      },
      {
        "transactions": [
          {
            "name": "Belanja Online",
            "type": "pengeluaran",
            "sub_total": 2000000,
            "information": "Kursi geming"
          }
        ],
        "date": "20-01-2026"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 4,
      "totalpages": 1
    },
    "message" : "Success get data transaction by date"
}
```

Response Error :

```json
{
  "message": "Failed get data transaction"
}
```

## Create Transaction

Endpoint : POST /api/transaction

Request Body :

```json
{
  "date": "1970-01-01T03:20:12.026Z",
  "category": "123456789123456789546123",
  "sub_total": 15000,
  "information": ""
}
```

Response Success :

```json
{
  "data": {
    "_id": "123456789123456789546123",
    "date": "2026-01-23T03:20:12.026Z",
    "category": "123456789123456789546123",
    "sub_total": 15000,
    "information": "test"
  },
  "message": "Success create transaction"
}
```

Response Error :

```json
{
  "message": "Failed create transaction, sub_total must be a number"
}
```

## Update Transaction

Endpoint : PUT /api/transaction/:id

Request Body :

```json
{
  "date": "1970-01-01T03:20:12.026Z",
  "category": "123456789123456789546123",
  "sub_total": 15000,
  "information": ""
}
```

Response Success :

```json
{
  "data": {
    "_id": "123456789123456789546123",
    "date": "2026-01-23T03:20:12.026Z",
    "category": "123456789123456789546123",
    "sub_total": 15000,
    "information": "test"
  },
  "message": "Success update transaction"
}
```

Response Error :

```json
{
  "message": "Failed update transaction, sub_total must be a number"
}
```

## Delete Transaction

Endpoint : DELETE /api/transaction:id

Response Success :

```json
{
  "message": "Success delete transaction"
}
```

Response Error :

```json
{
  "message": "Failed delete transaction"
}
```
