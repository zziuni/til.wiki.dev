# AngularJS Guide Scope

> 원문 [Scope](http://docs.angularjs.org/guide/scope)

## What are Scopes?

[scope](../api/ng.$rootScope.Scope)은 애플리케이션 모델을 참조하는 객체이다. 표현식([expression](expression))을 위한 실행 컨텍스트이다. scope은 애플리케이션의 DOM 구조를 본따서 계층구조 형태로 처리된다. scope은 [expression](expression)를 감시하고 이벤트 전파가 가능하다.

## Scope Characteristics

* scope은 모델의 변화를 알아내기 위한 API들을 지원한다. ([$watch](../api/ng.$rootScope.Scope#$watch))
* scope은 "angular realm(controller, service, angular event handler)" 외부에서 시스템을 통해서 view로 모델 변화를 전파하는 API들을 지원한다. ([$apply](../api/ng.$rootScope.Scope#$apply))
* scope은 공유된 모델 프로퍼티 접근 지원이 가능한 고립된 애플리케이션 컨포넌트로 중첩될 수 있다.
* scope은 [expression](expression)이 평가할 분리된 컨텍스트를 지원한다. 예를 들어 `{{username}}` 표현식은 *username* 프로퍼티를 정의한 지정 scope에서 평가되지 않으면 의미가 없다.

## Scope as Data-Model

Scope은 애플리케이션 컨드롤러(controller)와 뷰(view)를 연결한다. 탬플릿 [linking](compiler) 단계에서 [directive](../api/ng.$compileProvider#directive)는 scope에서 ['$watch](../api/ng.$rootScope.Scope#$watch) 표현식을 지정한다. \$watch는 directive가 프로퍼티 변화를 알 수 있게 한다. 그래서 directive가 DOM으로 갱신된 값을 랜더링 할 수 있다.

controller와 directive는 scope를 참조하지만 상호간에는 참조하지 않는다. 이 구조는 controller를 directive뿐만이 아니라 DOM으로 부터도 고립(분리)된다. 이는 대단히 중요한 점인데 controller를 view와 완전히 분리시켜서 애플리케이션 흐름을 테스트가 상당히 개선된다.


## Source

```html
    // index.html
    <!doctype html>
    <html ng-app>
      <head>
        <script src="http://code.angularjs.org/1.0.6/angular.min.js"></script>
        <script src="script.js"></script>
      </head>
      <body>
        <div ng-controller="MyController">
          Your name:
            <input type="text" ng-model="username">
            <button ng-click='sayHello()'>greet</button>
          <hr>
          {{greeting}}
        </div>
      </body>
    </html>
```

```js
    // script.js
    function MyController($scope) {
      $scope.username = 'World';

      $scope.sayHello = function() {
        $scope.greeting = 'Hello ' + $scope.username + '!';
      };
    }
```

MyController는 username에 World를 할당하고, input에 알린다. 그래서 사전 랜더링으로 출력됨. 컨트롤러가 스콥으로 데이터를 쓰는 방법을 한 예제.

같은 방식으로 동작정의도 한다. scope에 sayHello메서드를 추가.사용자가 greet 버튼을 클릭하면 sayHello 메서드가 실행되고 username 프로퍼티 값을 가져와서 greeting 프로퍼티에 넣는다. scope의 프로퍼티가 HTML input 위젯에 엮여있으면 그 값이 꺼꾸로 자동으로 업데이트 되는걸 보여준다.

{{greeting}} 랜더링은 논리적으로 다음을 포함함.

* 템플릿에서 {{greeting}}이 정의된 DOM 노드와 연관된 scope를 찾는다. 예제에서는 MyContorller에 전달된 scope과 같은 scope. (계층구조의 scope에 대해서 아직 설명전임.)
* 찾은 scope에 근거해서 greeting [expression](expression)을  평가한다. 그리고 DOM 문서요소로 둘러싼 text로 결과를 할당한다.

scope과 그 파라미터를 뷰를 랜터링하는데 사용하는 데이터로 생각할 수 있다. scope은 view와 관련된 모든것을 위한 single source-of-truth.

view의 테스트 가능한 과점에서 콘트롤러와 뷰의 분리는 설명가능함. 우린 구체적인 랜터링으로 발생하는 산만함 없이 동작을 테스트 할 수 있다.

```js
    it('should say hello', function() {
      var scopeMock = {};
      var cntl = new MyController(scopeMock);

      // Assert that username is pre-filled
      expect(scopeMock.username).toEqual('World');

      // Assert that we read new username and greet
      scopeMock.username = 'angular';
      scopeMock.sayHello();
      expect(scopeMock.greeting).toEqual('Hello angular!');
    });
```

### Scope Hirerarchies
Angualr App 별로 [root scope](../api/ng.$rootScope)은 명확하게 하나지만 자식 scope은 여러개.

애플리케이션은 여러 scope를 가질 수 있다. 왜냐하면 [directives]()는 자식 scope을 새로 만들기도 하므로. (directives 문서 참조) 새로운 scope이 생성될 때, 자기 부모 scope의 자식으로 추가된다. scope이 추가된 DOM와 병렬로 트리구조를 가진다.

Angualr는 {{suername}}를 평가할 때, 먼저 username 프로퍼티에 대해서 주어진 DOM 문서요소와 연과된 scope를 찾는다. 프로퍼티를 찾을 수 없으면 부모 scope에서 찾는다. root Scope까지 올라감. 자바스크립트에서 이런 동작은 프로포타입형 상속으로 알려져 있다. 자식 scope은 부모 scope에 대해서 프로토타입형 상속이다.

다음 예제는 애플리케이션의 scope들과 프로퍼티들의 프로로타입형 상속을 표시한다.


### Source

```html
    // index.html
    <!doctype html>
    <html ng-app>
      <head>
        <script src="http://code.angularjs.org/1.0.6/angular.min.js"></script>
        <script src="script.js"></script>
      </head>
      <body>
        <div ng-controller="EmployeeController">
          Manager: {{employee.name}} [ {{department}} ]<br>
          Reports:
            <ul>
              <li ng-repeat="employee in employee.reports">
                {{employee.name}} [ {{department}} ]
              </li>
            </ul>
          <hr>
          {{greeting}}
        </div>
      </body>
    </html>
```

```css
    // style.css
    /* remove .doc-example-live in jsfiddle */
    .doc-example-live .ng-scope {
      border: 1px dashed red;
    }
```

```js
    // scriprt.js
    function EmployeeController($scope) {
      $scope.department = 'Engineering';
      $scope.employee = {
        name: 'Joe the Manager',
        reports: [
          {name: 'John Smith'},
          {name: 'Mary Run'}
        ]
      };
    }
```

### Demo
Anguar는 scope이 추가 된 곳에 `ng-scope`이라는 CSS Class를 자동으로 삽입한다. 위 데모는 거기다 빨간 점선을 추가했다. 자식 scope는 repeater가 {{employee.name}} 표현식을 평가하기 때문에 필요하다. 하지만 표현식이 평가되는 scope의 위치에 따라서 결과가 다른다. root scope에서 프로토타이핑 상속인 {{department}} 프로퍼티 평가는 유사함. scope에서 department 프로퍼티가 정의 된 곳에만 scope이 있다.(repeater 안에 있는 {{department}} 프로퍼티는 프로포타이핑 상속을 통해 제공되는 root Scope의 department 프로퍼티티라는 말이다. )

### Retrieving Scope from the DOM

Scope들은 $scope data 프로퍼티로 DOM 에 추가된다. 그래서 디버깅 목적으로 scope을 회수해 올 수 있다. (애플리케이션에서 이 방법으로 scope들을 회수할 필요가 있는 것 같지 않았다.) root scope의 위치는 [ng-app]() directive가 있는 DOM 위치가 된다. 보통은 `<html>`에 `ng-app`을 놓지만 다른 곳도 상관없음. 예를 들어 뷰의 일부분만 angualr에 제어하는 경우.

디버거에서 scope을 테스트가기 위해서

1. 브라우저에서 주목한 문서요소에서 우클릭해서 'inspect element'선택. 해당 문서요소가 하일라이트 되서 디버거가 열린걸 볼 수 있다.
2. $0 변수를 통해서 콘솔에서 선택한 문서요소에 접근할 수 있다.
3. 관련 scope을 회수하려면 콘솔에 다음 처럼 친다. `angular.element($0).scope()`

### Scope Events Propagation

Scope은 DOM 과 유사하게 이벤트가 전파된다. 자식 scope에는 이벤트가 [broadcasted](../api/ng.$rootScope.Scope#$broadcast)되고 부모 scope에는 이벤트가 [emitted](../api/ng.$rootScope.Scope#$emit)된다.

### Srouce

```html
    //index.html
    <!doctype html>
    <html ng-app>
      <head>
        <script src="http://code.angularjs.org/1.0.6/angular.min.js"></script>
        <script src="script.js"></script>
      </head>
      <body>
        <div ng-controller="EventController">
          Root scope <tt>MyEvent</tt> count: {{count}}
          <ul>
            <li ng-repeat="i in [1]" ng-controller="EventController">
              <button ng-click="$emit('MyEvent')">$emit('MyEvent')</button>
              <button ng-click="$broadcast('MyEvent')">$broadcast('MyEvent')</button>
              <br>
              Middle scope <tt>MyEvent</tt> count: {{count}}
              <ul>
                <li ng-repeat="item in [1, 2]" ng-controller="EventController">
                  Leaf scope <tt>MyEvent</tt> count: {{count}}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </body>
    </html>
```

```js
    //script.js
    function EventController($scope) {
      $scope.count = 0;
      $scope.$on('MyEvent', function() {
        $scope.count++;
      });
    }
```

### Demo

### Scope life Cycle

이벤트를 받은 브라우저의 일반적인 흐름은 연관 javascript callback을 실하는 것. 그리고나서 콜백은 브라우저 재 랜더링을 완료하고 다시 다른 이벤트를 위한 대기모드로 돌아감.

이말은 브라우저가 angular 실행 컨텍스트 외부의 javascript 실행 컨텍스트 에서 호출하면, angular가 model 수정을 알아차릴 수 없다는 의미. 모델을 수정하는 실행을 정확히 관리하려면 [$apply](../api/ng.$rootScope.Scope#$apply) 메서드를 사용하는 angular 실행 컨텍스트를 입력한다.  \$apply 메서드 안에서 실행한 모델 수정만이 정확하게 angular에 통제를 받는다. 예를 들어. directive가 DOM  evnet를 listen하고 있다면 [ng-click](../api/ng.directive:ngClick)처럼, 이건 \$apply 메서드 안쪽에서 표현식이 평가되야한다.

표현식 평가 후, \$apply는 [$digest](../api/ng.$rootScope.Scope#$digest)를 수행한다. \$digest 단계는 scope은 \$watch 표현식들 전부를 시험해서 이전 값과 비교한다. 이런 dirty checking은 비동기롤 실행된다. \$scope.username = "angular"같은 할당을 알리기 위해 \$watch 가 바로 발생하지 않는다는 의미다. 대신에, \$watch 알림은 \$digest 단계 종료까지 지연된다. 이 지연현상은 바람직하다. 이 지연은 여러 모델이 한 \$watch 알림으로 업데이트 하는걸 합친다. 또한 \$watch 알림이 진행되는 동안 다른 \$watch 들이 동작지 않는다는걸 보장한다. \$watch가 모델 값을 변경하면 $digest 사이클이 추가된다.

1. **Scope 생성** - [root scope](../api/ng.$rootScope)는 [$injector](../api/AUTO.$injector)로 애플리케이션이 기동될 때 생성된다. 탬플릿을 link하는 과정에서 몇가지 종류의 directive는 자식 scope를 생성한다.
2.  **watcher 등록** - 탬플릿을 link하는 과정에서 directive는 scope에서 [watches](../api/ng.$rootScope.Scope#$watch)를 등록한다. 이 watch들은 model값을 DOM으로 전파할 때 사용한다.
3.  **Model 변경** - 변경을 정확히 감지하기 위해서 변경은 모두 [$scope.$apply()](../api/ng.$rootScope.Scope#$apply) 안에서 만들어야 한다. (Angular API 만드시 이렇게 동작한다. 그래서 컨트롤러에서 동기로 동작하는 작업을 실행할때는 수동으로 \$apply실행을 해야한다. [$http](../api/ng.$http), [$timeout](../api/ng.$timeout) 서비스를 사용한 비동기 작업에서도 마찬가지. )
4. **변경 감지** - \$apply 종료 후, angular 는 root scope에서 [$digest](../api/ng.$rootScope.Scope#$digest) 사이클을 실행하고 나서 자식 scope들 모두로 전파한다. \$digest 사이클에서 \$watch가 걸린 표현식이나 함수들은 모델 변경여부가 체크된다. 그리고 변경이 반견되면 \$watch 리스너가 호출된다.
5. **scope 파괴** - 자식 scope들이 더이상 필요없게 되면, [$scope.$destroy()](../api/ng.$rootScope.Scope#$destroy) API로 삭제해야 할 책임이 그 자식 scope creator에게 있다. 자식 scope에서 호출한 \$digest 전파가 중단되고 가비지 콜렉터가 그 scope의 모델들이 사용한 메모리를 해재한다.

#### Scopes and Directives

컴파일 단계에서 [compiler](compiler)는 DOM 이 아닌 [directives](../api/ng.$compileProvider#directive)를 매치한다. 디랙티브는 일반적으로 다음 둘중 하나임.

* {{expression}} 표현식같은 "감지형 [directives](../api/ng.$compileProvider#directive)"는 [$watch()](../api/ng.$rootScope.Scope#$watch)를 사용하는 리스너를 등록한다.
* [ng-click](../api/ng.directive:ngClick)같은 "리스너 directive"는 DOM과 리스너를 등록한다. DOM 리스너가 실행될 때, 디랙티드는 관련 표현식을 실행하고 [$apply()](../api/ng.$rootScope.Scope#$apply)메서드를 사용하는 뷰를 업데이트한다.

사용자 액션이나 timer, XHR같은 확장 이벤트를 받았을 때, 이에 관련된 [expression](expression)는 반드시 [$apply()](../api/ng.$rootScope.Scope#$apply)를 통해서 scope에 적용해야 한다. 그래서 모든 리스너가 바로 업데이트 된다.

#### Directives that Create Scopes
대부분의 경우 [directives](../api/ng.$compileProvider#directive)와 scopes가 소통하긴 하지만, 새로운 scope 인스턴스를 생성하지 않는다. 하지만 [ng-controller](../api/ng.directive:ngController)와 [ng-repeat](../api/ng.directive:ngRepeat)같은 몇가지 directive는 신규 자식 scope을 만들어서 부합한는 DOM 문서요소에 그 자식 scope을 추가한다. `angular.element(aDomElement).scope()` 메서드 호출로 DOM 문서요소에 대한 scope를 찾을 수 있다.

#### Controllers and Scopes
Scope과 controller는 다음 같은 상황에서 서로 작용한다.
* Controller는 탬플릿으로 컨트롤러 메서드를 노출시키기 위해 scope을 사용한다. ([ng-controller](../api/ng.directive:ngController) 참조)
* Controller는 model(scope의 property)을 수정할 수 있는 메서드(behavior)를 정의한다.
* Controller는 model을 관찰하는 [watches](../api/ng.$rootScope.Scope#$watch)를 등록할 수도 있다. watches는 컨트롤러 behavior가 실행된 후 즉시 실행된다.

[ng-controller](../api/ng.directive:ngController)에 더 자세한 정보가 있다.

#### Scope \$watch Performance Considerations
scope의 property 변경을 체크하기 위한 Dirty checking은 Angular에서는 일반적인 동작. 그래서 Dirty checking 함수는 효율적이여야한다. Dirty checking 함수는 어떤 종류로도 DOM 접근을 하면 안된다는 점을 주의하자. DOM 접근은 자바스크립트 객체에서 프로퍼티 접근보다 겁나 느리다.


