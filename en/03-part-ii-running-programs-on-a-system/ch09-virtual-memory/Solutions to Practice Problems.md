# Solutions to Practice Problems

[Back to Chapter Contents](./Chapter%209%20Virtual%20Memory.md)

## Solution 9.1

This problem gives you some appreciation for the sizes of different address spaces. At one point in time, a 32-bit address space seemed impossibly large. But now there are database and scientific applications that need more, and you can expect this trend to continue. At some point in your lifetime, expect to find yourself complaining about the cramped 64-bit address space on your personal computer!

| Number of virtual address bits ($n$) | Number of virtual addresses ($N$) | Largest possible virtual address |
| --- | --- | --- |
| 8 | $2^{8} = 256$ | $2^{8} - 1 = 255$ |
| 16 | $2^{16} = 64\text{K}$ | $2^{16} - 1 = 64\text{K} - 1$ |
| 32 | $2^{32} = 4\text{G}$ | $2^{32} - 1 = 4\text{G} - 1$ |
| 48 | $2^{48} = 256\text{T}$ | $2^{48} - 1 = 256\text{T} - 1$ |
| 64 | $2^{64} = 16,384\text{P}$ | $2^{64} - 1 = 16,384\text{P} - 1$ |

## Solution 9.2

Since each virtual page is $P = 2^{p}$ bytes, there are a total of $2^{n} / 2^{p} = 2^{n - p}$ possible pages in the system, each of which needs a page table entry (PTE).

| $n$ | $P = 2^{p}$ | Number of PTEs |
| --- | --- | --- |
| 16 | 4K | 16 |
| 16 | 8K | 8 |
| 32 | 4K | 1M |
| 32 | 8K | 512K |

## Solution 9.3

You need to understand this kind of problem well in order to fully grasp address translation. Here is how to solve the first subproblem: We are given $n = 32$ virtual address bits and $m = 24$ physical address bits. A page size of $P = 1\text{ KB}$ means we need $\log_2(1\text{K}) = 10$ bits for both the VPO and PPO. (Recall that the VPO and PPO are identical.) The remaining address bits are the VPN and PPN, respectively.

| $P$ | VPN bits | VPO bits | PPN bits | PPO bits |
| --- | --- | --- | --- | --- |
| 1 KB | 22 | 10 | 14 | 10 |
| 2 KB | 21 | 11 | 13 | 11 |
| 4 KB | 20 | 12 | 12 | 12 |
| 8 KB | 19 | 13 | 11 | 13 |

## Solution 9.4

