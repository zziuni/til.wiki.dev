# algorithms
[Visualog](http://www.comp.nus.edu.sg/~stevenha/visualization/index.html) 사이트로 공부한 내용 정리.

## Sorting

### bubble
next하고만 비교하면서 sort하는 방법.

- swapped를 false로 하고, data.length로 interation
- 바로 옆하고 비교하면서(swap) 전체를 loop 돈다. 전체가 소트 될 때까지.
- loop를 돌 때, 한번도 swap이 일어나지 않으면 sort가 끝난걸로 보로 종료한다.
- 하지만, 이상값이 한쪽에 치우쳐있으면 sort가 완료될 때 까지 loop를 계속 돌아야 한다.

```js
var swapped = false;
do {
  swapped = false;
  for e in elements {
    if( leftElement > rightElement) {
      swap(leftElement, rightElement);
      swapped = true;
    }
  }
}while(swapped)
```

### selection
최소값을 찾아가면서 차례로 sort하는 방법

- first unsorted elements의 수 만큼 iteration을 돈다.
- iteration에서 최소값(minium)으로 첫 원소를 지정한다.
- 이제 진짜 minum을 찾는다.
- 현재 최소값과 원소값을 비교하면서 iteration을 돈다.
- 더 작은 값을 찾으면 최소값으로 지정한다.
- 최소값을 first unsorted position과 swap한다.

```js
repeat (numOfElements - 1) times
  set the first unsorted element as the minimum
  for each of the unsorted elements
    if element < currentMinimum
      set element as new minimum
  swap minimum with first unsorted position


var data = [...];
var s = 0;
var min;
while(s< data.length){
  min = s;
  for(var i = s; i < data.length; i++){
    if(data[i] < data[min]) {
      min = i;
    }
  }
  swap(min, s);
  s++;
}
```

### insertion
차례로 하나씩 뽑아서 sorted해가는 방법.

- data[0]를 sorted 로 설정한다.
- unsorted first element를 추출한다.
- sorted iteration을 돌면서 추출한 것과 last sorted element를 비교한다.
- 하나씩 shift move하면서 적절한 자리를 찾는다.

```
mark first element as sorted
for each unsorted element
  'extract' the element
  for i = lastSortedIndex to 0
    if currentSortedElement > extractedElement
      move sorted element to the right by 1
    else: insert extracted element
```


### merge
```
split each element into partitions of size 1
recursively merge adjancent partitions
  for i = leftPartStartIndex to rightPartLastIndex inclusive
    if leftPartHeadValue <= rightPartHeadValue
      copy leftPartHeadValue
    else: copy rightPartHeadValue
copy elements back to original array
```




