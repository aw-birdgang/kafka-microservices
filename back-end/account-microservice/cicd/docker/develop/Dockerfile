FROM node:16-alpine AS builder
# Create app directory
WORKDIR /app
## 프로젝트의 모든 파일을 WORKDIR(/app)로 복사 한다
COPY . .

RUN npm install
RUN npm run build:dev

# Step 2
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app ./
## application 실행
CMD ["npm", "run", "start:dev"]