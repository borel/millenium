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
docker build -t user/millemium . && docker run -p 3000:3000 -d user/millemium
```

In both case , the server will run on => 0.0.0.0/3000 ( you can define other config in config repository (default.js) )

## Running the tests

```
npm test
```

## Contribute

- add real log management
- add security ( https ...)
- add API documentation ( swagger ... )
- add unit test
- add proper exception management
  .....

## Authors

- **pbb**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
