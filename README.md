# 소월 · 계절 꽃 가게

가상 꽃집의 상품 목록·장바구니·주문서 미리보기를 담은 프론트엔드 샘플입니다.
계절 꽃을 분류와 가격으로 살펴보고, 장바구니에서 수량과 포장을 조절합니다.
픽업 일정과 메시지 카드를 골라 주문 요약 화면까지 체험할 수 있습니다.

## 쓴 기술과 근거

| 기술                     | 사용한 곳                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Vue.js 3 Composition API | [src/App.vue](src/App.vue): `<script setup>`, `ref`, `computed`, 상품 분류·정렬·주문서                          |
| Vuex 4                   | [src/store/index.js](src/store/index.js): 장바구니 state·getters·mutations, 브라우저 저장 플러그인              |
| Webpack 5                | [webpack.config.js](webpack.config.js): 직접 작성한 진입점·Vue/CSS 로더·이미지 처리·프로덕션 최적화·하위 경로   |
| Cypress e2e              | [cypress/e2e/shop.cy.js](cypress/e2e/shop.cy.js): 분류·정렬·합계·저장·수량 한도·모바일·손상 데이터 6개 시나리오 |
| ESLint                   | [eslint.config.js](eslint.config.js): Vue SFC·JavaScript 검사                                                   |
| Prettier                 | [.prettierrc.json](.prettierrc.json): 소스와 설정 형식 검사                                                     |
| GitHub Actions CI        | [.github/workflows/ci.yml](.github/workflows/ci.yml): push·PR에 린트·형식·빌드·Chrome headless Cypress 실행     |

## 실행 방법

Node.js 24, npm, Chrome을 사용합니다.

```sh
npm ci
npm run dev
```

개발 주소: `http://127.0.0.1:8080/sample-vue-shop/`

```sh
npm run lint
npm run format:check
npm run build
npm run preview
```

빌드 미리보기: `http://127.0.0.1:4174/sample-vue-shop/`

e2e는 미리보기 서버가 종료된 상태에서 다음과 같이 실행합니다. 명령이 서버를 켜고 테스트 후 종료합니다.

```sh
npx cypress install
npm run test:e2e
```

GitHub Actions의 Ubuntu 환경에서 Chrome headless로 실행하도록 구성했습니다.
현재 Windows 제한 계정에서는 Cypress 16.2.1이 앱을 실행하기 전에 `uv_os_get_passwd returned ENOMEM`으로 종료되어 로컬 Cypress 결과는 미확인입니다.
워크플로의 원격 실행 결과는 저장소 업로드 후 확인해야 합니다.

## 체험 방법

1. 전체·꽃다발·한 송이·묶음 탭과 가격 정렬을 사용합니다.
2. 상품 사진을 누르면 설명을 확인할 수 있고, ‘담기’ 버튼으로 상품을 추가합니다.
3. 장바구니에서 수량을 1~9개로 조절합니다. 0개로 줄이거나 삭제 버튼을 누르면 상품이 빠집니다.
4. 픽업 날짜·시간, 주문당 3,000원의 선물 포장, 메시지 카드 중에서 선택합니다.
5. 주문서 미리보기에서 상품·수량·옵션·합계를 확인한 뒤 장바구니로 돌아올 수 있습니다.

픽업 날짜는 2026년 11월 11~13일의 고정된 체험 일정입니다.
장바구니는 `localStorage`의 `sowol-cart-v1`에 저장하고, 픽업 옵션은 현재 화면에서만 유지합니다.
상품 식별자·수량이 잘못된 저장 데이터는 비우고 안내합니다. 저장이 차단되면 현재 화면에서 사용할 수 있습니다.
개인정보 입력과 실제 주문 전송·결제 기능은 없습니다.
사진은 분위기 참고 이미지이며 실행 중 외부 사진 서버에 접속하지 않습니다.

## 보는 주소

[소월 꽃집 열기](https://junetapa-juncheol.github.io/sample-vue-shop/)

위 주소는 업로드와 Pages 설정 후 사용하는 주소입니다.
소스와 `docs/` 빌드 결과를 함께 업로드하고, Settings → Pages → Deploy from a branch → `main` / `/docs`로 설정합니다.
Webpack의 `output.publicPath`가 `/sample-vue-shop/`이므로 저장소 이름과 경로를 유지해야 합니다.
정적 미리보기 서버는 [scripts/preview.cjs](scripts/preview.cjs)에 있으며 하위 경로의 실제 파일만 제공합니다.

## 검증

프로덕션 빌드, ESLint와 Prettier 검사에 통과했습니다.
Chrome에서 390px·1280px의 상품 분류·장바구니 저장·수량·포장 합계·주문서 미리보기·삭제를 확인했습니다.
하위 경로에서 깨진 이미지·내부 링크·콘솔 오류·페이지 가로 넘침이 없음을 확인했습니다.
대화상자는 키보드 포커스를 유지하고 Escape로 닫히며 닫은 뒤 기존 버튼으로 포커스를 돌려줍니다.
Cypress 테스트 코드는 6개 시나리오를 포함하지만 위 환경 제한으로 로컬 통과를 주장하지 않습니다.

## 라이선스

코드는 MIT · Copyright (c) 2026 junetapa. [LICENSE](LICENSE)를 참고하세요.
사진에는 별도의 [Unsplash License](https://unsplash.com/license)가 적용되며 원본 목록은 [ASSETS.md](ASSETS.md)에 있습니다.
브라우저 번들에 포함된 라이브러리 고지는 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)에 있습니다.
