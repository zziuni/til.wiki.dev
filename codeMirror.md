Tokenization이 필요한 DSL 전용 에디터를 [CodeMirror](https://codemirror.net/index.html)로 만들기.

##CodeMirro.defineMode(name, modeFn)

- 여기서 사용하는 용어는 [Codemirror Doc's Writing CodeMirror Mode](https://codemirror.net/doc/manual.html#modeapi)에서 쓰는 용어.
- custom mode 정의.
- `name`는 mode name. 소문자여야 하마.
- `modeFn` __codemirror config__ 객체를 인자로 받는 __mode function__.
- mode function은 __mode object__를 반환해야함.
- __mode script__(mode function body)는 content parsing이 주 목적.
- __stateless token__이 아니면 __state object__ 사용.
- state object는 mode object의 __startState method__로 정의.

```js
    {
      startState: function() {...},
      token: function(stream, state) {...}
    }
```

- token method의 stream으로 one token을 읽어서 필요하면 state를 바꾸고, css class에 사용할 __style string__ (or null)를 반환.
- [CodeMirror theme](https://codemirror.net/theme/)를 사용하려면 표준명명(ex. cm-keyword)을 사용하는게 좋다.
- style string으로 'line-background-', 'line-' prefix를 사용하면 개별 token 이 아닌 line 전체에 class name이 적용된다.


## Tokenizing 할 때 유용한 methods

- `eol()` -> boolean: 라인끝
- `sol()` -> boolean: 라인 시작
- `peek()` -> string : advance없이 next character.
- `next()` -> string: advance next character
- `eat(match: string|regexp|function(char: string) → boolean)` → string
다음 문자열이 match와 일치하면 return. 아니면 nudefined
- `eatWhile(match: string|regexp|function(char: string) → boolean)` → boolean
실패할 때 까지 eat() 실행. 하나라도 걸리면 return true;
- `eatSpace()` -> boolean: white-space `eatWhile`
- `skipToEnd()` : 라인끝으로 position 이동.
- `skipTo(ch: string)` -> boolen : 그 라인에 ch이 있으면 그리로 이동. 없으면 advance하지 않음. 찾으면 return true;
- `match(pattern: string, ?consume: boolean, ?caseFold: boolean) → boolean`
- `match(pattern: regexp, ?consume: boolean) → array<string>`
consume 기본값은 true. true면 eat과 동일. false이면 position이 변경되지 않음. pattern이 문자열이면 caseFold로 대소문자. 일치하면 일치한 배열 반환.
- `backUp(n: integer)` : n 개 뒤 글자로 이동. 현재 token 시작점 보다 더 되돌리면 break.
- `column() → integer` : 해당 token 시작하는 곳의 column반환
- `indentation() → integer`: indented된 정도 반환.
- `current() → string` : 현재 token 시작에서 current stream position.



## 메모

공백 라인 체크
mode.blankLine(state)  blank line이 넘어올때 마다 실행할 수 있음. sate 업데이트 가능.

state 객체

smart indentaion

comment

reindent
electricChars를 설정하면, 특정 문자열이 들어오면 reindent를 한다.

diff, C-like mode 차고

mode는 nested 함.
`innerMode`같은게 도움 됨.


