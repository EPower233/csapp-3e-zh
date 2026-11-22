# Solutions to Practice Problems

[Back to Chapter Contents](./Chapter%201%20A%20Tour%20of%20Computer%20Systems.md)

## Solution 1.1

This problem illustrates that Amdahl's law applies to more than just computer systems.

A. In terms of **Equation 1.1**, we have $\alpha = 0.6$ and $k = 1.5$. More directly, traveling the 1,500 kilometers through Montana will require 10 hours, and the rest of the trip also requires 10 hours. This will give a speedup of $25 / (10 + 10) = 1.25\times$.

B. In terms of **Equation 1.1**, we have $\alpha = 0.6$, and we require $S = 1.67$, from which we can solve for $k$. More directly, to speed up the trip by $1.67\times$, we must decrease the overall time to 15 hours. The parts outside of Montana will still require 10 hours, so we must drive through Montana in 5 hours. This requires traveling at 300 km/hr, which is pretty fast for a truck!

## Solution 1.2

Amdahl's law is best understood by working through some examples. This one requires you to look at **Equation 1.1** from an unusual perspective.

This problem is a simple application of the equation. You are given $S = 2$ and $\alpha = 0.8$, and you must then solve for $k$:

$$
\begin{aligned}
2 &= \frac{1}{(1 - 0.8) + 0.8 / k} \\
0.4 + 1.6 / k &= 1.0 \\
k &= 2.67
\end{aligned}
$$
