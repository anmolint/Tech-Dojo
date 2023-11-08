# Tech-Dojo Book-Store

# API- Description

## User API

 ### Registration

       This is the first part of the book store you need to be registered to  be able to access the book store
        ```
        TYPE : POST
        url :/users/register
        {
            email:"a unique email value",
            password:"a password
        }```
      this will register Our User  into our system and then user can get their token by using the Login api

 ### Login

     This is the first part of the book store you need to be registered to  be able to access the book store
        ```
        TYPE : POST
        url :/users/login

        {
            email:"a unique email value",
            password:"a password
        }```

        this will return a
        ```{
                "code": "User-LoggedIn-Successfully",
                "message": "You logged in to the Book lab successfully",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGI0YjkxNjYwNmUxNmFlZDg1Y2ZmMiIsImlhdCI6MTY5OTQzNTIwMCwiZXhwIjoxNjk5NDM4ODAwfQ.w2GhW2FzoTd3sQSCUOHiY0FJehtpnUr3wIsq8AzrwHE"
            }```

        the token then can be used to access the the books endpoints

## Books API

 ### create

    This endpoint is used to add books to collection the constraint here is that we cant add same book title with same author

    ```
    TYPE : POST
    URL :/books
    authorization: BEARER {TOKEN}
    {
        "title": "Harry Potter and Prisoner of Askaban",
        "author": "J.K Rowling",
        "summary":"A ancient kingdom saga adapted into famous T.V Series Game of thrones "
    }

```
 ### get-book-by-ID

  This endpoint can be used to get book by id requires valid object id
```
TYPE :GET
URL /books/:id
{
"success": true,
"book": {
"\_id": "654b84927a1459b3fdc34398",
"title": "Harry Potter and Prisoner of Askaban",
"author": "J.K Rowling",
"summary": "A story about a young wizard",
"deleted": false,
"\_\_v": 0
}
}
```
### Get Books
This endpoint is used to get the list of  all the books
```
TYPE :GET
URL /books
{
"success": true,
"book": {
"\_id": "654b84927a1459b3fdc34398",
"title": "Harry Potter and Prisoner of Askaban",
"author": "J.K Rowling",
"summary": "A story about a young wizard",
"deleted": false,
"\_\_v": 0
}
}
```
### update-books
 This endpoint is used to update the books tittle ,Author ,and descriptions
 ```
 TYPE :PUT
 URL /books/:id
 request body 
 {
  "summary":"A story about a young wizard"
 }
 response
 {
  "success": true,
  "book": {
    "_id": "654b84927a1459b3fdc34398",
    "title": "Harry Potter and Prisnor of Askaban",
    "author": "J.K Rowling",
    "summary": "A story about a young wizard",
    "deleted": false,
    "__v": 0
  }
}
 ```
### Delete 
This end point soft deletes the books so that if we want to undo the delete we can get the flags back
```
TYPE :PUT
URL /books/:id
{
  "success": true,
  "message": "Book Deleted Successfully"
}
```

## Setup on local
  clone the repo 
   Make sure you have node 18.7.0 installed
   now run 
   ```
   npm i -g pnpm
   ```
   then run 
    ``` pnpm```
   install docker and docker cli run 
     ``` docker pull mongo```
   and pull docker image for mongo db now run 
```docker run -d --name my-mongodb-container -p 27017:27017 mongo
```
   create a .env file and copy the .env.example file
 run 
 
 ```pnpm start```