[Chai](http://chaijs.com/) is a __BDD / TDD assertion library for node and the browser__ that can be delightfully paired with any javascript testing framework.

- Assertion library. moca와 같이 씀. should, expect, assert 세가지 스타일 모두 지원.
- should는 object.prototype를 확장하는 방식이므로, 비동기 호출 같은 object.prototype 확장이 유효하지 않은 경우는 동작하지 않는다. 그래서 `var should = chai.shoud();` 같은 선언이 필요함.


### BDD (Should)

[chai api bdd](http://chaijs.com/api/bdd/)

- Assertion 가독성을 위한 Chainable Getter.

`to`, `be`, `been`, `is`, `that`, `and`, `has`, `have`, `with`, `at`, `of`, `same`,

- 실제 Asserts

`not`, `a`, `include`, `contain`, `ok`, `true`, `false`, `null`, `undefined`, `exist`, `empty`, `equal`, `deep.equal`, `above`, `least`, `below`, `most`, `widthin(s,f)`, `instanceof(constructor)`, `property`, `deep.property`, `ownProperty(name)`, `length`, `match(regexp)`, `string`, `keys`, `throw(constructor)`, `respondTo(method)`, `inself.to.respondTo(method)`, `satisfy(method)`, `closeTo(expected, delta)`, `members(set)`


```js
  // 예제
  expect(obj).to.have.property('foo')
    .that.is.a('string');
  expect(deepObj).to.have.property('green')
    .that.is.an('object')
    .that.deep.equals({ tea: 'matcha' });
  expect(deepObj).to.have.property('teas')
    .that.is.an('array')
    .with.deep.property('[2]')
      .that.deep.equals({ tea: 'konacha' });
```


- undefined를 테스트 하는 방법.

```js
    // 동작하지 않음.
    DataCache.get('key2').should.be.undefined;  // x
    // 옳바른 방식.
    should.not.exist(DataCache.get('key2'));    // o
```


### chai as promised
- [chai-as-promised](https://github.com/domenic/chai-as-promised/)
- chai 에서 promise 테스트를 할 수 있는
- `npm install chai-as-promised`로 인스톨
- Should interfaces 목록

```
    promise.should.eventually.equal(3);

    promise.to.eventually.have.property('foo');

    promise.should.be.fulfilled;
    promise.should.eventually.deep.equal('foo');
    promise.should.become('foo')    // 위와 같음.
    promise.should.be.rejected;
    promise.should.be.rejectedWith(Error)
```

- chai-as-promised를 angular $q와 같이 쓰려면 assertioin다음에 $rootScope.$digest()를 해주어야 한다.
