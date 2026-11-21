# Solutions to Practice Problems

[Back to Chapter Contents](./Chapter%2011%20Network%20Programming.md)

## Solution 11.1

| Hex address  | Dotted-decimal address |
| ------------ | ---------------------- |
| `0x0`        | `0.0.0.0`              |
| `0xffffffff` | `255.255.255.255`      |
| `0x7f000001` | `127.0.0.1`            |
| `0xcdbca079` | `205.188.160.121`      |
| `0x400c950d` | `64.12.149.13`         |
| `0xcdbc9217` | `205.188.146.23`       |

## Solution 11.2

```c
#include "csapp.h"

int main(int argc, char** argv) {
  struct in_addr inaddr; /* Address in network byte order */
  uint32_t addr;         /* Address in host byte order */
  char buf[MAXBUF];      /* Buffer for dotted-decimal string */

  if (argc != 2) {
    fprintf(stderr, "usage: %s <hex number>\n", argv[0]);
    exit(0);
  }
  sscanf(argv[1], "%x", &addr);
  inaddr.s_addr = htonl(addr);

  if (!inet_ntop(AF_INET, &inaddr, buf, MAXBUF))
    unix_error("inet_ntop");
  printf("%s\n", buf);

  exit(0);
}
```

## Solution 11.3

```c
#include "csapp.h"

int main(int argc, char** argv) {
  struct in_addr inaddr; /* Address in network byte order */
  int rc;

  if (argc != 2) {
    fprintf(stderr, "usage: %s <dotted-decimal>\n", argv[0]);
    exit(0);
  }

  rc = inet_pton(AF_INET, argv[1], &inaddr);
  if (rc == 0)
    app_error("inet_pton error: invalid dotted-decimal address");
  else if (rc < 0)
    unix_error("inet_pton error");

  printf("0x%x\n", ntohl(inaddr.s_addr));
  exit(0);
}
```

## Solution 11.4

Here's a solution. Notice how much more difficult it is to use `inet_ntop`, which requires messy casting and deep structure references. The `getnameinfo` function is much simpler because it does all of that work for us.

```c
#include "csapp.h"

int main(int argc, char** argv) {
  struct addrinfo *p, *listp, hints;
  struct sockaddr_in* sockp;
  char buf[MAXLINE];
  int rc;

  if (argc != 2) {
    fprintf(stderr, "usage: %s <domain name>\n", argv[0]);
    exit(0);
  }

  /* Get a list of addrinfo records */
  memset(&hints, 0, sizeof(struct addrinfo));
  hints.ai_family = AF_INET;       /* IPv4 only */
  hints.ai_socktype = SOCK_STREAM; /* Connections only */
  if ((rc = getaddrinfo(argv[1], NULL, &hints, &listp)) != 0) {
    fprintf(stderr, "getaddrinfo error: %s\n", gai_strerror(rc));
    exit(1);
  }

  /* Walk the list and display each associated IP address */
  for (p = listp; p; p = p->ai_next) {
    sockp = (struct sockaddr_in*)p->ai_addr;
    Inet_ntop(AF_INET, &(sockp->sin_addr), buf, MAXLINE);
    printf("%s\n", buf);
  }

  /* Clean up */
  Freeaddrinfo(listp);

  exit(0);
}
```

## Solution 11.5

The reason that standard I/O works in CGI programs is that the CGI program running in the child process does not need to explicitly close any of its input or output streams. When the child terminates, the kernel closes all descriptors automatically.
