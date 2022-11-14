# [Sayfyho Memorial - backend](https://sayfy-frontend-ts.vercel.app/)

## CZ  
hello

### Obecné informace
Tento projekt tvoří backend k webové aplikaci Sayfyho memorial. Webová aplikace umožňuje pořadatelům propagaci závodu, vkládání novinek a fotografií. Mezi hlavní vlastnost patří:

  - Autorizaci a authentikaci administrátotů pomocí jwt tokenů a HttpOnly Cookies  
  - Vkládání, editaci a mazání aktualit a propozice závodu
  - Vytváření fotogalerií a nahrávání obrázků
  
### Technologie
  - Backend je napsaný v typescriptu pomocí frameworku Express a bězí na Node.js
    - express: 4.18.1
  
  - Authorizace a authentikace uživatelů pomocí json web tokenů  
    - jsonwebtoken: 8.5.1    
    
  - Všechna data se ukládají do databáze MongoDB  
    - mongoose: 6.6.1
    
  - Fotografie se ukládají do AWS S3 Bucketu přímo, tj. nejsou přes server. Na AWS se nahrávají přímo z frontendu
    - aws-sdk: 2.12275.0
    
  - Projekt je testovám pomocí frameworku Jest
    - jest: 29.0.3    
    - supertest": 6.2.4
    - mongodb-memory-server: 8.9.2
        
  - Frontend je napsaný v typescriptu s použitím knihovny React a frameworku Next.js
    - kód je k prohlédnutí [zde](https://github.com/fialajiri/sayfy-frontend-ts)
    
    
## EN

### General information
This project forms the backend to Sayfy's memorial web application. The web application allows the organizers to promote the race, insert news and photos. Main features include:

  - Authorization and authentication of administrators using jwt tokens and HttpOnly Cookies
  - Inserting, editing and deleting news and race proposition
  - Creating photo galleries and uploading images
  
### Tech Stact
  - Backend is written in typescriptu with Express framework under Node.js
    - express: 4.18.1
  
  - Authorization and authentication of users using json web tokens  
    - jsonwebtoken: 8.5.1    
    
  - Data is stored in a MongoDB database  
    - mongoose: 6.6.1
    
  - Photos are stored in the AWS S3 Bucket directly, i.e. not through the server. They are uploaded to AWS directly from the frontend
    - aws-sdk: 2.12275.0
    
  - I am testing the project using the Jest framework
    - jest: 29.0.3    
    - supertest": 6.2.4
    - mongodb-memory-server: 8.9.2
        
  - Frontend is written in typescript using the React library and the Next.js framework
    - the code is available [here](https://github.com/fialajiri/sayfy-frontend-ts)
    
    

