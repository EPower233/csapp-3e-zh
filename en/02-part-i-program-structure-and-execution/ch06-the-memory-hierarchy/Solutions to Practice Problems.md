# Solutions to Practice Problems

[Back to Chapter Contents](./Chapter%206%20The%20Memory%20Hierarchy.md)

## Solution 6.1

The idea here is to minimize the number of address bits by minimizing the aspect ratio $\max(r, c) / \min(r, c)$. In other words, the squarer the array, the fewer the address bits.

| Organization | $r$ | $c$ | $b_r$ | $b_c$ | $\max(b_r, b_c)$ |
| --- | --- | --- | --- | --- | --- |
| $16 \times 1$ | 4 | 4 | 2 | 2 | 2 |
| $16 \times 4$ | 4 | 4 | 2 | 2 | 2 |
| $128 \times 8$ | 16 | 8 | 4 | 3 | 4 |
| $512 \times 4$ | 32 | 16 | 5 | 4 | 5 |
| $1,024 \times 4$ | 32 | 32 | 5 | 5 | 5 |

## Solution 6.2

The point of this little drill is to make sure you understand the relationship between cylinders and tracks. Once you have that straight, just plug and chug:

$$
\begin{aligned}
\text{Disk capacity} &= \frac{512\ \text{bytes}}{\text{sector}} \times \frac{400\ \text{sectors}}{\text{track}} \times \frac{10,000\ \text{tracks}}{\text{surface}} \times \frac{2\ \text{surfaces}}{\text{platter}} \times \frac{2\ \text{platters}}{\text{disk}} \\
&= 8,192,000,000\ \text{bytes} \\
&= 8.192\ \mathrm{GB}
\end{aligned}
$$

## Solution 6.3

The solution to this problem is a straightforward application of the formula for disk access time. The average rotational latency (in ms) is

$$
T_{\text{avg rotation}} = 1/2 \times T_{\max\text{ rotation}} = 1/2 \times (60\ \mathrm{s} / 15,000\ \mathrm{RPM}) \times 1,000\ \mathrm{ms/s} \approx 2\ \mathrm{ms}
$$

The average transfer time is

$$
T_{\text{avg transfer}} = (60\ \mathrm{s} / 15,000\ \mathrm{RPM}) \times 1/500\ \text{sectors/track} \times 1,000\ \mathrm{ms/s} \approx 0.008\ \mathrm{ms}
$$

Putting it all together, the total estimated access time is

$$
T_{\text{access}} = T_{\text{avg seek}} + T_{\text{avg rotation}} + T_{\text{avg transfer}} = 8\ \mathrm{ms} + 2\ \mathrm{ms} + 0.008\ \mathrm{ms} \approx 10\ \mathrm{ms}
$$

## Solution 6.4

This is a good check of your understanding of the factors that affect disk performance. First we need to determine a few basic properties of the file and the disk. The file consists of 2,000 512-byte logical blocks. For the disk, $T_{\text{avg seek}} = 5\ \mathrm{ms}$, $T_{\max\text{ rotation}} = 6\ \mathrm{ms}$, and $T_{\text{avg rotation}} = 3\ \mathrm{ms}$.

A. **Best case:** In the optimal case, the blocks are mapped to contiguous sectors, on the same cylinder, that can be read one after the other without moving the head. Once the head is positioned over the first sector it takes two full rotations (1,000 sectors per rotation) of the disk to read all 2,000 blocks. So the total time to read the file is $T_{\text{avg seek}} + T_{\text{avg rotation}} + 2 \times T_{\max\text{ rotation}} = 5 + 3 + 12 = 20\ \mathrm{ms}$.

B. **Random case:** In this case, where blocks are mapped randomly to sectors, reading each of the 2,000 blocks requires $T_{\text{avg seek}} + T_{\text{avg rotation}}\ \mathrm{ms}$, so the total time to read the file is $(T_{\text{avg seek}} + T_{\text{avg rotation}}) \times 2,000 = 16,000\ \mathrm{ms}$ (16 seconds!)

You can see now why it's often a good idea to defragment your disk drive!

## Solution 6.5

This is a simple problem that will give you some interesting insights into the feasibility of SSDs. Recall that for disks, $1\ \mathrm{PB} = 10^{9}\ \mathrm{MB}$. Then the following straightforward translation of units yields the following predicted times for each case:

A. Worst-case sequential writes ($470\ \mathrm{MB/s}$): $(10^{9} \times 128) \times (1 / 470) \times (1 / (86,400 \times 365)) \approx 8$ years

B. Worst-case random writes ($303\ \mathrm{MB/s}$): $(10^{9} \times 128) \times (1 / 303) \times (1 / (86,400 \times 365)) \approx 13$ years

C. Average case ($20\ \mathrm{GB/day}$): $(10^{9} \times 128) \times (1 / 20,000) \times (1 / 365) \approx 17,534$ years

So even if the SSD operates continuously, it should last for at least 8 years, which is longer than the expected lifetime of most computers.

## Solution 6.6

