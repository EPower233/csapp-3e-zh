# A.2 Error-Handling Wrappers

[Back to Appendix Contents](./Appendix%20A%20Error%20Handling.md)

Here are some examples of the different error-handling wrappers.

- **Unix-style error-handling wrappers.** **Figure A.2** shows the wrapper for the Unix-style `wait` function. If `wait` returns with an error, the wrapper prints an informative message and then exits. Otherwise, it returns a PID to the caller. **Figure A.3** shows the wrapper for the Unix-style `kill` function. Notice that this function, unlike `wait`, returns `void` on success.

```c
pid_t Wait(int *status)
{
    pid_t pid;

    if ((pid = wait(status)) < 0)
        unix_error("Wait error");
    return pid;
}
```

Figure A.2 Wrapper for Unix-style `wait` function.

```c
void Kill(pid_t pid, int signum)
{
    int rc;

    if ((rc = kill(pid, signum)) < 0)
        unix_error("Kill error");
}
```

Figure A.3 Wrapper for Unix-style `kill` function.

- **Posix-style error-handling wrappers.** **Figure A.4** shows the wrapper for the Posix-style `pthread_detach` function. Like most Posix-style functions, it does not overload useful results with error-return codes, so the wrapper returns `void` on success.

```c
void Pthread_detach(pthread_t tid)
{
    int rc;

    if ((rc = pthread_detach(tid)) != 0)
        posix_error(rc, "Pthread_detach error");
}
```

Figure A.4 Wrapper for Posix-style `pthread_detach` function.

- **GAI-style error-handling wrappers.** **Figure A.5** shows the error-handling wrapper for the GAI-style `getaddrinfo` function.

```c
void Getaddrinfo(const char *node, const char *service,
                 const struct addrinfo *hints, struct addrinfo **res)
{
    int rc;

    if ((rc = getaddrinfo(node, service, hints, res)) != 0)
        gai_error(rc, "Getaddrinfo error");
}
```

Figure A.5 Wrapper for GAI-style `getaddrinfo` function.
