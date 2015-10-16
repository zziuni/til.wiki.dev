# Cross-Origin Resource Sharing

Same Origin Policy를 해결하기 위한 표준. [CORS](http://www.w3.org/TR/cors/)라고 함.

## How to use

server-side에서 Response Header를 추가하면 된다.

```
     Access-Control-Allow-Origin:*
```

### withCredentials

인증처리를위한 옵션 [CORS tutorials](http://www.html5rocks.com/en/tutorials/cors/#toc-making-a-cors-request)

## reference
* [W3C's CORS](http://www.w3.org/TR/cors/)
