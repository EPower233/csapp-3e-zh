# Chapter 11 Network Programming

## Chapter Contents

- [11.1 The Client-Server Programming Model](./11.1%20The%20Client-Server%20Programming%20Model.md)
- [11.2 Networks](./11.2%20Networks.md)
- [11.3 The Global IP Internet](./11.3%20The%20Global%20IP%20Internet.md)
- [11.4 The Sockets Interface](./11.4%20The%20Sockets%20Interface.md)
- [11.5 Web Servers](./11.5%20Web%20Servers.md)
- [11.6 Putting It Together: The TINY Web Server](./11.6%20Putting%20It%20Together%EF%BC%9A%20The%20TINY%20Web%20Server.md)
- [11.7 Summary](./11.7%20Summary.md)
- [Bibliographic Notes](./Bibliographic%20Notes.md)
- [Homework Problems](./Homework%20Problems.md)
- [Solutions to Practice Problems](./Solutions%20to%20Practice%20Problems.md)

## Introduction

Network applications are everywhere. Any time you browse the Web, send an email message, or play an online game, you are using a network application. Interestingly, all network applications are based on the same basic programming model, have similar overall logical structures, and rely on the same programming interface.

Network applications rely on many of the concepts that you have already learned in our study of systems. For example, processes, signals, byte ordering, memory mapping, and dynamic storage allocation all play important roles. There are new concepts to master as well. You will need to understand the basic client-server programming model and how to write client-server programs that use the services provided by the Internet. At the end, we will tie all of these ideas together by developing a tiny but functional Web server that can serve both static and dynamic content with text and graphics to real Web browsers.