In the 10-year period between 2005 and 2015, the unit price of rotating disks dropped by a factor of 166, which means the price is dropping by roughly a factor of 2 every 18 months or so. Assuming this trend continues, a petabyte of storage, which costs about \$30,000 in 2015, will drop below \$500 after about seven of these factor-of-2 reductions. Since these are occurring every 18 months, we might expect a petabyte of storage to be available for \$500 around the year 2025.

## Solution 6.7

To create a stride-1 reference pattern, the loops must be permuted so that the rightmost indices change most rapidly:

```c
int sumarray3d(int a[N][N][N]) {
  int i, j, k, sum = 0;

  for (k = 0; k < N; k++) {
    for (i = 0; i < N; i++) {
      for (j = 0; j < N; j++) {
        sum += a[k][i][j];
      }
    }
  }
  return sum;
}
```

This is an important idea. Make sure you understand why this particular loop permutation results in a stride-1 access pattern.

## Solution 6.8

The key to solving this problem is to visualize how the array is laid out in memory and then analyze the reference patterns. Function `clear1` accesses the array using a stride-1 reference pattern and thus clearly has the best spatial locality. Function `clear2` scans each of the $N$ structs in order, which is good, but within each struct it hops around in a non-stride-1 pattern at the following offsets from the beginning of the struct: 0, 12, 4, 16, 8, 20. So `clear2` has worse spatial locality than `clear1`. Function `clear3` not only hops around within each struct, but also hops from struct to struct. So `clear3` exhibits worse spatial locality than `clear2` and `clear1`.

## Solution 6.9

