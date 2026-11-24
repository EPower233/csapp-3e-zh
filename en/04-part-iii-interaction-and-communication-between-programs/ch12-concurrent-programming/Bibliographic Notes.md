# Bibliographic Notes

[Back to Chapter Contents](./Chapter%2012%20Concurrent%20Programming.md)

Semaphore operations were introduced by Dijkstra [\[31\]](#ref-31). The progress graph concept was introduced by Coffman [\[23\]](#ref-23) and later formalized by Carson and Reynolds [\[16\]](#ref-16). The readers-writers problem was introduced by Courtois et al. [\[25\]](#ref-25). Operating systems texts describe classical synchronization problems such as the dining philosophers, sleeping barber, and cigarette smokers problems in more detail [\[102\]](#ref-102), [\[106\]](#ref-106), [\[113\]](#ref-113). The book by Butenhof [\[15\]](#ref-15) is a comprehensive description of the Posix threads interface. The paper by Birrell [\[7\]](#ref-7) is an excellent introduction to threads programming and its pitfalls. The book by Reinders [\[90\]](#ref-90) describes a C/C++ library that simplifies the design and implementation of threaded programs. Several texts cover the fundamentals of parallel programming on multi-core systems [\[47\]](#ref-47), [\[71\]](#ref-71). Pugh identifies weaknesses with the way that Java threads interact through memory and proposes replacement memory models [\[88\]](#ref-88). Gustafson proposed the weak-scaling speedup model [\[43\]](#ref-43) as an alternative to strong scaling.

## References

<span id="ref-7"></span>**[7]** A. Birrell. An introduction to programming with threads. Technical Report 35, Digital Systems Research Center, 1989.

<span id="ref-15"></span>**[15]** D. Butenhof. Programming with Posix Threads. Addison-Wesley, 1997.

<span id="ref-16"></span>**[16]** S. Carson and P. Reynolds. The geometry of semaphore programs. ACM Transactions on Programming Languages and Systems 9(1):25–53, 1987.

<span id="ref-23"></span>**[23]** E. Coffman, M. Elphick, and A. Shoshani. System deadlocks. ACM Computing Surveys 3(2):67–78, June 1971.

<span id="ref-25"></span>**[25]** P. J. Courtois, F. Heymans, and D. L. Parnas. Concurrent control with "readers" and "writers." Communications of the ACM 14(10):667–668, 1971.

<span id="ref-31"></span>**[31]** E. W. Dijkstra. Cooperating sequential processes. Technical Report EWD-123, Technological University, Eindhoven, the Netherlands, 1965.

<span id="ref-43"></span>**[43]** J. Gustafson. Reevaluating Amdahl's law. Communications of the ACM 31(5):532–533, August 1988.

<span id="ref-47"></span>**[47]** M. Herlihy and N. Shavit. The Art of Multiprocessor Programming. Morgan Kaufmann, 2008.

<span id="ref-48"></span>**[48]** C. A. R. Hoare. Monitors: An operating system structuring concept. Communications of the ACM 17(10):549–557, October 1974.

<span id="ref-61"></span>**[61]** B. Kernighan and D. Ritchie. The C Programming Language, Second Edition. Prentice Hall, 1988.

<span id="ref-62"></span>**[62]** Michael Kerrisk. The Linux Programming Interface. No Starch Press, 2010.

<span id="ref-71"></span>**[71]** C. Lin and L. Snyder. Principles of Parallel Programming. Addison Wesley, 2008.

<span id="ref-88"></span>**[88]** W. Pugh. Fixing the Java memory model. In Proceedings of the ACM Conference on Java Grande, pages 89–98. ACM, June 1999.

<span id="ref-90"></span>**[90]** J. Reinders. Intel Threading Building Blocks. O'Reilly, 2007.

<span id="ref-102"></span>**[102]** A. Silberschatz, P. Galvin, and G. Gagne. Operating Systems Concepts, Ninth Edition. Wiley, 2014.

<span id="ref-106"></span>**[106]** W. Stallings. Operating Systems: Internals and Design Principles, Eighth Edition. Prentice Hall, 2014.

<span id="ref-110"></span>**[110]** W. R. Stevens, B. Fenner, and A. M. Rudoff. Unix Network Programming: The Sockets Networking API, Third Edition, volume 1. Prentice Hall, 2003.

<span id="ref-113"></span>**[113]** A. S. Tanenbaum and H. Bos. Modern Operating Systems, Fourth Edition. Prentice Hall, 2015.
