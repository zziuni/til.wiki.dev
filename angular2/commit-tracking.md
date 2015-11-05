## 2015-11-04

### [build(browserstack): add all supported browsers · angular/angular@fd92dc0](https://github.com/angular/angular/commit/fd92dc0701c06d5a80c91de8fe13fc2d4c356150)

- [Sauce Labs](https://saucelabs.com/)를 주로 사용하고 Browser Stack은 chrome 하나 뿐이였다.
- Browser Stack 테스트 브라우저 왕창 추가.

### [refactor(dart/transform): Remove generate_change_detectors · angular/angular@c9a3ba0](https://github.com/angular/angular/commit/c9a3ba0f487546c0a5b30868a927b10ec28514ad)

- 사용하지 않는 옵션을 template compiler에서 제거.

### [chore(test): failures in browsers which do no support Symbol.iterator · angular/angular@a16214c](https://github.com/angular/angular/commit/a16214c614d5eed1ae7c5faeb1d3073054a857c7)

__modules/angular2/src/testing/shims_for_IE.js__

- `Symbol` 관련 테스트위한 fix.
- RxJS에 하드 코딩된 문자열 처리. [5067](https://github.com/angular/angular/issues/5067)  es6-shim 처리를 위한 문자열이 변경되서 바꿈.
- [Symbol - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Iteration_symbols) 참조.

### [chore(build): don't create unused folders for npm distribution · angular/angular@c262bda](https://github.com/angular/angular/commit/c262bda1d39ecbbf762d2156e4e2295213f9404b)

__scripts/publish/npm_publish.sh__

- npm 배포판 생성 스크립트.


### [feat(core): add support for ambient directives · angular/angular@5948aba](https://github.com/angular/angular/commit/5948abab7ae39f558758c52508c66a52bafa9ad8)

>Ambient directives can be configured when bootstraping an application.
Ambient directives can be used in every component of the application without
needing to explicitly list them.

__modules/angular2/common.ts__

- `COMMON_DIRECTIVES` core directives collections
- core를 참조할 때, 줄줄이 적을 필요없이 이것만 inject.

__modules/angular2/src/core/compiler/ambient.ts__

- `AMBIENT_DIRECTIVES`, `AMBIENT_PIPES` aplication의 모든 컴포넌트에서 가능한 directive, pipe array를 만들기 위해서 application bootstrapping때 provide할 수 있는 token.

__modules/angular2/src/core/compiler/runtime_metadata.ts__

- `flattenArray()`가 맘에 안듬. return해서 concat하는것보다 쓰기편하긴 한데..

__modules/angular2/src/core/pipes.ts__

- `export from`으로 족하던걸 `COMMON_PIPES`를 위해서 import 추가.


