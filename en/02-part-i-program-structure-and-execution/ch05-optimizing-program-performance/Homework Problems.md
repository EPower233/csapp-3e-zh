# Homework Problems

[Back to Chapter Contents](./Chapter%205%20Optimizing%20Program%20Performance.md)

## Homework 5.13 (**)

Suppose we wish to write a procedure that computes the inner product of two vectors u and v. An abstract version of the function has a CPE of 14−18 with x86-64 for different types of integer and floating-point data. By doing the same sort of transformations we did to transform the abstract program combine1 into the more efficient combine4, we get the following code:

```c
/* Inner product. Accumulate in temporary */
void inner4(vec_ptr u, vec_ptr v, data_t *dest) {
  long    i;
  long    length = vec_length(u);
  data_t *udata  = get_vec_start(u);
  data_t *vdata  = get_vec_start(v);
  data_t  sum    = (data_t)0;

  for (i = 0; i < length; i++) {
    sum = sum + udata[i] * vdata[i];
  }
  *dest = sum;
}
```

Our measurements show that this function has CPEs of 1.50 for integer data and 3.00 for floating-point data. For data type `double`, the x86-64 assembly code for the inner loop is as follows:

```asm
# Inner loop of inner4. data_t = double, OP = *
# udata in %rbp, vdata in %rax, sum in %xmm0
# i in %rcx, limit in %rbx
.L15:                                       # loop:
    vmovsd  0(%rbp,%rcx,8),  %xmm1          # Get udata[i]
    vmulsd  (%rax,%rcx,8),   %xmm1,  %xmm1  # Multiply by vdata[i]
    vaddsd  %xmm1,           %xmm0,  %xmm0  # Add to sum
    addq    $1,              %rcx           # Increment i
    cmpq    %rbx,            %rcx           # Compare i:limit
    jne     .L15                            # If !=, goto loop
```

Assume that the functional units have the characteristics listed in [Figure 5.12](./5.7%20Understanding%20Modern%20Processors.md#fig-5-12).

A. Diagram how this instruction sequence would be decoded into operations and show how the data dependencies between them would create a critical path of operations, in the style of [Figures 5.13](5.7%20Understanding%20Modern%20Processors.md#fig-5-13) and [5.14](5.7%20Understanding%20Modern%20Processors.md#fig-5-14)

B. For data type `double`, what lower bound on the CPE is determined by the critical path?

C. Assuming similar instruction sequences for the integer code as well, what lower bound on the CPE is determined by the critical path for integer data?

D. Explain how the floating-point versions can have CPEs of 3.00, even though the multiplication operation requires 5 clock cycles.

## Homework 5.14 (*)

Write a version of the inner product procedure described in [Problem 5.13](#Homework%205.13%20%28%2A%2A%29) that uses 6 × 1 loop unrolling. For x86-64, our measurements of the unrolled version give a CPE of 1.07 for integer data but still 3.01 for both floating-point data.

A. Explain why any (scalar) version of an inner product procedure running on an Intel Core i7 Haswell processor cannot achieve a CPE less than 1.00.

B. Explain why the performance for floating-point data did not improve with loop unrolling.

## Homework 5.15 (*)

Write a version of the inner product procedure described in [Problem 5.13](#Homework%205.13%20%28%2A%2A%29) that uses 6 × 6 loop unrolling. Our measurements for this function with x86-64 give a CPE of 1.06 for integer data and 1.01 for floating-point data.

What factor limits the performance to a CPE of 1.00?

## Homework 5.16 (*)

Write a version of the inner product procedure described in [Problem 5.13](#Homework%205.13%20%28%2A%2A%29) that uses 6 × 1a loop unrolling to enable greater parallelism. Our measurements for this function give a CPE of 1.10 for integer data and 1.05 for floating-point data.

## Homework 5.17 (**)

The library function memset has the following prototype:

```c
void *memset(void *s, int c, size_t n);
```

This function fills n bytes of the memory area starting at s with copies of the low-order byte of c. For example, it can be used to zero out a region of memory by giving argument 0 for c, but other values are possible.

The following is a straightforward implementation of `memset`:

```c
/* Basic implementation of memset */
void *basic_memset(void *s, int c, size_t n)
{
    size_t cnt = 0;
    unsigned char *schar = s;
    while (cnt < n) {
        *schar++ = (unsigned char) c;
        cnt++;
    }
    return s;
}
```

Implement a more efficient version of the function by using a word of data type unsigned long to pack eight copies of c, and then step through the region using word-level writes. You might find it helpful to do additional loop unrolling as well. On our reference machine, we were able to reduce the CPE from 1.00 for the straightforward implementation to 0.127. That is, the program is able to write 8 bytes every clock cycle.

Here are some additional guidelines. To ensure portability, let $K$ denote the value of `sizeof(unsigned long)` for the machine on which you run your program.

- You may not call any library functions.
- Your code should work for arbitrary values of $n$, including when it is not a multiple of $K$. You can do this in a manner similar to the way we finish the last few iterations with loop unrolling.
- You should write your code so that it will compile and run correctly on any machine regardless of the value of $K$. Make use of the operation `sizeof` to do this.
- On some machines, unaligned writes can be much slower than aligned ones. (On some non-x86 machines, they can even cause segmentation faults.) Write your code so that it starts with byte-level writes until the destination address is a multiple of $K$, then do word-level writes, and then (if necessary) finish with byte-level writes.
- Beware of the case where `cnt` is small enough that the upper bounds on some of the loops become negative. With expressions involving the `sizeof` operator, the testing may be performed with unsigned arithmetic. (See [Section 2.2.8](./../ch02-representing-and-manipulating-information/2.2%20Integer%20Representations.md#_2-2-8-advice-on-signed-versus-unsigned) and [Problem 2.72](../ch02-representing-and-manipulating-information/Homework%20Problems.md#Homework%202.72%20%28%2A%2A%29).)

## Homework 5.18 (**)

We considered the task of polynomial evaluation in [Practice Problems 5.5](./5.7%20Understanding%20Modern%20Processors.md#practice-problem-5-5) and [5.6](./5.7%20Understanding%20Modern%20Processors.md#practice-problem-5-6), with both a direct evaluation and an evaluation by Horner's method. Try to write faster versions of the function using the optimization techniques we have explored, including loop unrolling, parallel accumulation, and reassociation. You will find many different ways of mixing together Horner's scheme and direct evaluation with these optimization techniques.

Ideally, you should be able to reach a CPE close to the throughput limit of your machine. Our best version achieves a CPE of 1.07 on our reference machine.

## Homework 5.19 (***)

In [Practice Problem 5.12](./5.12%20Understanding%20Memory%20Performance.md#practice-problem-5-12), we were able to reduce the CPE for the prefix-sum computation to 3.00, limited by the latency of floating-point addition on this machine. Simple loop unrolling does not improve things.

Using a combination of loop unrolling and reassociation, write code for a prefix sum that achieves a CPE less than the latency of floating-point addition on your machine. Doing this requires actually increasing the number of additions performed. For example, our version with two-way unrolling requires three additions per iteration, while our version with four-way unrolling requires five. Our best implementation achieves a CPE of 1.67 on our reference machine.

Determine how the throughput and latency limits of your machine limit the minimum CPE you can achieve for the prefix-sum operation.
