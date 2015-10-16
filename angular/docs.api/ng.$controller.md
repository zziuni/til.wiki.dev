# $controller (service in module ng)

> [원문](http://docs.angularjs.org/api/ng.$controller)

# Description
컨트롤러를 인스턴스화 하기 위한 서비스.

[$injector](AUTO.$injector)에서 그냥 호출하지만 서비스로 추출되었다. [BC version]()으로 이 서비스를 오버라이드할 수 있음.

# Dependencies
* [$injector](AUTO.$injector)

# Usage
    $controller(constructor, locals);


## Parameters
* constructor - {Function|string} - 함수로 호출하면 그 함수가 컨트롤러 생성자 함수로 취급. 문자열이면 다음 단계를 통해 컨트롤러 생성자 함수를 찾는데 사용한다.
    * $controllerProvider를 통해서 그 이름으로 등록된 컨트롤러가 있는지 확인
    * 해당 scope에서 문자열을 $eval()했을 떄 생성자가 있는지 확인
    * 전역 window 객체에서 window[constructor]를 시도.
* locals - {object} - 컨트럴로를 위한 노컬 injection ??

## Returns
{Object} - 컨트롤러 인스턴스.

