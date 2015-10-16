# angular.mock.inject (API in module ng )

## Description
쓰기편하게 window에 있음. jasmine에서만 사용가능. .

`inject` 함수는 인자로 넘어온 함수를 주입가능한 함수로 감싼다. inject()는 테스트 별로 $injector 인스턴스를 신규로 생성한다. 참조 해결을 위해 사용된다.

module도 보자.

inject 메서드를 사용한 일반적인 jasmin 예제.

```js
    angular.module('myApplicationModule', [])
        .value('mode', 'app')
        .value('version', 'v1.0.1');


    describe('MyApp', function() {

      // You need to load modules that you want to test,
      // it loads only the "ng" module by default.
      beforeEach(module('myApplicationModule'));


      // inject() is used to inject arguments of all given functions
      it('should provide a version', inject(function(mode, version) {
        expect(version).toEqual('v1.0.1');
        expect(mode).toEqual('app');
      }));


      // The inject and module method can also be used inside of the it or beforeEach
        it('should override a version and test the new version is injected', function() {
          // module() takes functions or strings (module aliases)
          module(function($provide) {
            $provide.value('version', 'overridden'); // override version here
          });

          inject(function(version) {
            expect(version).toEqual('overridden');
          });
        });
    });
```

## Usage

```js
    angular.mock.inject(fns);
```

### Parameters
* fns – {...Function} - injector 사용을 주입하는 함수들.