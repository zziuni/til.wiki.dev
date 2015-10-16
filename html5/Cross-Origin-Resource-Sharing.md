# Cross-Origin Resource Sharing

Same Origin Policy를 해결하기 위한 표준. [CORS](http://www.w3.org/TR/cors/)라고 함.

## How to use

server-side에서 header만 추가하면 된다.

```
     Access-Control-Allow-Origin:*
```

### withCredentials

인증처리를위한 옵션 [html5Rocks CORS Tutorial](http://www.html5rocks.com/en/tutorials/cors)

## reference
* [W3C's CORS](http://www.w3.org/TR/cors/)
