# API Spec Category


## Get All Category
Endpoint : GET /api/category

Query Params : 
- page: Number, default = 1
- limit: Number, default = 10

Response Success : 
```json 
{
    "success": true,
    "message": "Success get data",
    "data" : [
        {
            "_id": "123456789123456789546123",
            "name": "Makan Siang",
            "type": "pengeluaran",
            "__v": 0
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 33,
        "totalpages": 4
    }
}
```
Response Error : 
```json 
{
    "message" : "Failed get categories"
}
```

## Create Category

Endpoint : POST /api/category

Request Body : 
```json 
{
    "name" : "Gaji",
    "type" : "pemasukan"
}
```

Response Success : 
```json 
{
    "data" : {
        "_id" : "123456789123456789546123",
        "name" : "Gaji",
        "type" : "pemasukan"
    },
    "message" : "Success create category"
}
```
Response Error : 
```json 
{
    "message" : "Failed create category, name must be a string"
}
```

## Get data category by type

Endpoint : GET /api/category/:type
```
type : ["pemasukan","pengeluaran"]
```

Response Success : 
```json 
{
    "data" : [
        {
            "_id" : "123456789123456789546123",
            "name" : "Gaji",
            "type" : "pemasukan"
        },
        {
            "_id" : "123456789123456789546123",
            "name" : "Deposito",
            "type" : "pemasukan"
        }
    ],
    "message" : "Success get category pemasukan"
}
```
Response Error : 
```json 
{
    "message" : "Failed get categories pemasukan"
}
```

## Update Category 

Endpoint : PUT /api/category/:id

Request Body : 
```json 
{
    "name" : "Gaji",
    "type" : "pemasukan"
}
```

Response Success : 
```json 
{
    "data" : {
        "_id" : "123456789123456789546123",
        "name" : "Gaji",
        "type" : "pemasukan"
    },
    "message" : "Success update category"
}
```
Response Error : 
```json 
{
    "message" : "Failed update category, name must be a string"
}
```

## Delete Category

Endpoint : DELETE /api/category/:id

Response Success : 
```json 
{
    "message" : "Success delete category"
}
```
Response Error : 
```json 
{
    "message" : "Failed delete category"
}
```