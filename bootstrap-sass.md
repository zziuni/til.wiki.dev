
## Trouble Shooting

- bootstrap-sass-official를 설치하고 bower update, install를 하면 다음 에러가 남.

```bash
bower bootstrap-sass-official#~3.2.0+1     ENORESTARGET Tag/branch ~3.2.0+1 does not exist
```

- semver에서 메타데이터로 쓰이는 `+` 심볼을 사용해서 배포를 해서 생기는 문제.
- `3.2.0`와 `3.2.0+1`은 동일 release version
- 당장 동작하게 하려면 bower.json에서 틸트(~)를 빼고,
- bower가 아닌 bootstrap이 해결하는게 맞다. [관련 이슈](https://github.com/bower/bower/issues/1486)
