# Bower

## description
front-side를 위한 javascritp packget managermant tool. [Official Repo](https://github.com/bower/bower). Twitter에서 만듬.




## install

```bash
    $ npm install -g bower
```




## commands

### initialize

```bash
    $ bower init
```

```json
    {
      "name": "my-project",
      "version": "1.0.0",
      "main": "path/to/main.css",
      "ignore": [
        ".jshintrc",
        "**/*.txt"
      ],
      "dependencies": {
        "<name>": "<version>",
        "<name>": "<folder>",
        "<name>": "<package>"
      },
      "devDependencies": {
        "<test-framework-name>": "<version>"
      }
    }

```

### info about a package

```bash
    $ bower info <packpage name>
```

### bower dependencies 알아내기

[bower api](http://bower.io/docs/api/)를 참고한다.

```bash
  $ bower list -p -r
```

현재 package의 `bower.json`에 있는 dependencies path를 json형태로 `stdout`으로 반환한다.
이를 이용해서 `grunt copy`를 할 떄 필요한 파일만 할 수 있을거 같다. 전체를 하지 않고, 원하는 위치로.


### install

#### install a package

```bash
    $ bower install [--save | --save-dev] <package name>
    # or
    $ bower install [--save | --save-dev] <package name>#<version>
```

`<package name>`에 올 수 있는 값.

- `<package>`
- `<package>#<version>`
- `<name>=<package>#<version>`

`<package>`에 가능한 값.


- Registered package name `jquery`, `normalize.css`
- Git endpoint  `https://github.com/user/package.git`, `git@github.com:user/package.git`
- Git endpoint without .git `git+https://github.com/user/package`, `git+ssh://git@github.com/user/package`
- Local folder  `my/local/folder/`
- Public Subversion endpoint  `svn+http://package.googlecode.com/svn/`
- Private Subversion endpoint `svn+ssh://package.googlecode.com/svn/`, `svn+https://package.googlecode.com/svn/`
- Shorthand (defaults to GitHub)  `user/package`
- URL `http://example.com/script.js`, `http://example.com/style.css`, `http://example.com/package.zip` (contents will be extracted), `http://example.com/package.tar` (contents will be extracted)


더 자세한건 [bower api#install](http://bower.io/docs/api/#install)

#### install dependencies packages

```bash
	$ bower install
```

#### Bower install options

`-p` production mode
`-f` last version

```bash
⚡ bower install angular
bower angular#*                 cached git://github.com/angular/bower-angular.git#1.2.23
bower angular#*               validate 1.2.23 against git://github.com/angular/bower-angular.git#*
bower angular#~1.2.23          install angular#1.2.23

⚡ bower install angular -f
bower angular#*                resolve git://github.com/angular/bower-angular.git#*
bower angular#*               download https://github.com/angular/bower-angular/archive/v1.2.23.tar.gz
bower angular#*                extract archive.tar.gz
bower angular#*           invalid-meta angular is missing "ignore" entry in bower.json
bower angular#*               resolved git://github.com/angular/bower-angular.git#1.2.23
bower angular#~1.2.23          install angular#1.2.23

⚡ bower install angular -p
bower angular#*                 cached git://github.com/angular/bower-angular.git#1.2.23
bower angular#*               validate 1.2.23 against git://github.com/angular/bower-angular.git#*
bower angular#~1.2.23          install angular#1.2.23
```

## Setting

### Bower CI 대응

- 환경 변수(environmental variable) `SET CI=true`가 있으면 interactive mode가 뜨지 않는다.
- [Travis-ci](http://docs.travis-ci.com/user/ci-environment/#Environment-variables)



## 3rd party tool

### grunt-bower
- https://github.com/curist/grunt-bower
- `bower.json#main`을 기준으로 dist 폴더로 파일을 이동함.
- 문제점.
  + bower.json#main에 연결된 파일이 일관성이 없음. normal or minify version이
  + main main 필요한 파일이 다 없는 경우도 있고, 순서도 중요하다 보니,
  + 수동으로 목록 관리를 하면서 uglify를 해야한다.
  + uglify를 할 필요가 없거나, 한다면 순서 신경을 안 쓸 수 있어야 하는데, 그렇지 않음.
  + 그러면 결국 bower list로 목록 관리는 하되, 순서와 예외 처리를 해줘야 하는데,
  + 그냥 필요한 파일 목록 추출해서 관리하는 것과 차이가 없는 듯...

