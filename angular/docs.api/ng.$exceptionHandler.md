# $exceptionHandler (service in module ng)

> [원문](http://docs.angularjs.org/api/ng.$exceptionHandler)

## Description
angualr expression의 uncaught exception은 이 서비스가 위임받는다. 기본 동작은 브라우저 개발 콘솔에 찍는 `$log.error`의 단순 위임자.

유닛테스트에서 `angular-mock.js`가 로드 외었다면, 이 서비스는 테스트에서는 [mock $exceptionHandler]()로 오버라이드 된다.


## Dependencies
* [$log](ng.$log)

## Usage
    $exceptionHandler(exception[, cause]);

### Parameters
* exception – {Error} – 에러와 관련된 Exception
* cause(optional) – {string=} – 에러가 건너온 컨텍스트에 대한 정보. (optional)