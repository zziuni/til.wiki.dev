# Scope (type in module ng )

## Description
root scope은 [$injector]()에서 [$rootScope]()키를 사용해서 가져올 수 있다. 자식 scope들은 [$new()]() 메서드를 사용해서 생성된다. (scope 대부분은 컴파일된 HTML 탬플릿이 실행될 때 자동으로 생성됨)

scope을 다루는 방법을 보여주는 샘플.

    angular.injector(['ng']).invoke(function($rootScope) {
       var scope = $rootScope.$new();
       scope.salutation = 'Hello';
       scope.name = 'World';

       expect(scope.greeting).toEqual(undefined);

       scope.$watch('name', function() {
         scope.greeting = scope.salutation + ' ' + scope.name + '!';
       }); // initialize the watch

       expect(scope.greeting).toEqual(undefined);
       scope.name = 'Misko';
       // still old value, since watches have not been called yet
       expect(scope.greeting).toEqual(undefined);

       scope.$digest(); // fire all  the watches
       expect(scope.greeting).toEqual('Hello Misko!');
    });

### Inheritance
scope은 상속가능. 예제.

    var parent = $rootScope;
    var child = parent.$new();

    parent.salutation = "Hello";
    child.name = "World";
    expect(child.salutation).toEqual('Hello');

    child.salutation = "Welcome";
    expect(child.salutation).toEqual('Welcome');
    expect(parent.salutation).toEqual('Hello');

## Usage

    Scope([providers][, instanceCache]);

### Parameters
* *providers(optional)* - {object.<string, function()>=} - 해당 scope에서 지원되야할 service factory를 매핑. 기본값은 [ng]()
* *instanceCache(optional)* - {object.<string, *>=} - *providers*로 제공되는 서비스를 추가하거나 오퍼라이드해야만 하는 사전 설명된 서비스를 제공한다.   유닛 테스트와 기본 서비스를 오버라이드할 필요가 있을 때 다룬다. (무슨말인지 모르겠다. )

### Returns
{object} - 새로 생성된 scope.

## Methods
### \$apply(exp)
\$apply()는 angular 프레임워크의 외부에서 angular 내부의 표현식을 실행하기위해 사용된다. (예를 들면, 브라우저 DOM 이벤트, setTimeout, XHR, 기타 다른 라이브러리) [익셉션 핸들링](), [watch 실행]()의 적절한 scope의 라이프 사이클을 실행하기 위해 필요한 angular 프레임워크로 호출중이기 때문.

**Life cycle**

**Pseudo-Code of \$apply()**

    function $apply(expr) {
      try {
        return $eval(expr);
      } catch (e) {
        $exceptionHandler(e);
      } finally {
        $root.$digest();
      }
    }

Scope의 \$apply() 메서드는 다음 과정을 통해서 이행한다.

1. [expression]()은 [$eval()]() 메서드를 사용해서 실행된다.
2. expression의 실행에서 나는 exception은 [$exceptionHandler]()으로 보내진다.
3. [watch]() 리스너는 expression이 [$digest()]() 메서드를 사용해서 실행된 후에 바로 호출된다.

**Parameters**
* exp(optional) - {(string | function() ) = } - 실행 할 angular expression
    * strin: [expression]()에서 정의한 규칙으로 실행.
    * function(scope): 해당 scope 파라미터로 function을 실행한다.

**Returns**
{*} - expression 평가의 결과.

