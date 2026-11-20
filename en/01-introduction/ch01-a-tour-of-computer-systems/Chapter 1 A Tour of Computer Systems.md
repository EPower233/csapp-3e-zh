# Chapter 1 A Tour of Computer Systems

## Chapter Contents

- [1.1 Information Is Bits + Context](./1.1%20Information%20Is%20Bits%20%2B%20Context.md)
- [1.2 Programs Are Translated by Other Programs into Different Forms](./1.2%20Programs%20Are%20Translated%20by%20Other%20Programs%20into%20Different%20Forms.md)
- [1.3 It Pays to Understand How Compilation Systems Work](./1.3%20It%20Pays%20to%20Understand%20How%20Compilation%20Systems%20Work.md)
- [1.4 Processors Read and Interpret Instructions Stored in Memory](./1.4%20Processors%20Read%20and%20Interpret%20Instructions%20Stored%20in%20Memory.md)
  - [1.4.1 Hardware Organization of a System](1.4%20Processors%20Read%20and%20Interpret%20Instructions%20Stored%20in%20Memory.md#1.4.1%20Hardware%20Organization%20of%20a%20System)
  - [1.4.2 Running the hello Program](1.4%20Processors%20Read%20and%20Interpret%20Instructions%20Stored%20in%20Memory.md#1.4.2%20Running%20the%20hello%20Program)
- [1.5 Caches Matter](./1.5%20Caches%20Matter.md)
- [1.6 Storage Devices Form a Hierarchy](./1.6%20Storage%20Devices%20Form%20a%20Hierarchy.md)
- [1.7 The Operating System Manages the Hardware](./1.7%20The%20Operating%20System%20Manages%20the%20Hardware.md)
  - [1.7.1 Processes](1.7%20The%20Operating%20System%20Manages%20the%20Hardware.md#1.7.1%20Processes)
  - [1.7.2 Threads](1.7%20The%20Operating%20System%20Manages%20the%20Hardware.md#1.7.2%20Threads)
  - [1.7.3 Virtual Memory](1.7%20The%20Operating%20System%20Manages%20the%20Hardware.md#1.7.3%20Virtual%20Memory)
  - [1.7.4 Files](1.7%20The%20Operating%20System%20Manages%20the%20Hardware.md#1.7.4%20Files)
- [1.8 Systems Communicate with Other Systems Using Networks](./1.8%20Systems%20Communicate%20with%20Other%20Systems%20Using%20Networks.md)
- [1.9 Important Themes](./1.9%20Important%20Themes.md)
  - [1.9.1 Amdahl's Law](1.9%20Important%20Themes.md#1.9.1%20Amdahl%27s%20Law)
  - [1.9.2 Concurrency and Parallelism](1.9%20Important%20Themes.md#1.9.2%20Concurrency%20and%20Parallelism)
  - [1.9.3 The Importance of Abstractions in Computer Systems](1.9%20Important%20Themes.md#1.9.3%20The%20Importance%20of%20Abstractions%20in%20Computer%20Systems)
- [1.10 Summary](./1.10%20Summary.md)
- [Bibliographic Notes](./Bibliographic%20Notes.md)
- [Solutions to Practice Problems](./Solutions%20to%20Practice%20Problems.md)

## Introduction

A computer system consists of hardware and systems software that work together to run application programs. Specific implementations of systems change over time, but the underlying concepts do not. All computer systems have similar hardware and software components that perform similar functions. This book is written for programmers who want to get better at their craft by understanding how these components work and how they affect the correctness and performance of their programs.

You are poised for an exciting journey. If you dedicate yourself to learning the concepts in this book, then you will be on your way to becoming a rare "power programmer," enlightened by an understanding of the underlying computer system and its impact on your application programs.

You are going to learn practical skills such as how to avoid strange numerical errors caused by the way that computers represent numbers. You will learn how to optimize your C code by using clever tricks that exploit the designs of modern processors and memory systems. You will learn how the compiler implements procedure calls and how to use this knowledge to avoid the security holes from buffer overflow vulnerabilities that plague network and Internet software. You will learn how to recognize and avoid the nasty errors during linking that confound the average programmer. You will learn how to write your own Unix shell, your own dynamic storage allocation package, and even your own Web server. You will learn the promises and pitfalls of concurrency, a topic of increasing importance as multiple processor cores are integrated onto single chips.

In their classic text on the C programming language [\[61\]](./../../05-appendix-and-references/References.md#ref-61), Kernighan and Ritchie introduce readers to C using the `hello` program shown in [Figure 1.1](#Figure%201.1). Although `hello` is a very simple program, every major part of the system must work in concert in order for it to run to completion. In a sense, the goal of this book is to help you understand what happens and why when you run `hello` on your system.

### Figure 1.1

```c
#include <stdio.h>

int main() {
  printf("hello, world\n");
  return 0;
}
```

Figure 1.1 The `hello` program. (Source: [\[60\]](./../../05-appendix-and-references/References.md#ref-60))

We begin our study of systems by tracing the lifetime of the `hello` program, from the time it is created by a programmer, until it runs on a system, prints its simple message, and terminates. As we follow the lifetime of the program, we will briefly introduce the key concepts, terminology, and components that come into play. Later chapters will expand on these ideas.
