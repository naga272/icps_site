# ICPS Documentation

![Platform](https://img.shields.io/badge/OS%20platform%20supported-Linux-green?style=flat)

![Language](https://img.shields.io/badge/Language-python3-green?style=flat)

![Language](https://img.shields.io/badge/Language-icps-green?style=flat)

![Language](https://img.shields.io/badge/Language-nasm_x86_64-black?style=flat)

![Language](https://img.shields.io/badge/Language-ld-aliceblue?style=flat)

![Testing](https://img.shields.io/badge/Test-Pass-red)

## Usage

** NOTE: THIS PROJECT IS NOT YET COMPLETED **

At the moment, since it's missing an Operating System at it's base, it was designed to be executed on any machine (even if it's not integrated as main shell).
To do so, all that's needed are the above stated requirements (the NASM compiler is integrated if downloading the whole package from GitHub).
In order to use the shell, you have to execute `shell.py`:

```sh
python shell.py
```

Or, for Linux-like machines:

```sh
python3 shell.py
```

We are now inside of the shell.
Here's a list of available commands:

- `// I'm an inline comment`

  Everything after `//` is ignored by the interpreter.

- `exit`

  Closes the shell and returns 0 to the Kernel.

- `version`

  Outputs the current ICPS version.

- `pcinfo`

  Outputs general information about the machine.

- `run <script_name>.icps`

  Executes all the commands inside the .icps file.

- `compile <input>.icps -o <output>.exe <flags>`

  Compiles the .icps file into machine code, generating an executable program.

- `mydisk <flags>`

  Outputs general information about the current disk.

- `ls <directory>`

  Outputs the contents of a provided directory.

- `rm <directories|files>`

  Deletes one or multiple files and directories.

You can also capture a command's output and dump that to a file.

- `mydisk -all > file.txt`

  Overwrites `file.txt` with the output of `mydisk -all`.

- `mydisk -all >> file.txt`

  Appends the output of `mydisk -all` to `file.txt`.

## Compiler and Precompiler

At the moment, the compiler only recognizes base instructions, such as (integer) mathematical expressions, string concatenations, read-only variable creations and macros for the NASM precompiler.
Also, ICPS ships with its own precompiler, which simplifies calculations for the CPU by solving them at compile time. This ensures that the final program is very efficient (more optimized than C/C++).

## Precompiler optimization

At the moment, optimization only consists of simplifying integer and floating point calculations, along with vectors and strings.
For example, let's take the following code:

`variable = "Hello" + ", " + "World!"`

The precompiler will calculate this and, therefore, the executable the CPU will have to execute will not have to concatenate those strings, but will directly have the concatenation result.
This is the output of the assembler:

`variable db "Hello, World!"`

## Compiler debugging

It's possible to debug code by passing the `--db_translate` flag to the compiler:

```bash
compile <input>.icps --o <output>.exe --db_translate
```

This way, the translation to assembly code will be shown line per line.
It's also possible to view the compiler's vmemory, allowing to view variables during the compilation process, by passing the `--db_vmemory` flag:

```bash
compile <input>.icps --o <output>.exe --db_vmemory
```

With the `--asm` flag you can directly view the generated assembly file

```bash
compile <input>.icps --o <output>.exe --asm
```

With the `--fpre` flag you can directly view the generated pre-elaborate file .i:

```bash
compile <input>.icps --o <output>.exe --fpre
```

A complete example for program debugging:

```bash
compile ../flussi/input.icps --o ../flussi/output.exe --db_vmemory --db_translate --asm
```

## Compiler instructions

An example of how to create everything is found under the `/flussi` folder.

- Integer math:

  ```py
  variabile = 17 * 21 + 4 - 333
  ```

- Floating point math:
  ```py
  variabile = 3.14 + 5.18
  ```

- Fast math:
  ```py
  variabile = 1
  variabile += 5
  ```

- String concatenation:

  ```py
  variabile = "ciao" + " come" + " stai?"
  ```

- Read only variables:

  ```py
  rodata variabile = "ciao" + " come" + " stai?"
  ```

- array variable:
  ```py
  ciao    = 1
  my_arr  = 22, 10, 11 + ciao2
  a = my_arr[ciao] + 23
  ```

- import module icps:
  ```py
  import <module1>, <module2>, ...
  import <module>
  ```
  
  Also is possible to import library `.so`, `.dll` e `.o`:

  ```py
  import /usr/lib/x86_64-linux-gnu/libsqlite3.so
  extern sqlite3_open(<int>,<char>) -> <None>
  ```
  The compiler, during the linking phase include automatically this file

- Inline comments:
  ```C
  // I'm a comment getting ignored by the compiler
  ```

- Multiline comments:
  ```C
  /*
    First line
    Second line
    Third line
    ...
  */
  ```

- NASM precompiler instructions:
  ```asm
  %ifndef MAX
  %define MAX 10
  %else
  %define MAX2 11
  %endif
  %undef MAX
  ```

- Magic words:

  ```C
  __LINE__             // Current line number
  __timestamp__        // Compilation timestamp
  __date__             // Compilation date
  ```

- Inline Assembly:

  ```C
  __asm__(
    mov rsi, msg
    push rsi ; Pointer to MSG
    call print  ; Returns the length of the printed vector in RAX
    mov rdi, rax
    call print_int ; Outputs the content of RAX
  )__endasm__
  ```

## Default functions

### write in output
- print
- fprintf
- print_int

### read from input
- char readchar(unsigned int fd, char);
- int fread_all(char* path)

### functions for math on integer:
- is_prime

### functions for char vectors:
- strlen(char*)
- special_strlen(char*)
- strcat(char*, char*)
- memset(void*, long int, size_t)

### functions for manipulations of paths
- rmdir(char*)
- renamedir(char*, char*)
- mkdir(char*)

### functions for memory allocation & deallocation
- mmap
- munmap
- malloc
- calloc
- realloc
- free

### functions for process
- fork()
- get_pid()
- killp(long int)
- killprange(long int, long int)
- exit(long int)
- _exit(long int)
- execve(char* filename, char**argv, char**envp)


### functions for time
- time(NULL)

### other functions
- shutdown()

**Math with string object**

**NB**: Bisogna ancora implementare la sintassi per classi e oggetti.

You can create an object string with the call function:
- String(char*)
The attributes of this class are:
- content: dinamic vector of char
- size_content: sizeof(content)

the methods of the class string are:
- long int len(string)
- void append_str(char*)
- void append_chr(char)
- void remove(int)
- void replace(char*, char*)
- void reverse()
- long int startswith(char*)
- long int endswith(char*)
- void \_\_del\_\_()

this ptr point to:
- foo_len
- foo_append_char
- foo_append_str
- foo_remove
- foo_replace
- foo_startwith
- foo_endswith
- foo_reverse
- foo_del


## deafult macro

|Name                         | Value                  |
|-----------------------------|------------------------|
|max(x, y)                    | x > y? x : y           |
|min(x, y)                    | x < y? x : y           |
|STARTFOO                     | start of all functions |
|GPUSH                        | push all genaral reg.  |
|GPOP                         | pop all general reg.   |
|GXOR                         | xor all general reg.   |
|EXIT_SUCCESS                 | 0x00                   |
|EXIT_FAILURE                 | 0x01                   |
|ENDL                         | 0x0d, 0x0a             |
|FOPEN(char*, mod, perm.)     | open a file            |
|FWRITE(fd, char*, len(char*))| write on file          |     
|FCLOSE(fd)                   | close a file           |
|stdin                        | 0x00                   |
|stdout                       | 0x01                   |
|stderr                       | 0x02                   |
|True                         | 0x01                   |
|False                        | 0x00                   |
|O_WRONLY                     | 0o010                  |
|O_RDONLY                     | 0o100                  |
|O_TRUNC                      | 0o001                  |
|MAP_PRIVATE                  | 0x02                   |
|MAP_ANONYMOUS                | 0x20                   |
|MAP_STACK                    | 0x20000                |
|MAP_GROWSDOWN                | 0x00100                |
|PROT_READ                    | 0x1                    |
|PROT_WRITE                   | 0x2                    |
|PROT_EXEC                    | 0x4                    |
|PROT_NONE                    | 0x8                    |
|SYS_WRITE                    | 0x01                   |
