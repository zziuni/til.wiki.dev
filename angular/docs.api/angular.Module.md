# angular.module (API in module ng)

> [원본](http://docs.angularjs.org/api/angular.module)

## Description
angular.module 은 모듈을 생성하거나 등록하기 위한 전역 공간. 애플리케이션으로 사용가능한 해야만한느  모든 모듈은 이 메카니즘을 사용해서 등록되야만 함.

## Module
한 모듈은 서비스, 디랙티브, 필터 환경설정 정보의 집합. 모듈은 [$injector](AUTO.$injector)를 설정으로 위해 사용된다.

```js
    // Create a new module
    var myModule = angular.module('myModule', []);

    // register a new service
    myModule.value('appName', 'MyCoolApp');

    // configure existing services inside initialization blocks.
    myModule.config(function($locationProvider) {
      // Configure existing providers
      $locationProvider.hashPrefix('!');
    });
```

이러고 나면 injector를 생성해서 모듈을 블러올 수 있다.

```js
    var injector = angular.$injector(['ng', 'MyModule']);
```

[ngApp](ng.directive:ngApp)이나 [angular.bootstrap](angular.bootstrap)를 사요하는게 더 편함.

## Usage

```js
    angular.module(name[, requires], configFn]);
```

### Parameters
* name – {!string} – 생성하고 나중에 참조할 모듈명.
requires(optional) – {Array.<string>=} – 지정하면 새 모듈을 생성하고, 지정하지 않으면 name 모듈을 환경설정하기 위해서 검색해 온다.
configFn – {Function} – 모듈을 위한 환경설정 함수. [Module#config()](angular.ModuleType#config)와 동일.

### Returns
{module} - [angular.Module](angular.ModuleType) 를 가진 신규 모듈.