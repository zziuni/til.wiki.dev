# $parse (service in module ng )

> [원본](http://docs.angularjs.org/api/ng.$parse)

## Description
Angular [expression](angular/docs.guide/expression)를 함수로 변환한다.

```js
    var getter = $parse('user.name');
    var setter = getter.assign;
    var context = {user:{name:'angular'}};
    var locals = {user:{name:'local'}};

    expect(getter(context)).toEqual('angular');
    setter(context, 'newValue');
    expect(context.user.name).toEqual('newValue');
    expect(getter(context, locals)).toEqual('local');
```

## Usage

```js
    $parse( expression );
```

### Parameters
* expression - {string} - 컴파일할 표현식 문자

### Returns
{function(context, locals)} - 컴파일된 표현식을 나타내는 함수.
* context - {object} - 보통은 scope 객체. 표현식을 평가할 객체.
* locals - {object=} - context 객체의 지역변수. 세터로 쓸때 유용.

반환 함수에는 `assign` 프로퍼티가 있음. 할당 가능한 exprssion이면 세터로 사용할 수 있다.
