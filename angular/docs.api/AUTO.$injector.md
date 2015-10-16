# $injector (service in module AUTO )

## Description

[provider](AUTO.$provide)로 지정한 인스턴스 객체를 찾고, type들을 인스턴스화 하고, 메서드들을 실행하고, 모듈을 로드하는데 사용. 다음은 항상 참. n

```js
    var $injector = angular.injector();
    expect($injector.get('$injector')).toBe($injector);
    expect($injector.invoke(function($injector){
      return $injector;
    })).toBe($injector);
```

### Injection Function Annotation
js는 annotation이 없고, DI에는 annotation이 필요함. 주입인자와 함수를 annotate 하는 방법들. 모두 같음. 아래는 그 설명

```js
    // inferred (only works if code not minified/obfuscated)
    $injector.invoke(function(serviceA){});

    // annotated
    function explicit(serviceA) {};
    explicit.$inject = ['serviceA'];
    $injector.invoke(explicit);

    // inline
    $injector.invoke(['serviceA', function(serviceA){}]);
```

#### inference
함수에서 toString()를 호출하면 함수 정의가 문자열로. 여기서 인자를 유추해냄. 그래서 minification을 하면 안되는거. annotations이 필요.

#### $inject Annotation
주입 인자를 정의할 수 있는 $inject 프로퍼티를 함수에 추가한다.

#### Inline
주입 인자를 배열로 받음. 맨 마지막은 호출할 함수.

## Methods

### annotate(fn)
함수가 injection에 대해 요청중인 서비스 명들의 배열을 반환. 이 API는 함수가 실행될 때 그 함수로 주입될 필요가 있는 서비스를 결정하기 위해서 injector가 사용한다.

**argument names**
함수 전달인자에서 depedencies를 추출하기 위한 목적. toString()으로 함수를 문자열로 변환해서 전달인자 명을 추출.

```js
    // Given
    function MyController($scope, $route) {
      // ...
    }

    // Then
    expect(injector.annotate(MyController)).toEqual(['$scope', '$route']);
```

minificatoin하면 이 메서드는 작동안함. 이런 이유로 다음과 같은 annotation 전략이 필요함.

**The $inject property**

함수가 $inject 프로퍼티가 있고 그 값이 문자열로 된 배열이면, 함수에 주입될 서비스명들로 본다.

```js
    // Given
    var MyController = function(obfuscatedScope, obfuscatedRoute) {
      // ...
    }
    // Define function dependencies
    MyController.$inject = ['$scope', '$route'];

    // Then
    expect(injector.annotate(MyController)).toEqual(['$scope', '$route']);
```

**The array notation**
인라인 주입 함수와 바람직한 경우와 $inject 프로퍼티가 불편할 때.

```js
    // We wish to write this (not minification / obfuscation safe)
    injector.invoke(function($compile, $rootScope) {
      // ...
    });

    // We are forced to write break inlining
    var tmpFn = function(obfuscatedCompile, obfuscatedRootScope) {
      // ...
    };
    tmpFn.$inject = ['$compile', '$rootScope'];
    injector.invoke(tmpFn);

    // To better support inline function the inline annotation is supported
    injector.invoke(['$compile', '$rootScope', function(obfCompile, obfRootScope) {
      // ...
    }]);

    // Therefore
    expect(injector.annotate(
       ['$compile', '$rootScope', function(obfus_$compile, obfus_$rootScope) {}])
     ).toEqual(['$compile', '$rootScope']);
```

**Parameters**

* fn – {function|Array.<string|Function>} – 위 설명처럼 찾을 필요가 있는 dependent service name를 위한 함수.

**Returns**
{Array.<string>} – 함수가 필요로 하는 서비스 명들.

### get(name)
서비스 인스턴스 반환.

**Parameters**
* name – {string} – 탐색할 인스턴스 명.

**Returns**
{*} – 찾던 인스턴스.

### instantiate(Type, locals)
JS Type의 인스턴스를 생성. 이 메서드는 새로운 operator를 실행하는 생성자 함수를 가져온다. 그리고 생성자 함수에서 모든 전달인자를 지원한다. 생성자 annotation으로 지정함으로 써.

**Parameters**
* Type – {function} – annotated된 생성자 함수.
* locals(optional) – {Object=} – $injector를 참고하기전 먼저 이 객체에서 전달인자 명을 찾는다.

**Returns**
{*} – type의 신규 인스턴스.


### invoke(fn, self, locals)
$injector에서 메서드 실행하고 메서드 전달인자를 제공한다.

**Parameters**
* fn – {!function} – 실행할 하무. 이 함수의 annotation에서 함수 인자를 받는다.
* self(optional) – {Object=} – 실행 메서드에서의 this.
* locals(optional) – {Object=} – $injector를 참고하기전 먼저 이 객체에서 전달인자 명을 찾는다.

**Returns**
{*} – 실행된 fn 함수의 반환 값.