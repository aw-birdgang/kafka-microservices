
## 구조
``````
account-microservice/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   └── local.strategy.ts
│   ├── user/
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   ├── user.service.ts
│   │   └── user.entity.ts
│   ├── app.module.ts
│   └── main.ts
├── package.json
└── tsconfig.json


``````


## codebuild
``````
Buildspec name - optional
cicd/codebuild/develop/buildspec.yml


Environment variables
- AWS_ACCOUNT_ID : <>
- IMAGE_REPO_NAME : kafka-microservices
- DEPLOY_ENV : dev
- IMAGE_TAG : latest
- DOCKER_FILE_PATH : cicd/docker/develop/Dockerfile
- CONTAINER_NAME : kafka-account-msa-container
- S3_LOTTO_DOTENV_BUCKET_NAME : kafka-microservice-account-bucket
- S3_PROJECT_FOLDER : kafka-microservice-account
- PROJECT_START_SCRIPT_NAME : start:dev


``````
