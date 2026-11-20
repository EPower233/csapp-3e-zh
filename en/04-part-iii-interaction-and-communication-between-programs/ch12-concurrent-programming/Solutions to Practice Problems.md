# Solutions to Practice Problems

[Back to Chapter Contents](./Chapter%2012%20Concurrent%20Programming.md)

## Solution 12.1

When the parent forks the child, it gets a copy of the connected descriptor, and the reference count for the associated file table is incremented from 1 to 2. When the parent closes its copy of the descriptor, the reference count is decremented from 2 to 1. Since the kernel will not close a file until the reference counter in its file table goes to 0, the child's end of the connection stays open.

## Solution 12.2

When a process terminates for any reason, the kernel closes all open descriptors. Thus, the child's copy of the connected file descriptor will be closed automatically when the child exits.

## Solution 12.3

Recall that a descriptor is ready for reading if a request to read 1 byte from that descriptor would not block. If EOF becomes true on a descriptor, then the descriptor is ready for reading because the read operation will return immediately with a zero return code indicating EOF. Thus, typing Ctrl+D causes the `select` function to return with descriptor 0 in the ready set.

## Solution 12.4

We reinitialize the `pool.ready_set` variable before every call to `select` because it serves as both an input and output argument. On input, it contains the read set. On output, it contains the ready set.

## Solution 12.5

Since threads run in the same process, they all share the same descriptor table. No matter how many threads use the connected descriptor, the reference count for the connected descriptor's file table is equal to 1. Thus, a single `close` operation is sufficient to free the memory resources associated with the connected descriptor when we are through with it.

## Solution 12.6

The main idea here is that stack variables are private, whereas global and static variables are shared. Static variables such as cnt are a little tricky because the sharing is limited to the functions within their scope—in this case, the thread routine.

A. Here is the table:

<table>
  <thead>
    <tr><th rowspan="2">Variable instance</th><th colspan="3" scope="colgroup">Referenced by</th></tr>
    <tr><th scope="col">main thread</th><th scope="col">peer thread 0</th><th scope="col">peer thread 1</th></tr>
  </thead>
  <tbody>
    <tr><td>`ptr`</td><td>yes</td><td>yes</td><td>yes</td></tr>
    <tr><td>`cnt`</td><td>no</td><td>yes</td><td>yes</td></tr>
    <tr><td>`i.m`</td><td>yes</td><td>no</td><td>no</td></tr>
    <tr><td>`msgs.m`</td><td>yes</td><td>yes</td><td>yes</td></tr>
    <tr><td>`myid.p0`</td><td>no</td><td>yes</td><td>no</td></tr>
    <tr><td>`myid.p1`</td><td>no</td><td>no</td><td>yes</td></tr>
  </tbody>
</table>

Notes:

- `ptr`: A global variable that is written by the main thread and read by the peer threads.

- `cnt`: A static variable with only one instance in memory that is read and written by the two peer threads.

- `i.m`: A local automatic variable stored on the stack of the main thread. Even though its value is passed to the peer threads, the peer threads never reference it on the stack, and thus it is not shared.

- `msgs.m`: A local automatic variable stored on the main thread's stack and referenced indirectly through ptr by both peer threads.

- `myid.p0` and `myid.p1`: Instances of a local automatic variable residing on the stacks of peer threads 0 and 1, respectively.

B. Variables `ptr`, `cnt`, and `msgs` are referenced by more than one thread and thus are shared.

## Solution 12.7

The important idea here is that you cannot make any assumptions about the ordering that the kernel chooses when it schedules your threads.

| Step | Thread | Instr. | $\%\mathrm{rdx}_1$ | $\%\mathrm{rdx}_2$ | `cnt` |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 | $H_1$ | - | - | 0 |
| 2 | 1 | $L_1$ | 0 | - | 0 |
| 3 | 2 | $H_2$ | - | - | 0 |
| 4 | 2 | $L_2$ | - | 0 | 0 |
| 5 | 2 | $U_2$ | - | 1 | 0 |
| 6 | 2 | $S_2$ | - | 1 | 1 |
| 7 | 1 | $U_1$ | 1 | - | 1 |
| 8 | 1 | $S_1$ | 1 | - | 1 |
| 9 | 1 | $T_1$ | 1 | - | 1 |
| 10 | 2 | $T_2$ | - | 1 | 1 |

