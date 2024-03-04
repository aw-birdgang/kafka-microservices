
# 계층 구조
``````

lib-common-entities/
├── src/
│   ├── index.ts
├── dist/
│   ├── index.js
├── .npmignore
├── package.json
└── README.md

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
