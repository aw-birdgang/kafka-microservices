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

"i18n": "^0.15.1",
"iterare": "1.2.1",
"nestjs-i18n": "^10.4.5",

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
npm publish --access public

``````



## 빌드 과정 에서 파일이 누락 TypeScript 로 개발 하는 경우, tsc 명령어 로 빌드할 때 i18n 디렉토리가 결과물에 포함되지 않을 수 있습니다. TypeScript는 기본적으로 .ts 파일만을 대상으로 컴파일하기 때문 입니다.
## 해결 방법 : 빌드 스크립트에서 번역 파일이나 디렉토리를 결과물 디렉토리로 복사하는 단계를 추가 합니다.
``````
"scripts": {
  "build": "nest build && cp -r src/i18n dist/"
}
``````
