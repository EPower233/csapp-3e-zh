# Solutions to Practice Problems

[Back to Chapter Contents](./Chapter%204%20Processor%20Architecture.md)

## Solution 4.1

Encoding instructions by hand is rather tedious, but it will solidify your understanding of the idea that assembly code gets turned into byte sequences by the assembler. In the following output from our Y86-64 assembler, each line shows an address and a byte sequence that starts at that address:

```asm
0x100:                        |  .pos    0x100            # Start code at address 0x100
0x100:  30f30f00000000000000  |  irmovq  $15,   %rbx
0x10a:  2031                  |  rrmovq  %rbx,  %rcx
0x10c:                        |  loop:
0x10c:  4013fdffffffffffffff  |  rmmovq  %rcx,  -3(%rbx)
0x116:  6031                  |  addq    %rbx,  %rcx
0x118:  700c01000000000000    |  jmp     loop
```

Several features of this encoding are worth noting:

- Decimal 15 (line 2) has hex representation `0x000000000000000f`. Writing the bytes in reverse order gives `0f 00 00 00 00 00 00 00`.
- Decimal -3 (line 5) has hex representation `0xfffffffffffffffd`. Writing the bytes in reverse order gives `fd ff ff ff ff ff ff ff`.
- The code starts at address `0x100`. The first instruction requires 10 bytes, while the second requires 2. Thus, the loop target will be `0x0000010c`. Writing these bytes in reverse order gives `0c 01 00 00 00 00 00 00`.

## Solution 4.2

Decoding a byte sequence by hand helps you understand the task faced by a processor. It must read byte sequences and determine what instructions are to be executed. In the following, we show the assembly code used to generate each of the byte sequences. To the left of the assembly code, you can see the address and byte sequence for each instruction.

A. Some operations with immediate data and address displacements:

```asm
0x100:  30f3fcffffffffffffffff  |  irmovq  $-4,   %rbx
0x10a:  40630008000000000000    |  rmmovq  %rsi,  0x800(%rbx)
0x114:  00                      |  halt
```

B. Code including a function call:

```asm
0x200:  a06f                  |  pushq   %rsi
0x202:  800c02000000000000    |  call    proc
0x20b:  00                    |  halt
0x20c:                        |  proc:
0x20c:  30f30a00000000000000  |  irmovq  $10,  %rbx
0x216:  90                    |  ret
```

C. Code containing illegal instruction specifier byte `0xf0`:

```asm
0x300:  50540700000000000000  |  mrmovq  7(%rsp),  %rbp
0x30a:  10                    |  nop
0x30b:  f0                    |  .byte   0xf0            # Invalid instruction code
0x30c:  b01f                  |  popq    %rcx
```

D. Code containing a jump operation:

```asm
0x400:                      |  loop:
0x400:  6113                |  subq    %rcx,  %rbx
0x402:  730004000000000000  |  je      loop
0x40b:  00                  |  halt
```

E. Code containing an invalid second byte in a `pushq` instruction:

```asm
0x500:  6362  |  xorq    %rsi,  %rdx
0x502:  a0    |  .byte   0xa0         # pushq instruction code
0x503:  f0    |  .byte   0xf0         # Invalid register specifier byte
```

## Solution 4.3

Using the `iaddq` instruction, we can rewrite the `sum` function as

```asm
# long sum(long *start, long count)
# start in %rdi, count in %rsi
sum:
    xorq    %rax,    %rax  # sum = 0
    andq    %rsi,    %rsi  # Set condition codes
    jmp     test
loop:
    mrmovq  (%rdi),  %r10  # Get *start
    addq    %r10,    %rax  # Add to sum
    iaddq   $8,      %rdi  # start++
    iaddq   $-1,     %rsi  # count--
test:
    jne     loop           # Stop when 0
    ret
```

## Solution 4.4

GCC, running on an x86-64 machine, produces the following code for `rsum`:

