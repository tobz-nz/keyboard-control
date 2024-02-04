# Keyboard-Control

This is a Custom Element (AKA Web Component) that adds keyboard navigation to selected children.

For example, the results of a type-ahead search - navigating throgh the results via up/down (or left/right) keys.

Here's a usage example:

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/tobz-nz/keyboard-control/keyboard-control.js"></script>

<keyboard-control items="li a" selected="active" loop>
    <menu>
        <li><a href="#1" title="First Link">Link 1</a></li>
        <li><a href="#2" title="Second Link" active>Link 2</a></li>
    </menu>
</keyboard-control>
```

And [here's a demo](https://tobz-nz.github.io/keyboard-control/index.html).

| Attribute | Default | Description |
| ----------|---------|------------ |
| items     | `[keyboard-target]` | The css selector for elements to control |
| selected  | `active` | The CSS selector for the currently selected element (only 1 element can be selected, if more than 1 is, first will be used) |
