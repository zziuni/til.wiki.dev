# angular.mock.module (API in module ng )

## Description

window에 전역변수로 있음. jasmine에서만 사용가능.

이 함수는 모듈 설정 코드를 등록한다. `inject` 메서드로 injector를 생성할 때 사용될 설정 정보를 수집한다.

예제는 `inject`에 있음.

    angular.mock.module(fns);

## Parameters
* fns – {...(string|Function)} – 별명 문자열이나 익명 모듈 생성 용 함수 여러개. 이 모듈은 injector를 설정하는데 사용. `ng`와 `ngMock` 모듈은 자동으로 로드한다.