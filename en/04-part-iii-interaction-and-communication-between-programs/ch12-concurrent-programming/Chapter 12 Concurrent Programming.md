# Chapter 12 Concurrent Programming

## Chapter Contents

- [12.1 Concurrent Programming with Processes](./12.1%20Concurrent%20Programming%20with%20Processes.md)
- [12.2 Concurrent Programming with I/O Multiplexing](./12.2%20Concurrent%20Programming%20with%20I%EF%BC%8FO%20Multiplexing.md)
- [12.3 Concurrent Programming with Threads](./12.3%20Concurrent%20Programming%20with%20Threads.md)
- [12.4 Shared Variables in Threaded Programs](./12.4%20Shared%20Variables%20in%20Threaded%20Programs.md)
- [12.5 Synchronizing Threads with Semaphores](./12.5%20Synchronizing%20Threads%20with%20Semaphores.md)
- [12.6 Using Threads for Parallelism](./12.6%20Using%20Threads%20for%20Parallelism.md)
- [12.7 Other Concurrency Issues](./12.7%20Other%20Concurrency%20Issues.md)
- [12.8 Summary](./12.8%20Summary.md)
- [Bibliographic Notes](./Bibliographic%20Notes.md)
- [Homework Problems](./Homework%20Problems.md)
- [Solutions to Practice Problems](./Solutions%20to%20Practice%20Problems.md)

## Introduction

As we learned in [Chapter 8](../../03-part-ii-running-programs-on-a-system/ch08-exceptional-control-flow/Chapter%208%20Exceptional%20Control%20Flow.md), logical control flows are *concurrent* if they overlap in time. This general phenomenon, known as *concurrency*, shows up at many different levels of a computer system. Hardware exception handlers, processes, and Linux signal handlers are all familiar examples.

Thus far, we have treated concurrency mainly as a mechanism that the operating system kernel uses to run multiple application programs. But concurrency is not just limited to the kernel. It can play an important role in application programs as well. For example, we have seen how Linux signal handlers allow applications to respond to asynchronous events such as the user typing Ctrl+C or the program accessing an undefined area of virtual memory. Application-level concurrency is useful in other ways as well:

- **Accessing slow I/O devices.** When an application is waiting for data to arrive from a slow I/O device such as a disk, the kernel keeps the CPU busy by running other processes. Individual applications can exploit concurrency in a similar way by overlapping useful work with I/O requests.

- **Interacting with humans.** People who interact with computers demand the ability to perform multiple tasks at the same time. For example, they might want to resize a window while they are printing a document. Modern windowing systems use concurrency to provide this capability. Each time the user requests some action (say, by clicking the mouse), a separate concurrent logical flow is created to perform the action.

- **Reducing latency by deferring work.** Sometimes, applications can use concurrency to reduce the latency of certain operations by deferring other operations and performing them concurrently. For example, a dynamic storage allocator might reduce the latency of individual `free` operations by deferring coalescing to a concurrent "coalescing" flow that runs at a lower priority, soaking up spare CPU cycles as they become available.

- **Servicing multiple network clients.** The iterative network servers that we studied in [Chapter 11](../ch11-network-programming/Chapter%2011%20Network%20Programming.md) are unrealistic because they can only service one client at a time. Thus, a single slow client can deny service to every other client. For a real server that might be expected to service hundreds or thousands of clients per second, it is not acceptable to allow one slow client to deny service to the others. A better approach is to build a concurrent server that creates a separate logical flow for each client. This allows the server to service multiple clients concurrently and precludes slow clients from monopolizing the server.

- **Computing in parallel on multi-core machines.** Many modern systems are equipped with multi-core processors that contain multiple CPUs. Applications that are partitioned into concurrent flows often run faster on multi-core machines than on uniprocessor machines because the flows execute in parallel rather than being interleaved.

Applications that use application-level concurrency are known as *concurrent programs*. Modern operating systems provide three basic approaches for building concurrent programs:

- **Processes.** With this approach, each logical control flow is a process that is scheduled and maintained by the kernel. Since processes have separate virtual address spaces, flows that want to communicate with each other must use some kind of explicit interprocess communication (IPC) mechanism.

- **I/O multiplexing.** This is a form of concurrent programming where applications explicitly schedule their own logical flows in the context of a single process. Logical flows are modeled as state machines that the main program explicitly transitions from state to state as a result of data arriving on file descriptors. Since the program is a single process, all flows share the same address space.

- **Threads.** Threads are logical flows that run in the context of a single process and are scheduled by the kernel. You can think of threads as a hybrid of the other two approaches, scheduled by the kernel like process flows and sharing the same virtual address space like I/O multiplexing flows.

This chapter investigates these three different concurrent programming techniques. To keep our discussion concrete, we will work with the same motivating application throughout—a concurrent version of the iterative echo server from [Section 11.4.9](../ch11-network-programming/11.4%20The%20Sockets%20Interface.md#11.4.9%20Example%20Echo%20Client%20and%20Server).
