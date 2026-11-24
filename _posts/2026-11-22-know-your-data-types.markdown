---
layout: default
title: "Know your data types!"
---

# Know your data types!

In this blog, I'll be diving deep into data types, using the C programming language predominantly to demonstrate them. We will also use a debugging utility called gdb, which is great for dissecting compiled programs and inspecting memory to analyze how this data is stored.

## What are data types?
Almost every computer program we write involves manipulating some kind of data. At a low level, everything in computer memory is just `0`s and `1`s. However, the computer needs to know what kind of data those `0`s and `1`s represent in order to perform the right operations on them. This is where data types come into the picture.

Some common primitive data types are:
1. **Character** (single letters or symbols)
2. **Integers** (whole numbers, natural numbers, etc.)
3. **Decimals** (fractions, aka `float` in C)

Using these building blocks, we can create additional data types. For example:
1. **Strings** (characters grouped together)
2. **Arrays** (lists of words, numbers, or characters)
3. **Booleans** (true/false values often represented as `1` or `0`)

## Bits, bytes, and memory addresses

Computers work in binary i.e `0` or `1`. Because binary has 2 states, computer memory is organized in powers of 2 (2¹, 2², 2³, 2⁴, 2⁵, etc.). For example, a "Yes" can be represented by `1` and a "No" by `0`. How much memory do you need to store a single "Yes" or "No"? Just **1 bit**. A bit is the smallest unit of information a computer can store.

However, computers don't access single bits on their own in memory. Instead, they group them into **bytes**. What is a byte? Simply put, 8 bits grouped together make 1 byte. Data in memory is organized in bytes because the computer assigns a unique address to each byte in RAM. 

To keep it simple, take the number `1`. Its 1-byte binary representation in a computer is `00000001`. Similarly, the number `2` is `00000010`. These bytes (`00000001` and `00000010`) are stored at unique addresses (`x` and `y`) in RAM.

## Viewing primitive data types in memory

On a 64-bit computer, basic C data types typically have the following sizes in memory:

| Data Type | Size |
| :--- | :--- |
| `char` | 1 byte |
| `int` | 4 bytes |
| `float` | 4 bytes |

Let's view the sizes of these basic data types via a C program. The following program declares three variables `x`, `y`, and `z`, whose data types are `char`, `int`, and `float`, respectively. The `sizeof` operator in C retrieves the amount of memory in bytes allocated for a variable or data type.

```c
#include <stdio.h>

int main(int argc, char** argv)
{
	char x = 'a';
	int y = 1;
	float z = 2.5;

	printf("Size of char x: %zu\n", sizeof(x));
	printf("Size of integer y: %zu\n", sizeof(y));
	printf("Size of float z: %zu\n", sizeof(z));

	return 0;
}
```

**Output:**

```text
Size of char x: 1
Size of integer y: 4
Size of float z: 4
```

The above output showcases that `char`, `int`, and `float` are 1, 4, and 4 bytes, respectively.

Let's dive deep to prove this output by dissecting the program using gdb and inspecting the memory for each of the three primitive data types. Let's begin the analysis by getting the memory addresses of the variables:

```gdb
(gdb) p &x
\$1 = 0x7ffffffc0437 "a\001"
(gdb) p &y
\$2 = (int *) 0x7ffffffc0438
(gdb) p &z
\$3 = (float *) 0x7ffffffc043c
```

### Character

Let's examine 9 bytes of memory starting from the address of `x` (note that on little-endian architectures like x86-64, multi-byte numbers store their least significant byte first):

```gdb
(gdb) x/9xb &x
0x7ffffffc0437:	0x61	0x01	0x00	0x00	0x00	0x00	0x00	0x20
0x7ffffffc043f:	0x40
```

As shown above, the value stored at `0x7ffffffc0437` is `0x61` (ASCII `'a'`). If we inspect the memory at `0x7ffffffc0437 + 0x1` (`0x7ffffffc0438`), we find the value `1` (`0x01 0x00 0x00 0x00`), which belongs to variable `y`:

```gdb
(gdb) x/4xb 0x7ffffffc0437+1
0x7ffffffc0438:	0x01	0x00	0x00	0x00
```

Because `y` begins immediately 1 byte after `x`, the difference between their addresses is 1 byte—proving that the `char` variable `x` occupies **1 byte**.

### Integer

Next, let's visualize the size of the `int` data type by examining the 8 bytes starting at the address of `y`:

```gdb
(gdb) x/8xb &y
0x7ffffffc0438:	0x01	0x00	0x00	0x00	0x00	0x00	0x20	0x40
```

If we examine the 4 bytes starting at the address of `z`, we get the IEEE 754 representation of `2.5`:

```gdb
(gdb) x/4xb &z
0x7ffffffc043c:	0x00	0x00	0x20	0x40
```

Subtracting the address of `y` from the address of `z` gives:

```gdb
(gdb) p/x 0x7ffffffc043c - 0x7ffffffc0438
\$4 = 0x4
```

Since `z` starts immediately after `y` with no alignment padding between them, this 4-byte offset proves that `int` occupies **4 bytes** in memory.

### Float

To prove the size of the `float` data type, we will use pointer arithmetic. If we add `1` to a memory address of a variable, the memory address advances by the exact byte size of data type of that variable. Let's re-run the program and examine the address of `z`:

```gdb
(gdb) p &z
\$1 = (float *) 0x7ffffffc03cc
(gdb) p &z+1
\$2 = (float *) 0x7ffffffc03d0
(gdb) p/x 0x7ffffffc03d0-0x7ffffffc03cc
\$3 = 0x4
```

