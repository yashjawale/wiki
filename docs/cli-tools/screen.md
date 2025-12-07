# screen

**`screen`** is a terminal multiplexer that allows users to manage multiple virtual terminal sessions within a single physical terminal. It enables users to detach from a running session, leave processes running in the background, and reattach to the session later, even from a different location.

Usually preinstalled with major distributions.

```bash
screen --version
```

Start session
`screen`

Get list of commands - `Ctrl a ?`

Start named session
```bash
screen -S sesson_name
```
To create a new window with shell type `Ctrl+a c`, the first available number from the range `0...9` will be assigned to it.

## Common Commands

For managing Linux Screen Windows:

- `Ctrl+a c` - Create a new window (with shell).
- `Ctrl+a "` - List all windows.
- `Ctrl+a 0` - Switch to window 0 (by number).
- `Ctrl+a A` - Rename the current window.
- `Ctrl+a S` - Split current region horizontally into two regions.
- `Ctrl+a |` - Split current region vertically into two regions.
- `Ctrl+a tab` - Switch the input focus to the next region.
- `Ctrl+a Ctrl+a` - Toggle between the current and previous windows
- `Ctrl+a Q` - Close all regions but the current one.
- `Ctrl+a X` - Close the current region.

Detach from screen session
`Ctrl a d`

Reattach to linux session
`screen -r`

In case you have multiple screen sessions, will need to append the screen session ID after the r switch.
To find the session ID list the current running screen sessions with:

```bash
screen -ls
```

```bash
There are screens on:
    10835.pts-0.linuxize-desktop   (Detached)
    10366.pts-0.linuxize-desktop   (Detached)
2 Sockets in /run/screens/S-linuxize.
```
If you want to restore screen `10835.pts-0`, then type the following command:

```bash
screen -r 10835
```

## Customization

Config locations:

`/etc/screenrc` or `~/.screenrc`

```rc
# Turn off the welcome message
startup_message off

# Disable visual bell
vbell off

# Set scrollback buffer to 10000
defscrollback 10000

# Customize the status line
hardstatus alwayslastline
hardstatus string '%{= kG}[ %{G}%H %{g}][%= %{= kw}%?%-Lw%?%{r}(%{W}%n*%f%t%?(%u)%?%{r})%{w}%?%+Lw%?%?%= %{g}][%{B} %m-%d %{W}%c %{g}]'
```

## Basic Usage
1. On the command prompt, type screen.
2. Run the desired program.
3. Use the key sequence Ctrl-a + Ctrl-d to detach from the screen session.
4. Reattach to the screen session by typing screen -r
