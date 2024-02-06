## Lucas Schuber
## Mittuniversitetet 

## This repo contains both server and client

## This part is the server part.

It contains two API's

## API 1
/Accountings - get, post, patch, delete
The API stores following fieds:
    id: 
    userId:
    date: 
    companyName:
    comment: 
    created_at:
    invoiceNmbr: 
    entries: 
      {
        plan: 
        credit:
        debit: 
      }
     

## API 2
/Users - get, post, patch, delete
The API stores following fieds:
    id:
    name:
    email:
    hashed_password:
    company: 
    regdate: 
    token: 


## To get server running;
> cd server
> npm install
> npm init
> npm run devStart
 - 1. The server has started running on port 5000 
 - 2. enter localhost/5000/enpoint to see REST API

## To get client running;
> npm start

