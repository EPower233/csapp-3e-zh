# Solutions to Practice Problems

[Back to Chapter Contents](./Chapter%2010%20System-Level%20I%EF%BC%8FO.md)

## Solution 10.1

Unix processes begin life with open descriptors assigned to `stdin` (descriptor 0), `stdout` (descriptor 1), and `stderr` (descriptor 2). The `open` function always returns the lowest unopened descriptor, so the first call to `open` returns descriptor 3. The call to the `close` function frees up descriptor 3. The final call to `open` returns descriptor 3, and thus the output of the program is "`fd2 = 3`".

## Solution 10.2

The descriptors `fd1` and `fd2` each have their own open file table entry, so each descriptor has its own file position for `foobar.txt`. Thus, the read from `fd2` reads the first byte of `foobar.txt`, and the output is

```text
c = f
```

and not

```text
c = o
```

as you might have thought initially.

## Solution 10.3

Recall that the child inherits the parent's descriptor table and that all processes share the same open file table. Thus, the descriptor `fd` in both the parent and child points to the same open file table entry. When the child reads the first byte of the file, the file position increases by 1. Thus, the parent reads the second byte, and the output is

```text
c = o
```

## Solution 10.4

To redirect standard input (descriptor 0) to descriptor 5, we would call `dup2(5, 0)`, or equivalently, `dup2(5, STDIN_FILENO)`.

## Solution 10.5

At first glance, you might think the output would be

```text
c = f
```

but because we are redirecting `fd1` to `fd2`, the output is really

```text
c = o
```
