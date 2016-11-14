---
title:      "Atom as an elixir IDE"
# subtitle:   ""
header-img: "img/headers/atom_modified.png"
disqus_identifier: "Atom as an elixir IDE"
date:       2016-11-14 20:58:00
published:  true
---

Earlier this year I joined [Mainframe](https://mainframe.com/) as a backend engineer. I didn't do any real
development in [elixir](http://elixir-lang.org/) before and I wanted to become
productive with it ASAP. When it comes to elixir there were
[some](http://amzn.to/2fr9dRw)
[good](http://amzn.to/2fr6lUq)
[books](http://amzn.to/2fr9ML1) to help me understand it better, I also needed an
editor or and IDE that would give me the tools I need without getting in my way.

Here's a list of criteria I had for my editor:

- Erlang and Elixir syntax highlighting (duh)
- good in-project search
- vi(m) keybindings
- code completion<!--more-->
- "go to source"
- "go to documentation"
- tabbed editing and project tree view
- integration with tests (optional)


Before I used mostly IntelliJ IDEs with their [vim plugin](https://plugins.jetbrains.com/plugin/164) and
Visual Studio with its [vim plugin](https://visualstudiogallery.msdn.microsoft.com/59ca71b3-a4a3-46ca-8fe1-0e90e3f79329)
for .NET development, but IDEA didn't seem to be working too well with Elixir yet.
I tried sublime with some plugins, but I couldn't get its elixir support to work either
and its plugin system felt a little clunky.

I gave [Atom](https://atom.io/) a try and I'm glad I did.

# Useful plugins

**TL;DR:** You might want some plugins. Use [sync-settings](https://atom.io/packages/sync-settings) and use [my saved settings](https://gist.github.com/nietaki/c93fc1b2f38645521764ea1dc48ccb1b) to have Atom set up exactly as I have.

While Atom is a great general-purpose editor out of the box, it really shines if you adapt
it to your needs using plugins. Unlike some other editors out there, the plugins are all in one central
repository and can be easily installed and purged from within Atom interface, without
messing with any config files or cryptic commands.

Some of them are no brainers:
- [language-elixir](https://atom.io/packages/language-elixir) - elixir syntax support
- [language-erlang](https://atom.io/packages/language-erlang) - Erlang syntax support
- [atom-elixir](https://atom.io/packages/atom-elixir) - elixir autocomplete, go to definition, documentation, ...
- [sync-settings](https://atom.io/packages/sync-settings) - keeps all your configuration and installed plugins backed up to Gist and synced between machines. My settings backup available [here](https://gist.github.com/nietaki/c93fc1b2f38645521764ea1dc48ccb1b).
- [minimap](https://atom.io/packages/minimap), [minimap-find-and-replace](https://atom.io/packages/minimap-find-and-replace), [minimap-git-diff](https://atom.io/packages/minimap-git-diff) - minimap and some useful extensions for it.
- [vim-mode](https://atom.io/packages/vim-mode), [ex-mode](https://atom.io/packages/ex-mode) - vim emulation.

## Honorable mentions

### [git-diff-details](https://atom.io/packages/git-diff-details)
Marks edited/inserted/deleted lines to be committed and the modified files themselves in the tree view.

![git-diff-details](/img/atom/git.png)

Great for keeping track of your changes and making sure there's no weird leftovers for when you do commit.

### [process-palette](https://atom.io/packages/process-palette)

While very simple, helps turn Atom into an IDE. Enables you to create console based tasks to be run in an
Atom pane. The tasks can be context aware (for example you can pass path to the current file as an argument),
can be integrated with Atom notifications and can make all `path/to/file.ext:line` references clickable.

![process-palette-mix-test](/img/atom/mix_test.png)

I set it up to run elixir tests in the project (either all or a subset) and recompile the whole project and
show generated warnings.

![process-palette-task-list](/img/atom/process_palette.png)

### [todo-show](https://atom.io/packages/todo-show)
Enables you to bring up a table with all `TODO`s in the project, with filtering/search.

### [highlight-line](https://atom.io/packages/highlight-line)
Highlights the line the cursor is in.

### [highlight-selected](https://atom.io/packages/highlight-selected)
Double-clicking a word in the code highlights it the whole file. Helps spot typos, track where a variable was bound,
makes delicious coffee.

# Most used shortcuts

While most plugins are ready to be used out of the box, they can be configured in their settings.
I remapped some of my most used shortcuts to be more easily accessible.
The shortcuts can be viewed and edited in Settings -> Keybindings.

Here's a list of shortcuts I find myself using the most:

|-------------------+-----------------+-------------|
| Original shortcut | Custom shortcut | Description |
|-------------------|-----------------|-------------|
| `shift-cmd-p`| `cmd-l` | [Command Palette](https://github.com/atom/command-palette) - a all in one search field for all Atom commands - built-in and custom likewise.    |
| `cmd-t` | | Fuzzy Finder - toggle file finder. Go to any file in the project, with fuzzy name search. |
| `alt-g down` | `alt-j` | `git-diff:move-to-next-diff` - move to next modified line in the file |
| `alt-g up` | `alt-k` | `git-diff:move-to-previous-diff` - move to next modified line in the file |
| `cmd-r` |  | Symbols View - a fuzzy search accross all functions and macros in the current file |
| `cmd-k cmd-n` | `cmd-k` | Focus next pane. Useful for going mouseless most of the time. |
| `cmd-/` |  | (un)comment out current line, regardless of the language |
|-----------------+-----------------+----------------|

There's some commands that I still use all of the time but I didn't feel like creating and learning
shortcuts for them was worth it. All those can easily be reached by using Command Palette - I just hit `cmd-l` and
some part of the command description. This way `cmd-l` -> `mix file` -> `enter` runs the tests in currently open file
(provided by Process Palette):

![command_palette](/img/atom/command_palette.png)

Some other commands are: `Sync Settings: Backup`, `Grammar Selector: Show` (for enabling code highlighting in files not saved to disk) or `Todo Show: Find In Project`.
