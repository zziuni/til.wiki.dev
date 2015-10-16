# $http (service in module ng)

## Description
$http 서비스는 [XMLHttpRequest]() 객체나 [JSONP]() 를 통해서 원격 HTTP 서비스와 통신이 가능하게 하는 Angular 코어 서비스.

$http를 사용한 어플리케이션은 [$httpBackend mock]()를 사용해서 유닛 테스트을 할 수 있다.

$http를 추상화한 서비스는 [$resource]()를 참고.

$http는 $q로 구현된 [deferred/promise API]()에 기반함. 고급사용을 하려면 $http에 대한 이해가 중요함.

## General usage
$http는 HTTP request를 생성하기 위한 config 객체 하나를 인자로 받는 함수. 그리고 success, error 메서드 두 개를 가진 [promise]() 객체를 반환.

```js
    $http({method: 'GET', url: '/someUrl'}).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
```

$http 함수 호출의 반환 객체는 promise. 콜백 등록을 위해서 `then` 메서드 사용도 가능. 이 콜백은 response 객체 하나를 전달인자로 받는 형태.

200~299 사이의 http status code는 모두 성공으로 보고 success callback을 실행. 주의할점 response가 redirect되면 XMLHTTPRequest는 이를 따라 가고 error callback을 실행되지 않는다.

## Shortcut methods
모든 $http 서비스를 이용한 모든 요청은 url과 HTTP method(GET, POST ...)가 필요하다.  POST/PUT은 점길 데이터도 필수 값.

```js
    $http.get('/someUrl').success(successCallback);
    $http.post('/someUrl', data).success(successCallback);
```

shortcut method list
* [$http.get](ng.$http#get)
* [$http.head](ng.$http#head)
* [$http.post](ng.$http#post)
* [$http.put](ng.$http#put)
* [$http.delete](ng.$http#delete)
* [$http.jsonp](ng.$http#jsonp)

## Setting HTTP Headers
\$http 서비스는 자동으로 모든 Request에 공통된 HTTP 주요 해더를 추가함.  `$httpProvider.defaults.headers` 환경설정 객체에 접속해서 변경할수 있음.

* \$httpProvider.defaults.headers.common (공통 해더)
    * Accept: application/json, test/plain
    * X-Requested-Width : XMLHttpRequest
* \$httpProvider.defaults.headers.post:  (POST 기본 해더)
    * Content-Type : applicaton/json
* \$httpProvider.defaults.headers.put: (PUT 기본 해더)
    * Content-Type : application/json

기본 값을 추가하거나 오버라이드 하려면 그냥 해당 객체의 프로퍼티를 지우거나 추가하면 된다. POST, PUT이외의 HTTP method의 해더 추가는 그냥 소문자로 추가 하면 됨. 예) `$httpProvier.defaults.headers.get['My-Header'] = 'value'`

기본값은 런타임시에도 설정할 수 있음.

## Transforming Request and Response
Request와 Response는 transform 함수를 사용해서 변환할 수 있다. 기본적으로 angular는 변환을 지원한다.

Request Transformation
* request 환경설정 객체의 data 프로퍼티가 객체면 JSON으로 serialize 한다.

Response Transformation
* XSRF 접두사가 있으면 이를 제거함. (Security Consideration 절 참조. )
* JSON response이면 JSON 파서로 desirialize 함.

기본 변환을 바꾸려면 `$httpProvider.defaults.transformRequest`와 `$httpProvider.defaults.transformResponse`를 수정한다. 이 프로퍼티들은 변환 함수들의 배열. transformation chain을 만들기 위해서 변환 함수를 push 하거나 unshift 할 수 있다.  배열로 감싸지 않고 자기만의 변환 함수를 바로 오버라이드 해도 상관없음.

국지적으로 request/response transformation 을 오버라이드 하기 위해서 $http의 전달인자인 환결설정 객체에 `transformRequest`와 `transformResponse`를 확장할 수 있다.

## Caching
환경설정 객체에 cache 프로퍼티가 true이면 캐싱이 활성화 됨. 캐시가 켜지면 $http는 response를 로컬 캐시에 저장하고 다시 request 를 날릴 때, 서버로 요청하지 않고 로컬 캐시를 줌.

캐시가 활성화 되도 request는 동일하게 비동기로 동작한다.

캐시가 사용되야 하는 동일 ULR에 GET request가 여러번 있는데 아직 캐시에 값이 없다면, 첫 요청만 서버로 하고 다음 요청들은 첫 요청값으로 처리함.

## Response Interceptors
interceptor를 이해하기 전에 [$q와 deferred/promise APIs]()를 먼저 이해 해야 한다.
글로벌 에러 핸들링(인증, repsonse의 모든 종류의 동기, 비동기 사전과정 ) 목적으로, request가 생성되는 애플리케이션 코드에 http request가 넘어가기 전에 http request를 위한 response intercept가 가능하다. response interceptor는 [promise apis]()를 쓴다. 끝.

Interceptor는 \$httpProvider에 \$httpProvider.responseInterceptors로 추가되어 등록되는 service factory 다. 이 factory는 호출되고 dependency와 주입된다. (있다면) 그리고 interceptor를 반환한다. interceptor는 [promise]()를 취해서 원본 혹은 신규 promise를 반환하는 함수다.

```js
    // register the interceptor as a service
    // service로 interceptor를 등록한다.
    $provide.factory('myHttpInterceptor', function($q, dependency1, dependency2) {
      return function(promise) {
        return promise.then(function(response) {
          // do something on success
        }, function(response) {
          // do something on error
          if (canRecover(response)) {
            return responseOrNewPromise
          }
          return $q.reject(response);
        });
      }
    });

    $httpProvider.responseInterceptors.push('myHttpInterceptor');


    // register the interceptor via an anonymous factory
    $httpProvider.responseInterceptors.push(function($q, dependency1, dependency2) {
      return function(promise) {
        // same as above
      }
    });
```

## Security Consideration
보안에 대한 고려
* [JSON vulnerability]()
* [XSRF]()

서버 클라이언트 모두는 이 위험을 제거하는 일에 협력해야 한다. Angular는 이 문제를 고려한 전략이 사전 설정으로 딸려있다. 하지만 서버도 협력이 필수.

### JSON Vulnerability Protection
[JSON 취약점](http://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx)은 3rd party 사이트가 JSON 리소스 URL을 동일 조건의 [JSONP]() request로 변경한다. 니 서버를 헤아리기 위해서 " ) } ] ' , \n "와 함께 모든 JSON request를 접두사를 붙일 수 있다. angular는 JSON으로 이를 처리하기 전에 접두사를 제거한다.

예를 들어 서버가 다음을 반환한다면

    ['one','two']

취약점이 될테니 서버가 다음을 반환한다.

    )]}',
    ['one','two']

JSON 처리전에 Angular는 접수다를 제거한다.

### Cross Site Request Forgery (XSRF) Protection
