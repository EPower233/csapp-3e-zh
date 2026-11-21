# Solutions to Practice Problems

[Back to Chapter Contents](./Chapter%205%20Optimizing%20Program%20Performance.md)

## Solution 5.1

This problem illustrates some of the subtle effects of memory aliasing.

As the following commented code shows, the effect will be to set the value at `xp` to zero:

```c
*xp = *xp + *xp; /* 2x */
*xp = *xp - *xp; /* 2x-2x = 0 */
*xp = *xp - *xp; /* 0-0 = 0 */
```

This example illustrates that our intuition about program behavior can often be wrong. We naturally think of the case where `xp` and `yp` are distinct but overlook the possibility that they might be equal. Bugs often arise due to conditions the programmer does not anticipate.

## Solution 5.2

This problem illustrates the relationship between CPE and absolute performance. It can be solved using elementary algebra. We find that for $n \le 2$, version 1 is the fastest. Version 2 is fastest for $3 \le n \le 7$, and version 3 is fastest for $n \ge 8$.

## Solution 5.3

This is a simple exercise, but it is important to recognize that the four statements of a `for` loop—initial, test, update, and body—get executed different numbers of times.

| Code | min | max | incr | square |
| --- | --- | --- | --- | --- |
| A. | 1 | 91 | 90 | 90 |
| B. | 91 | 1 | 90 | 90 |
| C. | 1 | 1 | 90 | 90 |

## Solution 5.4

This assembly code demonstrates a clever optimization opportunity detected by GCC. It is worth studying this code carefully to better understand the subtleties of code optimization.

A. In the less optimized code, register `%xmm0` is simply used as a temporary value, both set and used on each loop iteration. In the more optimized code, it is used more in the manner of variable `acc` in `combine4`, accumulating the product of the vector elements. The difference with `combine4`, however, is that location `dest` is updated on each iteration by the second `vmovsd` instruction.

We can see that this optimized version operates much like the following C code:

```c
/* Make sure dest updated on each iteration */
void combine3w(vec_ptr v, data_t* dest) {
  long i;
  long length = vec_length(v);
  data_t* data = get_vec_start(v);
  data_t acc = IDENT;

  /* Initialize in event length <= 0 */
  *dest = acc;

  for (i = 0; i < length; i++) {
    acc = acc OP data[i];
    *dest = acc;
  }
}
```

B. The two versions of `combine3` will have identical functionality, even with memory aliasing.

C. This transformation can be made without changing the program behavior, because, with the exception of the first iteration, the value read from `dest` at the beginning of each iteration will be the same value written to this register at the end of the previous iteration. Therefore, the combining instruction can simply use the value already in `%xmm0` at the beginning of the loop.

## Solution 5.5

Polynomial evaluation is a core technique for solving many problems. For example, polynomial functions are commonly used to approximate trigonometric functions in math libraries.

A. The function performs $2n$ multiplications and $n$ additions.

B. We can see that the performance-limiting computation here is the repeated computation of the expression `xpwr = x * xpwr`. This requires a floating-point multiplication (5 clock cycles), and the computation for one iteration cannot begin until the one for the previous iteration has completed. The updating of `result` only requires a floating-point addition (3 clock cycles) between successive iterations.

## Solution 5.6

This problem demonstrates that minimizing the number of operations in a computation may not improve its performance.

A. The function performs $n$ multiplications and $n$ additions, half the number of multiplications as the original function `poly`.

B. We can see that the performance-limiting computation here is the repeated computation of the expression `result = a[i] + x * result`. Starting from the value of `result` from the previous iteration, we must first multiply it by `x` (5 clock cycles) and then add it to `a[i]` (3 cycles) before we have the value for this iteration. Thus, each iteration imposes a minimum latency of 8 cycles, exactly our measured CPE.

C. Although each iteration in function `poly` requires two multiplications rather than one, only a single multiplication occurs along the critical path per iteration.

## Solution 5.7

The following code directly follows the rules we have stated for unrolling a loop by some factor $k$:

