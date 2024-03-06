
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

``````
