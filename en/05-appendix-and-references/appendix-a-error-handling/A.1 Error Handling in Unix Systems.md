# A.1 Error Handling in Unix Systems

[Back to Appendix Contents](./Appendix%20A%20Error%20Handling.md)

The systems-level function calls that we will encounter in this book use three different styles for returning errors: Unix-style, Posix-style, and GAI-style.

## Unix-Style Error Handling

Functions such as `fork` and `wait` that were developed in the early days of Unix (as well as some older Posix functions) overload the function return value with both error codes and useful results. For example, when the Unix-style `wait` function encounters an error (e.g., there is no child process to reap), it returns `-1` and sets the global variable `errno` to an error code that indicates the cause of the error. If `wait` completes successfully, then it returns the useful result, which is the PID of the reaped child. Unix-style error-handling code is typically of the following form:

```c
if ((pid = wait(NULL)) < 0) {
  fprintf(stderr, "wait error: %s\n", strerror(errno));
  exit(0);
}
```

The `strerror` function returns a text description for a particular value of `errno`.

## Posix-Style Error Handling

Many of the newer Posix functions such as Pthreads use the return value only to indicate success (zero) or failure (nonzero). Any useful results are returned in function arguments that are passed by reference. We refer to this approach as Posix-style error handling. For example, the Posix-style `pthread_create` function indicates success or failure with its return value and returns the ID of the newly created thread (the useful result) by reference in its first argument. Posix-style error-handling code is typically of the following form:

```c
if ((retcode = pthread_create(&tid, NULL, thread, NULL)) != 0) {
  fprintf(stderr, "pthread_create error: %s\n", strerror(retcode));
  exit(0);
}
```

The `strerror` function returns a text description for a particular value of `retcode`.

## GAI-Style Error Handling

The `getaddrinfo` (GAI) and `getnameinfo` functions return zero on success and a nonzero value on failure. GAI error-handling code is typically of the following form:

```c
if ((retcode = getaddrinfo(host, service, &hints, &result)) != 0) {
  fprintf(stderr, "getaddrinfo error: %s\n", gai_strerror(retcode));
  exit(0);
}
```

The `gai_strerror` function returns a text description for a particular value of `retcode`.

## Summary of Error-Reporting Functions

Throughout this book, we use the following error-reporting functions to accommodate different error-handling styles:

```c
#include "csapp.h"

void unix_error(char* msg);
void posix_error(int code, char* msg);
void gai_error(int code, char* msg);
void app_error(char* msg);
```

Returns: nothing

As their names suggest, the `unix_error`, `posix_error`, and `gai_error` functions report Unix-style, Posix-style, and GAI-style errors and then terminate. The `app_error` function is included as a convenience for application errors. It simply prints its input and then terminates. [Figure A.1](#Figure%20A.1) shows the code for the error-reporting functions.

### Figure A.1

```c
void unix_error(char* msg) /* Unix-style error */
{
  fprintf(stderr, "%s: %s\n", msg, strerror(errno));
  exit(0);
}

void posix_error(int code, char* msg) /* Posix-style error */
{
  fprintf(stderr, "%s: %s\n", msg, strerror(code));
  exit(0);
}

void gai_error(int code, char* msg) /* Getaddrinfo-style error */
{
  fprintf(stderr, "%s: %s\n", msg, gai_strerror(code));
  exit(0);
}

void app_error(char* msg) /* Application error */
{
  fprintf(stderr, "%s\n", msg);
  exit(0);
}
```

Figure A.1 Error-reporting functions.
