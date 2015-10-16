# Creating Sercies
angular는 융요한 서비스들을 제공하지마나, 내 서비스를 위한 사용자 정의 서비스를 작성하기 위한 유요한 것을 찾게 된다. Module#factory api를 사용하거나 직접  module config 함수 안에서 $provide api 를 직접 사용해서 module로 service factory 함수를 등록하는 작업으로 시작할 수 있다.

모든 sevice는 angular's DI 시스템을 사용해서 스스로도 id를 가지고 등록되고, 필요하면 이미 등록된 서비스에 대한 의존성을 정의해서 의존성 주입에 참여한다. 테스트에서  mocks/stubs/dummies를 위한 의존성을 교체할 수 있는 능력은 고수준의 테스트 가능성을 서비스에 허락한다.

## Registering Services
service를 등록하려면 모듈이 필요하다. Module API를 쓰거나 module configuration 함수에서 $provide 서비스를 사용해서 서비스를 등록할 수 있다. 두가지 방법의 예제.

angular.Module API

    var myModule = angular.module('myModule', []);
    myModule.factory('serviceId', function() {
      var shinyNewServiceInstance;
      //factory function body that constructs shinyNewServiceInstance
      return shinyNewServiceInstance;
    });

$provide service 사용.

    angular.module('myModule', [], function($provide) {
      $provide.factory('serviceId', function() {
        var shinyNewServiceInstance;
        //factory function body that constructs shinyNewServiceInstance
        return shinyNewServiceInstance;
      });
    });

주의 : 호출할 때 인스턴스를 생성할  factory 함수를 등록해야지 service 인스턴스를 등록하면 안된다.

## Dependencies

서비스는 의존성을 가질 수는 있다. 의존성은 factory 함수의 전달인자로 정의된다. ID에 대한 자세한 건 [여기](http://docs.angularjs.org/guide/di)를 보고, minification 할 때 발생하는 문제 해결을 위한 DI 주석을 만들기 위해서 배열 교피법과 $inject 프로퍼티를 사용한다.

간단한 예제. 이 service는 $window service를 주입 받는다. (faction 함수에서 전달인자로 전해진) 예제 servcie는 근야 함수.어떤 함수냐 하면 노티를 저장했다가 3개가 되면 window alert으로 모두 노티 날리는 서비스.

    angular.module('myModule', [], function($provide) {
      $provide.factory('notify', ['$window', function(win) {
        var msgs = [];
        return function(msg) {
          msgs.push(msg);
          if (msgs.length == 3) {
            win.alert(msgs.join("\n"));
            msgs = [];
          }
        };
      }]);
    });

## Instantiating Angular Services
service의 인스턴스 화는 느리게 된다. 이말의 의미는 service 인스턴스나 애플리케이션 컴포넌트로가 필요할 때 생성된다. (미리 생성되지 않는다는 말). 다르말로는 angular는 개발자가 직접 요청하거나 애플리케이션이 간접적으로 요청하기 전까지 service 인스턴스를 만들지 않는다.

## Service as singletones
가장 중요한거 모든 angluar service는 싱글톤이다. 이말의 의미는 주어진 injector당 service의 인스턴스는 오직 하나. Angular는 글로벌 상태를 극도로 싫어함. 글로벌 상태는 주어진 service의 각 인스턴스당 여러 injector 생성이 가능하다. 하지만 이 프로퍼티가 정말 중요한 test 의 경우를 빼고는 이런 경우는 거의 필요없다.

