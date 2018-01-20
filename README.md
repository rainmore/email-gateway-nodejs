# Email Gateway Example (NodeJs)

Email Gateway Example (NodeJs) is a web base project to provide JOSN REST API to send email via MailGun and SendGrid. The project is referenced from [TypeScript Node Starter](https://github.com/Microsoft/TypeScript-Node-Starter)

## APIs

Sending mail via SendGrid
```
/api/v1/mail/send/send-grid
```

Sending mail via MailGun
```
/api/v1/mail/send/mail-gun
```
Sending Email via a random email resources (either MailGun or SendGrid)
```
/api/v1/mail/send
```
POST Request Body Structure

```
{
  "from": {email},                             
  "replyTo": {email},     // Optional                             
  "to": {email*},
  "cc": {email*},         // Optional
  "bcc": {email*},        // Optional
  "subject": "test",
  "content": "tesdsfdsa fdsa fda fdasft"
}
```
* *Valid Email formats are `demo@rainmore.com.au` or `Demo <demo@rainmore.com.au>`*

**Note**
Plain text is only supported for the APIs. HTML or Attachment are not supported yet.

## Developer Guide

### Prelimitary

The project is developed on top NodeJs and TypeScript. It requires following tools on the developer work station to develop/debug/test application.

* NodeJs > 9.0
* TypeScript > 2.6

### Initialize Project
 
Clone the project code from github repository
```
git clone https://github.com/rainmore/email-gateway-nodejs.git
```

Go to the project folder
```
cd email-gateway-nodejs
```

```
npm install
```

### Run Project

The project can be accessed to from http://localhost:8080/api/v1/mail/send

Run project
```
npm run start
```

Run project in development mode
```
npm run watch-debug
```

Run Test
```
npm run test
```
### Build 

Build Docker Image
```
docker build -t rainmore/email-gateway-nodejs:1.0.0 .
```

Push Docker Image
```
docker push rainmore/email-gateway-nodejs:1.0.0
```

Deploy Docker Image via `docker-compose`
```
// pull latest docker image
docker-compose pull

// start docker container
docker-compose up -d --force-recreate
```

`docker-compose.yml` example

```
version:                '3.3'

services:
  nodejs:
    image:              rainmore/email-gateway-nodejs:1.0.0
    container_name:     email-gateway-nodejs
    hostname:           email-gateway-nodejs
    restart:            always
    env_file:           /etc/rainmore/email-gateway/environment
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
    environment:
      - NODE_ENV=production
      - NODEJS_PORT=8080
      - NODEJS_HOST=0.0.0.0
    build:              .
    ports:
     - 8081:8080

```


Example of `.env.default` or `environment`
```
MAILS_MAILGUN_APIKEY=
MAILS_MAILGUN_DOMAIN=
MAILS_SENDGRID_APIKEY=
```
 

## Design

The project contains 2 layers

* Services
* Controllers

### Services
Services layer contains the business logic. The logic to send email via MailGun and SendGrid is implemented in the layer.

### Controllers
Controllers provide REST JSON endpoints. It contains endpoints, validation and data conversion. To provide an extensible API, versioning has been introduced.  

Current version is `v1`. There could be 2 solutions when more versions are required. The first one is to introduce `v2` package, duplicate all existing end point from `v1`, and, then, modify logic in `v2`. 

The second solution is to split persistent and service layer from controllers as independent micro services. Service discovery should be introduced to automatically connect the service layer with each controller versions. 

Also, DTOs and data conversion have been introduced to avoid direct accessing domain entities. The domain entity modification won't have side effect to API, vice versa.

**Endpoints**

It is built with Spring MVC framework to handle HTTP request and response. Versioning has been applied to each API endpoint through `RequestMapping`.

**Validation**

Strict validation has been applied to the API access via `express-validator`

**Data Conversion**

Data Conversion has been introduced to convert between domain entity and DTO. An independent converter can be introduced to hold advanced logic. At the moment, the conversion logic is simplified in each DTO.

### Others

#### Test

Testing infrastructure has been introduced in the project by `jest`. However, during the limited time, no many tests are implemented 

*_TODO_* To implement unit tests and integration tests

#### I18N 

*TODO* to implement i18N
