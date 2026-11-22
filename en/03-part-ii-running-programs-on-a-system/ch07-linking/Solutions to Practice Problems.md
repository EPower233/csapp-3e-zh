# Solutions to Practice Problems

[Back to Chapter Contents](./Chapter%207%20Linking.md)

## Solution 7.1

The purpose of this problem is to help you understand the relationship between linker symbols and C variables and functions. Notice that the C local variable `temp` does not have a symbol table entry.

| Symbol  | `.symtab` entry? | Symbol type | Module where defined | Section |
| ------- | ---------------- | ----------- | -------------------- | ------- |
| `buf`   | Yes              | extern      | `m.o`                | `.data` |
| `bufp0` | Yes              | global      | `swap.o`             | `.data` |
| `bufp1` | Yes              | global      | `swap.o`             | COMMON  |
| `swap`  | Yes              | global      | `swap.o`             | `.text` |
| `temp`  | No               | —           | —                    | —       |

## Solution 7.2

This is a simple drill that checks your understanding of the rules that a Unix linker uses when it resolves global symbols that are defined in more than one module. Understanding these rules can help you avoid some nasty programming bugs.

A. The linker chooses the strong symbol defined in module 1 over the weak symbol defined in module 2 (rule 2):

- (a) `REF(main.1) → DEF(main.1)`
- (b) `REF(main.2) → DEF(main.1)`

B. This is an `ERROR`, because each module defines a strong symbol `main` (rule 1).

C. The linker chooses the strong symbol defined in module 2 over the weak symbol defined in module 1 (rule 2):

- (a) `REF(x.1) → DEF(x.2)`
- (b) `REF(x.2) → DEF(x.2)`

## Solution 7.3

Placing static libraries in the wrong order on the command line is a common source of linker errors that confuses many programmers. However, once you understand how linkers use static libraries to resolve references, it's pretty straightforward. This little drill checks your understanding of this idea:

A. `gcc p.o libx.a`

B. `gcc p.o libx.a liby.a`

C. `gcc p.o libx.a liby.a libx.a`

## Solution 7.4

This problem concerns the disassembly listing in [Figure 7.12(a)](7.7%20Relocation.md#Figure%207.12). Our purpose here is to give you some practice reading disassembly listings and to check your understanding of PC-relative addressing.

A. The hex address of the relocated reference in [line 5](7.7%20Relocation.md#Figure%207.12) is `0x4004df`.

B. The hex value of the relocated reference in [line 5](7.7%20Relocation.md#Figure%207.12) is `0x5`. Remember that the disassembly listing shows the value of the reference in little-endian byte order.

## Solution 7.5

This problem tests your understanding of how the linker relocates PC-relative references. You were given that

```text
ADDR(s) = ADDR(.text) = 0x4004d0
```

and

```text
ADDR(r.symbol) = ADDR(swap) = 0x4004e8
```

Using the algorithm in [Figure 7.10](./7.7%20Relocation.md#figure-7-10), the linker first computes the runtime address of the reference:

```text
refaddr = ADDR(s) + r.offset
        = 0x4004d0 + 0xa
        = 0x4004da
```

It then updates the reference:

```text
*refptr = (unsigned) (ADDR(r.symbol) + r.addend - refaddr)
        = (unsigned) (0x4004e8       + (-4)      - 0x4004da)
        = (unsigned) (0xa)
```

Thus, in the resulting executable object file, the PC-relative reference to `swap` has a value of `0xa`:

```asm
4004d9:  e8 0a 00 00 00  callq   4004e8 <swap>
```
