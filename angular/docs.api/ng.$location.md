# $location (service in module ng)

> [원문](http://docs.angularjs.org/api/ng.$location)

## Description
브라우저 주소창의 URL를 파싱해서 ( window.location기반.) 애플리케이션에서 사용할 수 있는 URL를 만든다. 브라우저 주소창의 URL과 $location 서비스 는 상호 영향을 줌.

**$location service는 **
* 주소창의 URL을 펼침. 다음을 할 수 있음.
    * URL을 Watch 하고 observe.
    * URL 변
* 사용자가 다음을 할 때 브라우저 URL과 동기화한.
    * 주소창의 주소를 바꿀 때.
    * 뒤로/앞으로 버튼 누를때. (history 링크 클릭시)
    * link 클릭시.
* 메서드들이 URL 객체에 추가됨.

[Developer Guide: Angular Services: Using $location](../guide/dev_guide.services.$location) 참고.

## Dependencies
* [$browser](ng.$browser)
* [$sniffer](ng.$sniffer)
* [$rootElement](ng.$rootElement)

## Methods
### absUrl()
전체 주소 게터
### hash(hash)
hash 파트 게터 세터.
### host()
호스트 게터.
### path(path)
파라미터와 호스트 뺀 패스의 게터 세터
### port()
포트 게터
### protocol()
프로토콜 게터
### replace()
호출하면 해당 $digest 단계에서 $location으로 발생하는 모든 변화가 브라우저 history에 replace로 추가 됨. (back이 먹지 않는다는 말. )
### search(search, paramValue)
서치(질의) 게터 세터.
### url(url)
url 게터 세터. 호스트값 없음 absUrl()과 다름.