Doing a few of these manual simulations is a great way to firm up your understanding of address translation. You might find it helpful to write out all the bits in the addresses and then draw boxes around the different bit fields, such as VPN, TLBI, and so on. In this particular problem, there are no misses of any kind: the TLB has a copy of the PTE and the cache has a copy of the requested data words. See [Problems 9.11](./Homework%20Problems.md#Homework%209.11%20%28%2A%29), [9.12](./Homework%20Problems.md#Homework%209.12%20%28%2A%29), and [9.13](./Homework%20Problems.md#Homework%209.13%20%28%2A%29) for some different combinations of hits and misses.

A. `00 0011 1101 0111`

B.

| Parameter | Value |
| --- | --- |
| VPN | `0xf` |
| TLB index | `0x3` |
| TLB tag | `0x3` |
| TLB hit? (Y/N) | Y |
| Page fault? (Y/N) | N |
| PPN | `0xd` |

C. `0011 0101 0111`

D.

| Parameter | Value |
| --- | --- |
| Byte offset | `0x3` |
| Cache index | `0x5` |
| Cache tag | `0xd` |
| Cache hit? (Y/N) | Y |
| Cache byte returned | `0x1d` |

## Solution 9.5

Solving this problem will give you a good feel for the idea of memory mapping. Try it yourself. We haven't discussed the `open`, `fstat`, or `write` functions, so you'll need to read their man pages to see how they work.

```c
#include "csapp.h"

/*
 * mmapcopy - uses mmap to copy file fd to stdout
 */
void mmapcopy(int fd, int size)
{
    char *bufp; /* ptr to memory-mapped VM area */

    bufp = Mmap(NULL, size, PROT_READ, MAP_PRIVATE, fd, 0);
    Write(1, bufp, size);
    return;
}

/* mmapcopy driver */
int main(int argc, char **argv)
{
    struct stat stat;
    int fd;

    /* Check for required command-line argument */
    if (argc != 2) {
        printf("usage: %s <filename>\n", argv[0]);
        exit(0);
    }

    /* Copy the input argument to stdout */
    fd = Open(argv[1], O_RDONLY, 0);
    fstat(fd, &stat);
    mmapcopy(fd, stat.st_size);
    exit(0);
}
```

## Solution 9.6

This problem touches on some core ideas such as alignment requirements, minimum block sizes, and header encodings. The general approach for determining the block size is to round the sum of the requested payload and the header size to the nearest multiple of the alignment requirement (in this case, 8 bytes). For example, the block size for the `malloc(1)` request is $4 + 1 = 5$ rounded up to 8. The block size for the `malloc(13)` request is $13 + 4 = 17$ rounded up to 24.

| Request | Block size (decimal bytes) | Block header (hex) |
| --- | --- | --- |
| `malloc(1)` | 8 | `0x9` |
| `malloc(5)` | 16 | `0x11` |
| `malloc(12)` | 16 | `0x11` |
| `malloc(13)` | 24 | `0x19` |

## Solution 9.7

The minimum block size can have a significant effect on internal fragmentation. Thus, it is good to understand the minimum block sizes associated with different allocator designs and alignment requirements. The tricky part is to realize that the same block can be allocated or free at different points in time. Thus, the minimum block size is the maximum of the minimum allocated block size and the minimum free block size. For example, in the last subproblem, the minimum allocated block size is a 4-byte header and a 1-byte payload rounded up to 8 bytes. The minimum free block size is a 4-byte header and 4-byte footer, which is already a multiple of 8 and doesn't need to be rounded. So the minimum block size for this allocator is 8 bytes.

| Alignment | Allocated block | Free block | Minimum block size (bytes) |
| --- | --- | --- | --- |
| Single word | Header and footer | Header and footer | 12 |
| Single word | Header, but no footer | Header and footer | 8 |
| Double word | Header and footer | Header and footer | 16 |
| Double word | Header, but no footer | Header and footer | 8 |

## Solution 9.8

There is nothing very tricky here. But the solution requires you to understand how the rest of our simple implicit-list allocator works and how to manipulate and traverse blocks.

```c
static void *find_fit(size_t asize)
{
    /* First-fit search */
    void *bp;

    for (bp = heap_listp; GET_SIZE(HDRP(bp)) > 0; bp = NEXT_BLKP(bp)) {
        if (!GET_ALLOC(HDRP(bp)) && (asize <= GET_SIZE(HDRP(bp)))) {
            return bp;
        }
    }
    return NULL; /* No fit */
}
```

## Solution 9.9

This is another warm-up exercise to help you become familiar with allocators. Notice that for this allocator the minimum block size is 16 bytes. If the remainder of the block after splitting would be greater than or equal to the minimum block size, then we go ahead and split the block (lines 6–10). The only tricky part here is to realize that you need to place the new allocated block (lines 6 and 7) before moving to the next block (line 8).

```c
static void place(void *bp, size_t asize)
{
    size_t csize = GET_SIZE(HDRP(bp));

    if ((csize - asize) >= (2*DSIZE)) {
        PUT(HDRP(bp), PACK(asize, 1));
        PUT(FTRP(bp), PACK(asize, 1));
        bp = NEXT_BLKP(bp);
        PUT(HDRP(bp), PACK(csize-asize, 0));
        PUT(FTRP(bp), PACK(csize-asize, 0));
    }
    else {
        PUT(HDRP(bp), PACK(csize, 1));
        PUT(FTRP(bp), PACK(csize, 1));
    }
}
```

## Solution 9.10

Here is one pattern that will cause external fragmentation: The application makes numerous allocation and free requests to the first size class, followed by numerous allocation and free requests to the second size class, followed by numerous allocation and free requests to the third size class, and so on. For each size class, the allocator creates a lot of memory that is never reclaimed because the allocator doesn't coalesce, and because the application never requests blocks from that size class again.
