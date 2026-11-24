# Homework Problems

[Back to Chapter Contents](./Chapter%209%20Virtual%20Memory.md)

## Homework 9.11 (*)

In the following series of problems, you are to show how the example memory system in [Section 9.6.4](./9.6%20Address%20Translation.md#9.6.4%20Putting%20It%20Together%3A%20End-to-End%20Address%20Translation) translates a virtual address into a physical address and accesses the cache. For the given virtual address, indicate the TLB entry accessed, the physical address, and the cache byte value returned. Indicate whether the TLB misses, whether a page fault occurs, and whether a cache miss occurs. If there is a cache miss, enter "—" for "Cache byte returned." If there is a page fault, enter "—" for "PPN" and leave parts C and D blank.

Virtual address: `0x027c`

A. Virtual address format

| 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | | | | | | |

B. Address translation

| Parameter | Value |
| --- | --- |
| VPN | |
| TLB index | |
| TLB tag | |
| TLB hit? (Y/N) | |
| Page fault? (Y/N) | |
| PPN | |

C. Physical address format

| 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | | | | |

D. Physical memory reference

| Parameter | Value |
| --- | --- |
| Byte offset | |
| Cache index | |
| Cache tag | |
| Cache hit? (Y/N) | |
| Cache byte returned | |

## Homework 9.12 (*)

Repeat [Problem 9.11](#Homework%209.11%20%28%2A%29) for the following address.

Virtual address: `0x03a9`

A. Virtual address format

| 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | | | | | | |

B. Address translation

| Parameter | Value |
| --- | --- |
| VPN | |
| TLB index | |
| TLB tag | |
| TLB hit? (Y/N) | |
| Page fault? (Y/N) | |
| PPN | |

C. Physical address format

| 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | | | | |

D. Physical memory reference

| Parameter | Value |
| --- | --- |
| Byte offset | |
| Cache index | |
| Cache tag | |
| Cache hit? (Y/N) | |
| Cache byte returned | |

## Homework 9.13 (*)

Repeat [Problem 9.11](#Homework%209.11%20%28%2A%29) for the following address.

Virtual address: `0x0040`

A. Virtual address format

| 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | | | | | | |

B. Address translation

| Parameter | Value |
| --- | --- |
| VPN | |
| TLB index | |
| TLB tag | |
| TLB hit? (Y/N) | |
| Page fault? (Y/N) | |
| PPN | |

C. Physical address format

| 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | | | | |

D. Physical memory reference

| Parameter | Value |
| --- | --- |
| Byte offset | |
| Cache index | |
| Cache tag | |
| Cache hit? (Y/N) | |
| Cache byte returned | |

## Homework 9.14 (**)

Given an input file `hello.txt` that consists of the string `"Hello, world!\n"`, write a C program that uses `mmap` to change the contents of `hello.txt` to `"Jello, world!\n"`.

## Homework 9.15 (*)

Determine the block sizes and header values that would result from the following sequence of `malloc` requests. Assumptions:

1. The allocator maintains double-word alignment and uses an implicit free list with the block format from [Figure 9.35](./9.9%20Dynamic%20Memory%20Allocation.md#fig-9-35).
2. Block sizes are rounded up to the nearest multiple of 8 bytes.

| Request | Block size (decimal bytes) | Block header (hex) |
| --- | --- | --- |
| `malloc(3)` | | |
| `malloc(11)` | | |
| `malloc(20)` | | |
| `malloc(21)` | | |

## Homework 9.16 (*)

Determine the minimum block size for each of the following combinations of alignment requirements and block formats. Assumptions: Explicit free list, 4-byte `pred` and `succ` pointers in each free block, zero-size payloads are not allowed, and headers and footers are stored in 4-byte words.

| Alignment | Allocated block | Free block | Minimum block size (bytes) |
| --- | --- | --- | --- |
| Single word | Header and footer | Header and footer | |
| Single word | Header, but no footer | Header and footer | |
| Double word | Header and footer | Header and footer | |
| Double word | Header, but no footer | Header and footer | |

## Homework 9.17 (**)

Develop a version of the allocator in [Section 9.9.12](./9.9%20Dynamic%20Memory%20Allocation.md#9.9.12%20Putting%20It%20Together%3A%20Implementing%20a%20Simple%20Allocator) that performs a next-fit search instead of a first-fit search.

## Homework 9.18 (**)

The allocator in [Section 9.9.12](./9.9%20Dynamic%20Memory%20Allocation.md#9.9.12%20Putting%20It%20Together%3A%20Implementing%20a%20Simple%20Allocator) requires both a header and a footer for each block in order to perform constant-time coalescing. Modify the allocator so that free blocks require a header and a footer, but allocated blocks require only a header.

## Homework 9.19 (*)

You are given three groups of statements relating to memory management and garbage collection below. In each group, only one statement is true. Your task is to indicate which statement is true.

1.
   - a. In a buddy system, up to $50\%$ of the space can be wasted due to internal fragmentation.
   - b. The first-fit memory allocation algorithm is slower than the best-fit algorithm (on average).
   - c. Deallocation using boundary tags is fast only when the list of free blocks is ordered according to increasing memory addresses.
   - d. The buddy system suffers from internal fragmentation, but not from external fragmentation.

2.
   - a. Using the first-fit algorithm on a free list that is ordered according to decreasing block sizes results in low performance for allocations, but avoids external fragmentation.
   - b. For the best-fit method, the list of free blocks should be ordered according to increasing memory addresses.
   - c. The best-fit method chooses the largest free block into which the requested segment fits.
   - d. Using the first-fit algorithm on a free list that is ordered according to increasing block sizes is equivalent to using the best-fit algorithm.

3. Mark&Sweep garbage collectors are called conservative if
   - a. They coalesce freed memory only when a memory request cannot be satisfied.
   - b. They treat everything that looks like a pointer as a pointer.
   - c. They perform garbage collection only when they run out of memory.
   - d. They do not free memory blocks forming a cyclic list.

## Homework 9.20 (**)

Write your own version of `malloc` and `free`, and compare its running time and space utilization to the version of `malloc` provided in the standard C library.
