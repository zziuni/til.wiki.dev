# ngMock.$log (service in module ngMock)

## Description
[ng.$log]()의 구현 목업. ng.$log는 로그 레벨별로 배열에 모든 로깅된 메세지들을 수집한다. 지정 레벨의 log 함수 별로 있는 logs 프로퍼티로 그 배열을 볼 수 있다. 예를 들어. error 레벨의 배열은 $log.error.logs 이다.

## Methods

### assertEmpty()
모든 log 메서드가 로그 메세지를 출력하지 않는지 확인. 메세지가 출력되면 익셉션 발생.

### reset()
모든 레벨의 로그 배열을 비운다.

## Propertys
### erros.logs
### info.logs
### log.logs
### warn.logs
