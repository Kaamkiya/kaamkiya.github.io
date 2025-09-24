---
layout: "../../layouts/BlogPostLayout.astro"
title: "The Tiny Transpiler"
pubDate: 2024-12-15
editDate: 2025-09-23
description: "A tiny Brainfuck to C transpiler written in 40 lines of C."
author: "Zia M <ziam3.1415@gmail.com>"
image:
    url: "https://docs.astro.build/assets/rose.webp"
    alt: "Brainfuck example code"
tags: ["c", "sideprojects", "fun", "brainfuck"]
---

I wrote a brainfuck to C transpiler the other day. It took me a grand total of
roughly an hour.

The entire thing is under 40 lines of C. You can see it
[here](https://codeberg.org/Kaamkiya/bfc/src/branch/main/bfc.c).

### What is brainfuck?

It's an [esoteric coding language](https://esolang.org). Invented by a Swiss
student in 1993, it's pretty much the minimum required to be considered Turing
complete.

It's also one of the most famous esolangs in existence.

The syntax is extremely minimal: it has only 8 characters and the rest are
ignored.

```bf
>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<
++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++
>-]<+.
```

Take a guess what that does. Just guess.

It's a `Hello, World!` program.

Essentially, in brainfuck, you're given a 30000 byte array and a cursor. You
can move the cursor with `>` and `<`. You can modify the memory with `+` and
`-`, which will increment or decrement the value in the cell. You can create
loops with `[` and `]`. Finally, you can a read a single byte as input with
`,` and print the value of the current cell with `.`.

```bf
> ; Increments cursor position
< ; Decrements cursor position
+ ; Increments cell value
- ; Decrements cell value
. ; Prints the current cell value as an ASCII character
, ; Reads a singly byte and stores it in the current cell
[ ; Opens a loop that continues until the cell value is 0
] ; Closes a loop
```

That's pretty much everything about brainfuck.
I've written more functional programs in _Assembly_ before.

### Why? Just why?

I wrote this compiler entirely because I was bored and I've found a ton of
interpreters, so I thought the world needed a brainfuck compiler.

> Although, admittedly, if you want a really good brainfuck compiler, check out
> [this one](https://github.com/Wilfred/bfc).

#### Why C?

Many reasons:

* I want more practice with it
* It's fast
* It's mostly portable
* It's widespread
* I didn't need much code anyway.

And one final reason: integer overflow. Normally, this is a bad thing that
people hate. It's probably the reason unit tests (ugh) were invented. But
brainfuck is different. The numbers in the memory tape have an upper limit of
`255`, and if they pass it, they're expected to reset to `0`. Also, if the
value goes below `0`, it's supposed to reset to `255`. C does this on its own;
I didn't need to write any code for it.

### How?

A higher-level overview:
* Read code from a file or from stdin into memory
* Convert each character to C code
* Print the finished C code.

It reads brainfuck code from a file into `code[]`.

Then, it sets up a basic C program:

```c
#include <stdio.h>
int main() {char t[30000]={0};int p=0;
```

You may have noticed that it's missing a closing bracket. That's because more
code is added to that `char[]`.

In case you're wondering, `char t[30000]` is the memory that you're given. I
used `t` as short for `tape`, because these programs aren't meant to be human
readable.

Next, it loops over the `code` array, which is an array of single characters.
For each character, it converts it to C code:

|           |                    |
|-----------|--------------------|
| character | becomes            |
| `>`       | `p++`              |
| `<`       | `p--`              |
| `-`       | `t[p]--`           |
| `+`       | `t[p]++`           |
| `.`       | `putchar(t[p])`    |
| `,`       | `t[p]=getchar()`   |
| `[`       | `while(t[p] != 0)` |
| `]`       | `}`                |


> You can see above to understand what these symbols do.

These values are added to the program output, which will contain valid C code.

Finally, this code is added to the final output:

```c
return 0;}
```

This is the end of the outputted program. The transpiler then prints this code
to stdout, for the user to manipulate as they wish.

### Final thoughts

There are some ideas for improvement I had while writing this article. I don't
think there's much I could do to make it faster, but there are things I could
do to make it safer and better.

You can see the final code
[here](https://codeberg.org/Kaamkiya/bfc/branch/main/bfc.c).

You can also make any sort of contribution, if you'd like.

Thanks for reading!
