customElements.define(
    "keyboard-control",
    class extends HTMLElement {
        upKey = "ArrowUp";
        rightKey = "ArrowRight";
        downKey = "ArrowDown";
        leftKey = "ArrowLeft";

        itemsSelector = "[keyboard-target]";
        selectedAttribute = "active";
        currentTarget = null;

        loop = false;

        get loop() {
            return this.getAttribute("loop");
        }

        set loop(value) {
            this.toggleAttribute("loop", value);
        }

        static get observedAttributes() {
            return ["loop", "items", "selected"];
        }

        attributeChangedCallback(property, oldValue, newValue) {
            switch (property) {
                case "loop":
                    this.loop = this.hasAttribute("loop");
                    break;

                case "items":
                    if (newValue) {
                        this.itemsSelector = newValue;
                    }
                    break;

                case "selected":
                    if (newValue) {
                        this.selectedAttribute = newValue;
                    }
                    break;
            }
        }

        connectedCallback() {
            this.setAttribute("tabindex", -1);
            this.currentTarget = this.querySelector(`[${this.selectedAttribute}]`);
            if (this.currentTarget) {
                this.setCurrentTarget([this.currentTarget], 0);
            }

            this.addEventListener('focus', () => {
                if (this.currentTarget) {
                    return
                }
                
                this.select(this.querySelector(this.itemsSelector))
            })
            
            this.addEventListener(
                "keydown",
                (event) => {
                    if (!this.currentTarget) {
                        this.currentTarget = this.querySelector(this.itemsSelector);
                    }

                    if (!this.currentTarget) {
                        return;
                    }

                    let targets = this.querySelectorAll(this.itemsSelector),
                        currentKey = Array.from(targets).findIndex(
                            (t) => t === this.currentTarget
                        ),
                        targetKey = 0;

                    switch (event.code) {
                        case this.upKey:
                        case this.leftKey:
                            targetKey = currentKey - 1;
                            if (currentKey === 0) {
                                if (this.loop === false) {
                                    return;
                                }

                                targetKey = targets.length - 1;
                            }

                            return this.setCurrentTarget(targets, targetKey);

                        case this.downKey:
                        case this.rightKey:
                            targetKey = currentKey + 1;
                            if (currentKey === targets.length - 1) {
                                if (this.loop === false) {
                                    return;
                                }

                                targetKey = 0;
                            }

                            return this.setCurrentTarget(targets, targetKey);

                        case "Escape":
                            this.dispatchEvent(new CustomEvent("cancel"));
                            break;
                    }
                },
                { capture: true }
            );
        }

        setCurrentTarget(targets, targetKey) {
            this.currentTarget = targets[targetKey];

            targets.forEach((el) => el.removeAttribute(this.selectedAttribute));
            this.currentTarget.toggleAttribute(this.selectedAttribute);

            this.currentTarget.dispatchEvent(
                new CustomEvent("select", { bubbles: true })
            );
        }

        select(target) {
            let targets = this.querySelectorAll(this.itemsSelector);
            this.setCurrentTarget(
                targets,
                Array.from(targets).findIndex((t) => t === target)
            );
        }
    }
);
