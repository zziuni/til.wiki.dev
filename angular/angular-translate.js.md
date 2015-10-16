## 비동기 호출법

세가지 방법이 있다.

### 서버가 `lang` 파라미터를 기준으로 동적 데이터를 줄 때

```bash
  $ bower install angular-translate-loader-url
  # html에 embeded 해야함.
```

```js
  $translateProvider.useUrlLoader('foo/bar.json');
  $translateProvider.preferredLanguage('en');
  // foo/bar/json?lang=en 을 요청한다.
```

### 정적인 localizaton file 이 있을 때.

```bash
  $ bower install angular-translate-loader-static-files
  # html에 embeded 해야 함.
```

```js
  $translateProvider.useStaticFilesLoader({
      prefix: 'locale-',
      suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
  // local-en.json을 요청함.
```

### 대규모 app을 위한 partial loader

```bash
  $ bower install angular-translate-loader-partial
```

```js
  angular.module('main')
  .config(function ($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart('home');

    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/i18n/{part}/{lang}.json'
    });

    $translateProvider.preferredLanguage('en');

    $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
      $translate.refresh();
    });
  });
  // /i18n/home/en/json을 요청함. 변경될 때 텍스트들을 refresh() 해야함.

  angular.module('contact')
  .controller('ContactCtrl', function ($scope, $translatePartialLoader) {
    $translatePartialLoader.addPart('contact');
  });

```

