# Cache API

## How to run

### 1. Build

```bash
docker-compose build
```

### 2. Run

```bash
docker-compose up -d
```

### 3. Access API on http://localhost:3000

## How to run tests

### 1. Attach shell to docker container

```bash
docker exec -it {CONTAINER_NAME} bash
```

Where "CONTAINER_NAME" is a name of container with backend service

### 2. Run tests

```bash
npm test
```

## API

### 1. Get item by key

`GET http://localhost:3000/items/{KEY}`

### 2. Get list of keys

`GET http://localhost:3000/keys`

### 3. Update item by key

`PATCH http://localhost:3000/items/{KEY}`

Body

```JSON
{
  "data": "string"
}
```

### 4. Delete item by key

`DELETE http://localhost:3000/items/{KEY}`

### 5. Delete all items

`DELETE http://localhost:3000/items/`
