## npm 에 배포할 때 고려 해야 할 사항
``````
1. 계층구조 : 공통 프로젝트의 계층구조는 명확하고 간단해야 합니다. 
소스 코드는 일반적으로 src 폴더에 위치하고, 빌드 과정을 거친 후의 파일들은 dist 폴더에 위치하게 됩니다. 
빌드된 파일만 배포하는 것이 일반적이기 때문에, src 폴더의 파일을 직접 포함시키지 않을 수도 있습니다.

2. 빌드 프로세스 : TypeScript나 Babel을 사용하는 경우, 소스 코드를 JavaScript로 컴파일해야 합니다. 
이 과정에서 생성된 파일들이 dist 폴더에 저장돼. npm에 배포할 때는 이 dist 폴더 안의 파일들만 포함시켜야 합니다.

3. node_modules 폴더 : 이 폴더는 배포할 필요가 없습니다. 
package.json에 정의된 의존성은 사용자가 패키지를 설치할 때 자동으로 설치되기 때문입니다.

4. package.json 파일 : 이 파일은 필수로 포함되어야 하며, 패키지의 이름, 버전, 의존성 등의 중요 정보를 담고 있어. 또한, "main" 필드에는 주로 dist 폴더 내의 진입 파일을 지정해야 합니다.

5. .npmignore 파일 : npm에 불필요한 파일이나 폴더를 배포하지 않도록 .npmignore 파일을 사용할 수 있습니다. 
이 파일에는 node_modules, src, .git, 테스트 파일 등 배포하고 싶지 않은 항목들을 지정할 수 있습니다.

``````


# 계층 구조
``````

my-common-project/
├── src/
│   ├── index.ts
│   └── utils.ts
├── dist/
│   ├── index.js
│   └── utils.js
├── .npmignore
├── package.json
└── README.md

``````



# dependency - typeorm
````

"@nestjs/axios": "^3.0.2",
"@nestjs/common": "^10.0.0",
"@nestjs/config": "^3.2.0",
"@nestjs/core": "^10.0.0",
"@nestjs/platform-express": "^10.0.0",
"@nestjs/terminus": "^10.2.3",
"@nestjs/typeorm": "^10.0.2",
"amqplib": "^0.10.3",
"i18n": "^0.15.1",
"iterare": "1.2.1",
"kafkajs": "^2.2.4",
"nestjs-i18n": "^10.4.5",
"reflect-metadata": "^0.1.13",
"tslib": "2.6.2",
"typeorm": "^0.3.17",
"uid": "2.0.2"
    
    
````


# .npmignore
``````

node_modules/
src/
*.test.ts
*.spec.ts

``````


# .npmignore
``````

node_modules/
src/
*.test.ts
*.spec.ts

``````
 


# 배포
``````
npm run build
npm publish --access public

``````



## 빌드 과정 에서 파일이 누락 TypeScript 로 개발 하는 경우, tsc 명령어 로 빌드할 때 i18n 디렉토리가 결과물에 포함되지 않을 수 있습니다. TypeScript는 기본적으로 .ts 파일만을 대상으로 컴파일하기 때문 입니다.
## 해결 방법 : 빌드 스크립트에서 번역 파일이나 디렉토리를 결과물 디렉토리로 복사하는 단계를 추가 합니다.
``````
"scripts": {
  "build": "nest build && cp -r src/i18n dist/"
}
``````




# 특징
``````

인증 및 권한 부여: JWT나 OAuth 같은 표준 인증 메커니즘을 구현한 라이브러리.
로깅: 서비스 간 통일된 로깅 포맷과 레벨 설정을 위한 공통 로깅 라이브러리.
에러 핸들링: 공통 에러 응답 포맷과 예외 처리 메커니즘.
헬스 체크: 서비스의 상태를 모니터링하는 데 사용되는 표준 헬스 체크 엔드포인트.
데이터 형식 및 검증: JSON, XML 같은 데이터 형식과 스키마 검증을 위한 라이브러리.
클라이언트 라이브러리: 다른 서비스와의 통신을 위한 REST, gRPC 클라이언트 라이브러리.
메시지 큐와 이벤트 스트리밍: Kafka, RabbitMQ 같은 메시지 브로커와의 통합을 위한 클라이언트 라이브러리나 추상화 레이어.
설정 관리: 중앙화된 설정 관리를 위한 라이브러리나 클라이언트.

``````
