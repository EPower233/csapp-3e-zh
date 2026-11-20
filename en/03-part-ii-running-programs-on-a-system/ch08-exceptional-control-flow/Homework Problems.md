# Homework Problems

[Back to Chapter Contents](./Chapter%208%20Exceptional%20Control%20Flow.md)

## Homework 8.9 (*)

Consider four processes with the following starting and ending times:

| Process | Start time | End time |
| --- | --- | --- |
| A | 5 | 7 |
| B | 2 | 4 |
| C | 3 | 6 |
| D | 1 | 8 |

For each pair of processes, indicate whether they run concurrently (Y) or not (N):

| Process pair | Concurrent? |
| --- | --- |
| AB | |
| AC | |
| AD | |
| BC | |
| BD | |
| CD | |

## Homework 8.10 (*)

In this chapter, we have introduced some functions with unusual call and return behaviors: `setjmp`, `longjmp`, `execve`, and `fork`. Match each function with one of the following behaviors:

A. Called once, returns twice

B. Called once, never returns

C. Called once, returns one or more times

## Homework 8.11 (*)

How many "hello" output lines does this program print?

```c
#include "csapp.h"

int main()
{
    int i;

    for (i = 0; i < 2; i++)
        Fork();
    printf("hello\n");
    exit(0);
}
```

## Homework 8.12 (*)

How many "hello" output lines does this program print?

```c
#include "csapp.h"

void doit()
{
    Fork();
    Fork();
    printf("hello\n");
    return;
}

int main()
{
    doit();
    printf("hello\n");
    exit(0);
}
```

## Homework 8.13 (*)

What is one possible output of the following program?

```c
#include "csapp.h"

int main()
{
    int x = 3;

    if (Fork() != 0)
        printf("x=%d\n", ++x);

    printf("x=%d\n", --x);
    exit(0);
}
```

## Homework 8.14 (*)

How many "hello" output lines does this program print?

```c
#include "csapp.h"

void doit()
{
    if (Fork() == 0) {
        Fork();
        printf("hello\n");
        exit(0);
    }
    return;
}

int main()
{
    doit();
    printf("hello\n");
    exit(0);
}
```

## Homework 8.15 (*)

How many "hello" lines does this program print?

```c
#include "csapp.h"

void doit()
{
    if (Fork() == 0) {
        Fork();
        printf("hello\n");
        return;
    }
    return;
}

int main()
{
    doit();
    printf("hello\n");
    exit(0);
}
```

## Homework 8.16 (*)

What is the output of the following program?

```c
#include "csapp.h"
int counter = 1;

int main()
{
    if (fork() == 0) {
        counter--;
        exit(0);
    }
    else {
        Wait(NULL);
        printf("counter = %d\n", ++counter);
    }
    exit(0);
}
```

## Homework 8.17 (*)

