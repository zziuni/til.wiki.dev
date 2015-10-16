# AngularJS Guide - HTML Compiler

[원문](http://docs.angularjs.org/guide/compiler)

## Overview

HTML Comipiler는 HTML 새 문법을 브라우저에게 알려줄 수 있다. 어떤  HTML 문서요소나 속성에 사용자 정의 동작을 추가할 수 있다. Angular에서는 이런 동작 확장을 Directive라 한다.

HTML은 선언적 형태로 정적 문서의 구조를 정의한다.예를 들어 텍스트를 센터에 두고 싶으면 스크린 사이즈를 알아낼 필요없이 aligin="center"만 하면됨. 선언적 언어의 강점.

하지만 선언적 언어의 단점은 새로운 문법을 브라우저에게 알여줄 수 없다는 것. 예를 들어 1/2가 아닌 1/3지점에 텍스트 정렬을 쉽게 할 수 있는 방법이 없다. 신규 HTML 문법을 알려줄 방법이 필요함.

Angular는 모든 앱에서 유용한 공통적인 directives를 사전 빌드한다. 추가 directives도 가능. 이런게 DSL이 되는거임.

이 모든 컴파일 작업은 서버사이드가 아닌 웹 브라우저에 위치하거나 사전 컴파일로 실행된다.

## Compiler

compiler는 속성을 찾기 위해서 DOM을 훓는  angular service. 컴파일 과정은 두단계로 나뉨

1. **compile** : DOM을 훓터서 directive를 수집. 이 단계의 결과값은 linking 함수.
2. **Link** : scope과 directive를 엮고, 라이브 뷰를 생성. 그래서 scope model의 변화가 뷰에 반영된다. 뷰에서 사용자의 인터렉션은 scope model에 반영된다. 진짜 단일 소스 스콥 모델을 만든다.

`ng-repeat`같은 directive는 콜렉션의 각 아이템 마다  DOM element를 클론한다. compile과 linke 의 두단계로 된게 성능 향상에 도움이 되는데, 이유는 클론된 탬플맀이 컴파일 단계에서만 필요하고, 그리곤 각 클론 인스턴스에 link된다.

## Directive

directive는 지정한 HTML 생성자가 컴파일 단계에서 발생할 때 작동해야할 동작이다. directive는 element명, 속성명, 클래스명 주석일 수 있다. 다음 예제는 동일한 `ng-bind` directive의 다른 표현

```html
    <span ng-bind="exp"></span>
    <span class="ng-bind: exp;"></span>
    <ng-bind></ng-bind>
    <!-- directive: ng-bind exp -->
```

directive는 compile가 DOM에서 이걸 찾았을 때 실행할 **함수**다. 자세한건 directive API 문서 참조.

문서요소 를 드래그 가능하게 하는 directive 예제.

### Source

    angular.module('drag', []).
      directive('draggable', function($document) {
        var startX=0, startY=0, x = 0, y = 0;
        return function(scope, element, attr) {
          element.css({
           position: 'relative',
           border: '1px solid red',
           backgroundColor: 'lightgrey',
           cursor: 'pointer'
          });
          element.bind('mousedown', function(event) {
            startX = event.screenX - x;
            startY = event.screenY - y;
            $document.bind('mousemove', mousemove);
            $document.bind('mouseup', mouseup);
          });

          function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            element.css({
              top: y + 'px',
              left:  x + 'px'
            });
          }

          function mouseup() {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
          }
        }
      });


### Demo

`draggable` 속성이 DOM element는 모두 드래그가 가능. 이 형태의 장점은 브라우저에게 새로운 속성을 가르쳤다는 것. HTML 구문 원칙과 유사한 속성으로 브라우저의 구문을 확장했다.

## Understanding View

많은 템플릿 시스템이 쏟아져 나온다.대부분은 정적 문자열 템플릿을 작성하고 이를 데이터와 연결한수 새로운 문자열을을 반환한다. 이 반환 문자열을 element에 `innerHTML`로 넣어버림.

![](http://docs.angularjs.org/img/One_Way_Data_Binding.png)

이 방식은 데이터가 변경되면 다시 템플릿과 데이터를 합쳐서 `innerHTML`로 DOM에 다시 넣어야 한다. 이런 접근은 이슈가 좀 있다. 사용자 입력 읽기, 이를 데이터와 합치기, 사용자 입력을 덥어써서 이를 망치기, 갱신과정을 관리하기, 동작 표현의 부족 등.

angular compiler는 directive가 있는 DOM를 사용한다. 문자열 템플릿이 아니라. 컴파일 결과는 라이브 뷰에 scope model의 결과가 결합하는 linking function이다. 뷰와 스코프의 연동은 투명함. 개발자가 뷰을 갱신하기 위해서 해야 할게 없음. `innerHTML`를 사용하지 않기 때문에 사용자 입력을 파괘하는 이슈도 없음. 그리고angular diractive는 문자열 바인딩 만이 아니라 동작을 정의한 생성자도 가능함.

![](http://docs.angularjs.org/img/Two_Way_Data_Binding.png)

angular의 이런 시도는 스테이블한  DOM을 생성한다. DOM 문서요소의 인스턴스가 바인딩의 라이프타임동안 변하지 않는 모델 아이템 인스턴스와 바인딩된다는 의미. 이말은 코드가 문서요소를 찾을 수 있고, 이벤트 핸들러를 등록할 수 있고 템플릿 데이터 결합으로 인해서 그 참조가 제거 되지 않을 거라는 사실을 알 수 있다.
