# Bibliographic Notes

[Back to Chapter Contents](./Chapter%207%20Linking.md)

Linking is poorly documented in the computer systems literature. Since it lies at the intersection of compilers, computer architecture, and operating systems, linking requires an understanding of code generation, machine-language programming, program instantiation, and virtual memory. It does not fit neatly into any of the usual computer systems specialties and thus is not well covered by the classic texts in these areas. However, Levine's monograph provides a good general reference on the subject [\[69\]](#ref-69). The original IA32 specifications for ELF and DWARF (a specification for the contents of the `.debug` and `.line` sections) are described in [\[54\]](#ref-54). The x86-64 extensions to the ELF file format are described in [\[36\]](#ref-36). The x86-64 application binary interface (ABI) describes the conventions for compiling, linking, and running x86-64 programs, including the rules for relocation and position-independent code [\[77\]](#ref-77).

## References

<span id="ref-36"></span>**[36]** ELF-64 Object File Format, Version 1.5 Draft 2, 1998. Available at [ELF-64 Object File Format PDF](https://uclibc.org/docs/elf-64-gen.pdf).

<span id="ref-54"></span>**[54]** Intel Corporation. Tool Interface Standards Portable Formats Specification, Version 1.1, 1993. Order number 241597.

<span id="ref-69"></span>**[69]** J. R. Levine. Linkers and Loaders. Morgan Kaufmann, 1999.

<span id="ref-77"></span>**[77]** M. Matz, J. Hubička, A. Jaeger, and M. Mitchell. System V application binary interface AMD64 architecture processor supplement. Technical Report, x86–64.org, 2013. Available at [2013 draft 0.99.6 PDF](https://www.cs.dartmouth.edu/sergey/cs258/ABI/x86-64-abi.pdf).
