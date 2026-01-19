# API Spec Category


## Get All Category
Endpoint : GET /api/category

Response Success : 
```json 
{
    "data" : [
        {
            "_id" : "1",
            "name" : "Gaji",
            "type" : "pemasukan"
        },
        {
            "_id" : "2",
            "name" : "Makan Siang",
            "type" : "pengeluaran"
        }
    ],
    "message" : "Success get category"
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
    "name" : "String",
    "type" : "pemasukan"
}
```

Response Success : 
```json 
{
    "data" : {
        "_id" : "1",
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
            "_id" : "1",
            "name" : "Gaji",
            "type" : "pemasukan"
        },
        {
            "_id" : "2",
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
    "name" : "String",
    "type" : "pemasukan"
}
```

Response Success : 
```json 
{
    "data" : {
        "_id" : "1",
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