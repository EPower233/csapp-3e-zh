# Bibliographic Notes

[Back to Chapter Contents](./Chapter%206%20The%20Memory%20Hierarchy.md)

Memory and disk technologies change rapidly. In our experience, the best sources of technical information are the Web pages maintained by the manufacturers. Companies such as Micron, Toshiba, and Samsung provide a wealth of current technical information on memory devices. The pages for Seagate and Western Digital provide similarly useful information about disks.

Textbooks on circuit and logic design provide detailed information about memory technology \[[58](#ref-58), [89](#ref-89)\]. IEEE Spectrum published a series of survey articles on DRAM [\[55\]](#ref-55). The International Symposiums on Computer Architecture (ISCA) and High Performance Computer Architecture (HPCA) are common forums for characterizations of DRAM memory performance \[[28](#ref-28), [29](#ref-29), [18](#ref-18)\].

Wilkes wrote the first paper on cache memories [\[117\]](#ref-117). Smith wrote a classic survey [\[104\]](#ref-104). Przybylski wrote an authoritative book on cache design [\[86\]](#ref-86). Hennessy and Patterson provide a comprehensive discussion of cache design issues [\[46\]](#ref-46). Levinthal wrote a comprehensive performance guide for the Intel Core i7 [\[70\]](#ref-70).

Stricker introduced the idea of the memory mountain as a comprehensive characterization of the memory system in [\[112\]](#ref-112) and suggested the term "memory mountain" informally in later presentations of the work. Compiler researchers work to increase locality by automatically performing the kinds of manual code transformations we discussed in [Section 6.6](6.6%20Putting%20It%20Together%EF%BC%9A%20The%20Impact%20of%20Caches%20on%20Program%20Performance.md) \[[22](#ref-22), [32](#ref-32), [66](#ref-66), [72](#ref-72), [79](#ref-79), [87](#ref-87), [119](#ref-119)\]. Carter and colleagues have proposed a cache-aware memory controller [\[17\]](#ref-17). Other researchers have developed cache-oblivious algorithms that are designed to run well without any explicit knowledge of the structure of the underlying cache memory \[[30](#ref-30), [38](#ref-38), [39](#ref-39), [9](#ref-9)\].

There is a large body of literature on building and using disk storage. Many storage researchers look for ways to aggregate individual disks into larger, more robust, and more secure storage pools \[[20](#ref-20), [40](#ref-40), [41](#ref-41), [83](#ref-83), [121](#ref-121)\]. Others look for ways to use caches and locality to improve the performance of disk accesses \[[12](#ref-12), [21](#ref-21)\]. Systems such as Exokernel provide increased user-level control of disk and memory resources [\[57\]](#ref-57). Systems such as the Andrew File System [\[78\]](#ref-78) and Coda [\[94\]](#ref-94) extend the memory hierarchy across computer networks and mobile notebook computers. Schindler and Ganger developed an interesting tool that automatically characterizes the geometry and performance of SCSI disk drives [\[95\]](#ref-95). Researchers have investigated techniques for building and using flash-based SSDs \[[8](#ref-8), [81](#ref-81)\].

## References

<span id="ref-8"></span>**[8]** A. Birrell, M. Isard, C. Thacker, and T. Wobber. A design for high-performance flash disks. SIGOPS Operating Systems Review 41(2):88–93, 2007.

<span id="ref-9"></span>**[9]** G. E. Blelloch, J. T. Fineman, P. B. Gibbons, and H. V. Simhadri. Scheduling irregular parallel computations on hierarchical caches. In Proceedings of the 23rd Symposium on Parallelism in Algorithms and Architectures (SPAA), pages 355–366. ACM, June 2011.

<span id="ref-12"></span>**[12]** A. Demke Brown and T. Mowry. Taming the memory hogs: Using compiler-inserted releases to manage physical memory intelligently. In Proceedings of the 4th Symposium on Operating Systems Design and Implementation (OSDI), pages 31–44. Usenix, October 2000.

<span id="ref-17"></span>**[17]** J. B. Carter, W. C. Hsieh, L. B. Stoller, M. R. Swanson, L. Zhang, E. L. Brunvand, A. Davis, C.-C. Kuo, R. Kuramkote, M. A. Parker, L. Schaelicke, and T. Tateyama. Impulse: Building a smarter memory controller. In Proceedings of the 5th International Symposium on High Performance Computer Architecture (HPCA), pages 70–79. ACM, January 1999.

<span id="ref-18"></span>**[18]** K. Chang, D. Lee, Z. Chishti, A. Alameldeen, C. Wilkerson, Y. Kim, and O. Mutlu. Improving DRAM performance by parallelizing refreshes with accesses. In Proceedings of the 20th International Symposium on High-Performance Computer Architecture (HPCA). ACM, February 2014.

<span id="ref-20"></span>**[20]** P. Chen, E. Lee, G. Gibson, R. Katz, and D. Patterson. RAID: High-performance, reliable secondary storage. ACM Computing Surveys 26(2):145–185, June 1994.

<span id="ref-21"></span>**[21]** S. Chen, P. Gibbons, and T. Mowry. Improving index performance through prefetching. In Proceedings of the 2001 ACM SIGMOD International Conference on Management of Data, pages 235–246. ACM, May 2001.

<span id="ref-22"></span>**[22]** T. Chilimbi, M. Hill, and J. Larus. Cache-conscious structure layout. In Proceedings of the 1999 ACM Conference on Programming Language Design and Implementation (PLDI), pages 1–12. ACM, May 1999.

<span id="ref-28"></span>**[28]** V. Cuppu, B. Jacob, B. Davis, and T. Mudge. A performance comparison of contemporary DRAM architectures. In Proceedings of the 26th International Symposium on Computer Architecture (ISCA), pages 222–233, ACM, 1999.

<span id="ref-29"></span>**[29]** B. Davis, B. Jacob, and T. Mudge. The new DRAM interfaces: SDRAM, RDRAM, and variants. In Proceedings of the 3rd International Symposium on High Performance Computing (ISHPC), volume 1940 of Lecture Notes in Computer Science, pages 26–31. Springer-Verlag, October 2000.

<span id="ref-30"></span>**[30]** E. Demaine. Cache-oblivious algorithms and data structures. In Lecture Notes from the EEF Summer School on Massive Data Sets. BRICS, University of Aarhus, Denmark, 2002.

<span id="ref-32"></span>**[32]** C. Ding and K. Kennedy. Improving cache performance of dynamic applications through data and computation reorganizations at run time. In Proceedings of the 1999 ACM Conference on Programming Language Design and Implementation (PLDI), pages 229–241. ACM, May 1999.

<span id="ref-38"></span>**[38]** M. Frigo, C. E. Leiserson, H. Prokop, and S. Ramachandran. Cache-oblivious algorithms. In Proceedings of the 40th IEEE Symposium on Foundations of Computer Science (FOCS), pages 285–297. IEEE, August 1999.

<span id="ref-39"></span>**[39]** M. Frigo and V. Strumpen. The cache complexity of multithreaded cache oblivious algorithms. In Proceedings of the 18th Symposium on Parallelism in Algorithms and Architectures (SPAA), pages 271–280. ACM, 2006.

<span id="ref-40"></span>**[40]** G. Gibson, D. Nagle, K. Amiri, J. Butler, F. Chang, H. Gobioff, C. Hardin, E. Riedel, D. Rochberg, and J. Zelenka. A cost-effective, high-bandwidth storage architecture. In Proceedings of the 8th International Conference on Architectural Support for Programming Languages and Operating Systems (ASPLOS), pages 92–103. ACM, October 1998.

<span id="ref-41"></span>**[41]** G. Gibson and R. Van Meter. Network attached storage architecture. Communications of the ACM 43(11):37–45, November 2000.

<span id="ref-46"></span>**[46]** J. L. Hennessy and D. A. Patterson. Computer Architecture: A Quantitative Approach, Fifth Edition. Morgan Kaufmann, 2011.

<span id="ref-53"></span>**[53]** Intel Corporation. Intel Solid-State Drive 730 Series: Product Specification. Available at [Intel SSD 730 Series Product Specification PDF](https://www.intel.com/content/dam/www/public/us/en/documents/product-specifications/ssd-730-series-spec.pdf).

<span id="ref-55"></span>**[55]** F. Jones, B. Prince, R. Norwood, J. Hartigan, W. Vogley, C. Hart, and D. Bondurant. Memory–-a new era of fast dynamic RAMs (for video applications). IEEE Spectrum, pages 43–45, October 1992.

<span id="ref-57"></span>**[57]** M. Kaashoek, D. Engler, G. Ganger, H. Briceo, R. Hunt, D. Maziers, T. Pinckney, R. Grimm, J. Jannotti, and K. MacKenzie. Application performance and flexibility on Exokernel systems. In Proceedings of the 16th ACM Symposium on Operating System Principles (SOSP), pages 52–65. ACM, October 1997.

<span id="ref-58"></span>**[58]** R. Katz and G. Borriello. Contemporary Logic Design, Second Edition. Prentice Hall, 2005.

<span id="ref-66"></span>**[66]** M. Lam, E. Rothberg, and M. Wolf. The cache performance and optimizations of blocked algorithms. In Proceedings of the 4th International Conference on Architectural Support for Programming Languages and Operating Systems (ASPLOS), pages 63–74. ACM, April 1991.

<span id="ref-70"></span>**[70]** David Levinthal. Performance Analysis Guide for Intel Core i7 Processor and Intel Xeon 5500 Processors. Available at [Intel Performance Analysis Guide PDF](https://www.intel.com/content/dam/develop/external/us/en/documents/performance-analysis-guide-181827.pdf)

<span id="ref-72"></span>**[72]** Y. Lin and D. Padua. Compiler analysis of irregular memory accesses. In Proceedings of the 2000 ACM Conference on Programming Language Design and Implementation (PLDI), pages 157–168. ACM, June 2000.

<span id="ref-78"></span>**[78]** J. Morris, M. Satyanarayanan, M. Conner, J. Howard, D. Rosenthal, and F. Smith. Andrew: A distributed personal computing environment. Communications of the ACM, pages 184–201, March 1986.

<span id="ref-79"></span>**[79]** T. Mowry, M. Lam, and A. Gupta. Design and evaluation of a compiler algorithm for prefetching. In Proceedings of the 5th International Conference on Architectural Support for Programming Languages and Operating Systems (ASPLOS), pages 62–73. ACM, October 1992.

<span id="ref-81"></span>**[81]** S. Nath and P. Gibbons. Online maintenance of very large random samples on flash storage. In Proceedings of VLDB, pages 970–983. VLDB Endowment, August 2008.

<span id="ref-83"></span>**[83]** D. Patterson, G. Gibson, and R. Katz. A case for redundant arrays of inexpensive disks (RAID). In Proceedings of the 1998 ACM SIGMOD International Conference on Management of Data, pages 109–116. ACM, June 1988.

<span id="ref-86"></span>**[86]** S. Przybylski. Cache and Memory Hierarchy Design: A Performance-Directed Approach. Morgan Kaufmann, 1990.

<span id="ref-87"></span>**[87]** W. Pugh. The Omega test: A fast and practical integer programming algorithm for dependence analysis. Communications of the ACM 35(8):102–114, August 1992.

<span id="ref-89"></span>**[89]** J. Rabaey, A. Chandrakasan, and B. Nikolic. Digital Integrated Circuits: A Design Perspective, Second Edition. Prentice Hall, 2003.

<span id="ref-94"></span>**[94]** M. Satyanarayanan, J. Kistler, P. Kumar, M. Okasaki, E. Siegel, and D. Steere. Coda: A highly available file system for a distributed workstation environment. IEEE Transactions on Computers 39(4):447–459, April 1990.

<span id="ref-95"></span>**[95]** J. Schindler and G. Ganger. Automated disk drive characterization. Technical Report CMU-CS-99-176, School of Computer Science, Carnegie Mellon University, 1999.

<span id="ref-104"></span>**[104]** A. Smith. Cache memories. ACM Computing Surveys 14(3), September 1982.

<span id="ref-112"></span>**[112]** T. Stricker and T. Gross. Global address space, non-uniform bandwidth: A memory system performance characterization of parallel systems. In Proceedings of the 3rd International Symposium on High Performance Computer Architecture (HPCA), pages 168–179. IEEE, February 1997.

<span id="ref-117"></span>**[117]** M. V. Wilkes. Slave memories and dynamic storage allocation. IEEE Transactions on Electronic Computers, EC-14(2), April 1965.

<span id="ref-119"></span>**[119]** M. Wolf and M. Lam. A data locality algorithm. In Proceedings of the 1991 ACM Conference on Programming Language Design and Implementation (PLDI), pages 30–44, June 1991.

<span id="ref-121"></span>**[121]** J. Wylie, M. Bigrigg, J. Strunk, G. Ganger, H. Kiliccote, and P. Khosla. Survivable information storage systems. IEEE Computer 33:61–68, August 2000.
