# Server Sent Event

## Client

```javascript
    var eventSource = new EventSource("data.jsp");

        eventSource.addEventListener("message", function(e){
            console.log(e.data);
    });
```


## Server

```
    : This is comment.
    retry:2000

    event:userconnect
    data: {"username": "bobby", "time": "02:33:48"}

    event;usermessage
    data: {"username": "bobby", "time": "02:34:11", "text": "Hi everyone."}

```

- MIME 타입: 서버 데이터는 `text/event-stream` 라는 MIME 타입으로 제공되어야 한다
- 문자 인코딩: 서버 데이터의 문자 인코딩은 UTF-8 형식이어야 한다

- 빈줄은 이벤트를 구분하는 역할을 한다
- 주석은 :(콜론)으로 시작한다

- 데이터는 '필드 명: 필드 값' 형식이어야 한다(콜론과 필드 값 사이에 공백 하나를 포함할 수 있다)
  필드 설명> 필드 명에 해당하는 필드 설명을 보자

 * data : 서버가 전달할 실제 데이터를 정의한다
 * retry: 반복 주기를 설정한다(단위: millisecond)
 * event: 이벤트 이름을 지정한다(지정하지 않으면 기본값인 message 가 된다)
 * id: 이벤트 id를 지정한다. 클라이언트에서 마지막 이벤트 번호를 저장하기 위해 사용된다

## references

* [박종명's post](http://m.mkexdev.net/71)
* [caniuse's compatiblity](http://caniuse.com/#search=server-sent)
* [MDN's SSE](https://developer.mozilla.org/en-US/docs/Server-sent_events/Using_server-sent_events)
