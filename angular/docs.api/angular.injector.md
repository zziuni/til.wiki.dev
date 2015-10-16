# angular.injector (API in module ng)

## Description
dependency injection만이 아니라 서비스 탐색을 위해서 사용되는 injector 함수를 생성. [dependency injection](../guide/di) 참조.

## Usage

```js
    angular.injector(modules);
```

### Parameters
* modules - {Array.<string|Function>} - 모듈 함수나 알리아스 목록. [angular.module](angular.module) 참조. ng 모듈은 명시적으로 포함해야 한다.

### Returns

{function()} - injector 함수. [$injector](AUTO.$injector)

## Example

```js
    // create an injector
    var $injector = angular.injector(['ng']);

    // use the injector to kick off your application
    // use the type inference to auto inject arguments, or use implicit injection
    $injector.invoke(function($rootScope, $compile, $document){
      $compile($document)($rootScope);
      $rootScope.$digest();
    });
```