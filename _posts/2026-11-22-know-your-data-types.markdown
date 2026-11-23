---
layout: default
title: "Know your data types!"
---

# Know your premitive data types!

In this blog, I'll be diving deep into premitive data types, using the C programming language predominantly to demonstrate them. We will also use a debugging utility called `gdb`, which is great for dissecting compiled programs and inspecting memory to analyze how this data is stored.

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

*Note: We will only dive deep into premitive data types and will do into additional data types in next post.*

## Bits, bytes, and memory addresses

Computers work in binary i.e `0` or `1`. Because binary has 2 states, computer memory is organized in powers of 2 (2¹, 2², 2³, 2⁴, 2⁵, etc.). For example, a "Yes" can be represented by `1` and a "No" by `0`. How much memory do you need to store a single "Yes" or "No"? Just **1 bit**. A bit is the smallest unit of information a computer can store.

However, computers don't access single bits on their own in memory. Instead, they group them into **bytes**. What is a byte? Simply put, 8 bits grouped together make 1 byte. Data in memory is organized in bytes because the computer assigns a unique address to each byte in RAM. 

To keep it simple, take the number `1`. Its 1-byte binary representation in a computer is `00000001`. Similarly, the number `2` is `00000010`. These bytes (`00000001` and `00000010`) are stored at unique addresses (`x` and `y`) in RAM.

## Viewing basic data types in memory

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

## Dive Deep

Let's dive deep to prove this output by dissecting the program using `gdb` and inspecting the memory for each of the three primitive data types. Let's begin the analysis by getting the memory addresses of the variables:

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

## Ending words

By combining C's `sizeof` operator with `gdb` memory inspection and pointer arithmetic, we proved firsthand `char`, `int`, and `float` occupy raw bytes in RAM. In the next post, we'll build on these fundamentals to explore how composite data types like arrays, strings, and structs are laid out in memory.
