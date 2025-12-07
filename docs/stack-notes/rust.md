# Rust

Ideal for high performance system applications

## Stack Management

### Installation

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Maintainence

```bash
rustc --version

rustup update

rustup self uninstall

%% Working offline %%
$ cargo new get-dependencies 
$ cd get-dependencies 
$ cargo add rand@0.8.5 trpl@0.2.0

// use the `--offline` flag with all `cargo` commands in the rest of the book to use these cached versions	
```

## Compilation
```bash
rustc main.rs
```

## Cargo
Cargo is rust's package manager & includes helpful utilities for project development.

```bash

cargo --version

cargo new hello_cargo

cargo new --vcs=git

cargo build

./target/debug/hello_cargo

cargo run

cargo check

cargo build --release
```

The Rust book: https://doc.rust-lang.org/stable/book/index.html