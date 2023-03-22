# design-ui

## TypeScript

### 高级类型

#### Partial

把某个接口类型中定义的属性变成可选的 Optional

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
}
```

#### Omit

https://www.jianshu.com/p/fc10a22fec6e
在Type中选取所有的属性值，然后移除属性名在Keys中的属性值

```ts
// keyof any is string | number | symbol
type Omit<T, K extends keyof any> = {
  [P in Exclude<keyof T, K>]: T[P];
}
```