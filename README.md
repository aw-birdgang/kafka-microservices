

## node 관리
``````

nvm list
nvm ls-remote

``````


## access AWS MSK Kafka
````
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install kafka
brew install awscli

- aws configure


- aws configure sso
여기서 <your-sso-profile-name>은 ~/.aws/config 파일에 구성된 SSO 프로파일 이름입니다. 
프로파일 이름을 명시하지 않았다면, 기본 프로파일이 사용됩니다. 
명령어 실행 시 올바른 프로파일 이름을 지정하는 것이 중요합니다.

- aws configure list


aws kafka list-clusters --region <your-region>
aws kafka list-clusters --region ap-northeast-2 --profile <your-sso-profile-name>

aws kafka get-bootstrap-brokers --cluster-arn <YourClusterArn>
aws kafka get-bootstrap-brokers --cluster-arn <YourClusterArn> --profile <your-sso-profile-name>

kafka-topics --list --bootstrap-server <YourBootstrapBrokers>


````






## 구조
``````
kafka-microservices/
├── back-end/
│   ├── account-microservice
│   ├── api-auth
│   ├── app-api
│   ├── batch-microservice
│   ├── game-microservice
│   └── payment-microservice
├── devops/
│   └── terraform
├── front-end/
└── lib/
    ├── lib-common
    └── lib-common-entities


``````




## account-msa: 사용자 계정 관리, 인증 및 권한 부여
``````

사용자 계정 정보의 생성, 관리, 조회 등을 담당하는 마이크로서비스입니다. 
주요 기능으로는 사용자 등록, 로그인 처리, 사용자 정보 조회 및 업데이트 등이 있습니다.


``````




## game-msa: 로또 게임 로직 처리, 당첨 번호 생성 및 검증
``````

- 게임 세션 관리: 사용자가 게임에 참여할 수 있는 세션을 생성하고 관리합니다.
- 번호 생성 및 검증: 사용자가 선택한 번호 또는 자동으로 생성된 번호를 관리하고, 당첨 번호와 비교하여 결과를 제공합니다.
- 당첨 결과 처리: 당첨된 사용자를 식별하고, 상금을 분배하는 로직을 처리합니다.

``````


## payments-msa: 결제 처리, 사용자 잔액 관리, 결제 내역
``````

``````


## batch-msa: 정기 적인 작업(예: 당첨 번호 추첨, 이벤트 처리)
``````

``````


## 설명
``````

서비스 간의 통신: MSA 구조에서는 서비스 간 통신이 핵심입니다. 
현재 API 게이트웨이로 분류되어 있는데, 서비스 간의 동기(Synchronous)와 비동기(Asynchronous) 통신 방법을 명확히 구분할 필요가 있습니다. 
예를 들어, Kafka나 RabbitMQ와 같은 메시지 브로커를 사용하여 비동기 통신을 관리할 수 있습니다.


서비스 디스커버리와 로드 밸런싱: MSA에서는 서비스가 동적으로 변할 수 있기 때문에, 서비스 디스커버리와 로드 밸런싱이 중요합니다. 
AWS에서는 ELB(Elastic Load Balancing)와 ECS(Elastic Container Service) 또는 EKS(Elastic Kubernetes Service)를 사용하여 이를 관리할 수 있습니다.


프로젝트의 모니터링과 로깅: 각 서비스의 성능 모니터링과 로그 관리를 위해 Amazon CloudWatch, ELK Stack(Elasticsearch, Logstash, Kibana) 또는 Prometheus와 Grafana를 사용하는 것이 좋습니다.

``````