Enumerate all of the possible outputs of the program in [Practice Problem 8.4](./8.4%20Process%20Control.md#Practice%20Problem%208.4).

## Homework 8.18 (**)

Consider the following program:

```c
#include "csapp.h"

void end(void)
{
    printf("2"); fflush(stdout);
}

int main()
{
    if (Fork() == 0)
        atexit(end);
    if (Fork() == 0) {
        printf("0"); fflush(stdout);
    }
    else {
        printf("1"); fflush(stdout);
    }
    exit(0);
}
```

Determine which of the following outputs are possible. **Note:** The `atexit` function takes a pointer to a function and adds it to a list of functions (initially empty) that will be called when the `exit` function is called.

A. 112002　　B. 211020　　C. 102120　　D. 122001　　E. 100212

## Homework 8.19 (**)

How many lines of output does the following function print? Give your answer as a function of $n$. Assume $n \ge 1$.

```c
void foo(int n)
{
    int i;

    for (i = 0; i < n; i++)
        Fork();
    printf("hello\n");
    exit(0);
}
```

## Homework 8.20 (**)

Use `execve` to write a program called `myls` whose behavior is identical to the `/bin/ls` program. Your program should accept the same command-line arguments, interpret the identical environment variables, and produce the identical output.

The `ls` program gets the width of the screen from the `COLUMNS` environment variable. If `COLUMNS` is unset, then `ls` assumes that the screen is 80 columns wide. Thus, you can check your handling of the environment variables by setting the `COLUMNS` environment to something less than 80:

```console
linux> setenv COLUMNS 40
linux> ./myls
        // Output is 40 columns wide
linux> unsetenv COLUMNS
linux> ./myls
        // Output is now 80 columns wide
```

## Homework 8.21 (**)

What are the possible output sequences from the following program?

```c
int main()
{
    if (fork() == 0) {
        printf("a"); fflush(stdout);
        exit(0);
    }
    else {
        printf("b"); fflush(stdout);
        waitpid(-1, NULL, 0);
    }
    printf("c"); fflush(stdout);
    exit(0);
}
```

## Homework 8.22 (***)

Write your own version of the Unix `system` function

```c
int mysystem(char *command);
```

The `mysystem` function executes `command` by invoking `/bin/sh -c command`, and then returns after `command` has completed. If `command` exits normally (by calling the `exit` function or executing a `return` statement), then `mysystem` returns the `command` exit status. For example, if `command` terminates by calling `exit(8)`, then `mysystem` returns the value 8. Otherwise, if `command` terminates abnormally, then `mysystem` returns the status returned by the shell.

## Homework 8.23 (***)

One of your colleagues is thinking of using signals to allow a parent process to count events that occur in a child process. The idea is to notify the parent each time an event occurs by sending it a signal and letting the parent's signal handler increment a global `counter` variable, which the parent can then inspect after the child has terminated. However, when he runs the test program in [Figure 8.45](#Figure%208.45) on his system, he discovers that when the parent calls `printf`, `counter` always has a value of 2, even though the child has sent five signals to the parent. Perplexed, he comes to you for help. Can you explain the bug?

### Figure 8.45

```c
#include "csapp.h"

int counter = 0;

void handler(int sig)
{
    counter++;
    sleep(1); /* Do some work in the handler */
    return;
}

int main()
{
    int i;

    Signal(SIGUSR2, handler);

    if (Fork() == 0) {  /* Child */
        for (i = 0; i < 5; i++) {
            Kill(getppid(), SIGUSR2);
            printf("sent SIGUSR2 to parent\n");
        }
        exit(0);
    }

    Wait(NULL);
    printf("counter=%d\n", counter);
    exit(0);
}
```

Figure 8.45 Counter program referenced in Problem 8.23.

## Homework 8.24 (***)

Modify the program in [Figure 8.18](./8.4%20Process%20Control.md#Figure%208.18) so that the following two conditions are met:

1. Each child terminates abnormally after attempting to write to a location in the read-only text segment.

2. The parent prints output that is identical (except for the PIDs) to the following:

```console
child 12255 terminated by signal 11: Segmentation fault
child 12254 terminated by signal 11: Segmentation fault
```

Hint: Read the man page for `psignal(3)`.

## Homework 8.25 (***)

Write a version of the `fgets` function, called `tfgets`, that times out after 5 seconds. The `tfgets` function accepts the same inputs as `fgets`. If the user doesn't type an input line within 5 seconds, `tfgets` returns `NULL`. Otherwise, it returns a pointer to the input line.

## Homework 8.26 (***)

Using the example in [Figure 8.23](./8.4%20Process%20Control.md#Figure%208.23) as a starting point, write a shell program that supports job control. Your shell should have the following features:

- The command line typed by the user consists of a `name` and zero or more arguments, all separated by one or more spaces. If `name` is a built-in command, the shell handles it immediately and waits for the next command line. Otherwise, the shell assumes that `name` is an executable file, which it loads and runs in the context of an initial child process (job). The process group ID for the job is identical to the PID of the child.

- Each job is identified by either a process ID (PID) or a job ID (JID), which is a small arbitrary positive integer assigned by the shell. JIDs are denoted on the command line by the prefix `%`. For example, `%5` denotes JID 5, and `5` denotes PID 5.

- If the command line ends with an ampersand, then the shell runs the job in the background. Otherwise, the shell runs the job in the foreground.

- Typing Ctrl+C (Ctrl+Z) causes the kernel to send a `SIGINT` (`SIGTSTP`) signal to your shell, which then forwards it to every process in the foreground process group.[^ch8-shell-note]

- The `jobs` built-in command lists all background jobs.

- The `bg job` built-in command restarts `job` by sending it a `SIGCONT` signal and then runs it in the background. The `job` argument can be either a PID or a JID.

- The `fg job` built-in command restarts `job` by sending it a `SIGCONT` signal and then runs it in the foreground.

- The shell reaps all of its zombie children. If any job terminates because it receives a signal that was not caught, then the shell prints a message to the terminal with the job's PID and a description of the offending signal.

[Figure 8.46](#Figure%208.46) shows an example shell session.

### Figure 8.46

```console
linux> ./shell                               # Run your shell program
> bogus
bogus: Command not found.                    # Execve can't find executable
> foo 10
Job 5035 terminated by signal: Interrupt     # User types Ctrl+C
> foo 100 &
[1] 5036 foo 100 &
> foo 200 &
[2] 5037 foo 200 &
> jobs
[1] 5036 Running   foo 100 &
[2] 5037 Running   foo 200 &
> fg %1
Job [1] 5036 stopped by signal: Stopped      # User types Ctrl+Z
> jobs
[1] 5036 Stopped   foo 100 &
[2] 5037 Running   foo 200 &
> bg 5035
5035: No such process
> bg 5036
[1] 5036 foo 100 &
> /bin/kill 5036
Job 5036 terminated by signal: Terminated
> fg %2                                      # Wait for fg job to finish
> quit
linux>                                       # Back to the Unix shell
```

Figure 8.46 Example shell session for [Homework Problem 8.26](#Homework%208.26%20%28%2A%2A%2A%29).

[^ch8-shell-note]: Note that this is a simplification of the way that real shells work. With real shells, the kernel responds to Ctrl+C (Ctrl+Z) by sending `SIGINT` (`SIGTSTP`) directly to each process in the terminal foreground process group. The shell manages the membership of this group using the `tcsetpgrp` function, and manages the attributes of the terminal using the `tcsetattr` function, both of which are outside the scope of this book. See [\[62\]](../../05-appendix-and-references/References.md#ref-62) for details.