Variable `cnt` has a final incorrect value of 1.

## Solution 12.8

This problem is a simple test of your understanding of safe and unsafe trajectories in progress graphs. Trajectories such as A and C that skirt the critical region are safe and will produce correct results.

A. $H_{1}, L_{1}, U_{1}, S_{1}, H_{2}, L_{2}, U_{2}, S_{2}, T_{2}, T_{1}$: safe B. $H_{2}, L_{2}, H_{1}, L_{1}, U_{1}, S_{1}, T_{1}, U_{2}, S_{2}, T_{2}$: unsafe C. $H_{1}, H_{2}, L_{2}, U_{2}, S_{2}, L_{1}, U_{1}, S_{1}, T_{1}, T_{2}$: safe

## Solution 12.9

A. p = 1, c = 1, n > 1: Yes, the mutex semaphore is necessary because the producer and consumer can concurrently access the buffer.

B. p = 1, c = 1, n = 1: No, the mutex semaphore is not necessary in this case, because a nonempty buffer is equivalent to a full buffer. When the buffer contains an item, the producer is blocked. When the buffer is empty, the consumer is blocked.

So at any point in time, only a single thread can access the buffer, and thus mutual exclusion is guaranteed without using the mutex.

C. p > 1, c > 1, n = 1: No, the mutex semaphore is not necessary in this case either, by the same argument as the previous case.

## Solution 12.10

Suppose that a particular semaphore implementation uses a LIFO stack of threads for each semaphore. When a thread blocks on a semaphore in a P operation, its ID is pushed onto the stack. Similarly, the V operation pops the top thread ID from the stack and restarts that thread. Given this stack implementation, an adversarial writer in its critical section could simply wait until another writer blocks on the semaphore before releasing the semaphore. In this scenario, a waiting reader might wait forever as two writers passed control back and forth.

Notice that although it might seem more intuitive to use a FIFO queue rather than a LIFO stack, using such a stack is not incorrect and does not violate the semantics of the P and V operations.

## Solution 12.11


This problem is a simple sanity check of your understanding of speedup and parallel efficiency:

| Threads ($t$) | 1 | 2 | 4 |
| --- | --- | --- | --- |
| Cores ($p$) | 1 | 2 | 4 |
| Running time ($T_p$) | 12 | 8 | 6 |
| Speedup ($S_p$) | 1 | 1.5 | 2 |
| Efficiency ($E_p$) | 100% | 75% | 50% |

## Solution 12.12

The `ctime_ts` function is not reentrant, because each invocation shares the same static variable returned by the `ctime` function. However, it is thread-safe because the accesses to the shared variable are protected by $P$ and $V$ operations, and thus are mutually exclusive.

## Solution 12.13

If we free the block immediately after the call to `pthread_create` in [line 14](12.7%20Other%20Concurrency%20Issues.md#Figure%2012.43), then we will introduce a new race, this time between the call to `free` in the main thread and the assignment statement in [line 24](12.7%20Other%20Concurrency%20Issues.md#Figure%2012.43) of the thread routine.

## Solution 12.14

A. Another approach is to pass the integer `i` directly, rather than passing a pointer to `i`:

```c
for (i = 0; i < N; i++)
    Pthread_create(&tid[i], NULL, thread, (void *)i);
```

In the thread routine, we cast the argument back to an `int` and assign it to `myid`:

```c
int myid = (int)vargp;
```

B. The advantage is that it reduces overhead by eliminating the calls to `malloc` and `free`. A significant disadvantage is that it assumes that pointers are at least as large as `int`s. While this assumption is true for all modern systems, it might not be true for legacy or future systems.

## Solution 12.15

A. The progress graph for the original program is shown in [Figure 12.48](#Figure%2012.48) on the next page.

B. The program always deadlocks, since any feasible trajectory is eventually trapped in a deadlock state.

C. To eliminate the deadlock potential, initialize the binary semaphore $t$ to `1` instead of `0`.

D. The progress graph for the corrected program is shown in [Figure 12.49](#Figure%2012.49).

### Figure 12.48

![](../../../public/figures/en/conc/figure-12-48-deadlock-progress.svg)

Figure 12.48 Progress graph for a program that deadlocks.

### Figure 12.49

![](../../../public/figures/en/conc/figure-12-49-deadlock-free-progress.svg)

Figure 12.49 Progress graph for the corrected deadlock-free program.