```asm
# long rsum(long *start, long count)
# start in %rdi, count in %rsi
rsum:
    movl      $0,      %eax
    testq     %rsi,    %rsi
    jle       .L9
    pushq     %rbx
    movq      (%rdi),  %rbx
    subq      $1,      %rsi
    addq      $8,      %rdi
    call      rsum
    addq      %rbx,    %rax
    popq      %rbx
.L9:
    rep; ret
```

This can easily be adapted to produce Y86-64 code:

```asm
# long rsum(long *start, long count)
# start in %rdi, count in %rsi
rsum:
    xorq    %rax,    %rax  # Set return value to 0
    andq    %rsi,    %rsi  # Set condition codes
    je      return         # If count == 0, return 0
    pushq   %rbx           # Save callee-saved register
    mrmovq  (%rdi),  %rbx  # Get *start
    irmovq  $-1,     %r10
    addq    %r10,    %rsi  # count--
    irmovq  $8,      %r10
    addq    %r10,    %rdi  # start++
    call    rsum
    addq    %rbx,    %rax  # Add *start to sum
    popq    %rbx           # Restore callee-saved register
return:
    ret
```

## Solution 4.5

This problem gives you a chance to try your hand at writing assembly code.

```asm
# long absSum(long *start, long count)
# start in %rdi, count in %rsi
absSum:
    irmovq  $8,      %r8   # Constant 8
    irmovq  $1,      %r9   # Constant 1
    xorq    %rax,    %rax  # sum = 0
    andq    %rsi,    %rsi  # Set condition codes
    jmp     test
loop:
    mrmovq  (%rdi),  %r10  # x = *start
    xorq    %r11,    %r11  # Constant 0
    subq    %r10,    %r11  # -x
    jle     pos            # Skip if -x <= 0
    rrmovq  %r11,    %r10  # x = -x
pos:
    addq    %r10,    %rax  # Add to sum
    addq    %r8,     %rdi  # start++
    subq    %r9,     %rsi  # count--
test:
    jne     loop           # Stop when 0
    ret
```

## Solution 4.6

