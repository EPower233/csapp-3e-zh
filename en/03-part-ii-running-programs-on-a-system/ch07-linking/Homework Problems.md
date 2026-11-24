# Homework Problems

[Back to Chapter Contents](./Chapter%207%20Linking.md)

## Homework 7.6 (*)

This problem concerns the `m.o` module from [Figure 7.5](./7.5%20Symbols%20and%20Symbol%20Tables.md#fig-7-5) and the following version of the `swap.c` function that counts the number of times it has been called:

```c
extern int buf[];

int *bufp0 = &buf[0];
static int *bufp1;

static void incr()
{
    static int count = 0;

    count++;
}

void swap()
{
    int temp;

    incr();
    bufp1 = &buf[1];
    temp = *bufp0;
    *bufp0 = *bufp1;
    *bufp1 = temp;
}
```

For each symbol that is defined and referenced in `swap.c`, indicate if it will have a symbol table entry in the `.symtab` section in module `swap.o`. If so, indicate the module that defines the symbol (`swap.o` or `m.o`), the symbol type (`local`, `global`, or `extern`), and the section (`.text`, `.data`, or `.bss`) it occupies in that module.

| Symbol  | `swap.o` `.symtab` entry? | Symbol type | Module where defined | Section |
| ------- | ------------------------- | ----------- | -------------------- | ------- |
| `buf`   |                           |             |                      |         |
| `bufp0` |                           |             |                      |         |
| `bufp1` |                           |             |                      |         |
| `swap`  |                           |             |                      |         |
| `temp`  |                           |             |                      |         |
| `incr`  |                           |             |                      |         |
| `count` |                           |             |                      |         |

## Homework 7.7 (*)

Without changing any variable names, modify `bar5.c` in [Section 7.6.1](./7.6%20Symbol%20Resolution.md#_7-6-1-how-linkers-resolve-duplicate-symbol-names) so that `foo5.c` prints the correct values of $x$ and $y$ (i.e., the hex representations of integers `15213` and `15212`).

## Homework 7.8 (*)

In this problem, let `REF(x.i) → DEF(x.k)` denote that the linker will associate an arbitrary reference to symbol $x$ in module $i$ to the definition of $x$ in module $k$. For each example below, use this notation to indicate how the linker would resolve references to the multiply-defined symbol in each module. If there is a link-time error (rule 1), write `ERROR`. If the linker arbitrarily chooses one of the definitions (rule 3), write `UNKNOWN`.

A.

```c
/* Module 1 */
int main() {}

/* Module 2 */
static int main = 1;
int p2() {}
```

- (a) `REF(main.1) → DEF(______.______)`
- (b) `REF(main.2) → DEF(______.______)`

B.

```c
/* Module 1 */
int x;
void main() {}

/* Module 2 */
double x;
int p2() {}
```

- (a) `REF(x.1) → DEF(______.______)`
- (b) `REF(x.2) → DEF(______.______)`

C.

```c
/* Module 1 */
int x = 1;
void main() {}

/* Module 2 */
double x = 1.0;
int p2() {}
```

- (a) `REF(x.1) → DEF(______.______)`
- (b) `REF(x.2) → DEF(______.______)`

## Homework 7.9 (*)

Consider the following program, which consists of two object modules:

```c
/* foo6.c */
void p2(void);

int main()
{
    p2();
    return 0;
}
```

```c
/* bar6.c */
#include <stdio.h>
char main;
void p2()
{
    printf("0x%x\n", main);
}
```

When this program is compiled and executed on an x86-64 Linux system, it prints the string `"0x48\n"` and terminates normally, even though function `p2` never initializes variable `main`. Can you explain this?

## Homework 7.10 (**)

Let $a$ and $b$ denote object modules or static libraries in the current directory, and let $a \rightarrow b$ denote that $a$ depends on $b$, in the sense that $b$ defines a symbol that is referenced by $a$. For each of the following scenarios, show the minimal command line (i.e., one with the least number of object file and library arguments) that will allow the static linker to resolve all symbol references:

A. `p.o` → `libx.a` → `p.o`

B. `p.o` → `libx.a` → `liby.a` and `liby.a` → `libx.a`

C. `p.o` → `libx.a` → `liby.a` → `libz.a` and `liby.a` → `libx.a` → `libz.a`

## Homework 7.11 (**)

The program header in [Figure 7.14](./7.8%20Executable%20Object%20Files.md#fig-7-14) indicates that the data segment occupies `0x230` bytes in memory. However, only the first `0x228` bytes of these come from the sections of the executable file. What causes this discrepancy?

## Homework 7.12 (**)

Consider the call to function `swap` in object file `m.o` ([Problem 7.6](#Homework%207.6%20%28%2A%29)).

```asm
9:  e8 00 00 00 00  callq   e <main+0xe>  swap()
```

with the following relocation entry:

```text
r.offset = 0xa
r.symbol = swap
r.type   = R_X86_64_PC32
r.addend = -4
```

A. Suppose that the linker relocates `.text` in `m.o` to address `0x4004e0` and `swap` to address `0x4004f8`. Then what is the value of the relocated reference to `swap` in the `callq` instruction?

B. Suppose that the linker relocates `.text` in `m.o` to address `0x4004d0` and `swap` to address `0x400500`. Then what is the value of the relocated reference to `swap` in the `callq` instruction?

## Homework 7.13 (**)

Performing the following tasks will help you become more familiar with the various tools for manipulating object files.

A. How many object files are contained in the versions of `libc.a` and `libm.a` on your system?

B. Does `gcc -Og` produce different executable code than `gcc -Og -g`?

C. What shared libraries does the GCC driver on your system use?
