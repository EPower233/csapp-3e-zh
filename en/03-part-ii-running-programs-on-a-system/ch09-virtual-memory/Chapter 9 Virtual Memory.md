# Chapter 9 Virtual Memory

## Chapter Contents

- [9.1 Physical and Virtual Addressing](./9.1%20Physical%20and%20Virtual%20Addressing.md)
- [9.2 Address Spaces](./9.2%20Address%20Spaces.md)
- [9.3 VM as a Tool for Caching](./9.3%20VM%20as%20a%20Tool%20for%20Caching.md)
- [9.4 VM as a Tool for Memory Management](./9.4%20VM%20as%20a%20Tool%20for%20Memory%20Management.md)
- [9.5 VM as a Tool for Memory Protection](./9.5%20VM%20as%20a%20Tool%20for%20Memory%20Protection.md)
- [9.6 Address Translation](./9.6%20Address%20Translation.md)
- [9.7 Case Study: The Intel Core i7/Linux Memory System](./9.7%20Case%20Study%EF%BC%9A%20The%20Intel%20Core%20i7%EF%BC%8FLinux%20Memory%20System.md)
- [9.8 Memory Mapping](./9.8%20Memory%20Mapping.md)
- [9.9 Dynamic Memory Allocation](./9.9%20Dynamic%20Memory%20Allocation.md)
- [9.10 Garbage Collection](./9.10%20Garbage%20Collection.md)
- [9.11 Common Memory-Related Bugs in C Programs](./9.11%20Common%20Memory-Related%20Bugs%20in%20C%20Programs.md)
- [9.12 Summary](./9.12%20Summary.md)
- [Bibliographic Notes](./Bibliographic%20Notes.md)
- [Homework Problems](./Homework%20Problems.md)
- [Solutions to Practice Problems](./Solutions%20to%20Practice%20Problems.md)

## Introduction

Processes in a system share the CPU and main memory with other processes. However, sharing the main memory poses some special challenges. As demand on the CPU increases, processes slow down in some reasonably smooth way. But if too many processes need too much memory, then some of them will simply not be able to run. When a program is out of space, it is out of luck. Memory is also vulnerable to corruption. If some process inadvertently writes to the memory used by another process, that process might fail in some bewildering fashion totally unrelated to the program logic.

In order to manage memory more efficiently and with fewer errors, modern systems provide an abstraction of main memory known as *virtual memory* (*VM*). Virtual memory is an elegant interaction of hardware exceptions, hardware address translation, main memory, disk files, and kernel software that provides each process with a large, uniform, and private address space. With one clean mechanism, virtual memory provides three important capabilities:

1. It uses main memory efficiently by treating it as a cache for an address space stored on disk, keeping only the active areas in main memory and transferring data back and forth between disk and memory as needed.
2. It simplifies memory management by providing each process with a uniform address space.
3. It protects the address space of each process from corruption by other processes.

Virtual memory is one of the great ideas in computer systems. A major reason for its success is that it works silently and automatically, without any intervention from the application programmer. Since virtual memory works so well behind the scenes, why would a programmer need to understand it? There are several reasons.

- **Virtual memory is central.** Virtual memory pervades all levels of computer systems, playing key roles in the design of hardware exceptions, assemblers, linkers, loaders, shared objects, files, and processes. Understanding virtual memory will help you better understand how systems work in general.

- **Virtual memory is powerful.** Virtual memory gives applications powerful capabilities to create and destroy chunks of memory, map chunks of memory to portions of disk files, and share memory with other processes. For example, did you know that you can read or modify the contents of a disk file by reading and writing memory locations? Or that you can load the contents of a file into memory without doing any explicit copying? Understanding virtual memory will help you harness its powerful capabilities in your applications.

- **Virtual memory is dangerous.** Applications interact with virtual memory every time they reference a variable, dereference a pointer, or make a call to a dynamic allocation package such as `malloc`. If virtual memory is used improperly, applications can suffer from perplexing and insidious memory-related bugs. For example, a program with a bad pointer can crash immediately with a "segmentation fault" or a "protection fault," run silently for hours before crashing, or scariest of all, run to completion with incorrect results. Understanding virtual memory, and the allocation packages such as `malloc` that manage it, can help you avoid these errors.

This chapter looks at virtual memory from two angles. The first half of the chapter describes how virtual memory works. The second half describes how virtual memory is used and managed by applications. There is no avoiding the fact that VM is complicated, and the discussion reflects this in places. The good news is that if you work through the details, you will be able to simulate the virtual memory mechanism of a small system by hand, and the virtual memory idea will be forever demystified.

The second half builds on this understanding, showing you how to use and manage virtual memory in your programs. You will learn how to manage virtual memory via explicit memory mapping and calls to dynamic storage allocators such as the malloc package. You will also learn about a host of common memory-related errors in C programs and how to avoid them.
