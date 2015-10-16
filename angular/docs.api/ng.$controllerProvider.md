# $controllerProvider (service in module ng)

> [원분](http://docs.angularjs.org/api/ng.$controllerProvider)

## Description
[$controller service](ng.$controller)는 angular에서 신규 컨트롤러 생성을 위해 사용됨.

이 프로바이더는 [registor](ng.$controllerProvider#register) 메서드를 통해서 컨트롤러 등록을 지원.

## Methods
### registor(name, constructor)
**parameter**

* name - {string} - 컨트롤러 명
* constructor – {Function|Array} - 컨트롤러 생성자 함수. 배열형태로 DI annotation 가능.
(예를 들면 요런 형태. ['$scope', function($scope){}])