The solution is a straightforward application of the definitions of the various cache parameters in [Figure 6.26](./6.4%20Cache%20Memories.md#figure-6-26). Not very exciting, but you need to understand how the cache organization induces these partitions in the address bits before you can really understand how caches work.

| Cache | $m$ | $C$ | $B$ | $E$ | $S$ | $t$ | $s$ | $b$ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. | 32 | 1,024 | 4 | 1 | 256 | 22 | 8 | 2 |
| 2. | 32 | 1,024 | 8 | 4 | 32 | 24 | 5 | 3 |
| 3. | 32 | 1,024 | 32 | 32 | 1 | 27 | 0 | 5 |

## Solution 6.10

The padding eliminates the conflict misses. Thus, three-fourths of the references are hits.

## Solution 6.11

Sometimes, understanding why something is a bad idea helps you understand why the alternative is a good idea. Here, the bad idea we are looking at is indexing the cache with the high-order bits instead of the middle bits.

A. With high-order bit indexing, each contiguous array chunk consists of $2^{t}$ blocks, where $t$ is the number of tag bits. Thus, the first $2^{t}$ contiguous blocks of the array would map to set 0, the next $2^{t}$ blocks would map to set 1, and so on.

B. For a direct-mapped cache where $(S, E, B, m) = (512, 1, 32, 32)$, the cache capacity is 512 32-byte blocks with $t = 18$ tag bits in each cache line. Thus, the first $2^{18}$ blocks in the array would map to set 0, the next $2^{18}$ blocks to set 1. Since our array consists of only $(4,096 \times 4) / 32 = 512$ blocks, all of the blocks in the array map to set 0. Thus, the cache will hold at most 1 array block at any point in time, even though the array is small enough to fit entirely in the cache. Clearly, using high-order bit indexing makes poor use of the cache.

## Solution 6.12

The 2 low-order bits are the block offset (CO), followed by 3 bits of set index (CI), with the remaining bits serving as the tag (CT):

| 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CT | CT | CT | CT | CT | CT | CT | CT | CI | CI | CI | CO | CO |

## Solution 6.13

Address: `0x0E34`

A. Address format (1 bit per box):

| 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 1 | 1 | 1 | 0 | 0 | 0 | 1 | 1 | 0 | 1 | 0 | 0 |
| CT | CT | CT | CT | CT | CT | CT | CT | CI | CI | CI | CO | CO |

B. Memory reference:

| Parameter | Value |
| --- | --- |
| Cache block offset (CO) | `0x0` |
| Cache set index (CI) | `0x5` |
| Cache tag (CT) | `0x71` |
| Cache hit? (Y/N) | Y |
| Cache byte returned | `0x0B` |

## Solution 6.14

Address: `0x0DD5`

A. Address format (1 bit per box):

| 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 1 | 1 | 0 | 1 | 1 | 1 | 0 | 1 | 0 | 1 | 0 | 1 |
| CT | CT | CT | CT | CT | CT | CT | CT | CI | CI | CI | CO | CO |

B. Memory reference:

| Parameter | Value |
| --- | --- |
| Cache block offset (CO) | `0x1` |
| Cache set index (CI) | `0x5` |
| Cache tag (CT) | `0x6E` |
| Cache hit? (Y/N) | N |
| Cache byte returned | — |

## Solution 6.15

Address: `0x1FE4`

A. Address format (1 bit per box):

| 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 1 | 0 | 0 |
| CT | CT | CT | CT | CT | CT | CT | CT | CI | CI | CI | CO | CO |

B. Memory reference:

| Parameter | Value |
| --- | --- |
| Cache block offset (CO) | `0x0` |
| Cache set index (CI) | `0x1` |
| Cache tag (CT) | `0xFF` |
| Cache hit? (Y/N) | N |
| Cache byte returned | — |

## Solution 6.16

This problem is a sort of inverse version of [Practice Problems 6.12](./6.4%20Cache%20Memories.md#practice-problem-6-12)–[6.15](./6.4%20Cache%20Memories.md#practice-problem-6-15) that requires you to work backward from the contents of the cache to derive the addresses that will hit in a particular set. In this case, set 3 contains one valid line with a tag of `0x32`. Since there is only one valid line in the set, four addresses will hit. These addresses have the binary form `0 0110 0100 11xx`. Thus, the four hex addresses that hit in set 3 are

`0x064C`, `0x064D`, `0x064E`, and `0x064F`.

## Solution 6.17

A. The key to solving this problem is to visualize the picture in [Figure 6.48](#figure-6-48). Notice that each cache line holds exactly one row of the array, that the cache is exactly large enough to hold one array, and that for all $i$, row $i$ of `src` and `dst` maps to the same cache line. Because the cache is too small to hold both arrays, references to one array keep evicting useful lines from the other array. For example, the write to `dst[0][0]` evicts the line that was loaded when we read `src[0][0]`. So when we next read `src[0][1]`, we have a miss.

### Figure 6.48

![](../../../public/figures/en/mem/figure-6-48-cache-line-mapping.svg)

Figure 6.48 Figure for solution to [Practice Problem 6.17](./6.5%20Writing%20Cache-Friendly%20Code.md#practice-problem-6-17).

<table>
  <tr><td colspan="3">`dst` array</td><td colspan="3">`src` array</td></tr>
  <tr><td></td><td>Col. 0</td><td>Col. 1</td><td></td><td>Col. 0</td><td>Col. 1</td></tr>
  <tr><td>Row 0</td><td>m</td><td>m</td><td>Row 0</td><td>m</td><td>m</td></tr>
  <tr><td>Row 1</td><td>m</td><td>m</td><td>Row 1</td><td>m</td><td>h</td></tr>
</table>

B. When the cache is 32 bytes, it is large enough to hold both arrays. Thus, the only misses are the initial cold misses.

<table>
  <tr><td colspan="3">`dst` array</td><td colspan="3">`src` array</td></tr>
  <tr><td></td><td>Col. 0</td><td>Col. 1</td><td></td><td>Col. 0</td><td>Col. 1</td></tr>
  <tr><td>Row 0</td><td>m</td><td>h</td><td>Row 0</td><td>m</td><td>h</td></tr>
  <tr><td>Row 1</td><td>m</td><td>h</td><td>Row 1</td><td>m</td><td>h</td></tr>
</table>

## Solution 6.18

Each 16-byte cache line holds two contiguous `algae_position` structures. Each loop visits these structures in memory order, reading one integer element each time. So the pattern for each loop is miss, hit, miss, hit, and so on. Notice that for this problem we could have predicted the miss rate without actually enumerating the total number of reads and misses.

A. What is the total number of read accesses? 512 reads.

B. What is the total number of read accesses that miss in the cache? 256 misses.

C. What is the miss rate? $256 / 512 = 50\%$.

## Solution 6.19

The key to this problem is noticing that the cache can only hold $1/2$ of the array. So the column-wise scan of the second half of the array evicts the lines that were loaded during the scan of the first half. For example, reading the first element of `grid[8][0]` evicts the line that was loaded when we read elements from `grid[0][0]`. This line also contained `grid[0][1]`. So when we begin scanning the next column, the reference to the first element of `grid[0][1]` misses.

A. What is the total number of read accesses? 512 reads.

B. What is the total number of read accesses that miss in the cache? 256 misses.

C. What is the miss rate? $256 / 512 = 50\%$.

D. What would the miss rate be if the cache were twice as big? If the cache were twice as big, it could hold the entire `grid` array. The only misses would be the initial cold misses, and the miss rate would be $1/4 = 25\%$.

## Solution 6.20

This loop has a nice stride-1 reference pattern, and thus the only misses are the initial cold misses.

A. What is the total number of read accesses? 512 reads.

B. What is the total number of read accesses that miss in the cache? 128 misses.

C. What is the miss rate? $128 / 512 = 25\%$.

D. What would the miss rate be if the cache were twice as big? Increasing the cache size by any amount would not change the miss rate, since cold misses are unavoidable.

## Solution 6.21

The sustained throughput using large strides from L1 is about 12,000 MB/s, the clock frequency is 2,100 MHz, and the individual read accesses are in units of 8-byte `long`s. Thus, from this graph we can estimate that it takes roughly $2,100 / 12,000 \times 8 = 1.4 \approx 1.5$ cycles to access a word from L1 on this machine, which is roughly 2.5 times faster than the nominal 4-cycle latency from L1. This is due to the parallelism of the $4 \times 4$ unrolled loop, which allows multiple loads to be in flight at the same time.
