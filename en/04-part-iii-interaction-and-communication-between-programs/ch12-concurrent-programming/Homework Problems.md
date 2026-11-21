# Homework Problems

[Back to Chapter Contents](./Chapter%2012%20Concurrent%20Programming.md)

## Homework 12.16 (*)

Write a version of hello.c ([Figure 12.13](./12.3%20Concurrent%20Programming%20with%20Threads.md#figure-12-13) ) that creates and reaps n joinable peer threads, where n is a command-line argument.

## Homework 12.17 (*)

A. The program in [Figure 12.46](#figure-12-46) has a bug. The thread is supposed to sleep for 1 second and then print a string. However, when we run it on our system, nothing prints. Why?

B. You can fix this bug by replacing the exit function in [line 10](#figure-12-46) with one of two different Pthreads function calls. Which ones?

-code/conc/hellobug.c

### Figure 12.46

```c
/* WARNING: This code is buggy! */
#include "csapp.h"
void* thread(void* vargp);

int main() {
  pthread_t tid;

  Pthread_create(&tid, NULL, thread, NULL);
  exit(0);
}

/* Thread routine */
void* thread(void* vargp) {
  Sleep(1);
  printf("Hello, world!\n");
  return NULL;
}
```

Figure 12.46 Buggy program for Problem 12.17.

## Homework 12.18 (*)

Using the progress graph in [Figure 12.21](./12.5%20Synchronizing%20Threads%20with%20Semaphores.md#Figure%2012.21), classify the following trajectories as either safe or unsafe.

$$
\begin{array}{l}
\mathrm{A.}\ H_2, L_2, U_2, H_1, L_1, S_2, U_1, S_1, T_1, T_2 \\
\mathrm{B.}\ H_2, H_1, L_1, U_1, S_1, L_2, T_1, U_2, S_2, T_2 \\
\mathrm{C.}\ H_1, L_1, H_2, L_2, U_2, S_2, U_1, S_1, T_1, T_2
\end{array}
$$

## Homework 12.19 (**)

The solution to the first readers-writers problem in [Figure 12.26](./12.5%20Synchronizing%20Threads%20with%20Semaphores.md#figure-12-26) gives a somewhat weak priority to readers because a writer leaving its critical section might restart a waiting writer instead of a waiting reader. Derive a solution that gives stronger priority to readers, where a writer leaving its critical section will always restart a waiting reader if one exists.

## Homework 12.20 (\*\*\*)

Consider a simpler variant of the readers-writers problem where there are at most N readers. Derive a solution that gives equal priority to readers and writers, in the sense that pending readers and writers have an equal chance of being granted access to the resource. Hint: You can solve this problem using a single counting semaphore and a single mutex.

## Homework 12.21 (\*\*\*\*)

Derive a solution to the second readers-writers problem, which favors writers instead of readers.

## Homework 12.22 (**)

Test your understanding of the `select` function by modifying the server in [Figure 12.6](./12.2%20Concurrent%20Programming%20with%20I%EF%BC%8FO%20Multiplexing.md#figure-12-6) so that it echoes at most one text line per iteration of the main server loop.

## Homework 12.23 (**)

The event-driven concurrent echo server in [Figure 12.8](./12.2%20Concurrent%20Programming%20with%20I%EF%BC%8FO%20Multiplexing.md#figure-12-8) is flawed because a malicious client can deny service to other clients by sending a partial text line. Write an improved version of the server that can handle these partial text lines without blocking.

## Homework 12.24 (*)

The functions in the RIO I/O package ([Section 10.5](../ch10-system-level-io/10.5%20Robust%20Reading%20and%20Writing%20with%20the%20RIO%20Package.md#10.5%20Robust%20Reading%20and%20Writing%20with%20the%20RIO%20Package)) are thread-safe. Are they reentrant as well?

## Homework 12.25 (*)

In the prethreaded concurrent echo server in [Figure 12.28](./12.5%20Synchronizing%20Threads%20with%20Semaphores.md#Figure%2012.28), each thread calls the `echo_cnt` function ([Figure 12.29](./12.5%20Synchronizing%20Threads%20with%20Semaphores.md#Figure%2012.29)). Is `echo_cnt` thread-safe? Is it reentrant? Why or why not?

## Homework 12.26 (\*\*\*)

Use the lock-and-copy technique to implement a thread-safe non-reentrant version of `gethostbyname` called `gethostbyname_ts`. A correct solution will use a deep copy of the `hostent` structure protected by a mutex.

## Homework 12.27 (**)

Some network programming texts suggest the following approach for reading and writing sockets: Before interacting with the client, open two standard I/O streams on the same open connected socket descriptor, one for reading and one for writing:

```c
FILE *fpin, *fpout;

fpin = fdopen(sockfd, "r");
fpout = fdopen(sockfd, "w");
```

When the server finishes interacting with the client, close both streams as follows:

```c
fclose(fpin);
fclose(fpout);
```

However, if you try this approach in a concurrent server based on threads, you will create a deadly race condition. Explain.

## Homework 12.28 (*)

In [Figure 12.45](./12.7%20Other%20Concurrency%20Issues.md#figure-12-45), does swapping the order of the two V operations have any effect on whether or not the program deadlocks? Justify your answer by drawing the progress graphs for the four possible cases:

<table>
<tr><td colspan="2">Case 1</td><td colspan="2">Case 2</td><td colspan="2">Case 3</td><td colspan="2">Case 4</td></tr>
<tr><td>Thread 1</td><td>Thread 2</td><td>Thread 1</td><td>Thread 2</td><td>Thread 1</td><td>Thread 2</td><td>Thread 1</td><td>Thread 2</td></tr>
<tr><td>P(s)</td><td>P(s)</td><td>P(s)</td><td>P(s)</td><td>P(s)</td><td>P(s)</td><td>P(s)</td><td>P(s)</td></tr>
<tr><td>P(t)</td><td>P(t)</td><td>P(t)</td><td>P(t)</td><td>P(t)</td><td>P(t)</td><td>P(t)</td><td>P(t)</td></tr>
<tr><td>V(s)</td><td>V(s)</td><td>V(s)</td><td>V(t)</td><td>V(t)</td><td>V(s)</td><td>V(t)</td><td>V(t)</td></tr>
<tr><td>V(t)</td><td>V(t)</td><td>V(t)</td><td>V(s)</td><td>V(s)</td><td>V(t)</td><td>V(s)</td><td>V(s)</td></tr>
</table>

## Homework 12.29 (*)

Can the following program deadlock? Why or why not?

```text
Initially: a = 1, b = 1, c = 1.

Thread 1:       Thread 2:
P(a);           P(c);
P(b);           P(b);
V(b);           V(b);
P(c);           V(c);
V(c);
V(a);
```

## Homework 12.30 (*)

Consider the following program that deadlocks.

```text
Initially: a = 1, b = 1, c = 1.

Thread 1:       Thread 2:       Thread 3:
P(a);           P(c);           P(c);
P(b);           P(b);           V(c);
V(b);           V(b);           P(b);
P(c);           V(c);           P(a);
V(c);           P(a);           V(a);
V(a);           V(a);           V(b);
```

A. For each thread, list the pairs of mutexes that it holds simultaneously.

B. If a < b < c, which threads violate the mutex lock ordering rule?

C. For these threads, show a new lock ordering that guarantees freedom from deadlock.

## Homework 12.31 (\*\*\*)

Implement a version of the standard I/O `fgets` function, called tfgets, that times out and returns NULL if it does not receive an input line on standard input within 5 seconds. Your function should be implemented in a package called tfgets-proc.c using processes, signals, and nonlocal jumps. It should not use the Linux `alarm` function. Test your solution using the driver program in [Figure 12.47](#figure-12-47).

### Figure 12.47

```c
#include "csapp.h"

char* tfgets(char* s, int size, FILE* stream);

int main()
{
  char buf[MAXLINE];

  if (tfgets(buf, MAXLINE, stdin) == NULL)
    printf("BOOM!\n");
  else
    printf("%s", buf);

  exit(0);
}
```

Figure 12.47 Driver program for [Problems 12.31](#homework-12-31)–12.33.

## Homework 12.32 (\*\*\*)

Implement a version of the `tfgets` function from [Problem 12.31](#homework-12-31) that uses the `select` function. Your function should be implemented in a package called `tfgets-select.c`. Test your solution using the driver program from [Problem 12.31](#homework-12-31). You may assume that standard input is assigned to descriptor 0.

## Homework 12.33 (\*\*\*)

Implement a threaded version of the tfgets function from [Problem 12.31](#homework-12-31). Your function should be implemented in a package called tfgets-thread.c. Test your solution using the driver program from [Problem 12.31](#homework-12-31).

## Homework 12.34 (\*\*\*)

Write a parallel threaded version of an $N \times M$ matrix multiplication kernel. Compare the performance to the sequential case.

## Homework 12.35 (\*\*\*)

Implement a concurrent version of the TINY Web server based on processes. Your solution should create a new child process for each new connection request. Test your solution using a real Web browser.

## Homework 12.36 (\*\*\*)

Implement a concurrent version of the TINY Web server based on I/O multiplexing. Test your solution using a real Web browser.

## Homework 12.37 (\*\*\*)

Implement a concurrent version of the TINY Web server based on threads. Your solution should create a new thread for each new connection request. Test your solution using a real Web browser.

## Homework 12.38 (\*\*\*\*)

Implement a concurrent prethreaded version of the TINY Web server. Your solution should dynamically increase or decrease the number of threads in response to the current load. One strategy is to double the number of threads when the buffer becomes full, and halve the number of threads when the buffer becomes empty. Test your solution using a real Web browser.

## Homework 12.39 (\*\*\*\*)

A Web proxy is a program that acts as a middleman between a Web server and browser. Instead of contacting the server directly to get a Web page, the browser contacts the proxy, which forwards the request to the server. When the server replies to the proxy, the proxy sends the reply to the browser. For this lab, you will write a simple Web proxy that filters and logs requests:

A. In the first part of the lab, you will set up the proxy to accept requests, parse the HTTP, forward the requests to the server, and return the results to the browser. Your proxy should log the URLs of all requests in a log file on disk, and it should also block requests to any URL contained in a filter file on disk.

B. In the second part of the lab, you will upgrade your proxy to deal with multiple open connections at once by spawning a separate thread to handle each request. While your proxy is waiting for a remote server to respond to a request so that it can serve one browser, it should be working on a pending request from another browser.

Check your proxy solution using a real Web browser.
