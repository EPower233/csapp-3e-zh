# Bibliographic Notes

[Back to Chapter Contents](./Chapter%205%20Optimizing%20Program%20Performance.md)

Our focus has been to describe code optimization from the programmer's perspective, demonstrating how to write code that will make it easier for compilers to generate efficient code. An extended paper by Chellappa, Franchetti, and Püschel [\[19\]](#ref-19) takes a similar approach but goes into more detail with respect to the processor's characteristics.

Many publications describe code optimization from a compiler's perspective, formulating ways that compilers can generate more efficient code. Muchnick's book is considered the most comprehensive [\[80\]](#ref-80). Wadleigh and Crawford's book on software optimization [\[115\]](#ref-115) covers some of the material we have presented, but it also describes the process of getting high performance on parallel machines. An early paper by Mahlke et al. [\[75\]](#ref-75) describes how several techniques developed for compilers that map programs onto parallel machines can be adapted to exploit the instruction-level parallelism of modern processors. This paper covers the code transformations we presented, including loop unrolling, multiple accumulators (which they refer to as accumulator variable expansion), and reassociation (which they refer to as tree height reduction).

Our presentation of the operation of an out-of-order processor is fairly brief and abstract. More complete descriptions of the general principles can be found in advanced computer architecture textbooks, such as the one by Hennessy and Patterson [**46**, Ch. 2–3]. Shen and Lipasti's book [\[100\]](#ref-100) provides an in-depth treatment of modern processor design.

## References

<span id="ref-5"></span>**[5]** K. Arnold, J. Gosling, and D. Holmes. The Java Programming Language, Fourth Edition. Prentice Hall, 2005.

<span id="ref-19"></span>**[19]** S. Chellappa, F. Franchetti, and M. Püschel. How to write fast numerical code: A small introduction. In Generative and Transformational Techniques in Software Engineering II, volume 5235 of Lecture Notes in Computer Science, pages 196–259. Springer-Verlag, 2008.

<span id="ref-49"></span>**[49]** Intel Corporation. Intel 64 and IA-32 Architectures Optimization Reference Manual. Available at [Intel manuals](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html).

<span id="ref-75"></span>**[75]** S. A. Mahlke, W. Y. Chen, J. C. Gyllenhal, and W. W. Hwu. Compiler code transformations for superscalar-based high-performance systems. In Proceedings of the 1992 ACM/IEEE Conference on Supercomputing, pages 808–817. ACM, 1992.

<span id="ref-80"></span>**[80]** S. S. Muchnick. Advanced Compiler Design and Implementation. Morgan Kaufmann, 1997.

<span id="ref-98"></span>**[98]** R. Sedgewick and K. Wayne. Algorithms, Fourth Edition. Addison-Wesley, 2011.

<span id="ref-100"></span>**[100]** J. P. Shen and M. Lipasti. Modern Processor Design: Fundamentals of Superscalar Processors. McGraw Hill, 2005.

<span id="ref-115"></span>**[115]** K. P. Wadleigh and I. L. Crawford. Software Optimization for High-Performance Computing: Creating Faster Applications. Prentice Hall, 2000.
