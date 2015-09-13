용어사전
-----------------

> 다양한 분야의 영용어 사전. 알파벳순 아님.

## 이 문서의 목적
* d3 api 문서, 책 번역시 몰랐던 용어의 정리
* 통계, 수학 공부시 몰랐던 용어, 표현 정리
* 국문 용어만 아는 경우도 정리.
* Khan Academy Math 과정의 용어 정리

## Math of Khan Academy
### Algebra
* __algebra__ - 대수학. 수를 대신해서 문자를 사용해서 방정식을 푸는 수학의 한 분야.
* __subtraction__ - 뺄셈
* __multiple__ - 배수. `14, 21 and 28 are all multiples of 7.` 14, 21, 28은 모두 7의 배수다.
* __power__ - 제곱. `4 to the power of 3.` 4의 세제곱. `powers of 10` 1, 10, 100, 1000 ...
* __fraction__ - 분수
* __denominator__ - 분모
* __numerator__ - 분자
* __remainder__ - 나머지
* __improper fraction__ - 가분수 \\(7/2\\)
* __mixed numbers__ - 대분수 \\(2\frac { 2 }{ 5 } \\)
* __LCM__ - Last Common Multiple. 최소공배수. 2, 4, 9의 최소공배수는 36.

### Geometry
* __line__ - 선
* __line segment__ - 선분
* __ray__ - ? one end point와 forever in one direction.
* __perpendicular__ - 수직
* __parallel__ - 수평


------

### Mathematic
* __exponent__ - 지수. a power is represented with a base number and an exponent.
    $$pawer = base^{exponent}$$
