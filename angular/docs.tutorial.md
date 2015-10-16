# AngularJS Tutorial 정리
공식 문서 [AngularJS Tutorial](https://docs.angularjs.org/tutorial)를 요약.

## 0-Bootstrapping
### 0-1 What is the code doing?
* ng-app directive
```html
<html ng-app>
```
Angular의 지시자. 애플리케이션의 루트 문서요소를 지정. HTML 문서 전체일 수도 있고, 일부 일 수도 있다.

* AngularJS script tag:
```html
<script src="lib/angular/angular.js"></script>
```
소드 다운로드후 콜백을 실행. 콜백은 `ngApp`을 찾아서 애플리케이션은 기동함.

* Double-curly binding with an expression.
```html
Nothing heare {{'yet' + '!'}}
```
`{{}}`는 Angular의 탬플릿 기능을 함. 괄호 안의 표현식을 평가해서 DOM에 결과를 넘긴다. 일회성과 자동갱신 모드 가능.

### 0-2 Bootstraping AngularJS apps
`ngApp`를 사용하는 Angular app기동은 열라 쉽다. 스크립트로더를 사용하는 고급 사용은 **imperative /manual way**를 사용한다.
* **injector**가 의존성 주입을 위해 사용된다.
* 애플리케이션 model의 컨텍스트로 사용할 **root scope**를 생성한다.
* ngApp 엘리먼트에서 DOM을 컴파일함. 모든 지시자와 바인딩을 찾는다.
기동되면 브라우저 이벤트를 대기하고 있다가 모델이 바뀌면 감지해서 뷰에 반영한다.

현재 튜토리얼 구조는 졸라 단순함. 탬플릿은지시자가 하나와 정적 바인딩, 빈 model를 갖고 있음.

### 0-3 What are all these files in my working derectory?
이 튜토리얼은 **angular-seed proejct**에서 다음을 변경.
* example app 제거
* 폰 이미지 추가. app/img/phones
* 폰 데이터 파일(JSON) 추가. app/phones
* 트위터 bootstrap 파일 추가. app/css/, app/img/

### 0-4 Experiments
index.html에 새로운 표현식 추가해보기
```html
<p>1 + 2 + {{1+2}}</p>
```

### 0-5 Summary
컨텐츠 추가하는 step 1으로 이동.

## 1-Static Template
이 단계는 동적으로 컨텐츠가 추가되는 형태를 그려보기 위해서 정적 HTML를 추가해본 단계.

### 1-1 Experiments
컨텐츠 HTML추가해보기. ㅋ

### 1-2 Summary
이와 같은 형태를 Angular가 어떻게 동적으로 추가하는지 **step 2**에서 본다.

## 2-Angular Templates
동적 웹 페이지를 반들 차례.

### 2-1 View and Template
Angular에서 **view**는 HTML **template**를 통해서 **model**를 투영하는 것. 즉, 모델이 변하는 시점에 뷰의 적절한 바인딩 지점을 갱신한다는 말.

```html
<html ng-app>
<head>
  ...
  <script src="lib/angular/angular.js"></script>
  <script src="js/controllers.js"></script>
</head>
<body ng-controller="PhoneListCtrl">

  <ul>
    <li ng-repeat="phone in phones">
      {{phone.name}}
      <p>{{phone.snippet}}</p>
    </li>
  </ul>
</body>
</html>
```

**ngReat directive**를 두개의 **Angular expression**를 사용했다.

* `ng-reate="phone in phones"`가 Angular repeater. 반복해서 `<li>`를 생성
* *phone.name*, *phone.snippet*이 PhoneListCtrl 컨트롤에 있는 모델과 바인딩.

### 2-2 Model and Controller

```javascript
function PhoneListCtrl($scope) {
  $scope.phones = [
    {"name": "Nexus S",
     "snippet": "Fast just got faster with Nexus S."},
    {"name": "Motorola XOOM™ with Wi-Fi",
     "snippet": "The Next, Next Generation tablet."},
    {"name": "MOTOROLA XOOM™",
     "snippet": "The Next, Next Generation tablet."}
  ];
}
```

* PhoneListCtrl - `<body>`에서 선언한 `ngController`의 값. 컨트롤러 명.
* 컨트롤러 scope은 root scope의 하위 scope. `ng-contoller`로 선언한 element 안쪽에 있는 모든 바인딩 요소를 바인딩. 탬플릿에 있는 ng들을 따라서 scope, data model, controller를 구분하고 싱크한다.  **angular scope documentation**참고.

### 2-3 Tests
"Angular way"가 테스트 코드 개발을 쉽게 한다?
* jasmin이 필수는 아니지만 Angular 개발자들이 선호하는 형태. BDD

angular-seed proejct에는 [Testacular](http://vojtajina.github.com/testacular/)가 세팅되어있음. 사용법.

* angular-phonecat 폴더에서 ./scripts/test.sh  를 실행해서 Testacula server를 실행.
* 자동으로 chrome이 하나 뜸. Testacula가 테스트를 실행하기 위해서 사용할 놈. 백그라운드로 그냥 놔두면 됨.
* 터미널에 다음처럼 나와야 함.
```
    info: Testacular server started at http://localhost:9876/
     info (launcher): Starting  browser "Chrome"
     info (Chrome 22.0): Connected on socket id tPUm9DXcLHtZTKbAEO-n
     Chrome 22.0: Executed 1 of 1 SUCCESS (0.093 secs / 0.004 secs)
```
* 테스트 코드를 수정하면 자동으로 다시 테스트가 실행됨. 그냥 터미널을 띄워 놓으면 됨.

## 3 - Filtering Repeaters

### 3-1 Controller
컨트롤러는 변경이 없음.

### 3-2 Template
```html
<div class="container-fluid">
  <div class="row-fluid">
    <div class="span2">
      <!--Sidebar content-->

      Search: <input ng-model="query">

    </div>
    <div class="span10">
      <!--Body content-->

      <ul class="phones">
        <li ng-repeat="phone in phones | filter:query">
          {{phone.name}}
          <p>{{phone.snippet}}</p>
        </li>
      </ul>

    </div>
  </div>
</div>
```

* Data-binding: 컨트롤러의 scope에서 동명의 변수(data model)과 input을 엮는다. 그리고 싱크.
* 사용자 입력이 data model인 query에 저장되고 이건 바로 repeater에 사용된다.
* filter 함수는 query를 이용해서 repeat할 배열을 새로 만든다.

![](http://docs.angularjs.org/img/tutorial/tutorial_03.png)


### 3-3 Test

unitTest는 컴포넌트와 컨트롤러 테스트용. DOM 변경을 테스트 할려면 end-to-end test를 해야함.

```javascript
describe('PhoneCat App', function() {

  describe('Phone list view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html');
    });


    it('should filter the phone list as user types into the search box', function() {
      expect(repeater('.phones li').count()).toBe(3);

      input('query').enter('nexus');
      expect(repeater('.phones li').count()).toBe(1);

      input('query').enter('motorola');
      expect(repeater('.phones li').count()).toBe(2);
    });
  });
});
```

Jasmin과 유사해 보이는 테스트 코드. [Anguler's end-to-end test runner](http://docs.angularjs.org/guide/dev_guide.e2e-testing)의 API를 이용한다. 테스트를 하려면 브라우저에서 다음 URL를 사용.
* node.js유저는 http://localhost:8000/test/e2e/runner.html 를 실행
* 다른 웹서버 사용자는 http://localhost:[port-number]/[context-path]/test/e2e/runner.html
* 작동만 보려면 http://angular.github.com/angular-phonecat/step-3/test/e2e/runner.html

end-to-end 테스트도 Testacula를 사용할 수도 있음. `./scripts/e2e-test.sh` 를 사용함. 실행하면 자동으로 테스트가 진행되지만, unittest와 달리 테스트 파일을 수정했다고 재 실행되지는 않음.

## 4 - Two-way Data Binding
정렬 기능 추가.

### 4-1 Template
탬플릿에 정렬 select 추가. order Prop라는 data model 추가.

**app/index.html:**
```html
Search: <input ng-model="query">
Sort by:
<select ng-model="orderProp">
  <option value="name">Alphabetical</option>
  <option value="age">Newest</option>
</select>


<ul class="phones">
  <li ng-repeat="phone in phones | filter:query | orderBy:orderProp">
    {{phone.name}}
    <p>{{phone.snippet}}</p>
  </li>
</ul>
```

![](http://docs.angularjs.org/img/tutorial/tutorial_04.png)

`ng-repeat`에서 orderBy 필터를 사용함. 이 필터는 입력 배열을 복사해서 정렬한다.

### 4-2 Controller
**app/js/controllers.js:**
```javascript
function PhoneListCtrl($scope) {
  $scope.phones = [
    {"name": "Nexus S",
     "snippet": "Fast just got faster with Nexus S.",
     "age": 0},
    {"name": "Motorola XOOM™ with Wi-Fi",
     "snippet": "The Next, Next Generation tablet.",
     "age": 1},
    {"name": "MOTOROLA XOOM™",
     "snippet": "The Next, Next Generation tablet.",
     "age": 2}
  ];

  $scope.orderProp = 'age';
}
```

* phones 배열 수정. 정렬에 사용할 age 프로퍼티 추가.
* orderProp의 기본값으로 'age'를 설정. 기본값을 설정했으므로 Select는 Newest가 기본값이 되고, phones로 필터링 된다. 이게 **two way data-binding**.


### 4-3 Test
unitTest와 end-to-end Test를 변경한다.

**test/unit/controllersSpec.js:**
```javascript
describe('PhoneCat controllers', function() {

  describe('PhoneListCtrl', function(){
    var scope, ctrl;

    beforeEach(function() {
      scope = {},
      ctrl = new PhoneListCtrl(scope);
    });


    it('should create "phones" model with 3 phones', function() {
      expect(scope.phones.length).toBe(3);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
  });
});
```
orderProp 기본값을 테스트한다.
Jasmin API중 beforeEach 블럭을 사용한다. beforeEach 블럭은 부모 describe 블럭의 모든 테스트를 시작하기전에 실행된다.

Testacular테스트가 성공하면 다음 메세지가 나옴.
```
Chrome 22.0: Executed 2 of 2 SUCCESS (0.021 secs / 0.001 secs)
```

**test/e2e/scenarios.js:**
```javascript
...
    it('should be possible to control phone order via the drop down select box',
        function() {
      //let's narrow the dataset to make the test assertions shorter
      input('query').enter('tablet');

      expect(repeater('.phones li', 'Phone List').column('phone.name')).
          toEqual(["Motorola XOOM\u2122 with Wi-Fi",
                   "MOTOROLA XOOM\u2122"]);

      select('orderProp').option('Alphabetical');

      expect(repeater('.phones li', 'Phone List').column('phone.name')).
          toEqual(["MOTOROLA XOOM\u2122",
                   "Motorola XOOM\u2122 with Wi-Fi"]);
    });
...
```
select 박스 선택에 따른 정렬 순서 테스트. `./scripts/e2e-test.sh`를 실행하거나 `runner.html`를 브라우저에 띄우면 된다. step-4의 e2d test를 보고 싶으면 [Angular's Server](http://angular.github.com/angular-phonecat/step-4/test/e2e/runner.html)를 참고.


## 5 - XHRs & Dependency injection
angular 내장 서비스 [$http](http://docs.angularjs.org/api/ng.$http)를 사용해서 원격 데이터 가져오기. 컨트롤러에 [Dependency Injection](http://docs.angularjs.org/guide/di)를 사용할 거다.

### 5-1 Data
대략 다음 처럼 생긴 파일이 `app/phones/phones.json`에 있다.
```json
[
 {
  "age": 13,
  "id": "motorola-defy-with-motoblur",
  "name": "Motorola DEFY\u2122 with MOTOBLUR\u2122",
  "snippet": "Are you ready for everything life throws your way?"
  ...
 },
...
]
```

### 5-2 Controller
[$http](http://docs.angularjs.org/api/ng.$http)를 사용해서 HTTP request를 날린다. Angular에는 일반적인 작업을 위한 내장 서비스들이 있다. 필요할 곳에 서비스를 주입한다.

**app/js/controllers.js:**
```javascript
function PhoneListCtrl($scope, $http) {
  $http.get('phones/phones.json').success(function(data) {
    $scope.phones = data;
  });

  $scope.orderProp = 'age';
}

//PhoneListCtrl.$inject = ['$scope', '$http'];
```
$http는 `index.html` 기준의 상대 경로로 `phone/phones.json`데이터를 get request 한다.  $http는 success method에서  [promise object](http://docs.angularjs.org/api/ng.$q)를 반환한다. success는 비동기 응답 데이터를 핸들리하기 위해서 사용.

사용하고 싶은 서비스는 컨트롤러 파라미터로 지정만 하면 끝.
```javascript
function PhoneListCtrl($scope, $http) {...}
```

Angular의 Dependency injector는 컨트롤러가 구조화 될 때 서비스를 컨트롤러에 제공한다. Dependency injector가 dependency를 찾을 때 사용하므로 서비스 파라미터명은 바꾸면 안된다.

![](http://docs.angularjs.org/img/tutorial/xhr_service_final.png)

#### '$' Prefix Naming Convention
step-11에서 커스텀 서비스를 만드는 법을 본다. 구분하기위해서 빌트인 서비스 명은 접두사로 '$'를 사용한다. 커스텀 서비스와 모델에서 사용하면 안된다.

#### A Note on Minification
angular는 컨트롤러 파리미터의 이름으로 Dependency를 찾기 때문에 컨트롤러를 [minify](http://en.wikipedia.org/wiki/Minification_(programming))를 해버려서 파라미터명이 바뀌면 dependency injector가 찾지 못한다.

해결법.  컨트롤러 뒤에 다음 코드를 붙여서 dependency를 정의한다.
```js
PhoneListCtrl.$inject = [ '$scope', '$http' ];
```

컨트롤러를 배열러 정의 하는 방법도 있다.
```js
var PhoneListCtrl = ['$scope', '$http', function($scope, $http) { /* constructor body */ }];
```
어떤 종류의 주입도 모두 처리 되므로 둘중에 아무거나 골라 쓰면 됨.


### 5-3 Test
DI때문에 테스트가 약간 복잡해짐. 컨트롤러가 생성될 때, dependency를 주입하기만 하면 되지만, 여기서가 추천하는 방법은 앱코드 백단에서 angular가 하는 것과 같은 방식으로 컨트롤러를 생성하는 것.

**test/unit/controllersSpec.js:**
```js
describe('PhoneCat controllers', function() {

  describe('PhoneListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/phones.json').
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      ctrl = $controller(PhoneListCtrl, {$scope: scope});
    }));
```

테스트 환경에서 Jasmin과 angular-mock.js를 로딩했으므로 injector를 접근하고 가져오는 [module](http://docs.angularjs.org/api/angular.mock.module), [inject](http://docs.angularjs.org/api/angular.mock.inject) helper method를 쓸 수 있다.

다음 과정을 통해서 테스트 환경에서 컨트롤러를 생성한다.

* Jasmin beforeEach 함수에서 [$rootScope](http://docs.angularjs.org/api/ng.$rootScope), [$controller](http://docs.angularjs.org/api/ng.$controller), [$httpBackend](http://docs.angularjs.org/api/ng.$httpBackend) 서비스의 인스턴스를 주입하기 위해서 *inject* helper method를 사용한다. 이 인스턴스들은 각 태스트를 위해서 매번 재 생성되므로 테스트간 독립된 테스팅을 보장한다.
* `$rootScope.$new()`를 호출해서 해당 컨트롤러를 위한 신규 scope를 생성한다.
* 주입된 `$controller`를 PhoneListCtrl함수와 생성한 scope를 파라미터로 호출한다.

phone 리스트를 가져오기 위해서 `$http`를 사용했으므로 `PhoneListCtrl`컨트롤러의 scope를 생성하기전에, 컨트롤러에서 들어올 요청을 위해서 [testing harness](http://en.wikipedia.org/wiki/Test_harness)를 호출해야 한다. 다음 처럼 한다.

* beforeEach 함수에 주입된 $httpBackend 서비스를 요청한다. 프러덕트 환경에서 모든 XHR과 JSONP 요청을 용의하게 하는 서비스의 목업 버전이다. 이 서비스가 테스트를 악몽으로 만드는 네이티브 API와 이와 관련된 전역 상태영향 없이 테스트 작성을 할 수 있게 한다.
* $httpBackend.expectGET()은 유입 HTTP 요청을 $httpBackend 서비스에 태우기 위해 사용한다. 응답값도 정의한다. 응답값은 #httpBackend.flush 메서드를 호출할 때 반환된다.

응답을 받기전에는 scope안에 phone 모델이 존재하지 않는다는 걸 증명하는 테스트.

```js
it('should create "phones" model with 2 phones fetched from xhr', function() {
  expect(scope.phones).toBeUndefined();
  $httpBackend.flush();

  expect(scope.phones).toEqual([{name: 'Nexus S'},
                               {name: 'Motorola DROID'}]);
});
```

* $httpBackend.flush()를 호출하면 브라우저에서 요청 큐를 flush한다. 사전에 정의된 응답값이 $http 서비스로 반환된다.
* 그러면 이제 scope안에 phone 모델이 존재하는걸 확인하는 assertion를 만들 수 있다.

orderProp 기본값확인 assertion을 다시 추가.

```js
it('should set the default value of orderProp model', function() {
  expect(scope.orderProp).toBe('age');
});
;
```

Testacular를 띄워놨다면 다음같은 메세지를 봐야함.
```
 Chrome 22.0: Executed 2 of 2 SUCCESS (0.028 secs / 0.007 secs)
```

## 6 - Templating Links & Images
썸네일 이미지와 링크 걸고, 폰에 대한 상세 내용 보여주기 .

### 6-1 Data
`phone.json` 파일은 각 폰의 이미지 패스가 추가됨. `app/img/phones/` 디랙토리에 이미지있음.

**app/phones/phones/json**
```js
[
 {
  ...
  "id": "motorola-defy-with-motoblur",
  "imageUrl": "img/phones/motorola-defy-with-motoblur.0.jpg",
  "name": "Motorola DEFY\u2122 with MOTOBLUR\u2122",
  ...
 },
...
]
```

### 6-2 Template
**app/index.html**
```html
...
        <ul class="phones">
          <li ng-repeat="phone in phones | filter:query | orderBy:orderProp" class="thumbnail">
            <a href="#/phones/{{phone.id}}" class="thumb"><img ng-src="{{phone.imageUrl}}"></a>
            <a href="#/phones/{{phone.id}}">{{phone.name}}</a>
            <p>{{phone.snippet}}</p>
          </li>
        </ul>
...
```
기존 스텝에서는 `{{phone.name}}`을 썼는데 여긴 `{{phone.id}}`를 사용. `img`에서는 `ng-src` 지시자를 사용. 이 지시자는 angular의 {{표현식}}을 브라우저가 못다루게 하기위한 방법. 그냥 `src`에 {{표현식}}을 사용하면 angular가 표현식을 교채하기전에 브라우저가 http 요청을 실행한다. `ngSrc`는 유효하지 않은 위치로 http 요청을 만들지 안 도록 한다.

### 6-3 Test
**test/e2e/scenarios.js**
```js
...
    it('should render phone specific links', function() {
      input('query').enter('nexus');
      element('.phones li a').click();
      expect(browser().location().url()).toBe('/phones/nexus-s');
    });
...
```
아직 상세뷰는 없지만 검색해서 링크를 클릭했을 때 url이 변경되는지 end-to-end 테스트 추가.
`/scripts/e2e-test.sh`를 실행하거나 브라우저로 `runner.html`를 띄우거나. [Anguler Server](http://angular.github.com/angular-phonecat/step-6/test/e2e/runner.html)로 돌려보기.

### 6-4 Experiments
`ng-src`를 사용하지 않고 HTML의 src를 사용하게 바꾸고 크롬등의 개발자 도구로 보면 이상한 URL를 호출한다.

## 7 -  Routing & Multiple Views
레이아웃 탬플릿 만들기, 라우팅이 되고 멀티뷰를 가진 앱 빌드하기.

### 7-1 Multiple Views, Routing and Layout Template
기존까지는 단일 뷰의 화면이였지만, 여기전 클릭하면 상세정보가 나오는 멀티뷰 화면을 만들거다.
angualr가 "layout template"라고 부르는 템플릿으로 `app/index.html`를 변경. "layout template"은 모든 뷰가 같이 쓰는 공통 뷰. "partial template"는 해당 "route"에서 사용자에게 출력되는 레이아웃에 포함된 템플릿.

route는 [$routeProvider](http://docs.angularjs.org/api/ng.$routeProvider)로 지원한다. [$route](http://docs.angularjs.org/api/ng.$route) service를 제공하는 이놈은 컨트롤러와 뷰 탬플릿, 현재 URL을 쉽게 연결한다. [depp link](http://en.wikipedia.org/wiki/Deep_linking)를 구현 가능.

#### A Note About DI, Injector and Providers
[dependency injection](http://docs.angularjs.org/guide/di)은 angular의 책심기능. 이해해야함.
앱플리케이션 기동시 앱 안의 모든 DI에서 사용되는 injector를 생성한다. injector자체는 $http, $route 서비스가 뭘하는지 알지 못함. 적절한 모듈 정의가 아니면 그 서비스의 존재도 모른다.
injector의 유일한 목적은 지정한 모듈 정의를 로드하는 것. 모듈 정의는 모듈 안에 정의된 모든 서비스 프로바이더를 등록하고 그 프로바이더로 부터 느슨하게 인스턴스된 depedency service를 가진 함수 주입이 요청될 때 로드된다.

provider는 서비스의 생성과 런타임 동작을 제어하기위해 사용될 수 있는 환경설정 API를 들어내고 서비스의 인스턴스를 제공하는 객체. $route 서비스의 경우는 $routeProvider가 애플리케이션을 위한 라우트 정의를 할 수 있도록 API를 들어낸다.

Angular 모듈은 AMD나 require.js와 경쟁하지 않는다. 스크립트 로딩 순서나, 느슨하게 스크립트를 가져오는 문제의 해법을 제공하지 않음. Angular는 애플리케이션에서 전역 상태를 제거하는 문제를 해결하고 injector를 설정하는 법을 제공한다. 이를 통해서 직교하는 두 모듈 시스템이 공존하면서 목적을 다하도록 한다.

### 7-2 The App Module
**app/js/app.js**
```js
angular.module('phonecat', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl}).
      when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/phones'});
}]);
```
라우터와 동작하는 앱을 만들려면, **modlue**을 생성해야 함. *phonecat*이라는 모듈을 만들어서 `config` API를 사용한다. `config`에 주입하기 위해서 `$routeProvider`를 요청하고, 라우터 정의는 `$routeProvider.when`를 사용한다.

injector 환경설정 단계기간에, 프로바이더가 주입될 수도 있으나 injector가 생성된후에 주입할 수 없다 그래서 서비스 인스턴스 생성을 시작한다.

* URL해시가 */phones*일때만 폰 리스트가 보임. 뷰를 생성할때 *phone-list.html* 탬플릿과 *PhoneListCtrl* 컨트롤러를 사용한다.
* URL해시가 */phone/:phoeId*와 일치 할 때 폰 상세뷰를 출력한다. *:phoneId*가 변수. *phone-detail.html* 탬플릿과 *PHoneDetailCtrl* 컨트롤러를 사용해서 뷰를 생성

*/js/controllers.js*를 재활용한다. 기존 PhoneListCtrl은 두고 PhoneDetailCtrl를 추가.

일치하는 URL패턴이 없으면 $route.otherwise({redirectTo:'/phones'}) 가 폰 리스트로 보낸다.

$route는 라우트 선언('/phones/:phoneId')을 URL의 탬플릿으로 사용. `:`를 사용하는 모든 변수는 `$routeParams` 객체에서 추출된다.

새로만든 모듈로 동작하게 하려면 html의 ng-app를 변경해야함.

**app/index.html**
```html
<!doctype html>
<html lang="en" ng-app="phonecat">
...
```

### 7-3 Controllers
**app/js/controllers.js**
```js
...
function PhoneDetailCtrl($scope, $routeParams) {
  $scope.phoneId = $routeParams.phoneId;
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams'];
```

### 7-4 Template
$rout 서비스는 일반적으로 `ngView`와 함께 쓰임. `ngView`는 layout template안에 현재 rout에 해당하는 template를 포함시킨다.

**app/index.html**
```html
<html lang="en" ng-app="phonecat">
<head>
...
  <script src="lib/angular/angular.js"></script>
  <script src="js/app.js"></script>
  <script src="js/controllers.js"></script>
</head>
<body>

  <div ng-view></div>

</body>
</html>
```

원래 있던 리스트 HTML은 별도의 템플릿으로 뺀다.
**app/partails/phone-list.html**
```html
<div class="container-fluid">
  <div class="row-fluid">
    <div class="span2">
      <!--Sidebar content-->

      Search: <input ng-model="query">
      Sort by:
      <select ng-model="orderProp">
        <option value="name">Alphabetical</option>
        <option value="age">Newest</option>
      </select>

    </div>
    <div class="span10">
      <!--Body content-->

      <ul class="phones">
        <li ng-repeat="phone in phones | filter:query | orderBy:orderProp" class="thumbnail">
          <a href="#/phones/{{phone.id}}" class="thumb"><img ng-src="{{phone.imageUrl}}"></a>
          <a href="#/phones/{{phone.id}}">{{phone.name}}</a>
          <p>{{phone.snippet}}</p>
        </li>
      </ul>

    </div>
  </div>
</div>
```

디테일 뷰를 위한 템플릿을 추가.

**app/partials/phone-detail.html**
```
TBD: detail view for {{phoneId}}
```

### 7-5 Test
end-to-end 테스트를 추가한다.
```js
...
  it('should redirect index.html to index.html#/phones', function() {
    browser().navigateTo('../../app/index.html');
    expect(browser().location().url()).toBe('/phones');
  });
...

 describe('Phone detail view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html#/phones/nexus-s');
    });


    it('should display placeholder page with phoneId', function() {
      expect(binding('phoneId')).toBe('nexus-s');
    });
 });
```
실행방법은 생략.

### 7-6 Experiments
{{orderProp}}를 *index.html*에 넣으면 동작하지 않는다. *orderPorp*의 scope가 `<div ng-view>`의 PhoneListCtrl이기 때문,


## 8 More Templating
디테일 페이지 제작.

### 8-1 Data
*app/phones/* 디렉토리에는 각 폰별로 josn파일이 있다.

**app/phones/nexus-s.json** (샘플)
```js
{
  "additionalFeatures": "Contour Display, Near Field Communications (NFC),...",
  "android": {
      "os": "Android 2.3",
      "ui": "Android"
  },
  ...
  "images": [
      "img/phones/nexus-s.0.jpg",
      "img/phones/nexus-s.1.jpg",
      "img/phones/nexus-s.2.jpg",
      "img/phones/nexus-s.3.jpg"
  ],
  "storage": {
      "flash": "16384MB",
      "ram": "512MB"
  }
}
```
정보가 다른 동일 구조의 *json*파일들. 이 파일들을 `$http`로 불러서 디테일 뷰 템플릿을 만들거다.

### 8-2 Controller
`$http`를 사용해서 json 파일을 가져온다. *PhoneListCtrl*과 구조가 비슷한다.

**app/js/controllers.js**
```js
function PhoneDetailCtrl($scope, $routeParams, $http) {
  $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
    $scope.phone = data;
  });
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', '$http'];
```
요청 URL완성을 위해서 `$route`서비스에서 해당 라우터에서 가져온 `$routeParams.phoneId`를 사용한다.

### 8-3 Template

One line으로 되어있는 현재의 디테일 뷰를 phone model 데이터를 가져와서 바인딩하는 형태로 변경. CSS도 같이 반영되어야 이쁨(?).

**app/partials/phone-detail.html**
```html
<img ng-src="{{phone.images[0]}}" class="phone">

<h1>{{phone.name}}</h1>

<p>{{phone.description}}</p>

<ul class="phone-thumbs">
  <li ng-repeat="img in phone.images">
    <img ng-src="{{img}}">
  </li>
</ul>

<ul class="specs">
  <li>
    <span>Availability and Networks</span>
    <dl>
      <dt>Availability</dt>
      <dd ng-repeat="availability in phone.availability">{{availability}}</dd>
    </dl>
  </li>
    ...
  </li>
    <span>Additional Features</span>
    <dd>{{phone.additionalFeatures}}</dd>
  </li>
</ul>
```

### 8-4 Test

Step 5에서 작성한 *PhoneListCtrl* 컨트롤러의 테스트와 유사한 Unit Test 작성.

 **test/unit/controllersSpec.js**
```js
...
  describe('PhoneDetailCtrl', function(){
    var scope, $httpBackend, ctrl;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond({name:'phone xyz'});

      $routeParams.phoneId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller(PhoneDetailCtrl, {$scope: scope});
    }));


    it('should fetch phone detail', function() {
      expect(scope.phone).toBeUndefined();
      $httpBackend.flush();

      expect(scope.phone).toEqual({name:'phone xyz'});
    });
  });
...
```

Testacula에서 다음 결과가 나와야 함.
```
Chrome 22.0: Executed 3 of 3 SUCCESS (0.039 secs / 0.012 secs)
```

E2E 테스트

**test/e2e/scenarios.js:**
```js
...
  describe('Phone detail view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html#/phones/nexus-s');
    });


    it('should display nexus-s page', function() {
      expect(binding('phone.name')).toBe('Nexus S');
    });
  });
...
```

## 9 - Filters
디테일 페이지에서 *true*, *false*로 보여주는 정보를 유니코드 문자(\u2713, \u2718) 이미지로 보여주는 필터를 만들자.

### 9-1 Custum Filter
필터 모듈 추가.

**app/js/filters.js**
```js
angular.module('phonecatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
```

필터 모듈을 메인 모듈인 *phonecat*에 dependency를 건다.

**app/js/app.js:**
```js
...
angular.module('phonecat', ['phonecatFilters']).
...
```

### 9-2 Template
필터의 실코드가 */js/filters.js*에 있기 때문에, layout template에 추가한다.

**app/index.html**
```html
...
 <script src="js/controllers.js"></script>
 <script src="js/filters.js"></script>
...
```

Angular 탬플릿의 필터 신텍스트는 다음과 같음.
```
{{ expression | filter }}
```
그래서 phone detail template에 필터 적용은 다음처럼.

**app/partials/phone-detail.html**
```html
...
    <dl>
      <dt>Infrared</dt>
      <dd>{{phone.connectivity.infrared | checkmark}}</dd>
      <dt>GPS</dt>
      <dd>{{phone.connectivity.gps | checkmark}}</dd>
    </dl>
...
```

### 9-3 Test
필터도 유닛테스트가 필요. 필터 모듈 자체만 테스트.

**test/unit/filtersSpec.js**
```js
describe('filter', function() {

  beforeEach(module('phonecatFilters'));

  describe('checkmark', function() {

    it('should convert boolean values to unicode checkmark or cross',
        inject(function(checkmarkFilter) {
      expect(checkmarkFilter(true)).toBe('\u2713');
      expect(checkmarkFilter(false)).toBe('\u2718');
    }));
  });
});
```
테스트 전에 *phonecatFilters*모듈 로드하는 것만 주의.

### 9-4 Experiments
다음 과같은 내장 필터들을 시도해 볼 수 있음.
* {{ "lower cap string" | uppercase }}
* {{ {foo: "bar", baz: 23} | json }}
* {{ 1304375948024 | date }}
* {{ 1304375948024 | date:"MM/dd/yyyy @ h:mma" }}

아님 모듈을 만들던가.
```
<input ng-model="userInput"> Uppercased: {{ userInput | uppercase }}
```

## 10 - Event Handlers
이미지에 클릭 이벤트 추가. 썸네일 이미지 클릭하면 큰 이미지 영역에 보이기.

### 10-1 Controller
**app/js/controllers.js**
```js
...
function PhoneDetailCtrl($scope, $routeParams, $http) {
  $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
    $scope.phone = data;
    $scope.mainImageUrl = data.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', '$http'];
```
*mainImageUrl* 모델 프로퍼티를 새로 만들고 default value를 설정함. *setImage* 이벤트 핸들러를 추가한다.

### 10-2 Template

**app/partials/phone-detail.html**
```html
<img ng-src="{{mainImageUrl}}" class="phone">

...

<ul class="phone-thumbs">
  <li ng-repeat="img in phone.images">
    <img ng-src="{{img}}" ng-click="setImage(img)">
  </li>
</ul>
...
```
`ngClick`지시자를 사용해서 이벤트 핸들러 지정.

### 10-3 Test
**test/e2e/scenarios.js**
```js
...
  describe('Phone detail view', function() {

...

    it('should display the first phone image as the main phone image', function() {
      expect(element('img.phone').attr('src')).toBe('img/phones/nexus-s.0.jpg');
    });


    it('should swap main image if a thumbnail image is clicked on', function() {
      element('.phone-thumbs li:nth-child(3) img').click();
      expect(element('img.phone').attr('src')).toBe('img/phones/nexus-s.2.jpg');

      element('.phone-thumbs li:nth-child(1) img').click();
      expect(element('img.phone').attr('src')).toBe('img/phones/nexus-s.0.jpg');
    });
  });
});
```

> e2e 테스트는 테스트 방법을 정의하고 동작을 강제하는 것이 쉽지 않겠다는 생각은 든다.

## 11 - REST and Custom Services
로우레벨인 $http API, HTTP method, URL를 사용하지 않고 XHR요청을 하는 RESTful app 개발.

### 11-1 Template
커스텀 서비스인 *app/js/services.js* 를 layout template에 추가한다. *angular-resource.js*도 추가해야 한다. `$resource` 서비스를 사용하는 ngResource 모듈이 들어있음.

**app/index.html**
```html
...
  <script src="js/services.js"></script>
  <script src="lib/angular/angular-resource.js"></script>
...
```

### 11-2 Service
**app/js/services.js**
```js
angular.module('phonecatServices', ['ngResource']).
    factory('Phone', function($resource){
  return $resource('phones/:phoneId.json', {}, {
    query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
  });
});
```
modlue API를 이용해서 factory 함수를 이용하는 커스텀 서비스를 등록.
인자로 서비스 명 'Phone', factory로 등록할 함수를 넘긴다. 함수의 전달인자로 dependency를 넘긴다는 면에서는 controller의 constructor와 유사함. *Phone* 서비스는 *$resource*에 의존성을 가진다.

`$resource`는 $http를 사용하지 않고 RESTful를 쉽게 구축하도록 도와줌. application dependencty에 추가해야 사용할 수 있음.

**app/js/app.js**
```js
...
angular.module('phonecat', ['phonecatFilters', 'phonecatServices']).
...
```

### 11-3 Controller
$http를 사용하는 현재 컨트롤러를 심플하게 변경 가능함.

**app/js/controllers.js**
```js
...

function PhoneListCtrl($scope, Phone) {
  $scope.phones = Phone.query();
  $scope.orderProp = 'age';
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];



function PhoneDetailCtrl($scope, $routeParams, Phone) {
  $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    $scope.mainImageUrl = phone.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
```
*PhoneListCtrl*에서 다음 부분이 교체 됬다.
```js
$http.get('phones/phones.json').success(function(data) {
  $scope.phones = data;
});
```
요걸로
```js
$scope.phones = Phone.query();
```

*PhoneListCtrl* 컨트롤러의 핵심은 비동기 호출을 동기 호출처럼 callback 함수 없이 호출하고 있다는 것. 미래의 반환 값을 scope에 바인딩 하고 있다. 하지만 콜백없는 service method호출만으로 부족할 때는 *PhoneDetailCtrl* 처럼 callback을 넘기는 것도 가능하다.

### 11-4 Test
새로운 service의 HTTP요청과 그 과정을 테스트 해야 한다. 그리고 컨트롤러가 서비스 변화에 반응하는지도.

`$resource` 는 리소스를 갱신하고 삭제하는 메서드를 포함한 응답 객체를 제공한다. 그래서 *toEqual*로 체크하면 테스트가 실패한다. 이 문제를 해결하려면 Jasmin matcher 에서  *toEqualData*를 새로 정의해서 사용해야 한다. 메서드를 제외하고 프로퍼티만 비교한다.

**test/unit/controllersSpec.js**
```js
describe('PhoneCat controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });


  beforeEach(module('phonecatServices'));


  describe('PhoneListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/phones.json').
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      ctrl = $controller(PhoneListCtrl, {$scope: scope});
    }));


    it('should create "phones" model with 2 phones fetched from xhr', function() {
      expect(scope.phones).toEqual([]);
      $httpBackend.flush();

      expect(scope.phones).toEqualData(
          [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
  });


  describe('PhoneDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        xyzPhoneData = function() {
          return {
            name: 'phone xyz',
                images: ['image/url1.png', 'image/url2.png']
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

      $routeParams.phoneId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller(PhoneDetailCtrl, {$scope: scope});
    }));


    it('should fetch phone detail', function() {
      expect(scope.phone).toEqualData({});
      $httpBackend.flush();

      expect(scope.phone).toEqualData(xyzPhoneData());
    });
  });
});
```

Testacular실행 결과 성공해야 함. 기존에 `toEqual`을 사용하던 걸 `toEqualData`로 변경했음.



