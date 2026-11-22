# Chapter 7 Linking

## Chapter Contents

- [7.1 Compiler Drivers](./7.1%20Compiler%20Drivers.md)
- [7.2 Static Linking](./7.2%20Static%20Linking.md)
- [7.3 Object Files](./7.3%20Object%20Files.md)
- [7.4 Relocatable Object Files](./7.4%20Relocatable%20Object%20Files.md)
- [7.5 Symbols and Symbol Tables](./7.5%20Symbols%20and%20Symbol%20Tables.md)
- [7.6 Symbol Resolution](./7.6%20Symbol%20Resolution.md)
- [7.7 Relocation](./7.7%20Relocation.md)
- [7.8 Executable Object Files](./7.8%20Executable%20Object%20Files.md)
- [7.9 Loading Executable Object Files](./7.9%20Loading%20Executable%20Object%20Files.md)
- [7.10 Dynamic Linking with Shared Libraries](./7.10%20Dynamic%20Linking%20with%20Shared%20Libraries.md)
- [7.11 Loading and Linking Shared Libraries from Applications](./7.11%20Loading%20and%20Linking%20Shared%20Libraries%20from%20Applications.md)
- [7.12 Position-Independent Code (PIC)](./7.12%20Position-Independent%20Code%20%28PIC%29.md)
- [7.13 Library Interpositioning](./7.13%20Library%20Interpositioning.md)
- [7.14 Tools for Manipulating Object Files](./7.14%20Tools%20for%20Manipulating%20Object%20Files.md)
- [7.15 Summary](./7.15%20Summary.md)
- [Bibliographic Notes](./Bibliographic%20Notes.md)
- [Homework Problems](./Homework%20Problems.md)
- [Solutions to Practice Problems](./Solutions%20to%20Practice%20Problems.md)

## Introduction

Linking is the process of collecting and combining various pieces of code and data into a single file that can be loaded (copied) into memory and executed. Linking can be performed at compile time, when the source code is translated into machine code; at load time, when the program is loaded into memory and executed by the loader; and even at run time, by application programs. On early computer systems, linking was performed manually. On modern systems, linking is performed automatically by programs called linkers.

Linkers play a crucial role in software development because they enable separate compilation. Instead of organizing a large application as one monolithic source file, we can decompose it into smaller, more manageable modules that can be modified and compiled separately. When we change one of these modules, we simply recompile it and relink the application, without having to recompile the other files.

Linking is usually handled quietly by the linker and is not an important issue for students who are building small programs in introductory programming classes. So why bother learning about linking?

- **Understanding linkers will help you build large programs.** Programmers who build large programs often encounter linker errors caused by missing modules, missing libraries, or incompatible library versions. Unless you understand how a linker resolves references, what a library is, and how a linker uses a library to resolve references, these kinds of errors will be baffling and frustrating.
- **Understanding linkers will help you avoid dangerous programming errors.** The decisions that Linux linkers make when they resolve symbol references can silently affect the correctness of your programs. Programs that incorrectly define multiple global variables can pass through the linker without any warnings in the default case. The resulting programs can exhibit baffling runtime behavior and are extremely difficult to debug. We will show you how this happens and how to avoid it.
- **Understanding linking will help you understand how language scoping rules are implemented.** For example, what is the difference between global and local variables? What does it really mean when you define a variable or function with the `static` attribute?
- **Understanding linking will help you understand other important systems concepts.** The executable object files produced by linkers play key roles in important systems functions such as loading and running programs, virtual memory, paging, and memory mapping.
- **Understanding linking will enable you to exploit shared libraries.** For many years, linking was considered to be fairly straightforward and uninteresting. However, with the increased importance of shared libraries and dynamic linking in modern operating systems, linking is a sophisticated process that provides the knowledgeable programmer with significant power. For example, many software products use shared libraries to upgrade shrink-wrapped binaries at run time. Also, many Web servers rely on dynamic linking of shared libraries to serve dynamic content.

This chapter provides a thorough discussion of all aspects of linking, from traditional static linking, to dynamic linking of shared libraries at load time, to dynamic linking of shared libraries at run time. We will describe the basic mechanisms using real examples, and we will identify situations in which linking issues can affect the performance and correctness of your programs. To keep things concrete and understandable, we will couch our discussion in the context of an x86-64 system running Linux and using the standard ELF-64 (hereafter referred to as ELF) object file format. However, it is important to realize that the basic concepts of linking are universal, regardless of the operating system, the ISA, or the object file format. Details may vary, but the concepts are the same.
