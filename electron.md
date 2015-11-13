Electron

NW.js와 유사한 Cross Platform Desktop App Builder.


## Suppurted Platform

- 10.8 이상의 OS X
- Windows 7이상. 그 이하는 동작하지 않는다.
- `x86`, `amd64` (x64) 바이너리 지원. `ARM`은 지원안함.
- Linux도 지원하지만 여기선 패스.


## Downloads
```bash
npm install electron-prebuilt --save-dev
```

## Application Distribution
Electron resource directory에 `app`이란 이름으로 프로그램을 넣어야 함. (OS X `Electron.app/Contents/Resources/`, Windows `resources/`)



## References
- [docs](http://electron.atom.io/docs/v0.34.0/)
- [국문 docs 비추](https://github.com/atom/electron/tree/master/docs-translations/ko-KR)
- [all docs](http://electron.atom.io/docs/all/)
- [Multi Window Electron Desktop Apps - YouTube](https://www.youtube.com/watch?v=K-H2amwQ_pU)
- [loopline-systems/electron-builder](https://github.com/loopline-systems/electron-builder)
- [maxogden/electron-packager](https://github.com/maxogden/electron-packager)