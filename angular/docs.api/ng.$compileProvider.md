# $compileProvider (service in module ng)

>[원본](http://docs.angularjs.org/api/ng.$compileProvider)

## Methods
### directive(name, directiveFactory)
컨트롤러에 새 디랙티브 등록.

* name - {string} - camel-case의 디랙티브 명. (ngBind)
* directiveFactory - {function} - 주입가능한 디렉티브 팩토리 함수.  [directives](../guide/directive) 참조.

**returns**
{ng.$compileProvider} - 체이닝 가능한 자신.

### urlSanitizationWhitelist(regexp)
sanitization 링크의 안전한 URL을 위해 사용되는 기본 정규식 게터 세터.

sanitization는 XSS공격 방지용.

데이터 바인딩을 통해서 a[href]에 할당되는 url은 노멀라이즈 되고, 절대 url로 변경. 그리고 urlSanitizationWhitelist 정규식과 매치한다. 원래 url과 매치되면 dom에 작성하고 그렇지 않으면 절대 url는 'unsafe:'란 접두사가 붙는다. 그리고 Dom에 작성.

**Parameters**

* regexp(optional) – {RegExp=} – 새로운 white list urls 정규식.

**Returns**

* {RegExp|ng.$compileProvider} – 현재 RegExp. 혹은 체이닝을 위한 self.