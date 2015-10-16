# \$provide (service in module AUTO )

## Description
\$provide는 신규 프로바이더를 \$injector로 등록한다. 등록된 프로바이더들은 인스턴스를 위한 **팩토리**이다. 프로바이더들은 지가 생성한 인스턴스명에 `Provider`라는 접미사를 붙여 같이 쓴다. (class)

프로바이더는 \$get() 메서드가 있는 객체다. injector가 신규 **서비스의 인스턴스**를 생성하기 위해서 \$get 메서드를 호출한다. 이런 서비스용 프로바이더에는 환경설정을 위한 추가 메서드 추가가 가능.

```js
    function GreetProvider() {
      var salutation = 'Hello';

      this.salutation = function(text) {
        salutation = text;
      };

      this.$get = function() {
        return function (name) {
          return salutation + ' ' + name + '!';
        };
      };
    }

    describe('Greeter', function(){

      beforeEach(module(function($provide) {
        $provide.provider('greet', GreetProvider);
      }));

      it('should greet', inject(function(greet) {
        expect(greet('angular')).toEqual('Hello angular!');
      }));

      it('should allow configuration of salutation', function() {
        module(function(greetProvider) {
          greetProvider.salutation('Ahoj');
        });
        inject(function(greet) {
          expect(greet('angular')).toEqual('Ahoj angular!');
        });
      });
    });
```

## Methods

### constant(name, value)
상수값. [value](AUTO.$provide#value)와는 달리 환경설정 함수로 주입될 수 있다. 그리고 [decorator](AUTO.$provide#decorator)로 가로챌 수 없다.

**Parameters**
* name – {string} – 인스턴스 명.
* value – {*} – 상수값.

**Returns**
{Object} – 등록된 프로바이터 인스턴스.

### decorator(name, decorator)
서비스 인스턴스 생성을 가로채는 데코레이터. 반환 인스턴스는 오리지널 인스턴스 이거나 오리지널 인스턴스를 decorate한 새로운 인스턴스.

**Parameters**
* name – {string} – decorate할 서비스 명.
* decorator – {function()} – 서비스가 인스턴스 될 때 이 함수를 실행한다. [injector.invoke]() 메서를 사용해서 함수를 호출한다. 따라서 주입가능해야 한다. 주입 지역 인자는.
  * $delegate - 오리지널 서비스 인스턴스. monke patched, configured, decorated delegated 할 수 있다.

### factory(name, \$getFn)
서비스를 설정하기 위한 숏컷. \$get 메서드만 필요한 경우 사용.

**Parameters**
* name – {string} – 인스턴스 명.
* $getFn – {function()} – 인스턴스를 만들기 위한 $getFn. `$provide.provider(name, {$get: $getFn})`의 축약형 .

**Returns**
{Object} – 등록된 프로바이트 인스턴스.

### provider(name, provider)
서비스를 위한 프로바이더를 등록. 등록된 프로바이더들은 검색되고 환경설정 메서드 추가도 할 수 있다.

**Parameters**
* name – {string} –  인스턴스명. 그 프로바이터는 name + 'Provider' 키로만 가능하다.
* provider – {(Object|function())} –
  * Object 인 경우: $get 메서드가 있는 객체여야함. $get 메서드는 인스턴스 생성이 필요할 때 [$injector.invoke()](AUTO.$injector#invoke)를 사용하서 실행된다.
  * Constructor 인경우 : 프로바이터의 신규 인스턴스는 [$injector.instantiate()](AUTO.$injector#instantiate)를 사용해서 생성되고 객체로 다룬다.

**Returns**
{Object} – 등록된 프로바이더 인스턴스.

### service(name, constructor)
주어진 클래스의 서비스를 등록하기 위한 숏컷.

**Parameters**
* name – {string} – 인스턴스 명.
* constructor – {Function} – 인스턴스가 될 A class (constructor function)

**Returns**
{Object} – 등록된 프로바이터 인스턴스.


### value(name, value)
\$get 메서드가 상수인 경우 서비스를 설정하기 위한 숏컷.

**Parameters**
* name – {string} – 인스턴스 명.
* value – {*} – 값.

**Returns**
{Object} – 등록된 프로바이터 인스턴스.
