# $timeout (service in module ng)

> [원본](http://docs.angularjs.org/api/ng.$timeout)

## Desciption
`window.getTimeout`의 angular wrapper. 실행할 함수는 try/catch로 감쌓있고 발생하는 exception은 [$exceptionHandler](ng.$exceptionHandler) 서비스로 위임한다.

등록된 timeout function의 반환 값은 정해진 시간후에 함수가 실행되고 반환되는 `promise`.

취소하려면 `$timeout.cancel(promise)`를 호출한다.

테스트에서는 지연된 함수 큐에서 순서대로 실행할 [$timeout.flush](ngMock.$timeout)사용 가능.

## Dependencies
* [$browser](ng.$browser)

## Usage

```js
    $timeout(fn[, delay[, invokeApply]]);
```

### Parameters
* fn - {function()} - 일정시간후 실행할 함수.
* delay(optional=0) - {number=} - 밀리초.
* invokeApply(optional=true) - {boolean=} - model dirty checking을 하지 않으려면 false. true이면 `fn`은 [$apply](ng.$rootScope.Scope#$apply)에서 실행된다.

### Returns
{Promise} - timeout이 만료될 때 결심(?)할 promise. 타결될 징조의 값은 fn 함수의 반환 값이다. `뭔소린지 모르겠다. `

## Methods
### cancel(promise)
`promise`와 관련된 작업 취소. 약속의 결과는 거부로 해결된다.

**Parameters**

* promise(optional) – {Promise=} – $timeout 함수가 반환하는 promise.

**Returns**

* {boolean} – 작업이 아직 실행전이라 취소가 잘 되었으면 true.

