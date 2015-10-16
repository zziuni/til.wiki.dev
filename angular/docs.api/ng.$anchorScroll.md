# $anchorScroll (service in module ng)

> [원본](http://docs.angularjs.org/api/ng.$anchorScroll)

## Description
소출하면 `$location.hash()`를 확인하고 관련된 element로 스크롤한다. [Html5 scpe](http://www.w3.org/html/wg/drafts/html/master/browsers.html#the-indicated-part-of-the-document)에 정의된 룰에 따른다.

`$location.hash()`를 watch도 한다. 그래서 anchor를 매치하기 위해 어떻게 변해도 스크롤된다. `$anchorScrollProvider.disableAutoScrolling()`를 호출해서 비활성화 할 수 있다.

## Dependencies
* [$window](ng.$window)
* [$location](ng.$location)
* [$rootScope](ng.$rootScope)

## Usage
    $anchorScroll();