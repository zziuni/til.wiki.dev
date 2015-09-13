## Ruby On Rails

> based Frends Meeting. 프러덕션에 ruby 적용기를 기반으로 정리.


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



### ruby

- `1.zero?` ruby convention에서는 boolean을 반환하는 method는 `?`를 붙인다.
- ruby **yield**는 [ECMAScript 6 Generators](https://carldanley.com/ecmascript-6-generators/)의 yield와 다름. coroutine이 아님. ruby coroutine은 `fiber`

### JRuby
- invoke dynamic - jruby
- support ruby2.2
- multithreaded implemention


### rails
- method missing:
  - [Ruby Method Missing: Ruby Study Notes - Best Ruby Guide, Ruby Tutorial](http://rubylearning.com/satishtalim/ruby_method_missing.html) 를 참고. `findByXXX -> findByEmail`
  - [Metaprogramming Ruby and Rails Antipatterns (Part 1 of 2) - eugenius](http://eewang.github.io/blog/2013/04/29/metaprogramming-ruby-and-antipatterns-in-rails/)
- monkey patching
- based on Rack : [Rack: a Ruby Webserver Interface](http://rack.github.io/). python의 wsgi. [Flask로 만들어 보는 WSGI 어플리케이션](http://spoqa.github.io/2012/01/16/wsgi-and-flask.html)

```ruby
# my_rack_app.rb

require 'rack'

app = Proc.new do |env|
    ['200', {'Content-Type' => 'text/html'}, ['A barebones rack app.']]
end

Rack::Handler::WEBrick.run app
```

### inside to rails
- active support: [rails/activesupport at master · rails/rails](https://github.com/rails/rails/tree/master/activesupport). method missing과 monkey patching으로 구현한 rails의 utillity class. **gem install**으로 설치할 수 있어서 rails없이도 쓸 수 있다. core object도 patch. [rails/activesupport/lib/active_support/core_ext at master · rails/rails](https://github.com/rails/rails/tree/master/activesupport/lib/active_support/core_ext)
- action pack
- railties


### others web framework
- sinatra: [Sinatra: README](http://www.sinatrarb.com/intro.html)
- padrino: [The Elegant Ruby Web Framework - Padrino Ruby Web Framework](http://www.padrinorb.com/)
- lotus: [Lotus - A complete web framework for Ruby](http://lotusrb.org/)
- volt: [voltrb/volt](https://github.com/voltrb/volt). Node의 [Meteor](https://www.meteor.com/)같은 놈. server, client모두에서 ruby 사용. js로 컴파일해서 user interaction에 자동 update.
- grape: [ruby-grape/grape](https://github.com/ruby-grape/grape#what-is-grape). [Ruby Grape | An opinionated micro-framework for creating REST-like APIs in Ruby.](http://www.ruby-grape.org/). REST api를 위한 micro-framwork. xxx 사가 rails + grape를 사용중.


### tools
- [pry/pry](https://github.com/pry/pry). `gem install pry, pry-doc`.  intellisense를 지원하는 ruby REPL
- asset pipeline - concatenate, modifiy, compress, pre-processor. Rails4 부터 코어에서 빠지고 gem이 됨. [rails/sprockets-rails](https://github.com/rails/sprockets-rails)
- spring - application preloader. 비추.
- guard - [Guard](http://guardgem.org/)
- better erros - [charliesome/better_errors](https://github.com/charliesome/better_errors)
- foreman - [ddollar/foreman](https://github.com/ddollar/foreman). Manage Procfile-based applications. Procfile는 다음 문서 참조. [Process Types and the Procfile | Heroku Dev Center](https://devcenter.heroku.com/articles/procfile)


### Rack Servers
#### webrick
- 개발용. [Module: WEBrick (Ruby 2.0.0)](http://ruby-doc.org/stdlib-2.0.0/libdoc/webrick/rdoc/WEBrick.html)

#### thin
- 경량. [macournoyer/thin](https://github.com/macournoyer/thin/)

#### unicorn
- 가장 많이 씀.
- [unicorn: Rack HTTP server for fast clients and Unix](http://unicorn.bogomips.org/)
- [Unicorn!](https://github.com/blog/517-unicorn)
- master and worker process model
- slow client problem
- nginx with unicorn
- unix domain socket

#### puma
- heroku가 현재 unicorn보다 밀고 있는 놈.
- [Deploying Rails Applications with the Puma Web Server | Heroku Dev Center](https://devcenter.heroku.com/articles/deploying-rails-applications-with-the-puma-web-server).
- [Puma is Now the Recommended Ruby Webserver | Heroku Dev Center](https://devcenter.heroku.com/changelog-items/594).
- 둘을 비교한 post [Heroku and Puma vs. Heroku and Unicorn - via @codeship | via @codeship](https://blog.codeship.com/puma-vs-unicorn/)
- multithread web server
- recommented in the heroku
- rails supports thread safe
- hybrid modle - multi process and multithread

#### passenger
- unicorn, puma보다 빠르다고 주장하는 서버. [Fast web server & app server, Ruby Python Node.js - Phusion Passenger](https://www.phusionpassenger.com/)
- apache / nginx module
- support hybrid - multi process multithread



### view
- ERB - 기본
- Haml - [Haml](http://haml.info/)
- Slim - [Slim - A Fast, Lightweight Template Engine for Ruby](http://slim-lang.com/). jade 같은 스타일. xxx에서 사용.


### api
- RailsAPI - rails5에 merged. [rails-api/rails-api](https://github.com/rails-api/rails-api)
- grape - 위에 있음.

### JSON View
- AMS(active model serialize) - [rails-api/active_model_serializers](https://github.com/rails-api/active_model_serializers)
- RABL - 강추. JSON templiting. [nesquena/rabl](https://github.com/nesquena/rabl).
- jbuilder - DSL을 이용한 json structure. [rails/jbuilder](https://github.com/rails/jbuilder)

### presenter /decorator
- draper - [drapergem/draper](https://github.com/drapergem/draper). 강추.

### authentication / authorization
- devise - authentication. 강추. [plataformatec/devise](https://github.com/plataformatec/devise)
- cancan - authorization. [ryanb/cancan](https://github.com/ryanb/cancan)
- omniauth

### asset pipeline
- coffeescript
- sass
- compress / building
- compass
- s3sync - [clarete/s3sync](https://github.com/clarete/s3sync)

### background job
- resque - process fork. [resque/resque](https://github.com/resque/resque)
- sidekiq - multithread bg job. 강추. [mperham/sidekiq](https://github.com/mperham/sidekiq). [Sidekiq](http://sidekiq.org/)
- redis is only used for queue
- based on celluloid . [Celluloid: Actor-based Concurrent Objects for Ruby](https://celluloid.io/)
- provide job monitoring page
- easy to use

### Test
- Rspec - BDD [RSpec: Behaviour Driven Development for Ruby](http://rspec.info/)
- Factory Girl [thoughtbot/factory_girl](https://github.com/thoughtbot/factory_girl)
- [Cucumber](https://cucumber.io/)

### deploy
- git
- heroku
- jenkins
- AWS Opsworks (chef solo) [aws/opsworks-cookbooks](https://github.com/aws/opsworks-cookbooks)

### docker
- new relic
- sentry - [Sentry: Track exceptions with modern error logging for JavaScript, Python, Ruby, Java, and Node.js](https://getsentry.com/welcome/)
- AWS Cloudwatch

### Log Management
- FluentD - [Fluentd | Open Source Data Collector | Unified Logging Layer](http://www.fluentd.org/)
- ELK
  - [Powering Data Search, Log Analysis, Analytics | Elastic](https://www.elastic.co/products)
  - [Log Analysis with the ELK stack (Elasticsearch, Logstash, Kibana) | LinuxFest Northwest 2016](http://linuxfestnorthwest.org/2015/sessions/log-analysis-elk-stack-elasticsearch-logstash-kibana)
- PaperTrail - [Papertrail - cloud-hosted log management, live in seconds](https://papertrailapp.com/)

### consideration
- spark - [Apache Spark™ - Lightning-Fast Cluster Computing](http://spark.apache.org/)
- AWS Lambda - [클라우드 컴퓨팅 PaaS | Amazon Web Services](https://aws.amazon.com/ko/lambda/)
- Consul (etcd, zookeeper) - [Consul by HashiCorp](https://www.consul.io/)

