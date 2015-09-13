## Promise

### $q
- angular 공식 문서 내용. 요약.
- promise는 [ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)와 [Commonjs](http://wiki.commonjs.org/wiki/Promises) 스타일이 있다.
- commonjs promise - 비동기로 결과를 반환하는 객체의 상태와 상호작용하기 위한 인터페이스로 묘사.
- 에러 핸들링 관점에서 promise는 try catch throw와 유사.
- deferred object methods
  + resolve(value)
  + reject(reason)
  + notify(value)
- promise object methods
  + then(scallback, fcallback, ncallback)
  + catch()
  + finally()
  + `then()`은 , success callback이 promise를 반환하면 이를 반환한다.
  + `catch()`는 `promise.then(null, erroe-callback)`의 shorthand.
  + `finallry()`는  `resolve()`와 `reject()`에 관계없이 최종 수행을 위해 사용한다. 자원반환등.
- `$q`는 Scope model observation mechanism에서 동작한다. $apply가 되어야 model에 반영.

### 사용법

`$q(resolver)` q를 contructor로 사용하는 방식은 ES6의 방식이다. resolver는 resolve, reject 인자를 가진 함수.

### $q의 method

- `$q.defer()` : deferred object 반환.
- `$q.reject(reason)` : reject된 promise를 반환한다.  then() 체인 중간의 error callback 안에서 반환값으로 사용한다.
- `$q.when(value or promise)` : `$q.resolve()`라는건 없고, when()는 한번 감쌈으로 resolve역활을 한다. [code line](https://github.com/angular/angular.js/blob/v1.3.4/src/ng/q.js#L493)
- `$q.all(promises)` : promised는 array, object 모두 가능. promise or value collection이기만 하면 된다. 내부에서는 하나씩 when()를 태운다. 2.1.x는 ref()란 이름. [code line](https://github.com/angular/angular.js/blob/v1.3.4/src/ng/q.js#L520) 를 보면 then은 iterator안에서 실행하지만, 비동기기 때문에 forEach가 (반드시) 모두 돈 후에 실행된다.

### angular $q promise.then()

- `then()`은 안에서 새로운 deferred를 생성하고, 새로운 promise를 반환한다. [code line](https://github.com/angular/angular.js/blob/v1.3.4/src/ng/q.js#L275)
- 이전 promise의 상태(status)에 따라서 then의 arguments fn중 어느 것을 실행할지 정한다. [code line](https://github.com/angular/angular.js/blob/v1.3.4/src/ng/q.js#L312)




## angular directive
- __compile__ function을 설정하면 link는 쓰면 안된다.
- compile function의 return value중 __post__ function이 __link__ function이다.
  + `{pre:fn, post:fn}`
- compile은 scope binding 되기전 template을 컨트롤 한다. 그래서 arguments가 `tElement`, `tAttrs` 식이고 scope이 없다.
- __dom event listener__는 link function 에서 해야 안전하다.

### compile, controller, pre-link, post-link 실행 순서
- compile -> controller -> pre-link -> post-link(link)
- [angular-js-directives-difference-controller-link](http://jasonmore.net/angular-js-directives-difference-controller-link/)
- compile을 하위 scope을 따라서 모두 하고, controller단계부터 flow를 looping 한다.

```
parent (compile)
..child 1 (compile)
....child 1 a (compile)
....child 1 b (compile)
..child 2 (compile)
....child 2 a (compile)
....child 2 b (compile)
parent (controller)
parent (pre-link)
..child 1 (controller)
..child 1 (pre-link)
....child 1 a (controller)
....child 1 a (pre-link)
....child 1 a (post-link)
....child 1 b (controller)
....child 1 b (pre-link)
....child 1 b (post-link)
..child 1 (post-link)
..child 2 (controller)
..child 2 (pre-link)
....child 2 a (controller)
....child 2 a (pre-link)
....child 2 a (post-link)
....child 2 b (controller)
....child 2 b (pre-link)
....child 2 b (post-link)
..child 2 (post-link)
parent (post-link)
```

### Making directives
- `eatClick`을 만들다.
- event.stopPropagation()을 적용해서 충첩 click에 대한 전파를 막는 directive
- 원래는 버튼을 깔끔하게 표현해주는 directive를 만들려 했으나,
- angularstrap의 $dropdown은 이벤트를 컨트롤 할 수 있는 수단이 없어서 stopPropagation을 적절한 시점에 동작시키기가 쉽지 않고,
- $parent의 depth가 5나 되어서 model의 변경을 상호간 반영하기가 쉽지 않았다.
- 그러다가 [directive에서 scope다루기](http://stackoverflow.com/questions/14914213/when-writing-a-directive-how-do-i-decide-if-a-need-no-new-scope-a-new-child-sc)관련되 so글을 보고있다.



### links for directive
- [directive](https://code.angularjs.org/1.2.23/docs/guide/directive)에 대해서 너무 모르는 것 같다. 내가.
- [$compile](https://docs.angularjs.org/api/ng/service/$compile)
- [$dropdown](https://github.com/mgcrea/angular-strap/blob/master/src/dropdown/dropdown.js)
- [AngularJS accessing DOM elements inside directive template](http://stackoverflow.com/questions/15881453/angularjs-accessing-dom-elements-inside-directive-template)
- [When writing a directive, how do I decide if a need no new scope, a new child scope, or a new isolate scope?](http://stackoverflow.com/questions/14914213/when-writing-a-directive-how-do-i-decide-if-a-need-no-new-scope-a-new-child-sc)






## i18n처리
- angular에 `ngPluralize`가 있다. 숫자, 명의 복수형 표기를 plural categories에 따라 할 수 있는 디랙티브.
- 이론적인 내용는 [Gramatical number](http://en.wikipedia.org/wiki/Grammatical_number)의 __singular__, __dual__, __paucal__,
- [Language Plural Rules](http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html)란게 있다. [CLDR 프로젝트](http://cldr.unicode.org/index)의 일부
- 단어의 복수형(plurals of nouns)와 단위 표기(unit expression)
- angular 자체는 i18n만을 지원해서, `angular-translate` 3rd module를 사용.





## $cacheFacotry
- `$cacheFacotry`는 단순한 getter, setter가 있는 싱글톤 객체. localstorage와는 개념이 다름.
- 원격 자원 캐싱 말고는 앱 성능문제로 이를 쓸 필요는 없어 보임.
- cache를 localStorage와 $cacheFactory로 이중화 했으나,
- 염려했던 localStorage의 access 성능보다. cacheFactory에 담긴 데이터가 js heap을 차지하는 문제가 더 컸다.
- 심한 경우 js heap은 4000만~6000만, Node는 7~8만까지 늘어난다.





## 3rd party libs
### bindonce
- angular 1.3.0부터 이를 대신할 자체 기능이 생기다.

### angular-file-upload
- `dragOverClassFn`를 지역 변수로 선언하지 않아서 에러가 남. https://github.com/danialfarid/angular-file-upload/pull/320


### angular-translate.js

#### 비동기 호출법

세가지 방법이 있다.

##### 서버가 `lang` 파라미터를 기준으로 동적 데이터를 줄 때

```bash
  $ bower install angular-translate-loader-url
  # html에 embeded 해야함.
```

```js
  $translateProvider.useUrlLoader('foo/bar.json');
  $translateProvider.preferredLanguage('en');
  // foo/bar/json?lang=en 을 요청한다.
```

##### 정적인 localizaton file 이 있을 때.

```bash
  $ bower install angular-translate-loader-static-files
  # html에 embeded 해야 함.
```

```js
  $translateProvider.useStaticFilesLoader({
      prefix: 'locale-',
      suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
  // local-en.json을 요청함.
```

##### 대규모 app을 위한 partial loader

```bash
  $ bower install angular-translate-loader-partial
```

```js
  angular.module('main')
  .config(function ($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart('home');

    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/i18n/{part}/{lang}.json'
    });

    $translateProvider.preferredLanguage('en');

    $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
      $translate.refresh();
    });
  });
  // /i18n/home/en/json을 요청함. 변경될 때 텍스트들을 refresh() 해야함.

  angular.module('contact')
  .controller('ContactCtrl', function ($scope, $translatePartialLoader) {
    $translatePartialLoader.addPart('contact');
  });

```





## Reference
- [The Top 10 Mistakes Angular Developer make](http://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make)
- [angularjs style guide](https://github.com/johnpapa/angularjs-styleguide)
- [angularjs style guide for closure users at google](http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html)
- [angular Best Practices](https://github.com/angular/angular.js/wiki/Best-Practices)


