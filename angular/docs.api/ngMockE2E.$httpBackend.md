# $httpBackend (service in module ngMockE2E )
## Description
end-to-end 테스트나 $http 서비스를 사용하는 애플리케이션을 backend없이 개발할 때 사용하는 HTTP backend 구현채.

유닛 테스트를 위한 http backend 는 mgMock.$httpBackend 참조.

이 구현채는 `when` api와 그 숏컷들(whenGET, whenPOST)을 통해서 정적, 동적 응답을 하는데 사용된다. 옵션으로 지정 요청에 대한 실 서버 $httpBackend를 관통하는데도 사용한다.(웹서버에서 탬플릿을 가져오거나 원격 api와 상호작용을 위해서. )

유닛 테스트와는 반대로, end-to-end 테스트 시나리오나, 실 backend api를 mock으로 대체하고 애플리케이션을 개발한다는 시나리오에서, 이건 mock을 우회해서 실 http 요청을 날리기(서버에서 템플릿이다 정적 파일 가져오기) 위한 몇몇 요청 분류에 대해서 가끔 유용하다. 이렇게 backend를 설정하기 위해서 `respond`대신에 `when`의 `passThrough` 요청 핸들러를 사용한다.

추가적으로, 유닛테스트에서 처럼 수동으로 요청을 mock 처리하는 flush를 날리기를 원치 않음.왜냐하면 e2e $httpBackend 는 자동으로 요청되는 요청에 자동으로 flush를 한다. XMLHttpRequest 객체의 동작을 신중하게 시뮬레이팅 해서 말이지.

http backend로 애플리케이션이 돌도록 설정하려면`ngMockE2E`와 니 애플리케이션 모듈에 의존하는 신규 모듈을 만들고 가짜 backend를 정의한다.

```js
    myAppDev = angular.module('myAppDev', ['myApp', 'ngMockE2E']);
    myAppDev.run(function($httpBackend) {
      phones = [{name: 'phone1'}, {name: 'phone2'}];

      // returns the current list of phones
      $httpBackend.whenGET('/phones').respond(phones);

      // adds a new phone to the phones array
      $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
        phones.push(angular.fromJSON(data));
      });
      $httpBackend.whenGET(/^\/templates\//).passThrough();
      //...
    });
```

그리고 이 모듈로 bootstrap실행.

## Methods
* when(method, url, data, headers)
* whenDELETE(url, headers)
* whenGET(url, headers)
* whenHEAD(url, headers)
* whenJSONP(url)
* whenPATCH(url, data, headers)
* whenPOST(url, data, headers)
* whenPUT(url, data, headers)


