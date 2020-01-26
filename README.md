# MILLEMIUM

This is the back-end part of the millenium project

This is mainly an api to provide the best paths between two planetes

## Getting Started

### Prerequisites

- node v8.10.0
- npm v5.5.1

### Installing and run

With local repo =>

```
npm i
```

```
npm start
```

With Docker =>

```
docker build -t user/millemium . && docker run -p 8080:8080 -d user/millemium
```

In both case , the server will run on => 0.0.0.0/8080 


the universe.db is in /resources dorectory as the millenium-falcon param file

## Deployment

For fun , i deploy my app ( via docker ) on clever cloud , you can reach the api on this url => https://millenium.cleverapps.io/path


## Running the tests

```
npm test
```

Some e2e test used universe.db and  millenium-falcon param file

## Contribute

- add real log management
- add security ( https ...)
- add API documentation ( swagger ... )
- add more unit test
- add proper exception management
  .....

## Author   

- **pbb**


## What, who and how

My logic to build the app is :

1. Find all the direct possible path from planet A to planet B
2. From theses paths , build all the possible path with the countdown constraint
3. Filter out the paths who are not respected the autonomy constraint
4. Adding the bounty hunter and calculte percent
5. Return all the paths sort by percennt

- Stack
    => I choose nodejs/express for very pragmatic reason :  
        - easy to initialiaze project from scratch
        - performant web fwk ( express ) to expose API
        - performant test environment setup ( chai/mocha)
        - use external package with npm
        - and finally i am not using this language in daily working basis , so it was a pleasure to use it again
    For this kind of project , there is no performance/scale issue , so every langage is a good fit.

- I made the choice to separate the implementation in several methods for theses reasons :
    - the code is more readable
    - be able to test them unitary
    - be able to make the project evolvable more easily

