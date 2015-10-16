# $exceptionHandler (service in module mgMock)

## Description
`ng.$exceptionHandler`의 구현을 mock으로 만든다. [ng.$exceptionHandler](ng.$exceptionHandler)는 자신에 전달되는 에러를 rethrow하거나 log한다. 이에 대한 설정정보는 [$exceptionHandlerProvider](ngMock.$exceptionHandlerProvider)를 참고하라.

```js
    describe('$exceptionHandlerProvider', function() {

      it('should capture log messages and exceptions', function() {

        module(function($exceptionHandlerProvider) {
          $exceptionHandlerProvider.mode('log');
        });

        inject(function($log, $exceptionHandler, $timeout) {
          $timeout(function() { $log.log(1); });
          $timeout(function() { $log.log(2); throw 'banana peel'; });
          $timeout(function() { $log.log(3); });
          expect($exceptionHandler.errors).toEqual([]);
          expect($log.assertEmpty());
          $timeout.flush();
          expect($exceptionHandler.errors).toEqual(['banana peel']);
          expect($log.log.logs).toEqual([[1], [2], [3]]);
        });
      });
    });
```