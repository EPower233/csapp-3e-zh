# Bibliographic Notes

[Back to Chapter Contents](./Chapter%209%20Virtual%20Memory.md)

Kilburn and his colleagues published the first description of virtual memory [\[63\]](#ref-63). Architecture texts contain additional details about the hardware's role in virtual memory [\[46\]](#ref-46). Operating systems texts contain additional information about the operating system's role [\[102](#ref-102), [106](#ref-106), [113\]](#ref-113). Bovet and Cesati [\[11\]](#ref-11) give a detailed description of the Linux virtual memory system. Intel Corporation provides detailed documentation on 32-bit and 64-bit address translation on IA processors [\[52\]](#ref-52).

Knuth wrote the classic work on storage allocation in 1968 [\[64\]](#ref-64). Since that time, there has been a tremendous amount of work in the area. Wilson, Johnstone, Neely, and Boles have written a beautiful survey and performance evaluation of explicit allocators [\[118\]](#ref-118). The general comments in this book about the throughput and utilization of different allocator strategies are paraphrased from their survey. Jones and Lins provide a comprehensive survey of garbage collection [\[56\]](#ref-56). Kernighan and Ritchie [\[61\]](#ref-61) show the complete code for a simple allocator based on an explicit free list with a block size and successor pointer in each free block. The code is interesting in that it uses unions to eliminate a lot of the complicated pointer arithmetic, but at the expense of a linear-time (rather than constant-time) free operation. Doug Lea developed a widely used open-source `malloc` package called `dlmalloc` [\[67\]](#ref-67).

## References

<span id="ref-11"></span>**[11]** D. Bovet and M. Cesati. Understanding the Linux Kernel, Third Edition. O'Reilly Media, Inc., 2005.

<span id="ref-46"></span>**[46]** J. L. Hennessy and D. A. Patterson. Computer Architecture: A Quantitative Approach, Fifth Edition. Morgan Kaufmann, 2011.

<span id="ref-52"></span>**[52]** Intel Corporation. Intel 64 and IA-32 Architectures Software Developer's Manual, Volume 3a: System Programming Guide, Part 1. Available at [Intel manuals](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html).

<span id="ref-56"></span>**[56]** R. Jones and R. Lins. Garbage Collection: Algorithms for Automatic Dynamic Memory Management. Wiley, 1996.

<span id="ref-61"></span>**[61]** B. Kernighan and D. Ritchie. The C Programming Language, Second Edition. Prentice Hall, 1988.

<span id="ref-63"></span>**[63]** T. Kilburn, B. Edwards, M. Lanigan, and F. Sumner. One-level storage system. IRE Transactions on Electronic Computers EC-11:223–235, April 1962.

<span id="ref-64"></span>**[64]** D. Knuth. The Art of Computer Programming, Volume 1: Fundamental Algorithms, Third Edition. Addison-Wesley, 1997.

<span id="ref-67"></span>**[67]** D. Lea. A memory allocator. Available at http://gee.cs.oswego.edu/dl/html/malloc.html, 1996.

<span id="ref-102"></span>**[102]** A. Silberschatz, P. Galvin, and G. Gagne. Operating Systems Concepts, Ninth Edition. Wiley, 2014.

<span id="ref-106"></span>**[106]** W. Stallings. Operating Systems: Internals and Design Principles, Eighth Edition. Prentice Hall, 2014.

<span id="ref-113"></span>**[113]** A. S. Tanenbaum and H. Bos. Modern Operating Systems, Fourth Edition. Prentice Hall, 2015.

<span id="ref-118"></span>**[118]** P. Wilson, M. Johnstone, M. Neely, and D. Boles. Dynamic storage allocation: A survey and critical review. In International Workshop on Memory Management, volume 986 of Lecture Notes in Computer Science, pages 1–116. Springer-Verlag, 1995.
