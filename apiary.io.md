온라인 api 디자인 도구. __blueprint__라는 엔진을 사용한다.



## Options
- mockup url과 real api url을 제공한다.
- 옵션에서 proxy on하면 `HOST`설정한 도메인으로 bypass 한다.
- 옵션에서 private on을 하면 지정한 mock url로만 접속할 수 있다.


## Blueprint
- https://github.com/apiaryio/snowcrash
- [sundown](https://github.com/vmg/sundown) 기반의 API parser
- `model`같은 예약어를 사용하면 파싱이 안된다.


## Tools


### apiary2postman
- apiary2postman를 이용해서 postman용으로 전환.
- [[postman]]은 chrome extention과 packagedapp의 두 버전이 있는데, 두 개가 포멧이 다르므로, 하나를 선택해야 한다.

```
  apiary2postman --output ./postman.json --pretty blueprint apiary.apib
```

### dredd로 test하기
https://github.com/apiaryio/dredd


### 기타 도구들
- postman [apiary2postman](https://github.com/thecopy/apiary2postman)
- postman [blueman](https://github.com/pixelfusion/blueman)
- renderer [aglio](https://github.com/danielgtaylor/aglio)
- node wrapper for Snow Crash [protagonist](https://github.com/apiaryio/protagonist)
- formatter [iglo](https://github.com/subosito/iglo)
- blueprint parser [snow crash](https://github.com/apiaryio/snowcrash)
- markdown parser [sundown](https://github.com/vmg/sundown)
- HTTP validator [Gavel](https://github.com/apiaryio/gavel) json scheme valid 가능.
- Blueprint Tesing Tool [Dredd](https://github.com/apiaryio/dredd)
