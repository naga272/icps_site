# Documentation

## Usage

At the moment, since it's missing an Operating System at it's base, it was designed to be executed on any machine (even if it's not integrated as main shell).
To do so, all that's needed are the above stated requirements (the NASM compiler is integrated if downloading the whole package from GitHub).
In order to use the shell, you have to execute `shell.py`:

```bash
python shell.py
```

Or, for Unix machines:

```bash
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

It's possible to debug code by passing the `-db_translate` flag to the compiler:

```bash
compile <input>.icps -o <output>.exe -db_translate
```

This way, the translation to assembly code will be shown line per line.
It's also possible to view the compiler's vmemory, allowing to view variables during the compilation process, by passing the `-db_vmemory` flag:

```bash
compile <input>.icps -o <output>.exe -db_vmemory
```

With the `-asm` flag you can directly view the generated assembly file

```bash
compile <input>.icps -o <output>.exe -asm
```

A complete example for program debugging:

```bash
compile ../flussi/input.icps -o ../flussi/output.exe -db_vmemory -db_translate -asm
```

## Compiler instructions

- Integer math:

  ```py
  variabile = 17 * 21 + 4 - 333
  ```

- Floating point math:

  ```py
  variabile = 3.14 + 5.18
  ```

- String concatenation:

  ```py
  variabile = "ciao" + " come" + " stai?"
  ```

- Read only variables:

  ```py
  rodata variabile = "ciao" + " come" + " stai?"
  ```

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

  ```bash
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
    push rax
    call print_int ; Outputs the content of RAX
  )__endasm__
  ```

An example of how to create everything is found under the `/flussi` folder.
