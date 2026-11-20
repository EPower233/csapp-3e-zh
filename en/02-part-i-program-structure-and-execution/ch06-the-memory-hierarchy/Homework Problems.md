# Homework Problems

[Back to Chapter Contents](./Chapter%206%20The%20Memory%20Hierarchy.md)

## Homework 6.22 (**)

Suppose you are asked to design a rotating disk where the number of bits per track is constant. You know that the number of bits per track is determined by the circumference of the innermost track, which you can assume is also the circumference of the hole. Thus, if you make the hole in the center of the disk larger, the number of bits per track increases, but the total number of tracks decreases. If you let $r$ denote the radius of the platter, and $x \cdot r$ the radius of the hole, what value of $x$ maximizes the capacity of the disk?

## Homework 6.23 (*)

Estimate the average time (in ms) to access a sector on the following disk:

| Parameter | Value |
| --- | --- |
| Rotational rate | 15,000 RPM |
| $T_{\text{avg seek}}$ | 4 ms |
| Average number of sectors/track | 800 |

## Homework 6.24 (**)

Suppose that a 2 MB file consisting of 512-byte logical blocks is stored on a disk drive with the following characteristics:

| Parameter | Value |
| --- | --- |
| Rotational rate | 15,000 RPM |
| $T_{\text{avg seek}}$ | 4 ms |
| Average number of sectors/track | 1,000 |
| Surfaces | 8 |
| Sector size | 512 bytes |

For each case below, suppose that a program reads the logical blocks of the file sequentially, one after the other, and that the time to position the head over the first block is $T_{\text{avg seek}} + T_{\text{avg rotation}}$.

A. **Best case:** Estimate the optimal time (in ms) required to read the file over all possible mappings of logical blocks to disk sectors.

B. **Random case:** Estimate the time (in ms) required to read the file if blocks are mapped randomly to disk sectors.

## Homework 6.25 (*)

The following table gives the parameters for a number of different caches. For each cache, fill in the missing fields in the table. Recall that $m$ is the number of physical address bits, $C$ is the cache size (number of data bytes), $B$ is the block size in bytes, $E$ is the associativity, $S$ is the number of cache sets, $t$ is the number of tag bits, $s$ is the number of set index bits, and $b$ is the number of block offset bits.

| Cache | $m$ | $C$ | $B$ | $E$ | $S$ | $t$ | $s$ | $b$ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. | 32 | 1,024 | 4 | 4 | | | | |
| 2. | 32 | 1,024 | 4 | 256 | | | | |
| 3. | 32 | 1,024 | 8 | 1 | | | | |
| 4. | 32 | 1,024 | 8 | 128 | | | | |
| 5. | 32 | 1,024 | 32 | 1 | | | | |
| 6. | 32 | 1,024 | 32 | 4 | | | | |

## Homework 6.26 (*)

The following table gives the parameters for a number of different caches. Your task is to fill in the missing fields in the table. Recall that $m$ is the number of physical address bits, $C$ is the cache size (number of data bytes), $B$ is the block size in bytes, $E$ is the associativity, $S$ is the number of cache sets, $t$ is the number of tag bits, $s$ is the number of set index bits, and $b$ is the number of block offset bits.

| Cache | $m$ | $C$ | $B$ | $E$ | $S$ | $t$ | $s$ | $b$ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. | 32 | | 8 | 1 | | 21 | 8 | 3 |
| 2. | 32 | 2,048 | | | 128 | 23 | 7 | 2 |
| 3. | 32 | 1,024 | 2 | 8 | 64 | | | 1 |
| 4. | 32 | 1,024 | | 2 | 16 | 23 | 4 | |

## Homework 6.27 (*)

