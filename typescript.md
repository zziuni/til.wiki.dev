## Topics


### decoration
class의 metadata를 생성하는 typescript fueature. `@` symbol 사용.

```js
  import {Component, bootstrap} from 'angular2/angular2';

  @Component({
    selector: 'my-app',
    template: '<h1>My First Angualr2 app</h1>'
  })
  class AppComponent {}
  bootstrap(AppCompoent);
```

