# Chapter 10 System-Level I/O

## Chapter Contents

- [10.1 Unix I/O](./10.1%20Unix%20I%EF%BC%8FO.md)
- [10.2 Files](./10.2%20Files.md)
- [10.3 Opening and Closing Files](./10.3%20Opening%20and%20Closing%20Files.md)
- [10.4 Reading and Writing Files](./10.4%20Reading%20and%20Writing%20Files.md)
- [10.5 Robust Reading and Writing with the RIO Package](./10.5%20Robust%20Reading%20and%20Writing%20with%20the%20RIO%20Package.md)
- [10.6 Reading File Metadata](./10.6%20Reading%20File%20Metadata.md)
- [10.7 Reading Directory Contents](./10.7%20Reading%20Directory%20Contents.md)
- [10.8 Sharing Files](./10.8%20Sharing%20Files.md)
- [10.9 I/O Redirection](./10.9%20I%EF%BC%8FO%20Redirection.md)
- [10.10 Standard I/O](./10.10%20Standard%20I%EF%BC%8FO.md)
- [10.11 Putting It Together: Which I/O Functions Should I Use?](./10.11%20Putting%20It%20Together%EF%BC%9A%20Which%20I%EF%BC%8FO%20Functions%20Should%20I%20Use%EF%BC%9F.md)
- [10.12 Summary](./10.12%20Summary.md)
- [Bibliographic Notes](./Bibliographic%20Notes.md)
- [Homework Problems](./Homework%20Problems.md)
- [Solutions to Practice Problems](./Solutions%20to%20Practice%20Problems.md)

## Introduction

Input/output (I/O) is the process of copying data between main memory and external devices such as disk drives, terminals, and networks. An input operation copies data from an I/O device to main memory, and an output operation copies data from memory to a device.

All language run-time systems provide higher-level facilities for performing I/O. For example, ANSI C provides the standard I/O library, with functions such as `printf` and `scanf` that perform buffered I/O. The C++ language provides similar functionality with its overloaded `<<` ("put to") and `>>` ("get from") operators. On Linux systems, these higher-level I/O functions are implemented using system-level Unix I/O functions provided by the kernel. Most of the time, the higher-level I/O functions work quite well and there is no need to use Unix I/O directly. So why bother learning about Unix I/O?

- **Understanding Unix I/O will help you understand other systems concepts.** I/O is integral to the operation of a system, and because of this, we often encounter circular dependencies between I/O and other systems ideas. For example, I/O plays a key role in process creation and execution. Conversely, process creation plays a key role in how files are shared by different processes. Thus, to really understand I/O, you need to understand processes, and vice versa. We have already touched on aspects of I/O in our discussions of the memory hierarchy, linking and loading, processes, and virtual memory. Now that you have a better understanding of these ideas, we can close the circle and delve into I/O in more detail.

- **Sometimes you have no choice but to use Unix I/O.** There are some important cases where using higher-level I/O functions is either impossible or inappropriate. For example, the standard I/O library provides no way to access file metadata such as file size or file creation time. Further, there are problems with the standard I/O library that make it risky to use for network programming.

This chapter introduces you to the general concepts of Unix I/O and standard I/O and shows you how to use them reliably from your C programs. Besides serving as a general introduction, this chapter lays a firm foundation for our subsequent study of network programming and concurrency.
