# Homework Problems

[Back to Chapter Contents](./Chapter%2010%20System-Level%20I%EF%BC%8FO.md)

## Homework 10.6 (*)

What is the output of the following program?

```c
#include "csapp.h"

int main() {
  int fd1, fd2;

  fd1 = Open("foo.txt", O_RDONLY, 0);
  fd2 = Open("bar.txt", O_RDONLY, 0);
  Close(fd2);
  fd2 = Open("baz.txt", O_RDONLY, 0);
  printf("fd2 = %d\n", fd2);
  exit(0);
}
```

## Homework 10.7 (*)

Modify the `cpfile` program in [Figure 10.5](./10.5%20Robust%20Reading%20and%20Writing%20with%20the%20RIO%20Package.md#Figure%2010.5) so that it uses the RIO functions to copy standard input to standard output, `MAXBUF` bytes at a time.

## Homework 10.8 (**)

Write a version of the `statcheck` program in [Figure 10.10](./10.6%20Reading%20File%20Metadata.md#Figure%2010.10), called `fstatcheck`, that takes a descriptor number on the command line rather than a filename.

## Homework 10.9 (**)

Consider the following invocation of the `fstatcheck` program from [Problem 10.8](#Homework%2010.8%20%28%2A%2A%29):

```console
linux> fstatcheck 3 < foo.txt
```

You might expect that this invocation of `fstatcheck` would fetch and display metadata for file `foo.txt`. However, when we run it on our system, it fails with a "bad file descriptor." Given this behavior, fill in the pseudocode that the shell must be executing between the `fork` and `execve` calls:

```c
if (Fork() == 0) { /* child */
  /* What code is the shell executing right here? */
  Execve("fstatcheck", argv, envp);
}
```

## Homework 10.10 (**)

Modify the `cpfile` program in [Figure 10.5](./10.5%20Robust%20Reading%20and%20Writing%20with%20the%20RIO%20Package.md#Figure%2010.5) so that it takes an optional command-line argument `infile`. If `infile` is given, then copy `infile` to standard output; otherwise, copy standard input to standard output as before. The twist is that your solution must use the original copy loop ([lines 9–11](10.5%20Robust%20Reading%20and%20Writing%20with%20the%20RIO%20Package.md#Figure%2010.5)) for both cases. You are only allowed to insert code, and you are not allowed to change any of the existing code.
