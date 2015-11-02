[5 min quickstart](https://angular.io/docs/ts/latest/quickstart.html) 문서 요약.


```js
// app.ts
import {Component, bootstrap} from 'angular2/angular2';
@Component({
  selector: 'my-app',
  template: '<h1>My First Angualr2 app</h1>'
})
class AppComponent {}
bootstrap(AppCompoent);
```


```js
{
  "compilerOptions" : {
    "target": "ES5",
    "module": "commonjs",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  }
}
```