This problem gives you a chance to try your hand at writing assembly code with conditional moves. We show only the code for the loop. The rest is the same as for [Practice Problem 4.5](./4.1%20The%20Y86-64%20Instruction%20Set%20Architecture.md#practice-problem-4-5):

```asm
loop:
    mrmovq  (%rdi),  %r10  # x = *start
    xorq    %r11,    %r11  # Constant 0
    subq    %r10,    %r11  # -x
    cmovg   %r11,    %r10  # If -x > 0 then x = -x
    addq    %r10,    %rax  # Add to sum
    addq    %r8,     %rdi  # start++
    subq    %r9,     %rsi  # count--
test:
    jne     loop           # Stop when 0
```

## Solution 4.7

Although it is hard to imagine any practical use for this particular instruction, it is important when designing a system to avoid any ambiguities in the specification. We want to determine a reasonable convention for the instruction's behavior and to make sure each of our implementations adheres to this convention.

The `subq` instruction in this test compares the starting value of `%rsp` to the value pushed onto the stack. The fact that the result of this subtraction is zero implies that the old value of `%rsp` gets pushed.

## Solution 4.8

It is even more difficult to imagine why anyone would want to pop to the stack pointer. Still, we should decide on a convention and stick with it. This code sequence pushes `0xabcd` onto the stack, pops to `%rsp`, and returns the popped value. Since the result equals `0xabcd`, we can deduce that `popq %rsp` sets the stack pointer to the value read from memory. It is therefore equivalent to the instruction `mrmovq (%rsp), %rsp`.

## Solution 4.9

The EXCLUSIVE-OR function requires that the 2 bits have opposite values:

```hcl
bool xor = (!a && b) || (a && !b);
```

In general, the signals `eq` and `xor` will be complements of each other. That is, one will equal 1 whenever the other is 0.

## Solution 4.10

The outputs of the EXCLUSIVE-OR circuits will be the complements of the bit equality values. Using DeMorgan's laws (Web Aside DATA:BOOL on page 52), we can implement AND using OR and NOT, yielding the circuit shown in [Figure 4.71](#fig-4-71).

<div id="fig-4-71" class="anchor-block"></div>

![](../../../public/figures/en/arch/figure-4-71-word-equality.svg)

**Figure 4.71 Solution for [Practice Problem 4.10](4.2%20Logic%20Design%20and%20the%20Hardware%20Control%20Language%20HCL.md#Practice%20Problem%204.10).**

## Solution 4.11

We can see that the second part of the case expression can be written as

```hcl
B <= C : B;
```

Since the first line will detect the case where `A` is the minimum element, the second line need only determine whether `B` or `C` is minimum.

## Solution 4.12

This design is a variant of the one to find the minimum of the three inputs:

```hcl
word Med3 = [
    A <= B && B <= C : B;
    C <= B && B <= A : B;
    B <= A && A <= C : A;
    C <= A && A <= B : A;
    1 : C;
];
```

## Solution 4.13

These exercises help make the stage computations more concrete. We can see from the object code that this instruction is located at address `0x016`. It consists of 10 bytes, with the first two being `0x30` and `0xf4`. The last 8 bytes are a byte-reversed version of `0x0000000000000080` (decimal 128).

| Stage | Generic | Specific |
| --- | --- | --- |
| | `irmovq V, rB` | `irmovq $128, %rsp` |
| Fetch | `icode:ifun ← M1[PC]`<br>`rA:rB ← M1[PC+1]`<br>`valC ← M8[PC+2]`<br>`valP ← PC+10` | `icode:ifun ← M1[0x016] = 3:0`<br>`rA:rB ← M1[0x017] = f:4`<br>`valC ← M8[0x018] = 128`<br>`valP ← 0x016+10 = 0x020` |
| Decode | | |
| Execute | `valE ← 0 + valC` | `valE ← 0 + 128 = 128` |
| Memory | | |
| Write back | `R[rB] ← valE` | `R[%rsp] ← valE = 128` |
| PC update | `PC ← valP` | `PC ← valP = 0x020` |

This instruction sets register `%rsp` to 128 and increments the `PC` by 10.

## Solution 4.14

We can see that the instruction is located at address `0x02c` and consists of 2 bytes with values `0xb0` and `0x00f`. Register `%rsp` was set to 120 by the `pushq` instruction (line 6), which also stored 9 at this memory location.

| Stage | Generic | Specific |
| --- | --- | --- |
| | `popq rA` | `popq %rax` |
| Fetch | `icode:ifun ← M1[PC]`<br>`rA:rB ← M1[PC+1]`<br>`valP ← PC+2` | `icode:ifun ← M1[0x02c] = b:0`<br>`rA:rB ← M1[0x02d] = 0:f`<br>`valP ← 0x02c+2 = 0x02e` |
| Decode | `valA ← R[%rsp]`<br>`valB ← R[%rsp]` | `valA ← R[%rsp] = 120`<br>`valB ← R[%rsp] = 120` |
| Execute | `valE ← valB + 8` | `valE ← 120 + 8 = 128` |
| Memory | `valM ← M8[valA]` | `valM ← M8[120] = 9` |
| Write back | `R[%rsp] ← valE`<br>`R[rA] ← valM` | `R[%rsp] ← 128`<br>`R[%rax] ← 9` |
| PC update | `PC ← valP` | `PC ← 0x02e` |

The instruction sets `%rax` to 9, sets `%rsp` to 128, and increments the `PC` by 2.

## Solution 4.15

Tracing the steps listed in [Figure 4.20](./4.3%20Sequential%20Y86-64%20Implementations.md#fig-4-20) with `rA` equal to `%rsp`, we can see that in the memory stage the instruction will store `valA`, the original value of the stack pointer, to memory, just as we found for x86-64.

## Solution 4.16

Tracing the steps listed in [Figure 4.20](./4.3%20Sequential%20Y86-64%20Implementations.md#fig-4-20) with `rA` equal to `%rsp`, we can see that both of the write-back operations will update `%rsp`. Since the one writing `valM` would occur last, the net effect of the instruction will be to write the value read from memory to `%rsp`, just as we saw for x86-64.

## Solution 4.17

Implementing conditional moves requires only minor changes from register-to-register moves. We simply condition the write-back step on the outcome of the conditional test:

| Stage | `cmovXX rA, rB` |
| --- | --- |
| Fetch | `icode:ifun ← M1[PC]`<br>`rA:rB ← M1[PC+1]`<br>`valP ← PC+2` |
| Decode | `valA ← R[rA]` |
| Execute | `valE ← 0 + valA`<br>`Cnd ← Cond(CC, ifun)` |
| Memory | |
| Write back | `if (Cnd) R[rB] ← valE` |
| PC update | `PC ← valP` |

## Solution 4.18

We can see that this instruction is located at address `0x037` and is 9 bytes long. The first byte has value `0x80`, while the last 8 bytes are a byte-reversed version of `0x0000000000000041`, the call target. The stack pointer was set to 128 by the `popq` instruction (line 7).

| Stage | Generic | Specific |
| --- | --- | --- |
| | `call Dest` | `call 0x041` |
| Fetch | `icode:ifun ← M1[PC]`<br>`valC ← M8[PC+1]`<br>`valP ← PC+9` | `icode:ifun ← M1[0x037] = 8:0`<br>`valC ← M8[0x038] = 0x041`<br>`valP ← 0x037+9 = 0x040` |
| Decode | `valB ← R[%rsp]` | `valB ← R[%rsp] = 128` |
| Execute | `valE ← valB + (-8)` | `valE ← 128 + (-8) = 120` |
| Memory | `M8[valE] ← valP` | `M8[120] ← 0x040` |
| Write back | `R[%rsp] ← valE` | `R[%rsp] ← 120` |
| PC update | `PC ← valC` | `PC ← 0x041` |

The effect of this instruction is to set `%rsp` to 120, to store `0x040` (the return address) at this memory address, and to set the `PC` to `0x041` (the call target).

## Solution 4.19

All of the HCL code in this and other practice problems is straightforward, but trying to generate it yourself will help you think about the different instructions and how they are processed. For this problem, we can simply look at the set of Y86-64 instructions ([Figure 4.2](./4.1%20The%20Y86-64%20Instruction%20Set%20Architecture.md#fig-4-2)) and determine which have a constant field.

```hcl
bool need_valC =
    icode in { IIRMOVQ, IRMMOVQ, IMRMOVQ, IJXX, ICALL };
```

## Solution 4.20

This code is similar to the code for `srcA`.

```hcl
word srcB = [
    icode in { IOPQ, IRMMOVQ, IMRMOVQ } : rB;
    icode in { IPUSHQ, IPOPQ, ICALL, IRET } : RRSP;
    1 : RNONE; # Don't need register
];
```

## Solution 4.21

This code is similar to the code for `dstE`.

```hcl
word dstM = [
    icode in { IMRMOVQ, IPOPQ } : rA;
    1 : RNONE; # Don't write any register
];
```

## Solution 4.22

As we found in [Practice Problem 4.16](./4.3%20Sequential%20Y86-64%20Implementations.md#practice-problem-4-16), we want the write via the `M` port to take priority over the write via the `E` port in order to store the value read from memory into `%rsp`.

## Solution 4.23

This code is similar to the code for `aluA`.

```hcl
word aluB = [
    icode in { IRMMOVQ, IMRMOVQ, IOPQ, ICALL,
               IPUSHQ, IRET, IPOPQ } : valB;
    icode in { IRRMOVQ, IIRMOVQ } : 0;
    # Other instructions don't need ALU
];
```

## Solution 4.24

Implementing conditional moves is surprisingly simple: we disable writing to the register file by setting the destination register to `RNONE` when the condition does not hold.

```hcl
word dstE = [
    icode in { IRRMOVQ } && Cnd : rB;
    icode in { IIRMOVQ, IOPQ } : rB;
    icode in { IPUSHQ, IPOPQ, ICALL, IRET } : RRSP;
    1 : RNONE; # Don't write any register
];
```

## Solution 4.25

This code is similar to the code for `mem_addr`.

```hcl
word mem_data = [
    # Value from register
    icode in { IRMMOVQ, IPUSHQ } : valA;
    # Return PC
    icode == ICALL : valP;
    # Default: Don't write anything
];
```

## Solution 4.26

This code is similar to the code for `mem_read`.

```hcl
bool mem_write = icode in { IRMMOVQ, IPUSHQ, ICALL };
```

## Solution 4.27

Computing the `Stat` field requires collecting status information from several stages:

```hcl
## Determine instruction status
word Stat = [
    imem_error || dmem_error : SADR;
    !instr_valid : SINS;
    icode == IHALT : SHLT;
    1 : SAOK;
];
```

## Solution 4.28

This problem is an interesting exercise in trying to find the optimal balance among a set of partitions. It provides a number of opportunities to compute throughputs and latencies in pipelines.

A. For a two-stage pipeline, the best partition would be to have blocks A, B, and C in the first stage and D, E, and F in the second. The first stage has a delay of 170 ps, giving a total cycle time of $170 + 20 = 190$ ps. We therefore have a throughput of 5.26 GIPS and a latency of 380 ps.

B. For a three-stage pipeline, we should have blocks A and B in the first stage, blocks C and D in the second, and blocks E and F in the third. The first two stages have a delay of 110 ps, giving a total cycle time of 130 ps and a throughput of 7.69 GIPS. The latency is 390 ps.

C. For a four-stage pipeline, we should have block A in the first stage, blocks B and C in the second, block D in the third, and blocks E and F in the fourth. The second stage requires 90 ps, giving a total cycle time of 110 ps and a throughput of 9.09 GIPS. The latency is 440 ps.

D. The optimal design would be a five-stage pipeline, with each block in its own stage, except that the fifth stage has blocks E and F. The cycle time is $80 + 20 = 100$ ps, for a throughput of around 10.00 GIPS and a latency of 500 ps. Adding more stages would not help, since we cannot run the pipeline any faster than one cycle every 100 ps.

## Solution 4.29

Each stage would have combinational logic requiring $300/k$ ps and a pipeline register requiring 20 ps.

A. The total latency would be $300 + 20k$ ps, while the throughput (in GIPS) would be

$$
\frac{1,000}{\frac{300}{k} + 20} = \frac{1,000k}{300 + 20k}
$$

B. As we let $k$ go to infinity, the throughput becomes $1,000/20 = 50$ GIPS. Of course, the latency would approach infinity as well.

This exercise quantifies the diminishing returns of deep pipelining. As we try to subdivide the logic into many stages, the latency of the pipeline registers becomes a limiting factor.

## Solution 4.30

This code is very similar to the corresponding code for SEQ, except that we cannot yet determine whether the data memory will generate an error signal for this instruction.

```hcl
# Determine status code for fetched instruction
word f_stat = [
    imem_error : SADR;
    !instr_valid : SINS;
    f_icode == IHALT : SHLT;
    1 : SAOK;
];
```

## Solution 4.31

This code simply involves prefixing the signal names in the code for SEQ with `d_` and `D_`:

```hcl
word d_dstE = [
    D_icode in { IRRMOVQ, IIRMOVQ, IOPQ } : D_rB;
    D_icode in { IPUSHQ, IPOPQ, ICALL, IRET } : RRSP;
    1 : RNONE; # Don't write any register
];
```

## Solution 4.32

The `rrmovq` instruction (line 5) would stall for one cycle due to a load/use hazard caused by the `popq` instruction (line 4). As it enters the decode stage, the `popq` instruction would be in the memory stage, giving both `M_dstE` and `M_dstM` equal to `%rsp`. If the two cases were reversed, then the write back from `M_valE` would take priority, causing the incremented stack pointer to be passed as the argument to the `rrmovq` instruction. This would not be consistent with the convention for handling `popq %rsp` determined in [Practice Problem 4.8](./4.1%20The%20Y86-64%20Instruction%20Set%20Architecture.md#practice-problem-4-8).

## Solution 4.33

This problem lets you experience one of the important tasks in processor design—devising test programs for a new processor. In general, we should have test programs that will exercise all of the different hazard possibilities and will generate incorrect results if some dependency is not handled properly.

For this example, we can use a slightly modified version of the program shown in [Practice Problem 4.32](./4.5%20Pipelined%20Y86-64%20Implementations.md#practice-problem-4-32):

```asm
    irmovq  $5,      %rdx
    irmovq  $0x100,  %rsp
    rmmovq  %rdx,    0(%rsp)
    popq    %rsp
    nop
    nop
    rrmovq  %rsp,    %rax
```

The two `nop` instructions will cause the `popq` instruction to be in the write-back stage when the `rrmovq` instruction is in the decode stage. If the two forwarding sources in the write-back stage are given the wrong priority, then register `%rax` will be set to the incremented program counter rather than the value read from memory.

## Solution 4.34

This logic only needs to check the five forwarding sources:

```hcl
word d_valB = [
    d_srcB == e_dstE : e_valE; # Forward valE from execute
    d_srcB == M_dstM : m_valM; # Forward valM from memory
    d_srcB == M_dstE : M_valE; # Forward valE from memory
    d_srcB == W_dstM : W_valM; # Forward valM from write back
    d_srcB == W_dstE : W_valE; # Forward valE from write back
    1 : d_rvalB;               # Use value read from register file
];
```

## Solution 4.35

This change would not handle the case where a conditional move fails to satisfy the condition, and therefore sets the `dstE` value to `RNONE`. The resulting value could get forwarded to the next instruction, even though the conditional transfer does not occur.

```asm
    irmovq  $0x123,  %rax
    irmovq  $0x321,  %rdx
    xorq    %rcx,    %rcx  # CC = 100
    cmovne  %rax,    %rdx  # Not transferred
    addq    %rdx,    %rdx  # Should be 0x642
    halt
```

This code initializes register `%rdx` to `0x321`. The conditional data transfer does not take place, and so the final `addq` instruction should double the value in `%rdx` to `0x642`. With the altered design, however, the conditional move source value `0x321` gets forwarded into ALU input `valA`, while input `valB` correctly gets operand value `0x123`. These inputs get added to produce result `0x444`.

## Solution 4.36

This code completes the computation of the status code for this instruction.

```hcl
## Update the status
word m_stat = [
    dmem_error : SADR;
    1 : M_stat;
];
```

## Solution 4.37

The following test program is designed to set up control combination A ([Figure 4.67](./4.5%20Pipelined%20Y86-64%20Implementations.md#fig-4-67)) and detect whether something goes wrong:

```asm
# Code to generate a combination of not-taken branch and ret
        irmovq  Stack,  %rsp
        irmovq  rtnp,   %rax
        pushq   %rax          # Set up return pointer
        xorq    %rax,   %rax  # Set Z condition code
        jne     target        # Not taken (First part of combination)
        irmovq  $1,     %rax  # Should execute this
        halt
target: ret                   # Second part of combination
        irmovq  $2,     %rbx  # Should not execute this
        halt
rtnp:   irmovq  $3,     %rdx  # Should not execute this
        halt
        .pos    0x40
Stack:
```

This program is designed so that if something goes wrong (for example, if the `ret` instruction is actually executed), then the program will execute one of the extra `irmovq` instructions and then halt. Thus, an error in the pipeline would cause some register to be updated incorrectly. This code illustrates the care required to implement a test program. It must set up a potential error condition and then detect whether or not an error occurs.

## Solution 4.38

The following test program is designed to set up control combination B ([Figure 4.67](./4.5%20Pipelined%20Y86-64%20Implementations.md#fig-4-67)). The simulator will detect a case where the bubble and stall control signals for a pipeline register are both set to zero, and so our test program need only set up the combination for it to be detected. The biggest challenge is to make the program do something sensible when handled correctly.

```asm
# Test instruction that modifies %rsp followed by ret
        irmovq  mem,      %rbx
        mrmovq  0(%rbx),  %rsp  # Sets %rsp to point to return point
        ret                     # Returns to return point
        halt                    #
rtnpt:  irmovq  $5,       %rsi  # Return point
        halt
        .pos    0x40
mem:    .quad   stack           # Holds desired stack pointer
        .pos    0x50
stack:  .quad   rtnpt           # Top of stack: Holds return point
```

This program uses two initialized words in memory. The first word (`mem`) holds the address of the second (`stack`—the desired stack pointer). The second word holds the address of the desired return point for the `ret` instruction. The program loads the stack pointer into `%rsp` and executes the `ret` instruction.

## Solution 4.39

From [Figure 4.66](./4.5%20Pipelined%20Y86-64%20Implementations.md#fig-4-66), we can see that pipeline register `D` must be stalled for a load/use hazard:

```hcl
bool D_stall =
    # Conditions for a load/use hazard
    E_icode in { IMRMOVQ, IPOPQ } &&
    E_dstM in { d_srcA, d_srcB };
```

## Solution 4.40

From [Figure 4.66](./4.5%20Pipelined%20Y86-64%20Implementations.md#fig-4-66), we can see that pipeline register `E` must be set to bubble for a load/use hazard or for a mispredicted branch:

```hcl
bool E_bubble =
    # Mispredicted branch
    (E_icode == IJXX && !e_Cnd) ||
    # Conditions for a load/use hazard
    E_icode in { IMRMOVQ, IPOPQ } &&
    E_dstM in { d_srcA, d_srcB };
```

## Solution 4.41

This control requires examining the code of the executing instruction and checking for exceptions further down the pipeline.

```hcl
## Should the condition codes be updated?
bool set_cc = E_icode == IOPQ &&
    # State changes only during normal operation
    !m_stat in { SADR, SINS, SHLT } && !W_stat in { SADR, SINS, SHLT };
```

## Solution 4.42

Injecting a bubble into the memory stage on the next cycle involves checking for an exception in either the memory or the write-back stage during the current cycle.

```hcl
# Start injecting bubbles as soon as exception passes through memory stage
bool M_bubble = m_stat in { SADR, SINS, SHLT } || W_stat in { SADR, SINS, SHLT };
```

For stalling the write-back stage, we check only the status of the instruction in this stage. If we also stalled when an excepting instruction was in the memory stage, then this instruction would not be able to enter the write-back stage.

```hcl
bool W_stall = W_stat in { SADR, SINS, SHLT };
```

## Solution 4.43

We would then have a misprediction frequency of 0.35, giving $mp = 0.20 \times 0.35 \times 2 = 0.14$, giving an overall CPI of 1.25. This seems like a fairly marginal gain, but it would be worthwhile if the cost of implementing the new branch prediction strategy were not too high.

## Solution 4.44

This simplified analysis, where we focus on the inner loop, is a useful way to estimate program performance. As long as the array is sufficiently large, the time spent in other parts of the code will be negligible.

A. The inner loop of the code using the conditional jump has 11 instructions, all of which are executed when the array element is zero or negative, and 10 of which are executed when the array element is positive. The average is 10.5. The inner loop of the code using the conditional move has 10 instructions, all of which are executed every time.

B. The loop-closing jump will be predicted correctly, except when the loop terminates. For a very long array, this one misprediction will have a negligible effect on the performance. The only other source of bubbles for the jump-based code is the conditional jump, depending on whether or not the array element is positive. This will cause two bubbles, but it only occurs 50% of the time, so the average is 1.0. There are no bubbles in the conditional move code.

C. Our conditional jump code requires an average of $10.5 + 1.0 = 11.5$ cycles per array element (11 cycles in the best case and 12 cycles in the worst), while our conditional move code requires 10.0 cycles in all cases.

Our pipeline has a branch misprediction penalty of only two cycles—far better than those for the deep pipelines of higher-performance processors. As a result, using conditional moves does not affect program performance very much.
