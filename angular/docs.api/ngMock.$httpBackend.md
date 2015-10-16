# \$httpBackend (service in module ngMock )

## Description
\$http 서비스를 이용하는 애플리케이션의 유닛 테스트를 위한 적절한 훼이크 HTTP 백앤드 구현채.

end-to-end 테스트나 back-end 없이 개발하기 위한 HTTP 백앤드 구현은 e2e \$httpBackend mock를 참고.

유닛테스트는 빨리 실행되고 외부 의존도가 없이 실행되야 한다. 그래서 실 서버서로 XHR, JSONP를 보내면 안됨.

mock 구현은 `expect`와 `when` api와 그 숏컷을 통해서 정적, 동적 응답으로 사용될 수 있다.

angualar가 서버의 데이터가 필요할 때, \$httpBackend 서비스를 사용하는 실서버로 요청을 보내는 \$http 서비스를 호출한다. 그래서 \$http 서비스는 DI와 함께 \$httpBackend mock를 쉽게 주입할 수 있고 요청의 검증에 사용하고, 실서버에 요청하지 않고 테스트 테이터롤 응답에 할당할 수 있다.

테스트상의 코드가 http 요청을 만들 때 테스트 데이터가 mock backend를 통해서 http 응답으로 반환되야 한다.

* \$httpBackend.expect - expected request을 지정한다.
* \$httpBackend.when - backend definition를 지정한다.

## Request Expectations vs Backend Definitions
Request expectation은 애플리케이션에서 일으키는 요청에 대해서 assertion을 만들고 요청에 대한 응답을 정의하는 방법. 예상된 요청이 발생하지 않거나 잘못된 순서로 발생하면 테스트는 실패한다.

backend definition은 특정 요청이 발생하거나 발생하지 않으면 assert를 하지 않는 애플리케이션을 위한 훼이크 백엔드를 정의할 수 있다. 요청이 발생했다면 가공된 응답을 반환한다. 테스트 사이클에서 요청이 일어나던 아니던 테스트는 통과한다.

                                            Request expectations        Backend definitions
    Syntax                              .expect(...).respond(...)       .when(...).respond(...)
    Typical usage                     strict unit tests                 loose (black-box) unit testing
    Fulfills multiple requests     NO                                   YES
    Order of requests matters   YES                                  NO
    Request required                YES                                   NO
    Response required              optional (see below)           YES

request expections 과 backend definition은 모두 유닛테스트에서 지정된다. request expection이 먼저 평가된다.

request expection이 응답을 지정하지 않으면 알고리즘이 backend definition중에서 적당한 응답을 검색한다.

요청이 어떤 expection과도 일치하지 않거나, expection이 있기는 한데 정의된 응답이 없다면 backend definition 순서대로 평가해서 첫번째 일치하는 definition을 반환한다.

## Flushing HTTP request
실 상황에선 $httpBackend는 비동이 응답을 한다. 이런 비동이 응답을 테스트에서 구현하려면 작성하고 따라가고 관리하기 어려운 비동이 유닛 테스트를 생성해야 한다. 동시에 테스팅 mock은 테스트 상의 코드 실행이 변경되야 하기 때문에 동기로 응답할 수 없다. 이런 이유로 mock \$httpBackend는 pending된 요청을 명시적으로 flush해서 테스트할 수 있는  flush()메서드가 있다. 덕분에 동기로 실행되는 테스트에서 backend의 비동기 api가 보존된다.

## Unit testing with mock $httpBackend

    // controller
    function MyController($scope, $http) {
      $http.get('/auth.py').success(function(data) {
        $scope.user = data;
      });

      this.saveMessage = function(message) {
        $scope.status = 'Saving...';
        $http.post('/add-msg.py', message).success(function(response) {
          $scope.status = '';
        }).error(function() {
          $scope.status = 'ERROR!';
        });
      };
    }

    // testing controller
    var $httpBackend;

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');

      // backend definition common for all tests
      $httpBackend.when('GET', '/auth.py').respond({userId: 'userX'}, {'A-Token': 'xxx'});
    }));


    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it('should fetch authentication token', function() {
      $httpBackend.expectGET('/auth.py');
      var controller = scope.$new(MyController);
      $httpBackend.flush();
    });


    it('should send msg to server', function() {
      // now you don’t care about the authentication, but
      // the controller will still send the request and
      // $httpBackend will respond without you having to
      // specify the expectation and response for this request
      $httpBackend.expectPOST('/add-msg.py', 'message content').respond(201, '');

      var controller = scope.$new(MyController);
      $httpBackend.flush();
      controller.saveMessage('message content');
      expect(controller.status).toBe('Saving...');
      $httpBackend.flush();
      expect(controller.status).toBe('');
    });


    it('should send auth header', function() {
      $httpBackend.expectPOST('/add-msg.py', undefined, function(headers) {
        // check if the header was send, if it wasn't the expectation won't
        // match the request and the test will fail
        return headers['Authorization'] == 'xxx';
      }).respond(201, '');

      var controller = scope.$new(MyController);
      controller.saveMessage('whatever');
      $httpBackend.flush();
    });

## Methods
* expect(method, url, data, headers)
* expectDELETE(url, headers)
* expectGET(url, headers)
* expectHEAD(url, headers)
* expectJSONP(url)
* expectPATCH(url, data, headers)
* expectPOST(url, data, headers)
* expectPUT(url, data, headers)
* flush(count)
* resetExpectations() - 모든 expectation를 리셋한다. backend definition만 남음.
* verifyNoOutstandingExpectation() - 모든 expection 발생을 확인한다.하나라도 요청이 발생하지 않으면 verifyNoOutstandingExpectation 예외 발생
* verifyNoOutstandingRequest() - flush() 해야 하는 요청이 남은게 없는지 검사한다.
* when(method, url, data, headers)
* whenDELETE(url, headers)
* whenGET(url, headers)
* whenHEAD(url, headers)
* whenJSONP(url)
* whenPOST(url, data, headers)
* whenPUT(url, data, headers)
