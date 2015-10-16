# $q (service in module ng)

> 이해하고 번역하는게 아니라서 내용이 개판임.

## Description
[Kris Kowal's Q]()에서 영감을 받음.

[The CommonJS Promise proposal]()에서는 비동기로 실행되는 액션이 끝났든 끝나지 않았던, 그 결과를 표현하는 객체와 상호작용하기 위한 인터페이스라고 **promise**를 설명한다.

에러 핸들링을 다룬다는 관점에서는 deferred/promise APIs는 `tray, catch, throw` 키워드가 동기식 프로그래밍으로 하는 것을 비동기 프로그래밍으로 하는 것이다.

    // 이 예제의 목적은 변수 `$q`와 `scope`이 현재 어휘의 스콥안에서 가능한지 확인하는 것.
    // (이 둘은 인젝트 되거나 전달인자로 넘어올 수 있다. )

    function asyncGreet(name) {
      var deferred = $q.defer();

      setTimeout(function() {
        // 이 함수는 이후에 event loop중 비동기로 실행되거니까,
        // modlel 변경을 알아차리기 위해서 이 코드를 $apply()로 감싸야 한다.
        scope.$apply(function() {
          if (okToGreet(name)) {
            deferred.resolve('Hello, ' + name + '!');
          } else {
            deferred.reject('Greeting ' + name + ' is not allowed.');
          }
        });
      }, 1000);

      return deferred.promise;
    }

    var promise = asyncGreet('Robin Hood');
    promise.then(function(greeting) {
      alert('Success: ' + greeting);
    }, function(reason) {
      alert('Failed: ' + reason);
    });

처음에는 복잡도 증가에 공을 들일 가치가 없어보인다. 고롤 때 요걸 보삼. [promise와 deferred APIs 개발을 보장하라](https://github.com/kriskowal/uncommonjs/blob/master/promises/specification.md)

promise api은 기존 콜백([CPS](http://en.wikipedia.org/wiki/Continuation-passing_style))으로 수행하는 것은 매우 어렵다. [Q documentation](https://github.com/kriskowal/q) 참조.

## The Deferred API
신규 deferred 인터페이스는 `$q.defer()`호출로 생성된다.

deferred 객체의 목적은 연관된 promise 인터페이스를 노출 시키는 것과 작업의 성공/실패 신호보내기를 위해서 사용될수 있는 APIs

### mthods
* resolve(value) - value을 넘겨서 파생된 promise를 resolve한다. value가`$q.reject`로 생성된 rejection이면, 대신에 promise가 reject 될 거다.
* reject(reason) - reason을 넘겨서 파생된 promise를 reject한다. `$q.reject`로 생성된 rejecton과 resolve하는 것과 같다.

### properties
* promise - {Promise} - deferred와 연관된 promise 객체

## The Promise API
deferred 인터페이스가 생성될 때 신규 promise 인터페이스가 생성된다. `deferred.promise` 호출로 탐색할 수 있다.

promise 객체의 목적은 deferred task가 완료되었을 때 그 결과에 접근할 할 이해 관계자를 감안하기 위함임.

### Methods
* then(successCallback, errorCallback) - promise가 resolve 됬거나, 될 거든가, reject되었던가 관계없이  결과가 가능해지자 마자 비동기로 성공/실패 콜백중 하나가 호출 된다. 실행되는 콜백은 result 아님 rejection reason 전달인자로 호출된다.
이 메서드는 `successCallback`이나 `errorCallback`의 반환 값을 통해서 해결되거나 거부되는 신규 promise 를 반환한다.

## Chaining Promises
promise의 `then`을 호출하면 신규 파생 promise가 반환횐다.  promise 체인 생성이 가능함.

    promiseB = promiseA.then(function(result) {
      return result + 1;
    });

    // promiseB는 promiseA가 resolve되고 바로 resolve됨. B의 값은 promiseA에서 1 증가된 값.

promise가 다른 promise와 해결될 수 있기 때문에 체이징 수 제안은 없음. (추가 해결은 지연될 거야.)
체인중 어디서든 promie의 해결은 pause/defer할 수 있다. 이를 통해서 **$http response interceptor** 같은 강력한 API 구현이 가능함.

## Differences between Kris Kowal's Q and $q
3가지가 크게 다름.
* $q은 angular에서 [ng.$rootScope.Scope]() scope 모델 관찰 메카니즘에 통합되었다. 그건 model로 resolution과 rejection이 빠르게 전파된다는 의미고 깜박거리는 현상의 불필요한 브라우저 repaint를 피한다는 뜻임.
* $q promise는 angular 탬플릿 앤진에서 인식된다. 이 말은 결과 값이 나오면 스콥에 promise가 추가된 것을 다룰 수 있다는 말.
* Q는 $q보다 기능이 많지만 무겁고 $q는 가볍다. 하지만 비동기 작업에 필요한 필수 기능은 다있음.

### Testing

    it('should simulate promise', inject(function($q, $rootScope) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var resolvedValue;

      promise.then(function(value) { resolvedValue = value; });
      expect(resolvedValue).toBeUndefined();

      // promise resolve를 시뮬레이트 한다.
      deferred.resolve(123);
      // 이 'then'은 동기 호출되지 않는다.
      // 우리가 언제나 비동기인 promise API를 원하기 때문이다. 어쨌든,
      // 이건 동기나 비동기로 호출됬다.??
      expect(resolvedValue).toBeUndefined();

      // promise resolution이 $apply()를 사용한 'then' 함수로 전판된다.
      $rootScope.$apply();
      expect(resolvedValue).toEqual(123);
    });

## Dependencies
* [$rootScope]()

## Methods
### all(promises)
입력된 promise가 모두 해결되었을 때 한 promise로 합친다.

**Paramiters**
* promises - {Array.<Promise>} - promise 배

**Returns**

### defer()
미래에 끝날 할 일을 나타내느 Deferred 객체를 생성.

### reject(reason)
**reason** 으로 거부로 해결된 promise를 생성. promise 체인에서 앞으로 rejectoin하기 위해서 사용된다. 체인에서 마지막 promise를 다룬다면 이 메서드는 무시.

deferred/promise는 try/catch/throw 동작와 비슷. reject는 throw와 비슷. promise error 콜백을 통해서 error를 "catch" 하고 현재 promise에서 기인한 promise로 error를 보내길 원한다면, `reject`를 통해서 생성된 rejection 반환으로 error를 "rethrow" 여야 한다.

    promiseB = promiseA.then(function(result) {
      // success: 어떤 일을 하고 result와 함께 promiseB를 해결한다.
      return result;
    }, function(reason) {
      // error: 가능한 경우 error를 제어한다. 그리고
      // newPromise나 vlaue와 함께 promiseB를 해결한다.
      // 아니면 promiseB로 rejection을 전달한다.
      if (canHandle(reason)) {
       // 에러를 다루고 회복한다.
       return newPromiseOrValue;
      }
      return $q.reject(reason);
    });

### when(value)
value나 $q promise에서 3rd party then-able promise일 수 있는 객체를 wrapping함. promise일 수도 있고 아닐 수도 있는 객체를 다룰 때 유용함. 신뢰할 수 없는 출처에서 promise가 왔을 때.