This problem concerns the cache in [Practice Problem 6.12](./6.4%20Cache%20Memories.md#practice-problem-6-12).

A. List all of the hex memory addresses that will hit in set 1.

B. List all of the hex memory addresses that will hit in set 6.

## Homework 6.28 (**)

This problem concerns the cache in [Practice Problem 6.12](./6.4%20Cache%20Memories.md#practice-problem-6-12).

A. List all of the hex memory addresses that will hit in set 2.

B. List all of the hex memory addresses that will hit in set 4.

C. List all of the hex memory addresses that will hit in set 5.

D. List all of the hex memory addresses that will hit in set 7.

## Homework 6.29 (**)

Suppose we have a system with the following properties:

- The memory is byte addressable.
- Memory accesses are to 1-byte words (not to 4-byte words).
- Addresses are 12 bits wide.
- The cache is two-way set associative ($E = 2$), with a 4-byte block size ($B = 4$) and four sets ($S = 4$).

The contents of the cache are as follows, with all addresses, tags, and values given in hexadecimal notation:

| Set index | Tag | Valid | Byte 0 | Byte 1 | Byte 2 | Byte 3 |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 00 | 1 | 40 | 41 | 42 | 43 |
|  | 83 | 1 | FE | 97 | CC | D0 |
| 1 | 00 | 1 | 44 | 45 | 46 | 47 |
|  | 83 | 0 | — | — | — | — |
| 2 | 00 | 1 | 48 | 49 | 4A | 4B |
|  | 40 | 0 | — | — | — | — |
| 3 | FF | 1 | 9A | C0 | 03 | FF |
|  | 00 | 0 | — | — | — | — |

A. The following diagram shows the format of an address (1 bit per box). Indicate (by labeling the diagram) the fields that would be used to determine the following:

CO: The cache block offset

CI: The cache set index

CT: The cache tag

![](../../../public/figures/en/mem/cache-address-exercise-blank.svg)

B. For each of the following memory accesses, indicate if it will be a cache hit or miss when carried out in sequence as listed. Also give the value of a read if it can be inferred from the information in the cache.

| Operation | Address | Hit? | Read value (or unknown) |
| --- | --- | --- | --- |
| Read | `0x834` | | |
| Write | `0x836` | | |
| Read | `0xFFD` | | |

## Homework 6.30 (*)

Suppose we have a system with the following properties:

- The memory is byte addressable.
- Memory accesses are to 1-byte words (not to 4-byte words).
- Addresses are 13 bits wide.
- The cache is 4-way set associative ($E = 4$), with a 4-byte block size ($B = 4$) and eight sets ($S = 8$).

Consider the following cache state. All addresses, tags, and values are given in hexadecimal format. The Index column contains the set index for each set of four lines. The Tag columns contain the tag value for each line. The V columns contain the valid bit for each line. The Bytes 0–3 columns contain the data for each line, numbered left to right starting with byte 0 on the left.

4-way set associative cache

<table>
  <tr>
    <td>Index</td>
    <td>Tag</td><td>V</td><td colspan="4">Bytes 0–3</td>
    <td>Tag</td><td>V</td><td colspan="4">Bytes 0–3</td>
    <td>Tag</td><td>V</td><td colspan="4">Bytes 0–3</td>
    <td>Tag</td><td>V</td><td colspan="4">Bytes 0–3</td>
  </tr>
  <tr><td>0</td><td>F0</td><td>1</td><td>ED</td><td>32</td><td>0A</td><td>A2</td><td>8A</td><td>1</td><td>BF</td><td>80</td><td>1D</td><td>FC</td><td>14</td><td>1</td><td>EF</td><td>09</td><td>86</td><td>2A</td><td>BC</td><td>0</td><td>25</td><td>44</td><td>6F</td><td>1A</td></tr>
  <tr><td>1</td><td>BC</td><td>0</td><td>03</td><td>3E</td><td>CD</td><td>38</td><td>A0</td><td>0</td><td>16</td><td>7B</td><td>ED</td><td>5A</td><td>BC</td><td>1</td><td>8E</td><td>4C</td><td>DF</td><td>18</td><td>E4</td><td>1</td><td>FB</td><td>B7</td><td>12</td><td>02</td></tr>
  <tr><td>2</td><td>BC</td><td>1</td><td>54</td><td>9E</td><td>1E</td><td>FA</td><td>B6</td><td>1</td><td>DC</td><td>81</td><td>B2</td><td>14</td><td>00</td><td>0</td><td>B6</td><td>1F</td><td>7B</td><td>44</td><td>74</td><td>0</td><td>10</td><td>F5</td><td>B8</td><td>2E</td></tr>
  <tr><td>3</td><td>BE</td><td>0</td><td>2F</td><td>7E</td><td>3D</td><td>A8</td><td>C0</td><td>1</td><td>27</td><td>95</td><td>A4</td><td>74</td><td>C4</td><td>0</td><td>07</td><td>11</td><td>6B</td><td>D8</td><td>BC</td><td>0</td><td>C7</td><td>B7</td><td>AF</td><td>C2</td></tr>
  <tr><td>4</td><td>7E</td><td>1</td><td>32</td><td>21</td><td>1C</td><td>2C</td><td>8A</td><td>1</td><td>22</td><td>C2</td><td>DC</td><td>34</td><td>BC</td><td>1</td><td>BA</td><td>DD</td><td>37</td><td>D8</td><td>DC</td><td>0</td><td>E7</td><td>A2</td><td>39</td><td>BA</td></tr>
  <tr><td>5</td><td>98</td><td>0</td><td>A9</td><td>76</td><td>2B</td><td>EE</td><td>54</td><td>0</td><td>BC</td><td>91</td><td>D5</td><td>92</td><td>98</td><td>1</td><td>80</td><td>BA</td><td>9B</td><td>F6</td><td>BC</td><td>1</td><td>48</td><td>16</td><td>81</td><td>0A</td></tr>
  <tr><td>6</td><td>38</td><td>0</td><td>5D</td><td>4D</td><td>F7</td><td>DA</td><td>BC</td><td>1</td><td>69</td><td>C2</td><td>8C</td><td>74</td><td>8A</td><td>1</td><td>A8</td><td>CE</td><td>7F</td><td>DA</td><td>38</td><td>1</td><td>FA</td><td>93</td><td>EB</td><td>48</td></tr>
  <tr><td>7</td><td>8A</td><td>1</td><td>04</td><td>2A</td><td>32</td><td>6A</td><td>9E</td><td>0</td><td>B1</td><td>86</td><td>56</td><td>0E</td><td>CC</td><td>1</td><td>96</td><td>30</td><td>47</td><td>F2</td><td>BC</td><td>1</td><td>F8</td><td>1D</td><td>42</td><td>30</td></tr>
</table>

A. What is the size ($C$) of this cache in bytes?

B. The box that follows shows the format of an address (1 bit per box). Indicate (by labeling the diagram) the fields that would be used to determine the following:

CO: The cache block offset

CI: The cache set index

CT: The cache tag

| 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | | | | | |

## Homework 6.31 (**)

Suppose that a program using the cache in [Homework 6.30](#Homework%206.30%20%28%2A%29) references the 1-byte word at address `0x071A`. Indicate the cache entry accessed and the cache byte value returned in hex. Indicate whether a cache miss occurs. If there is a cache miss, enter "—" for "Cache byte returned." Hint: Pay attention to those valid bits!

A. Address format (1 bit per box):

| 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | | | | | |

B. Memory reference:

| Parameter | Value |
| --- | --- |
| Block offset (CO) | `0x_` |
| Index (CI) | `0x_` |
| Cache tag (CT) | `0x_` |
| Cache hit? (Y/N) | |
| Cache byte returned | `0x_` |

## Homework 6.32 (**)

Repeat [Homework 6.31](#Homework%206.31%20%28%2A%2A%29) for memory address `0x16E8`.

A. Address format (1 bit per box):

| 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | | | | | |

B. Memory reference:

| Parameter | Value |
| --- | --- |
| Cache offset (CO) | `0x_` |
| Cache index (CI) | `0x_` |
| Cache tag (CT) | `0x_` |
| Cache hit? (Y/N) | |
| Cache byte returned | `0x_` |

## Homework 6.33 (**)

For the cache in [Homework 6.30](#Homework%206.30%20%28%2A%29), list the eight memory addresses (in hex) that will hit in set 2.

## Homework 6.34 (**)

Consider the following matrix transpose routine:

```c
typedef int array[4][4];

void transpose2(array dst, array src) {
  int i, j;

  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      dst[j][i] = src[i][j];
    }
  }
}
```

Assume this code runs on a machine with the following properties:

- `sizeof(int) == 4`.
- The `src` array starts at address 0 and the `dst` array starts at address 64 (decimal).
- There is a single L1 data cache that is direct-mapped, write-through, write-allocate, with a block size of 16 bytes.
- The cache has a total size of 32 data bytes, and the cache is initially empty.
- Accesses to the `src` and `dst` arrays are the only sources of read and write misses, respectively.

For each `row` and `col`, indicate whether the access to `src[row][col]` and `dst[row][col]` is a hit (`h`) or a miss (`m`). For example, reading `src[0][0]` is a miss and writing `dst[0][0]` is also a miss.

<table>
  <tr><td rowspan="2"></td><td colspan="4">`dst` array</td></tr>
  <tr><td>Col. 0</td><td>Col. 1</td><td>Col. 2</td><td>Col. 3</td></tr>
  <tr><td>Row 0</td><td>m</td><td></td><td></td><td></td></tr>
  <tr><td>Row 1</td><td></td><td></td><td></td><td></td></tr>
  <tr><td>Row 2</td><td></td><td></td><td></td><td></td></tr>
  <tr><td>Row 3</td><td></td><td></td><td></td><td></td></tr>
</table>

<table>
  <tr><td rowspan="2"></td><td colspan="4">`src` array</td></tr>
  <tr><td>Col. 0</td><td>Col. 1</td><td>Col. 2</td><td>Col. 3</td></tr>
  <tr><td>Row 0</td><td>m</td><td></td><td></td><td></td></tr>
  <tr><td>Row 1</td><td></td><td></td><td></td><td></td></tr>
  <tr><td>Row 2</td><td></td><td></td><td></td><td></td></tr>
  <tr><td>Row 3</td><td></td><td></td><td></td><td></td></tr>
</table>

## Homework 6.35 (**)

Repeat [Homework 6.34](#Homework%206.34%20%28%2A%2A%29) for a cache with a total size of 128 data bytes.

<table>
  <tr><td rowspan="2"></td><td colspan="4">`dst` array</td></tr>
  <tr><td>Col. 0</td><td>Col. 1</td><td>Col. 2</td><td>Col. 3</td></tr>
  <tr><td>Row 0</td><td>m</td><td></td><td></td><td></td></tr>
  <tr><td>Row 1</td><td></td><td></td><td></td><td></td></tr>
  <tr><td>Row 2</td><td></td><td></td><td></td><td></td></tr>
  <tr><td>Row 3</td><td></td><td></td><td></td><td></td></tr>
</table>

<table>
  <tr><td rowspan="2"></td><td colspan="4">`src` array</td></tr>
  <tr><td>Col. 0</td><td>Col. 1</td><td>Col. 2</td><td>Col. 3</td></tr>
  <tr><td>Row 0</td><td>m</td><td></td><td></td><td></td></tr>
  <tr><td>Row 1</td><td></td><td></td><td></td><td></td></tr>
  <tr><td>Row 2</td><td></td><td></td><td></td><td></td></tr>
  <tr><td>Row 3</td><td></td><td></td><td></td><td></td></tr>
</table>

## Homework 6.36 (**)

This problem tests your ability to predict the cache behavior of C code. You are given the following code to analyze:

```c
int x[2][128];
int i;
int sum = 0;

for (i = 0; i < 128; i++) {
  sum += x[0][i] * x[1][i];
}
```

Assume we execute this under the following conditions:

- `sizeof(int) == 4`.
- Array `x` begins at memory address `0x0` and is stored in row-major order.
- In each case below, the cache is initially empty.
- The only memory accesses are to the entries of the array `x`. All other variables are stored in registers.

Given these assumptions, estimate the miss rates for the following cases:

A. Case 1: Assume the cache is 512 bytes, direct-mapped, with 16-byte cache blocks. What is the miss rate?

B. Case 2: What is the miss rate if we double the cache size to 1,024 bytes?

C. Case 3: Now assume the cache is 512 bytes, two-way set associative using an LRU replacement policy, with 16-byte cache blocks. What is the cache miss rate?

D. For case 3, will a larger cache size help to reduce the miss rate? Why or why not?

E. For case 3, will a larger block size help to reduce the miss rate? Why or why not?

## Homework 6.37 (**)

This is another problem that tests your ability to analyze the cache behavior of C code. Assume we execute the three summation functions in [Figure 6.47](#figure-6-47) under the following conditions:

- `sizeof(int) == 4`.
- The machine has a 4 KB direct-mapped cache with a 16-byte block size.
- Within the two loops, the code uses memory accesses only for the array data. The loop indices and the value `sum` are held in registers.
- Array `a` is stored starting at memory address `0x08000000`.

Fill in the table for the approximate cache miss rate for the two cases `N = 64` and `N = 60`.

| Function | `N = 64` | `N = 60` |
| --- | --- | --- |
| `sumA` | | |
| `sumB` | | |
| `sumC` | | |

### Figure 6.47

```c
typedef int array_t[N][N];

int sumA(array_t a) {
  int i, j;
  int sum = 0;
  for (i = 0; i < N; i++) {
    for (j = 0; j < N; j++) {
      sum += a[i][j];
    }
  }
  return sum;
}

int sumB(array_t a) {
  int i, j;
  int sum = 0;
  for (j = 0; j < N; j++) {
    for (i = 0; i < N; i++) {
      sum += a[i][j];
    }
  }
  return sum;
}

int sumC(array_t a) {
  int i, j;
  int sum = 0;
  for (j = 0; j < N; j += 2) {
    for (i = 0; i < N; i += 2) {
      sum += (a[i][j] + a[i + 1][j] + a[i][j + 1] + a[i + 1][j + 1]);
    }
  }
  return sum;
}
```

Figure 6.47 Functions referenced in [Homework 6.37](#Homework%206.37%20%28%2A%2A%29).

## Homework 6.38 (*)

3M decides to make Post-its by printing yellow squares on white pieces of paper. As part of the printing process, they need to set the CMYK (cyan, magenta, yellow, black) value for every point in the square. 3M hires you to determine the efficiency of the following algorithms on a machine with a 2,048-byte direct-mapped data cache with 32-byte blocks. You are given the following definitions:

```c
struct point_color {
  int c;
  int m;
  int y;
  int k;
};
struct point_color square[16][16];
int                i, j;
```

Assume the following:

- `sizeof(int) == 4`.
- `square` begins at memory address 0.
- The cache is initially empty.
- The only memory accesses are to the entries of the array `square`. Variables `i` and `j` are stored in registers.

Determine the cache performance of the following code:

```c
for (i = 0; i < 16; i++) {
  for (j = 0; j < 16; j++) {
    square[i][j].c = 0;
    square[i][j].m = 0;
    square[i][j].y = 1;
    square[i][j].k = 0;
  }
}
```

A. What is the total number of writes?

B. What is the total number of writes that miss in the cache?

C. What is the miss rate?

## Homework 6.39 (*)

Given the assumptions in [Homework 6.38](#Homework%206.38%20%28%2A%29), determine the cache performance of the following code:

```c
for (i = 0; i < 16; i++) {
  for (j = 0; j < 16; j++) {
    square[j][i].c = 0;
    square[j][i].m = 0;
    square[j][i].y = 1;
    square[j][i].k = 0;
  }
}
```

A. What is the total number of writes?

B. What is the total number of writes that miss in the cache?

C. What is the miss rate?

## Homework 6.40 (*)

Given the assumptions in [Homework 6.38](#Homework%206.38%20%28%2A%29), determine the cache performance of the following code:

```c
for (i = 0; i < 16; i++) {
  for (j = 0; j < 16; j++) {
    square[i][j].y = 1;
  }
}

for (i = 0; i < 16; i++) {
  for (j = 0; j < 16; j++) {
    square[i][j].c = 0;
    square[i][j].m = 0;
    square[i][j].k = 0;
  }
}
```

A. What is the total number of writes?

B. What is the total number of writes that miss in the cache?

C. What is the miss rate?

## Homework 6.41 (**)

You are writing a new 3D game that you hope will earn you fame and fortune. You are currently working on a function to blank the screen buffer before drawing the next frame. The screen you are working with is a $640 \times 480$ array of pixels. The machine you are working on has a 64 KB direct-mapped cache with 4-byte lines. The C structures you are using are as follows:

```c
struct pixel {
  char r;
  char g;
  char b;
  char a;
};

struct pixel buffer[480][640];
int          i, j;
char        *cptr;
int         *iptr;
```

Assume the following:

- `sizeof(char) == 1` and `sizeof(int) == 4`.
- `buffer` begins at memory address 0.
- The cache is initially empty.
- The only memory accesses are to the entries of the array `buffer`. Variables `i`, `j`, `cptr`, and `iptr` are stored in registers. What percentage of writes in the following code will miss in the cache?

```c
for (j = 0; j < 640; j++) {
  for (i = 0; i < 480; i++) {
    buffer[i][j].r = 0;
    buffer[i][j].g = 0;
    buffer[i][j].b = 0;
    buffer[i][j].a = 0;
  }
}
```

## Homework 6.42 (**)

Given the assumptions in [Homework 6.41](#Homework%206.41%20%28%2A%2A%29), what percentage of writes in the following code will miss in the cache?

```c
char *cptr = (char *)buffer;
for (; cptr < (((char *)buffer) + 640 * 480 * 4); cptr++) {
  *cptr = 0;
}
```

## Homework 6.43 (**)

Given the assumptions in [Homework 6.41](#Homework%206.41%20%28%2A%2A%29), what percentage of writes in the following code will miss in the cache?

```c
int *iptr = (int *)buffer;
for (; iptr < ((int *)buffer + 640 * 480); iptr++) {
  *iptr = 0;
}
```

## Homework 6.44 (**)

Download the `mountain` program from the CS:APP Web site and run it on your favorite PC/Linux system. Use the results to estimate the sizes of the caches on your system.

## Homework 6.45 (**)

In this assignment, you will apply the concepts you learned in [Chapters 5](../ch05-optimizing-program-performance/Chapter%205%20Optimizing%20Program%20Performance.md) and [6](Chapter%206%20The%20Memory%20Hierarchy.md) to the problem of optimizing code for a memory-intensive application. Consider a procedure to copy and transpose the elements of an $N \times N$ matrix of type `int`. That is, for source matrix $S$ and destination matrix $D$, we want to copy each element $s_{i,j}$ to $d_{j,i}$. This code can be written with a simple loop,

```c
void transpose(int *dst, int *src, int dim) {
  int i, j;

  for (i = 0; i < dim; i++) {
    for (j = 0; j < dim; j++) {
      dst[j * dim + i] = src[i * dim + j];
    }
  }
}
```

where the arguments to the procedure are pointers to the destination (`dst`) and source (`src`) matrices, as well as the matrix size $N$ (`dim`). Your job is to devise a transpose routine that runs as fast as possible.

## Homework 6.46 (**)

This assignment is an intriguing variation of [Homework 6.45](#Homework%206.45%20%28%2A%2A%29). Consider the problem of converting a directed graph $g$ into its undirected counterpart $g'$. The graph $g'$ has an edge from vertex $u$ to vertex $v$ if and only if there is an edge from $u$ to $v$ or from $v$ to $u$ in the original graph $g$. The graph $g$ is represented by its adjacency matrix $G$ as follows. If $N$ is the number of vertices in $g$, then $G$ is an $N \times N$ matrix and its entries are all either 0 or 1. Suppose the vertices of $g$ are named $v_0, v_1, v_2, \dots, v_{N-1}$. Then `G[i][j]` is 1 if there is an edge from $v_i$ to $v_j$ and is 0 otherwise. Observe that the elements on the diagonal of an adjacency matrix are always 1 and that the adjacency matrix of an undirected graph is symmetric. This code can be written with a simple loop:

```c
void col_convert(int *G, int dim) {
  int i, j;

  for (i = 0; i < dim; i++) {
    for (j = 0; j < dim; j++) {
      G[j * dim + i] = G[j * dim + i] || G[i * dim + j];
    }
  }
}
```

Your job is to devise a conversion routine that runs as fast as possible. As before, you will need to apply concepts you learned in [Chapters 5](../ch05-optimizing-program-performance/Chapter%205%20Optimizing%20Program%20Performance.md) and [6](Chapter%206%20The%20Memory%20Hierarchy.md) to come up with a good solution.
