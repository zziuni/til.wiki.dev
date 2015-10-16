# Module (Type in module ng)

> [원본](http://docs.angularjs.org/api/angular.Module)

## Description
angular [moduels](angular.module) 설정을 위한 인터페이스.

## Methods
### config(configFn)
모듈 로딩시 적용해야할 작업을 등록하는 메서드.
* configFn - {Function} - 모듈 로딩시 실행할 함수. 서비스 환경설정에 유용.

### constant(name, object)
상수는 적적임. 그래서 다른 provide method 전에 적용해야 한다. [$provide.constant()](AUTO.$provide#constant)참조.

### controller(name, constructor)
[$controllerProvider.register()](ng.$controllerProvider#register) 참조.

### directive(name, directiveFactory)
[$compileProvider.directive()](ng.$compileProvider#directive) 참조.
### factory(name, providerFunction)
[$provide.factory()](AUTO.$provide#factory) 참조.
### filter(name, filterFactory)
[$filterProvier.register()](ng.$filterProvider#register)참조.
### provider(name, providerType)
[$provide.provider()](AUTO.$provide#provider) 참조.
### run(initializationFn)
인젝터가 모든 모듈을 로딩했을 때 실행해야 하는 작업을 등록하는 메서드.

### service(name, constructor)
[$provide.service()](AUTO.$provide#service) 참조.
### value(name, object)
[$provide.value()](AUTO.$provide#value) 참조.

## Properties
### name
Returns  - {string} - 모듈명.
### requires
해당 모듈을 로딩하기 전에 injector가 로딩해야 하는 모듈 리스트. dependencies list.
**Returns**
{Array.<string>} - 의존성 목록.