### \$broadcast(name, args)
등록된 [ng.\$rootScope.Scope#$on]() 리스너들을 실행하기위해서 자식 scope들로 이벤트 name을 전달한다.

이벤트 라이프 사이클은 \$broadcast 가 호출된 scope에서 시작한다. 이 scope에서 name 이벤트에 대해 대기중인 모든 [listeners]()가 전달받는다. 그리고 나서 이벤트는 해당 scope의 안쪽 scope으로 모두 전파된다. 같은 방법으로 등록된 리스너들이 호출된다. 이 이벤트는 취소할 수 없다.

[listeners]()에서 발생한 exception은 [$exceptionHandler]() 서비스로 전달됨.

**parameters**
* name - {string} - 실행할 이벤트
* args - {...\*} - 이벤트 리스너로 전달할 전달인자

**Returns**
{Object} - Event 객체. [ng.\$rootScope.Scope#$on]() 참조.

### \$destroy()
해당 scope과 자식 scope의 삭제. [$digest()]() 가 더이상 해당 스콥으로 전파되지 않을 거란 의미. 해당 scope이 garbage collection 대상이라는 의미.

\$destroy()는 loop를 풀어해치는 관리를 위한 [ngRepeat]()같은 directive로 사용된다.

제거되기전에 \$destroy 이벤트가 해당 scope에서 broadcaste 된다. 필요한 작업이 있으면 $destroy 이벤트 리스너를 등록하자.

### \$digest()
해당 scope과 자식 scope에서 [watchers]()를 관리. [watcher]()의 리스너는 model를 변경할 수 있기 때문에 \$digest()는 더 이상 리스너가 실행되지 않을 때 까지 [watcher]()들 호출을 미룬다. 이런 무한 루프로 빠질 수도 있다는 의미. 이터레이션이 10번을 넘으면 'Maximum iteration limit exceeded.' exception을 던진다.

직접 호출할 일은 별로 없고, 대신에 \$apply를 호출해서 \$digest가 발생하게 할듯. (주로 directive)

\$digest()가 호출된 위치가 알고 싶다면 listener 인자 없이 [$watch()]()에 watchExpression 함수를 등록할 수 있다.

유닛테스트에서 scope 라이프 사이클을 시물레이션 하기 위해서 \$digest()를 호출 할 수도있다.

**Example**

    var scope = ...;
    scope.name = 'misko';
    scope.counter = 0;

    expect(scope.counter).toEqual(0);
    scope.$watch('name', function(newValue, oldValue) {
      scope.counter = scope.counter + 1;
    });
    expect(scope.counter).toEqual(0);

    scope.$digest();
    // no variable change
    expect(scope.counter).toEqual(0);

    scope.name = 'adam';
    scope.$digest();
    expect(scope.counter).toEqual(1);

### \$emit(name, args)
등록된 [ng.\$rootScope.Scope#$on]() 리스너에 알리기 위해서 scope 계층구조를 타고 올라가면서 이벤트 name을 전달한다.

\$emit 을 호출한 scope에서 event 라이프 사이클이 시작한다. 해당 scope에서 이벤트 명이 name인 이벤트를 바라보는 모든 [listeners]()는 알림을 받는다. 이 이벤트는 root scope으로 타고 올라가고 같은 방법으로 등록된 listener를 모두 호출한다. 이벤트는 listener중 하나가 취소를 날리면 이벤트 전파가 멈춘다.

[listener]()에서 어떤 exception이 발생하면 [$exceptionHandler]() 서비스로 전달됨.

**parameters**
* name - {string} - 실행할 이벤트
* args - {...*} - event listener로 전달할 전달인자. (옵션)

**Returns**
{object} - Event 객체, [ng.\$rootScope.Scope#$on]() 참조.

### \$eval(expression)
해당 scope에서 expression을 평가하고 결과를 반환. expression의 exception은 전파된다. (uncaugth) angular expression을 평가할 때 유용.

**Example**

    var scope = ng.$rootScope.Scope();
    scope.a = 1;
    scope.b = 2;

    expect(scope.$eval('a+b')).toEqual(3);
    expect(scope.$eval(function(scope){ return scope.a + scope.b; })).toEqual(3);

**Parameters**
* expression(optional) - {(string | function() )=} - 평가할 angular expression
    * string: [expression]()에서 정의한 규칙으로 실행.
    * function(scope) : 현재 scope 전달인자로 function을 실행

**Returns**
{*} - expression 평가 결과

### \$evalAsync(expression)
일정 시간 후 해당 scope에서 expression을 실행.

\$evalAsync는 expression 실행 시점을 보장하지 않는다. 단지
* DOM 랜더링 이전에 현재 스크립트 실행 컨텍스트에서 실행된다.
* expression 실행후에 최소한 한번의 [$digest cycle]()의 실행된다.

expression 실행에서 발생하는 exception은 [$exceptionHandler]()로 보낸다.

**Parameters**
* expression (optional) - {(string | function())=} - 실행할 angular expression
  * string: [expression]()에서 정의한 규칙대로 실행.
  * function(scope): 해당 scope 전달인자로 function을 실행.

### \$new(isolate)
자식 [scope]()을 새로 생성

부모 scope이 [$digest()]()와 [$digest()]() 이벤트를 전파한다. 생성한 자식 scope은 [$destroy()]()를 사용해서 scope 계층구조에서 제거할 수 있다.

[$destroy()]()는 부모 scope에서 완전히 제거할 scope과 자식 scope이 결정되었을 때 거기서 호출해야한다. 그렇게 함으로써 모델 변경 탐지와 리스너 알림 통보 받기에서 분리됨.

**Parameters**
* isolate - {boolean} - true로 하면 부모 scope에서 불리된 scoep을 생성. (상속 안됨. ) 부모 scope의 프로퍼티를 볼 수 없다. 위젯 생성시 우발적으로 부모 상태값을 읽는 일을 막을 수 있어서 유용함.
**Returns**
{Object} - 새로 생성된 자식 scope

### \$on(name, listener)
주어진 타입의 이벤트 listener 등록. 이벤트 라이프 사이클은 [$emit]() 참조

이벤트 리스너 함수 형태는 function(event, args...) 이고, 인자인 event 객체는 다음 속성들을 가진다.

* targetScope - {Scope}: \$emit이나 \$broadcast가 발생한 scope.
* currentScope - {Scope}: 이벤트가 다뤄지는 현재 scope
* name - {string}: 이벤트
* stopPropagation - {function=}: 이벤트 전파를 멈출려면 stopPropagation 함수를 호출. ( \$emit 에서만 가능)
* preventDefault - {function}: 호출시 defaultPrevented 플래그를 true로 바꿈.
* defaultPrevented - {boolean}: preventDefault 호출 시 true로 .

**Parameters**
* name - {string} - listener 등록할 이벤트
* listener - {function(event, args...)} - listener.

**Returns**
{function()} - 해당 listener 등록 취소용 함수.

### \$watch(watchExpression, listener, objectEquality)
watchExpression가 변경될 때 마다 실행될 listener를 등록한다.

* watchExpression는 모든 [$digest()]() 호출에서 호출된다. 그러므로 바라봐야할 값을 반환해야 한다. (watchExpression 이 변경될 때 [$digest()]()가 재 실행되기 때문에 watchExpression는 [$digest]() 당 여러번 실행될 수 있다. 그래서 여러번 호출해도 값이 달라져서는 안된다.  )
* listener 은 watchExpression의 현재와 이전 호출이 같지 않을 때만 실행된다. (첫 실행 예외) [angular.equal]()을 사용함. 다음 비교를 위한 객체 값 저장은 [angular.copy]()를 사용한다. watch를 복잡하게 쓰면 메모리 사용과 성능에 문제가 있을 수 있음.
* listener 호출이 다른 listener 호출을 부르는 model 변경을 할지도 모른다. 그래서 다른 변경이 발견되지 않을 때 까지 watcher 재실행을 미룬다. 재실행 이터레이션 한계는 무한루프를 막기 위해서 10번이다.

[$digest]() 호출 때 마다 변경알림을 받기 원하면 listener 인자없이 watch Expression 함수만 등록할 수 있다. (watchExpression는 변경이 반견되었을 때 [$digest]() 사이클 당 여러번 실행될 수 있기 때문에 listener 다중 호출에 대비해야 한다. )

scope에 watcher가 등록된 후에, listener 함수는 watcher 생성을 위해서 비동기로 호출 될수 있다. ([$evalAsync]()로.)  드문 케이스임.  listener이 watchExpression이 변하지 않았는데 호출 되었기 때문에. 이 시나리오를 확인하기 위해서 newVal, oldVal를 비교할 수 있다. 같으면(===) 생성하기 위해서 listener를 호출한다.

**Example**

    // let's assume that scope was dependency injected as the $rootScope
    var scope = $rootScope;
    scope.name = 'misko';
    scope.counter = 0;

    expect(scope.counter).toEqual(0);
    scope.$watch('name', function(newValue, oldValue) { scope.counter = scope.counter + 1; });
    expect(scope.counter).toEqual(0);

    scope.$digest();
    // no variable change
    expect(scope.counter).toEqual(0);

    scope.name = 'adam';
    scope.$digest();
    expect(scope.counter).toEqual(1);

**Parameters**

* watchExpression – {(function()|string)} – [$digest]() 사이클마다 평가될 Expression. 반환 값의 변화는 listener 실행을 부른다.
    * string: [expression]()으로 평가
    * function(scope): 현재 scope을 인자로 실행.
* listener(optional) – {(function()|string)=} – watchExpression 변경시 호출될 콜백 함수
    * string: [expression]()으로 평가
    * function(newValue, oldValue, scope): 이전, 현재 값을 인자로 호출됨.
* objectEquality(optional) – {boolean=} – 참조가 아닌 대등을 위한 비교 객체(??)

**Returns**

{function()} - 해당 listener 제거용 함수 반환.

## Properties
### \$id
**returns**

{number} - 디버깅을 위한 scope ID (순차증가 알파벳)

## Events
### \$destroy
scope과 그 하위 요소가 제거되었을 때 발생하는 이벤트

**Type** : broadcast

**Target**: 제거될 scope.








