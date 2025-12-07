# tmux

Package name: `tmux`

Tmux is a terminal multiplexer; it allows us to create several "pseudo terminals" from a single terminal. This is very useful for running multiple programs with a single connection, such as when remotely connecting to a machine using SSH.

Tmux also decouples programs from the main terminal, protecting them from accidentally disconnecting. We can detach tmux from the current terminal, and all programs will continue to run safely in the background. Later, we can reattach tmux to the same or a different terminal.

All commands start with prefix → Default `Ctrl b`

Get list of commands: `Ctrl b ?`

Create new named session: 
```bash
tmux new -s session_name
```

Detach from tmux session: `Ctrl b d`

List sessions: 
```
tmux ls
```

Re-attach 
```
tmux attach-session -t 0
```

## Common commands

For managing Tmux windows and panes

- `Ctrl+b  c` - Create a new window (with shell)
- `Ctrl+b  w` - Choose window from a list
- `Ctrl+b  0` - Switch to window 0 (by number )
- `Ctrl+b  ,` - Rename the current window
- `Ctrl+b  %` - Split current pane horizontally into two panes
- `Ctrl+b  "` - Split current pane vertically into two panes
- `Ctrl+b  o` - Go to the next pane
- `Ctrl+b  ;` - Toggle between the current and previous pane
- `Ctrl+b  x` - Close the current pane

## Customizing Tmux 

File location:
```
~/.tmux.conf
```

```conf
# Improve colors
set -g default-terminal 'screen-256color'

# Set scrollback buffer to 10000
set -g history-limit 10000

# Customize the status line
set -g status-fg  green
set -g status-bg  black
```

## Basic Usage
Basic steps for getting started with Tmux:

1. On the command prompt, type `tmux new -s my_session`,
2. Run the desired program.
3. Use the key sequence `Ctrl-b + d` to detach from the session.
4. Reattach to the Tmux session by running `tmux attach-session -t my_session`