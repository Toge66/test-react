# test-react
react新功能测试

react16 的render中可以返回数组

```
render() {
 return [
  "Some text.",
  <h2 key="heading-1">A heading</h2>,
  "More text.",
  <h2 key="heading-2">Another heading</h2>,
  "Even more text."
 ];
}
```

16.2 有了`Fragment`组件弥补返回数组的弊端

+ Children in an array must be separated by commas.     每个元素要用逗号分隔
+ Children in an array must have a key to prevent React’s key warning.    每个元素要有一个React‘s key
+ Strings must be wrapped in quotes.    字符串要有引号包括

```
render() {
  return (
    <Fragment>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Another heading</h2>
      Even more text.
    </Fragment>
  );
}
```