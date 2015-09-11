## Ruby On Rails

### rbenv기반 Basic
- Version manager는 [RVM](https://www.rvm.io/)보다 [sstephenson/rbenv](https://github.com/sstephenson/rbenv)이 주류다.
- rbenv plugin인 [sstephenson/ruby-build](https://github.com/sstephenson/ruby-build)를 같이 쓰면, `rbenv install` 컴맨드로 특정버전 ruby 설치를 할 수 있다.
- sam stephenson은 prototype의 개발자.
- `rbenv install --list`로 설치 가능한 ruby들을 볼 수 있다.

```
  2.1.5
  2.2.0-dev
  jruby-1.5.6
  maglev-2.0.0-dev
  mruby-dev
  mruby-1.0.0
  rbx-2.0.0-dev
```

- 그냥 버전만 있는게 [MRI CRuby](https://en.wikipedia.org/wiki/Ruby_MRI), 즉 마츠 버전의 루비다.
- mri cRuby 는 [gil (Global Interpreter Lock)](https://en.wikipedia.org/wiki/Global_Interpreter_Lock)이 있다.
- [JRuby](http://jruby.org/)는 gil 제약이 없음.
- rbx는 [Rubinius](http://rubini.us/). 이놈도 gil제약이 없음. LLVM 기반. 하지만 현실은 cRuby or JRuby.


### pry
- `gem install pry, pry-doc`
- intellisense를 지원하는 ruby REPL


### ruby

- `1.zero?` ruby convention에서는 boolean을 반환하는 method는 `?`를 붙인다.
- ruby **yield**는 ecmascript 2015 generator의 yield와 다름. coroutine이 아님. ruby coroutine은 `fiber`