* __prime number__ - 소수. 1과 자기 자신이외에 약수가 없는 수.
* __composite numbers__ - 수. 소수가 아닌 수. 즉, 1과 자신 이외의 약수를 가진 수.
* __matrix transpose__ - 전치행렬 [영문위키](http://en.wikipedia.org/wiki/Transpose)
* __arithmetic progression__ - 등차수열. 연속하는 두 수의 차이가 일정한 수열을 뜻한다. `[1,3,5,7,9 ...]` [영문위키](http://en.wikipedia.org/wiki/Arithmetic_progression)
* __exponential notation__ - 지수 표기법. scientific notation이나 engineering notation같은 10의 거듭제곱을 이용한 숫자 표기법.
* __scientific notation__ - 과학적 표기법. 숫자를 표기하는 방법으로 수를 표시할 때,  `[1,10]`의 소수와 10의 거듭제곱으로 표시하는 것. (1.5 * 10^2 )  공학적 표기법(engineering notation)과 구분한다. 공학적 표기법은 세자리 정수와 지수가 3의 배수인 10의 거듭제곱으로 표기한다. (125.5 * 10^-3) [영문위키](http://en.wikipedia.org/wiki/Scientific_notation), [과학적표기법을 이용한 곱셈과 나누셈](http://astronomy.nmsu.edu/msussman/IntroLab/07.html)
* __dimension__ - 크기, 양. (차원 아님)
* __quantitative dimension__ - 정량적인 크기. 양를 나타내는 길이, 크기, 높이등의 값. *d3.js에서 domain 입력값의 예로 사용됨*
* __domain of a function__ - 정의역. 짧게 __domain__ 라고도 함. \\(y = f(x)\\) 에서 입력 값이 될 수 있는 집합 X를 말한다.  [영문 위키](http://en.wikipedia.org/wiki/Domain_of_a_function)
* __Image, output range__ - 치역. 정의역 X에 대응하는 출력값의 집합.  [영문 위키](http://en.wikipedia.org/wiki/Image_(mathematics))
* __interpolation__ - 보간법. 그래프등의 자료에서 사이값을 (평균내서) __추정__하는 것. d3에서 interpolator는 원래값인 a,b의 사이값을 인자 t로 추정할 수 있는 f(t)를 말함. d3는 다양한 종류의 interpolcator를 제공한다. [영문 위키](http://en.wikipedia.org/wiki/Interpolation)
* __Identity function__ - 항등함수. 입력값이 그대로 나오는 함수. \\(f(x) = x\\)
* __cardinality__ - 집합의 크기, 농도. 집합 원소의 수를 말 함.
* __extrapolation__ - 외삽법. 정의역 바깥쪽 값에 대해서  동일 축척(scale)을 적용해서 값을 추정하는 것.
* __population__ - 인구, 집단. 실험이나 조사로 분석가능한 사람/사물의 집합.

### Geology
* __Projection__ - 투영법. 지구의 지도를 지도로 표현하려면 적절한 투영법을 정의해야 하는데, 크게 Cylindrical, Conic, Azimuthal projection이 있다. 각각 원통, 원뿔, 접면에 지표면의 지점을 투영해서 지도를 그린다. d3는 이 세가지 방법을 기반으로 하는 대표적인 투영법 3가지를 지원한다. Mercator, albers, azimuthal이다.
* __Mercator Projection__ - 지도 투영법중 하나. 원통(cylindrical) 투영법을 사용하고 위경도는 직교한다. 위도는 적도에서 멀어 질 수록 간격이 버러짐. 항해를 위해서 만들어짐. 극지방으로 갈 수록 지도가 외곡되어서 위도 75도 선 위로는 잘 사용하지 않는다.
* __Azimuthal Projection__ - 지도 투영법중 하나. 지구와 한 접점에서 만나는 평면(azimuthal)에 투영하는 투영법.
* __Albers Equal-Area Conic Projection__ - 지도 투영법중 하나. 우리말로는 등적 원추(conic)도법. 설명보단 [동영상](http://www.youtube.com/watch?v=0A7Sh7fpf9s)과 [WolframMathworld](http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html), PDF 자료 참고.
* __Cartographic__ - 지도제작.
* __Cartographer__ - 지도 제작자.
* __Geographic__ - 지리학
* __Geographer__ - 지리학자.
* __Topology__ - 위상 기하학
* __Granularity__ - 암석, 퇴적물을 구성하는 주요 광물 입자의 크기학
* __Geology__ : 지질학


### Visualization
* __box and whisker diagram__ - 박스수염 다이어그램. __box plot__이라고도 한다.
* __choropleth map__ - 지형 분류, 토양, 인구, 교통, 산업 등의 특정한 주제의 분포를 표현한 주제도를 작성할 때, 표현에 알맞게 특정의 구역마다 정도나 비율에 적절한 색을 칠하거나 다양한 형태의 우모(hachure)를 사용하여 주제의 분포 상태를 명료하게 표현한 지도.
* __piecewise linear curve__ - 구분된 선형 곡선, 꺾은선 곡선. 포인트가 찍힌 꺽은선 그래프를 말함.
* __piecewise linear area__ - 꺾은선 영역 차트의 형태.
* __venn diagram__ - 벤 다이어그램. 집함들 사이의 관계를 보려주는 그림. [영문위키](http://en.wikipedia.org/wiki/Venn_diagram)
* __probability tree__ - 확률트리. 사건 발생 확률 별로 가지를 치는 다이어그램.
* __stacked bar chart__ - 누적 막대 차트
* __Choropleth__ - 단계구분도, 코로플래스 지도.

### Geometry
* __Affine Translation__ - 아핀 변환. 평행이동(translation), 축척(scale), 회전(rotation), 전단변형(shearing)
* __Scale__ - 척도. 값을 일정하게 커지고 작아지게 하는 비율.
* __Ordinal scale__ - 순서 척도.
* __Quantitative scale__ - 정량적 축적
* __linear scale__ - 선형 축척, 선형 스케일. 일차원 함수로 매핑된 축척. 정의역과 치역이 일정 비율을 가짐.
* __poly linear scale__ - 다선형 축척. 축척 자체는 선형이지만 분절된 형태의 축척. 선형 축척의 집합이라 이해하면 됨.


### Programing
* __string literal__ - 문자열 리터럴. 변수, 상수에 사용되는 문자열 값.
* __Pseudorandom Number__ - 유사난수 생성기. 유사난수란 난수를 흉내내기위해서 알고리즘으로 생성한 값 [영문위키](http://en.wikipedia.org/wiki/Pseudorandom_number_generator)
* __floating point precision__ - 부동소수점 정밀도
* __strict equality__ - 항등 비교. `===, !==`같은 항등 연산자를 말함. [연산자 명 참조](http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000686.html)
* __string-coercion__ - 같음 연산자 `==, !=`를 사용하기 위해 문자열로 강제 변환. `a=1; a = String(a);`, `a=1; a=''+a;`
* __bare object__ - 빈 객체, 혹은 일반 객체. 변수에 할당하지 않은 `{ key: 'value' }`를 의미함.
* __natural order__ - 사람이 인지하기에 가장 자연스러운 정렬. `[1, 10, 2, 3]`이 아닌` [1, 2, 3, 10]` 순서로 정렬되는거. 문자들은 lexicographic order를 사용한다. `["1", "10", "2", "3"]`는 정렬해도 같다.
* __lexicographic order__ - 사전편찬식 정렬. 쉽게 말해서 사전의 순서, 알파벳 순서. natural order와 구분되는건 왼쪽에서 오른쪽으로 한자씩 알파벳 순으로 비교하는 방식이라. 1, 10, 2, 3 같이 정렬된다는 것. [영문위키](http://en.wikipedia.org/wiki/Lexicographical_order)
* __test harness__ - automated test framework라고도 함. 유닛 테스트를 위해서 설정한 테스트 데이터가 소프트웨어의 콜렉션. [영문위키](http://en.wikipedia.org/wiki/Test_harness)
* __defensive copy__ - 방어적 복사본. 객체를 재사용하지 않고 새로 만들어서 복사본을 만드는 것.

### Statistics
* __bimodal__ - 이봉. 최빈값(mode)가 두 개인 경우에 그 값.
* __cumulative frequency__ - 누적 도수.
* __frequency__ - 도수. 항목의 값. 막대그래프의 높이
* __gaussian distribution__ - 정규분포. Normal distribution 이라고도 함 [영문위키](http://en.wikipedia.org/wiki/Normal_distribution)
* __interquartile range__ - 사분범위. 사분위수 중 Q3 - Q1에 해당하는 범위. IQR이라고도 함. 이상치를 포함하지 않으므로 외곡을 맞는 mini range정의로 쓰인다.
* __modal class__ - 최빈계급. 범주형 데이터에서 가장 높은 도수를 갖는 값들의 번주나 그룹.
* __quantile__ - [확률변수](http://ko.wikipedia.org/wiki/%ED%99%95%EB%A5%A0_%EB%B3%80%EC%88%98)의 [누적분포함수](http://ko.wikipedia.org/wiki/%EB%88%84%EC%A0%81_%EB%B6%84%ED%8F%AC_%ED%95%A8%EC%88%98)에서 등간격으로 가져온 지점이다. 일본어로는 분위수(分位数)라 한다. D3에서는 동명의 global method에서 p등분 지점 값이란 의미로 사용한다. 2-quantile면 중간값을 의미함.  [영문위키](http://en.wikipedia.org/wiki/Quantile), [WolframMathWorld](http://mathworld.wolfram.com/Quantile.html)

#### 중심값
* __mean__ - 평균값. 산술평균, 기하평균등. \\(\mu\\)(뮤)라고 표기함 [영문위키](http://en.wikipedia.org/wiki/Mean)
    $$\mu = {\sum x \over n} = {\sum fx \over \sum f}$$
* __median__ - 중앙값. max에서 min로 정렬했을 때 중앙에 있는 값. 개수가 홀 수 있을 떄는 (n+1)/2 의 값, 짝 수 일 때는 (n+1)/2 의 양쪽 값의 평균.
* __mode__ - 최빈값. 가장 많이 등장하는 값. 평균(average)중 유일하게 범주형 데이터에서 쓸 수 있음.
* __outlier__ - 이상치. 극단적인 값. skewed의 원인. 일반적으로 표준편차(standard deviation)가 3이상이 값을 말함.
* __skewed__ - 편향. 평균값을 한쪽으로 치우치게 하는 현상. 이상치(outlier) 때문에 일어남. 이상치가 우측에 있으면 `오른쪽으로 편향`이라고 표현. 그래프로 그렸을 때 tail 이있는 방향

#### 변이와 분포
* __range__ -- 범위
* __upper bound__ - 상한
* __upper quartile__ - 상한 사분위수. \\(3n\over4\\) 가 정수면 그 위치의 값과 다음 위치의 값 사이값. 정수가 아니면 올림한 위치의 값.
* __lower bound__ - 하한
* __lower quartile__ - 하한 사분위수. \\( n\over4 \\) 가 정수면 그 위치의 값과 다음 위치의 값의 사이값. 정수가 아니면 올림한 위치의 값.
* __quartile__ - 사분위수. 데이터를 동일한 크키의 조각으로 다누는 값들. 보통 4조각으로 나눈다. 각 조각을 Q1(lower quartile), Q2, Q3, Q4(upper quartile)이라 한다. 간혹 quartile은 각 데이터 조각 내부에 포함된 값들을 지칭하는 말로도 쓰인다. 4-quantile이 quartile. 10-quantile이 decile이다. box plot 다이어그램에서 사용된다.   [영문위키](http://en.wikipedia.org/wiki/Quartile)
* __percentiles__ - 백분위수. deciles, interpercentile range와 관련. 사분위수와 같은 방법으로 백등분 한 수. k% 지점의 값.  예) 시험성적의 90번째(90%)의 백분위 점수가 50점. 50점이하인 학생이 전체에서 90%라는 뜻. 50점 이상이면 상위 10%.
    $$P_k$$
* __deciles__ - 십분위수. 사분위수와 같은 방법으로 십등분 한 수.
* __interpercentile range__ - 백분범위.
* __variance__ - 분산. 분포을 설명하는데 사용하는 방법중 하나. 값과 평균값의 차를 제곱한 값의 수로 나눈다.
    $$분산 = {\sum (x- \mu)^2 \over n} = {{\sum x^2} \over n} - \mu^2 $$
* __standard deviation__ - 표준편차. 자료의 산포도를 나타내는 수치로, 분산(variance)의 음이 아닌 제곱근으로 정의된다. 표준 편차가 작을수록 평균값에서 변량들의 거리가 가깝다. \\(\sigma\\)(시그마) [영문위키](http://en.wikipedia.org/wiki/Standard_deviation)
    $$\sigma = \sqrt {분산} =  \sqrt {\sum (x- \mu)^2 \over n} $$
* __z-score, standard score__ - z점수, 표준점수. 서로다른 평균과 표준편차를 가진 데이터 집합을 비교할 때 사용한다. 평균값이 0이고 표준편차가 1일 이론적인 분포를 갖는 데이터로 변환한 것.   [영문위키](http://en.wikipedia.org/wiki/Standard_score)
    $$z = {{x-\mu} \over \sigma}$$

#### 확률
* __probability__ - 확률. 사건 A가 발생할 확률은 A가 발생할 경우의 수를 전체경우(S)의 수로 나눈 것.
    $$P(A) = {n(A) \over n(S)}$$
* __sample space__ - 표본 공간. 활률이 발생할 수 있는 전체 경우의 수. 보통 `S` 로 표기한다.
* __event__ - 사건. 확률을 속성으로 갖는 어떤 결과나 발생.
* __complementary event__ - 여사건. A가 발생하지 않을 A'가 있을 경우, A'를  A의 여사건이라고 한다.
    $$P(A') = 1 - P(A)$$
* __mutually exclusive__ - 상호배반. 동시에 일어날 수 없는 두 사건.
* __intersect__ - 교차. 동시 발생 가능한 사건. 벤 다이어그램에서는 교집합에 해당함.
    $$A \cup B$$
* __exhaustive__ - 전체. 모든 사건. 벤 다이어그램에서는 합집합에 해당함. 상호배반(exclusive)는 교집합이 없는 집합들의 합을 의미함.
    $$A \cap B = A + B - {A \cup B}$$
    $$P(A) \cap P(B) = P(A) + P(B) - {P(A) \cup P(B)}$$
* __conditional probabilities__ - 조건부확률.  B가 발생했다는 것을 알 때 A가 발생할 확률. 확률분포트리(probability tree)를 사용한다.
    $$P( A | B ) = { P(A \cap B) \over P(B)}$$
    $$P(A | B) \neq P( B | A)$$
* __law of total probability__ - 전환률의 법칙. 조건부확률의 전제조건이 되는 전체 확률.
* __Bayes's Theorem__ - 베어즈 정리.  조건부확률의 순서를 바꾼 조건부확률을 구할 때 사용함. 즉. \\(P( B | A )\\)를 알 때 \\(P( A | B )\\)구할 수 있다.
    $$P( A | B ) ={ {P( A ) \times P( B | A )} \over {P( A ) \times P( B | A ) + P( A' ) \times P( B | A' )} }$$
* __dependent event__ - 종속사건. 다음이 성립하변 종속이다.
    $$P( A | B ) \neq P( B | A )$$
* __independent event__ - 독립사건. 다음이 성립한다. 독립은 상호배반과는 다르다. 상호배반은 A가 발생하면 B가 발생할 수 없는 경우를 말한다. 독립은 A의 발생이 B발생 확률을 바꾸지 않는 것을 말한다.
    $$P( A | B) = P(A)$$
    $$P( A \cup B) = P(A) \times P(B)$$


#### 이산확률분포
* __Probability distribution__ - 확률분포. 특정 변수(확률 변수)가 가질 수 있는 모든 확률의 집합
* __random variable__ - 확률 변수. 어떤 집합안에서 특정확률과 관련된 값을 가지는 변수.  확률 변수 X가 x값을 가질 때의 확률을 `P( X = x )` 로 표기한다.
* __discrete__ - 이산. 정확한 값을 가진간 의미로 '이산 확률 변수'라 하면 확률에 의해 특정 지어지는 값이 분명함을 말한다.
* __기대치__ - 기대치. 집합의 평균값과 비슷한 계념으로 확률분포에서 기대되는 값을 말한다. `E(X)` 로 표기한다.
    $$E(X) = \mu = \sum xP(X=x) $$
* __확률분포 분산__ - `Var(X)`로 표기한다. X 확률변수에 대한 확률분포의 분산을 듯한다.
    $$Var(X) = E(X - \mu)^2 = \sum(x - \mu)^2P(X = x)$$
* __확률분포 표준편차__ - 일반 확률과 동일하게 분산의 제곱근이다.
    $$\sigma = \sqrt{Var(X)}$$
* __선형변환__ - a, b가 상수일 때 X가 aX + b로 변환되는 경우, 기대치와 분산은 다음과 같이 선형(linear) 변환이 된다.
    $$E(aX + b) = aE(X) + b$$
    $$E(aX + bY) = aE(X) + bE(Y)$$
    $$Var(aX + b) = a^2Var(X)$$
    $$Var(aX + bX) = a^2Var(X) + b^2Var(Y)$$
* __독립관측 시 기대치와 분산__ -
    $$E(X_{1} + X_{2} + ...  + X_{n}) = nE(X)$$
    $$Var(X_{1} + X_{2} + ...  + X_{n}) = nVar(X)$$
* __독립확률변수__ - 확률변수가 X, Y인 경우(완전히 독립된) 기대값과 분산을 계산하는 방식. __확률변수 뺄셈의 분산__의 경우 변동률(Variability)가 증가하기 때문에 __증가(+)__한다.
    $$E(X+Y) = E(X) + E(Y)$$
    $$E(X-Y) = E(X) - E(Y)$$
    $$Var(X + Y) = Var(X) + Var(Y)$$
    $$Var(X - Y) = Var(X) + Var(Y) \Leftarrow  중요$$
* __observation__ - 관측. 같은 기대치와 분산을 가지고 있어도 개별 사건의 __관측__ 결과값은 다를 수 있다. (다르다.)

#### 순열과 조합
* __factorial__ - 팩토리얼. 한자어로는 계승. $n!$ 로 표기한다. 'n 팩토리얼'로 읽는다. 'n부터 1까지 곱하라'를 의미한다. \\(0!\\), \\(1!\\) 는 1이다. 다른 모든경우에 팩토리얼의 값은 짝수다. 보통은 n개를 나열하는 가지수를 의미한다. n개를 원형으로 나열하는 가지수는 `(n-1)!`이다. 종류(catetory)에 따른 배열에는 아래 공식을 쓴다. (전부 n개 중, j개, k개, m개가 있는 경우.)
    $$n! = n \times (n-1) \times (n-2) \times ... \times 2 \times 1$$
    $${n1 \over j!k!m!...}$$
* __permutation__ - 순열. 서로 다른 n 개의 원소 중에서 r 개를 뽑아서 한 줄로 세우는 경우의 수.  [WolframMathWorld](http://mathworld.wolfram.com/Permutation.html), [영문위키](http://en.wikipedia.org/wiki/Permutation)
    $$^n{P}_r = {n! \over (n-r)!}$$
* __combinations__ - 조합. __choose__로 표현하기도 한다. n개의 원소에서 순서를 고려하지 않고 r개의 원소를 고르는 경우의 수. 반드시 순열보다 값이 작다.
    $$^n{C}_r = { n! \over {r!(n-r)!}} = {n \choose r}$$


#### 기하, 이항, 푸아송분포
특정 패턴의 이산 확률 분포에 대하여.
* __geometric distribution__ - 기하분포. 분포의 한 형태. 특정 패턴을 띄므로 별도로 공식화 됨.  r번째에 성공을 거두기위해 (r-1)의 실패가 있어야 할 확률. 기하분포의 성립조건. 1. 일련의 독립시행을 실시. 2. 각 시행은 성공 아니면 실패이며, 각 확률은 동일하다. 3. 첫 성공을 거두기위한 __실행회수가 관심사__. 결국 `r`은 첫 성공을 거두기 까지 시도해야 하는 횟수.
 `p`는 성공확률, `q`는 1-p를 의미하는 실패확률이다. r이 커질수록 기하분포 값은 작아지며 최빈값은 항상 1이다.
    $$P(X=r) = q^{r-1}p$$
첫 성공을 거두기 위해서 r보다 많은 수의 실행이 필요한 경우의 확률. 즉, r번 실패할 확률.
    $$P(X>r) = q^r$$
최소 r보다 적은 수의 실행이 필요한 경우의 확률. 즉, r번째 이전에 성공 확률.
    $$P(X \le r) = 1 - q^r$$
기하분포를 따른다는 __표기__. 즉, 성공 확률이 p일 때 X변수가 기하분포를 따른다는 표현식.
    $$X \sim Geo(p)$$
기하분포의 __기대치__. 기대치와 분산은 시도 횟수 `r`이 정해지지 않아도 구할 수 있다. \\(E(X)\\) 번 정도면 성공할 수 있다는 의미.
    $$E(X) = {1 \over p}$$
기하분포의 __분산__. 기대치와 분산은 시도 횟수 `r`이 정해지지 않아도 구할 수 있다. 성공확률이 `p`이면 \\(E(X)\\) 에서 평균 \\(Var(X)\\) 번 만끔 떨어져있다... 는 의미인 듯?
    $$Var(X) = {q \over p^2}$$
* __binomial distribution__ - 이항분포. 이항분포의 성립조건. 1. 일련의 독립시행이 발생. 2. 각 시행은 성공 아니면 실패, 그 확률은 항상 동일. 3. 시행의 수가 한정되어있다. (1,2번은 기하분포 조건과 같음). 이항분포의 관심은 __성공의 수__. [국문위키](http://ko.wikipedia.org/wiki/이항_분포)
    $$P(X=r) =  {^nC_r} \times p^r \times q^{n-r} = { n! \over { r! (n-r)!} } \times p^r \times q^{n-r}$$
이항분포를 따른 다는 표기. 각 시행에서 성공확률이 p이고, n이 시행회수일 때.
    $$X \sim B(n,p)$$
p가 0.5에 접근할 하면 분포의 형태는 좌우대칭이 되며 p가 0.5보다 작으면 오른쪽으로,  0.5이상이면 왼쪽으로 편향(skewed)된다.
기대치와 분산은 다음과 같다. n개의 시행은 독립시행이다. 이 기대치와 분산은 모든 이항분포에서 성립한다.
    $$E(X) = np$$
    $$Var(X) = npq$$
이항분포의 최빈값은 p, n의 값에 따라 다르다. p가 0.5이고 n이 짝수면 mode=np, p가 0.5이고 n이 홀수면 mode는 np의 양쪽 값. p가 0.5가 아닐 때는 직접 뒤져서 찾아야 한다.
* __Poisson distribution__ - 푸아송분포. 푸아송분포 성립조건. 1.개별적인 사건이 특정 구간(시간, 공간)에 임의로, 독립적으로 발생한다. 2. 사건발생 비율, 평균값을 알고 있다. 람다(\\(\lambda\\)라고 한다. \\(e\\)는 지수함수. [국문위키](http://ko.wikipedia.org/wiki/푸아송_분포)
    $$P(X=r) = { e^{-\lambda} \lambda^r \over r!}$$
푸아송 분포를 따른 다는 표현
    $$X \sim Po( \lambda )$$
기대값, 분포는 \\(\lambda\\)와 같다.
    $$E(X) = \lambda$$
    $$Var(X) = \lambda$$
푸아송 분포의 분포는 \\(\lambda\\) 가 작으면 오픈쪽으로 편향. 커지면 좌우대칭을 이룬다. \\(\lambda\\)가 정수면 \\(\lambda\\)와 \\(\lambda\\)-1 이 최빈값. \\(\lambda\\)가 정수가 아니면 최빈값은 \\(\lambda\\) 하나다.
* __푸아송 분포 사용 예__
  * 일정 주어진 시간 동안에 도착한 고객의  수
  * 1킬로미터 도로에 있는 흠집의 수
  * 일정 주어진 생산시간 동안 발생하는 불량의 수
  * 하룻동안 발생하는 출생자의 수
  * 어떤 시간 동안 톨게이트를 통과하는 차량의 수
  * 어떤 페이지 하나를 완성하는 데 발생하는 오타의 발생률
  * 어떤 특정량의 방사선을 DNA에 쬐였을때 발생하는 돌연변이의 수
  * 어떤 특정 면적의 다양한 종류의 나무가 섞여 자라는 삼림에서 소나무의 수
  * 어떤 특정 진도 이상의 지진이 발생하는 수
* 독립확률변수 X, Y에 대한 푸아송 분포. 즉, X, Y가 각각 푸아송 분포를 따르면 X+Y도 푸아송 분포를 따른다.
    $$X + Y \sim Po( \lambda_x + \lambda_y)$$
* 푸아송 분포는 __이항분포의 근사치__를 구하는 용도로도 쓰인다. n이 너무 크면 이항분포에서 \\(^nC_r\\)에서 \\(n!\\)를 구하기 어렵기 때문.
    $$E(X)에서 \lambda가 np와 비슷하고 $$
    $$Var(X)에서 \lambda가 npq와 비슷하면 $$
결국 n이 크고 p가 작으면
    $$X \sim B(n,p) \cong X \sim Po(np)$$

#### 정규분포 1
* __continuous probability distributions__ - 연속확률분포
* __normal distribution__ - 정규분포
* __continuous__ - 연속. 이산 데이터(discrete value)가 개수(counted)된 것이 아니라 측정(measured)된 것. 연속 데이터는 값들의 범위를 위한 확률을 계산해야 한다.
* __probability density function__ - 확률밀도함수. 일정 값들의 범위를 포괄하는 연속변수의 확률을 찾는데 사용하는 함수. 이 아래쪽의 면적을 구해야 확률이 나온다.


Example comment
-----------------


### albers
* 결국 __projection__이란 실좌표를 svg 내 좌표로 변환해주는 함수.  함수입니다.

### Pie
* __그리는 법__ - svg에 layout.pie()가 data인 `g`를 추가하고, 그안에 `d`속성이 svg.arc()인 `path`를 추가. svg>g>path.d
* `arc()`는 네가지 도형이 가능한다. 원(circle), 호(circular sector), 도너츠(annulus), 잘린 도너츠(annulus sector)