The address of `z` is `0x7ffffffc03cc`, and when we added `1` to `&z`, the address advanced to `0x7ffffffc03d0`. Subtracting those addresses gives `0x4`, which proves the size of the `float` data type is **4 bytes** and shows how adding `1` to a pointer increases the address by the size of that specific data type.

## Viewing composite data types in memory

### Arrays

Arrays are a composite data type built from primitive data types like char, int, and float. At a low level, each element of an array is stored in memory the exact same way a standalone primitive variable is. The only difference is that all elements are grouped together contiguously starting from a single base memory address.

For example, in the following C program, `a` is declared as an int array and `b` is declared as a char array. Every element inside a occupies the standard size of an int (4 bytes), and every element inside b occupies the standard size of a char (1 byte):

```c
#include<stdio.h>

int main(int argc, char** argv)
{
	int a[] = {1,2,3,4,5};
	char b[] = {'a','b','c','d','e','f'};

	return 1;
}
```

To understand how array elements are laid out in memory, let's inspect both variable `a` and `b` using gdb. First, we check the starting memory addresses and data types of each array. 

```
(gdb) p &a
$1 = (int (*)[5]) 0xffffb3c00530
(gdb) p &b
$2 = (char (*)[6]) 0xffffb3c00552
```

As shown in the output above, the starting address of a is `0xffffb3c00530` and b is `0xffffb3c00552`. Because `a` is an array of 5 integers, we examine 5 words (1 word = 4 bytes) starting from `0xffffb3c00530`. In total, `a` occupies 20 bytes in RAM with each individual element is stored just like a standalone int, simply grouped contiguously starting from that base address.

```
(gdb) x/5xw 0xffffb3c00530
0xffffb3c00530:	0x00000001	0x00000002	0x00000003	0x00000004
0xffffb3c00540:	0x00000005
```

To inspect each element individually, we dereference `&a` (`*&a`). In C, dereferencing a pointer to an array yields the array itself, which immediately decays into a pointer to its first element (int *). This changes the pointer arithmetic stride from the size of the entire array (20 bytes) to the size of a single int (4 bytes) so each `+ 1` advances the address by 4 bytes as shown below.

```
(gdb) x/1xw *&a
0xffffb3c00530:	0x00000001
(gdb) x/1xw *&a+1
0xffffb3c00534:	0x00000002
(gdb) x/1xw *&a+2
0xffffb3c00538:	0x00000003
(gdb) x/1xw *&a+3
0xffffb3c0053c:	0x00000004
(gdb) x/1xw *&a+4
0xffffb3c00540:	0x00000005
(gdb) x/1xw *&a+5
0xffffb3c00544:	0x00000000
```

Repeating the same process on variable `b`. But switching the format specifier from `w` (4-byte word) to `b` (1-byte unit).  Because `*&b` decays to a `char *`, adding `+ 1` advances the address by just 1 byte at a time. This shows how the underlying data type controls the step size.

```
(gdb) x/1xb *&b
0xffffb3c00552:	0x61
(gdb) x/1xb *&b+1
0xffffb3c00553:	0x62
(gdb) x/1xb *&b+2
0xffffb3c00554:	0x63
(gdb) x/1xb *&b+3
0xffffb3c00555:	0x64
(gdb) x/1xb *&b+4
0xffffb3c00556:	0x65
(gdb) x/1xb *&b+5
0xffffb3c00557:	0x66
```

### Strings

In C, there is no separate primitive data type called string. Instead, a string is simply a char array terminated by a special null character ('\0', or 0x00 in hex). This null byte tells C library functions (like printf and strlen) where the string ends in memory.

Let's see this behavior in the following example, where we declare a with "hello!" inside double quotes. At first glance, "hello!" looks like shorthand for initializing a character array with curly braces ({'h', 'e', 'l', 'l', 'o', '!'}), just written with quotes instead.

However, there is an important nuance:
- When you initialize with curly braces (`char a[] = {'h', 'e', 'l', 'l', 'o', '!'};`), the compiler allocates only those 6 bytes and does not add a null byte at the end.
- When you initialize with double quotes (`char a[] = "hello!";`), the compiler automatically appends a null byte ('\0') at the end, allocating 7 bytes in total.

```
#include<stdio.h>
#include<string.h>

int main(int argc, char** argv)
{
	char a[] = "hello!";
	return 1;
}
```

Let's inspect a in gdb to see all 7 bytes in memory:

```
(gdb) p &a
$1 = (char (*)[7]) 0xffffa1c00551
```

Notice the type gdb reports `char (*)[7]`. Even though "hello!" has only 6 visible characters, the array size is 7 bytes. Dumping all 7 bytes in hexadecimal with x/7xb reveals the trailing 0x00 at the end:

```
(gdb) x/7xb *&a
0xffffa1c00551:	0x68	0x65	0x6c	0x6c	0x6f	0x21	0x00
```

Finally, we can step through each byte one at a time using x/1cb (examine 1 byte formatted as a character) to see both the ASCII value and character stored at every offset.

```
(gdb) x/1cb *&a
0xffffa1c00551:	104 'h'
(gdb) x/1cb *&a+1
0xffffa1c00552:	101 'e'
(gdb) x/1cb *&a+2
0xffffa1c00553:	108 'l'
(gdb) x/1cb *&a+3
0xffffa1c00554:	108 'l'
(gdb) x/1cb *&a+4
0xffffa1c00555:	111 'o'
(gdb) x/1cb *&a+5
0xffffa1c00556:	33 '!'
(gdb) x/1cb *&a+6
0xffffa1c00557:	0 '\000'
```

At `0xffffa1c00557` (*&a + 6), gdb displays 0 '\000'