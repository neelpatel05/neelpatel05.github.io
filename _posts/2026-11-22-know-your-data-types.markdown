---
layout: default
title: "Know your data types!"
---

# Know your data types!

In this blog, I'll be diving deep into data types, using the C programming language predominantly to demonstrate them. We will also use a debugging utility called `gdb`, which is great for looking for dissecting and compiled program and memories to analyze how these data is stored and manipulated based on their types.

## What are data types?
Almost every computer program we write involves manipulating some kind of data. At a low level, everything in computer memory is just `0`s and `1`s. However, the computer needs to know what kind of data those `0`s and `1`s represent in order to perform the right operations (addition, multiplication) on them. This is where data types come into the picture.

Some common primitive data types are:
1. **Character** (single alphabet or symbols)
2. **Integers** (whole numbers, natual numbers etc)
3. **Decimals** (fractions)

Using these building blocks, we can create additional data types. For example:
1. **Strings** (characters grouped together)
2. **Arrays** (lists of words, numbers, or characters)
3. **Booleans** (true/false values often represented as `1` or `0`)

## How does computer architecture relate to data types?

Computers work in binary i.e `0` or `1`. Because binary has 2 states, computer memory is organized in powers of 2 (2^1, 2^2, 2^3, 2^4, 2^5, etc.). For example, a "Yes" can be represented by `1` and a "No" by `0`. How much memory do you need to store a single "Yes" or "No"? Just **1 bit**. A bit is the smallest unit of information a computer can store.

However, computers don't access single bits on their own in memory and instead, they group them into **bytes**. What is a byte? Simply put, 8 bits grouped together make 1 byte. Data in memory is organized in bytes because the computer assigns a unique address to each byte in RAM. 

To keep it simple, take the number `1`. Its 1-byte binary representation in a computer is `00000001`. Similarly, the number `2` is `00000010`. These bytes (`00000001` and `00000010`) are stored at unique addresses (`x` and `y`) in RAM.