```c
void unroll5(vec_ptr v, data_t* dest) {
  long i;
  long length = vec_length(v);
  long limit = length - 4;
  data_t* data = get_vec_start(v);
  data_t acc = IDENT;

  /* Combine 5 elements at a time */
  for (i = 0; i < limit; i += 5) {
    acc = acc OP data[i] OP data[i + 1];
    acc = acc OP data[i + 2] OP data[i + 3];
    acc = acc OP data[i + 4];
  }

  /* Finish any remaining elements */
  for (; i < length; i++) {
    acc = acc OP data[i];
  }
  *dest = acc;
}
```

## Solution 5.8

This problem demonstrates how small changes in a program can yield dramatic performance differences, especially on a machine with out-of-order execution. [Figure 5.39](#figure-5-39) diagrams the three multiplication operations for a single iteration of the function. In this figure, the operations shown as blue boxes are along the critical path—they need to be computed in sequence to compute a new value for loop variable `r`. The operations shown as light boxes can be computed in parallel with the critical path operations. For a loop with $P$ operations along the critical path, each iteration will require a minimum of $5P$ clock cycles and will compute the product for three elements, giving a lower bound on the CPE of $5P/3$. This implies lower bounds of 5.00 for A1, 3.33 for A2 and A5, and 1.67 for A3 and A4. We ran these functions on an Intel Core i7 Haswell processor and found that it could achieve these CPE values.

### Figure 5.39

![](../../../public/figures/en/opt/figure-5-39-multiply-dependencies.svg)

Figure 5.39 Data dependencies among multiplication operations for cases in [Practice Problem 5.8](./5.9%20Enhancing%20Parallelism.md#practice-problem-5-8). The operations shown as blue boxes form the critical paths for the iterations.

## Solution 5.9

This is another demonstration that a slight change in coding style can make it much easier for the compiler to detect opportunities to use conditional moves:

```c
while (i1 < n && i2 < n) {
  long v1    = src1[i1];
  long v2    = src2[i2];
  long take1 = v1 < v2;
  dest[id++] = take1 ? v1 : v2;
  i1 += take1;
  i2 += (1 - take1);
}
```

We measured a CPE of around 12.0 for this version of the code, a modest improvement over the original CPE of 15.0.

## Solution 5.10

This problem requires you to analyze the potential load-store interactions in a program.

A. It will set each element `a[i]` to $i + 1$, for $0 \le i \le 998$.

B. It will set each element `a[i]` to 0, for $1 \le i \le 999$.

C. In the second case, the load of one iteration depends on the result of the store from the previous iteration. Thus, there is a write/read dependency between successive iterations.

D. It will give a CPE of 1.2, the same as for Example A, since there are no dependencies between stores and subsequent loads.

## Solution 5.11

We can see that this function has a write/read dependency between successive iterations—the destination value `p[i]` on one iteration matches the source value `p[i-1]` on the next. A critical path is therefore formed for each iteration consisting of a store (from the previous iteration), a load, and a floating-point addition. The CPE measurement of 9.0 is consistent with our measurement of 7.3 for the CPE of `write_read` when there is a data dependency, since `write_read` involves an integer addition (1 clock-cycle latency), while `psum1` involves a floating-point addition (3 clock-cycle latency).

## Solution 5.12

Here is a revised version of the function:

```c
void psum1a(float a[], float p[], long n) {
  long i;
  /* last_val holds p[i-1]; val holds p[i] */
  float last_val, val;
  last_val = p[0] = a[0];
  for (i = 1; i < n; i++) {
    val      = last_val + a[i];
    p[i]     = val;
    last_val = val;
  }
}
```

We introduce a local variable `last_val`. At the start of iteration `i`, it holds the value of `p[i-1]`. We then compute `val` to be the value of `p[i]` and to be the new value for `last_val`.

This version compiles to the following assembly code:

```asm
# Inner loop of psum1a
# a in %rdi, i in %rax, cnt in %rdx, last_val in %xmm0
.L16:                                      # loop:
    vaddss  (%rdi,%rax,4),  %xmm0,  %xmm0  # last_val = val = last_val + a[i]
    vmovss  %xmm0,          (%rsi,%rax,4)  # Store val in p[i]
    addq    $1,             %rax           # Increment i
    cmpq    %rdx,           %rax           # Compare i:cnt
    jne     .L16                           # If !=, goto loop
```

This code holds `last_val` in `%xmm0`, avoiding the need to read `p[i-1]` from memory and thus eliminating the write/read dependency seen in `psum1`.
