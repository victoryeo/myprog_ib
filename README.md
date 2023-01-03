nodejs platform backend

## API

- /api/v1/\*

## OpenAPI specification

- [openapi.yaml](./openapi/openapi.yaml)

## NPM scripts

- `npm install` - Install dependencies
- `npm run lint` - Lint code
- `npm run start` - Start application
- `npm run start:dev` - Start application in watch mode
- `npm run test` - run Jest test runner

## Environment configuration

Clone `.env-sample` to `.env` and update value for following environment variables

| Variable Name        | Default value  | Description               |
| -------------------- | -------------- | ------------------------- |
| `PORT`               | 3000           | Application port name     |

## curl command test
curl -X GET http://localhost:4006/api/v1/healthz

## docker build command
docker build --progress=plain -t victoryeo00/myprog:latest .
## docker push command
docker push victoryeo00/myprog:latest
## docker run command (without detached)
docker run -u node -p 4002:4002  victoryeo00/myprog:latest

## deploy and delete k8s
```
kubectl apply -f create-deployment.yaml
kubectl delete deployment myprog
kubectl delete svc myprog-service
```
## deploy helm chart
```
helm create <helmname>
helm install <appname> <helmname>/
helm uninstall <appname>
```
## api key setting
set in .env file or pass the api key to docker commmand
```
docker run -u node --env API_KEY=testkey -p 4002:4002 victoryeo00/myprog:latest
```