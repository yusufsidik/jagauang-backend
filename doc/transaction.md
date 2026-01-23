# API Spec Transaction

## Get All Transaction

Endpoint : GET /api/transaction

Response Success :

```json
{
  "data": [
    {
      "_id": "696ce360e631c5987057bbd2",
      "date": "1970-01-01T03:20:12.026Z",
      "sub_total": 15000,
      "name": "Makan Siang",
      "type": "pengeluaran"
    },
    {
      "_id": "696ce86eda8e640c1b5ad5a1",
      "date": "2026-01-27T03:20:12.026Z",
      "sub_total": 3500000,
      "information": "Gaji",
      "name": "Jualan",
      "type": "pemasukan"
    }
  ],
  "message": "Success get data transaction"
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
startDate : Date
endDate : Date

Default :
startDate : first date from this month and this year
endDate : last date from this month and this year

Response Success :

```json
{
    "data" : [
      "transactions": [
        {
          "name": "Makan Siang",
          "type": "pengeluaran",
          "sub_total": 15000,
          "information": "Pecel"
        },
        {
          "name": "Makan Siang",
          "type": "pengeluaran",
          "sub_total": 5000,
          "information": "Pentol"
        }
      ],
      "date": "19-01-2026"
    ],
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
  "category": "69674c361f7ddf17ddc33cfa",
  "sub_total": 15000,
  "information": ""
}
```

Response Success :

```json
{
  "data": {
    "_id": "6973764272afa1ed4721a0ab",
    "date": "2026-01-23T03:20:12.026Z",
    "category": "69674c361f7ddf17ddc33cfa",
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

Endpoint : PUT /api/transaction

Request Body :

```json
{
  "date": "1970-01-01T03:20:12.026Z",
  "category": "69674c361f7ddf17ddc33cfa",
  "sub_total": 15000,
  "information": ""
}
```

Response Success :

```json
{
  "data": {
    "_id": "6973764272afa1ed4721a0ab",
    "date": "2026-01-23T03:20:12.026Z",
    "category": "69674c361f7ddf17ddc33cfa",
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

Endpoint : DELETE /api/transaction

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
