# /$compile (service in module ng )

> [원본](http://docs.angularjs.org/api/ng.$compile)

## Description
HTML 문자열이나 DOM 조각을 **template**으로 컴파일한다. 그리고 template function을 생성한다. 그리고 [scope]()과 template 를 연결하는데 사용할 수 있다.

컴파일은 DOM을 둘러보고 DOM element와 [directives]()를 매치하려 하는 과정. 각 매칭시 일치하는 template function을 실행하고 그 인스턴스 함수들을 반환하는 single template function으로 뭉친다.

template function은 view 생성에 사용되거나 대부분 [ng-repeater]()에서 사용. 각각의 호출은 원본 템플릿의 클론 DOM인 뷰를 낳는다.

### Source

```html
    //## index.html
    <!doctype html>
    <html ng-app="compile">
      <head>
        <script src="http://code.angularjs.org/1.0.6/angular.min.js"></script>
        <script src="script.js"></script>
      </head>
      <body>
        <div ng-controller="Ctrl">
          <input ng-model="name"> <br>
          <textarea ng-model="html"></textarea> <br>
          <div compile="html"></div>
        </div>
      </body>
    </html>
```

```js
    // ## script.js
    // declare a new module, and inject the $compileProvider
    angular.module('compile', [], function($compileProvider) {
      // configure new 'compile' directive by passing a directive
      // factory function. The factory function injects the '$compile'
      $compileProvider.directive('compile', function($compile) {
        // directive factory creates a link function
        return function(scope, element, attrs) {
          scope.$watch(
            function(scope) {
               // watch the 'compile' expression for changes
              return scope.$eval(attrs.compile);
            },
            function(value) {
              // when the 'compile' expression changes
              // assign it into the current DOM
              element.html(value);

              // compile the new DOM and link it to the current
              // scope.
              // NOTE: we only compile .childNodes so that
              // we don't get into infinite loop compiling ourselves
              $compile(element.contents())(scope);
            }
          );
        };
      })
    });

    function Ctrl($scope) {
      $scope.name = 'Angular';
      $scope.html = 'Hello {{name}}';
    }


    //## E2E Test
    it('should auto compile', function() {
      expect(element('div[compile]').text()).toBe('Hello Angular');
      input('html').enter('{{name}}!');
      expect(element('div[compile]').text()).toBe('Angular!');
    });
```

### Demo

## Usage

```js
    $compile(element, transclude, maxPriority);
```

### Parameters
* element - { string | DOMElement } - template function으로 만들 HTML, Element 문자열. (이게 template)
* transclude - {function(angular.scope[, cloneAttachFn])} - directive로 사용가능한 함수.
* maxPriority - {number} - 주어진 우선순위보다 낮은 derective에만 적용. (root element에만 적용, 자식들은 아님)??

### Returns
`{function(scope[, cloneAttachFn])}` - template(DOM element/tree)를 scope과 바인딩 하기 위한 **link 함수**.

* scope - 바인딩할 [Scope](api/ng.$rootScope.Scope)
* cloneAttachFn - cloneAttachFn이 지원되면, link function이 template를 클론하고 나서, 적절한 위치로 클론된 elements를 DOM 문서에 추가할 수 있게 하는 cloneAttachFn을 호출한다.
    * cloneAttachFn(clonedElement, scope) 의 호출한다.
        * cloneElement - compiler로 넘어온 원본 element의 클론.
        * scope - link function이 동작하는 해당 scope.

link function은 template의 element를 반환한다. 넘어온 원본 element이거나 `cloneAttachFn`를 지원한다면 그 element의 클론이다. view를 연결하기는 angular가 자동으로 실행하는 /$digest가 호출된 이후까지 업데이트 되지 않는다. 바인딩한 뷰에 접근할 수 있는 방법은 두가지.

* link function 실행시 template 클론을 요구하지 않는다면 (cloneAttachFn인자가 없다면) , 컴파일러로 보내기전에 DOM element를 생성해서 그 참조를 유지한다. (반환한다.)

```js
    var element = $compile('<p>{{total}}</p>')(scope);
```

* Element를 클론하길 원하면, 원래 예제를 참조하는 뷰는 클론이 아닌 그러나 클론된 원본 template?? 여기선 cloneAttachFn를 통해서 클론에 접근할 수 있다.

```js
    var templateHTML = angular.element('<p>{{total}}</p>'),
        scope = ....;

    var clonedElement = $compile(templateHTML)(scope, function(clonedElement, scope) {
      //attach the clone to DOM document at the right place
    });

    //now we have reference to the cloned DOM via `clone`
```

좀더 자세한건 [Angular HTML Compiler](../guide/compiler)를 참조


