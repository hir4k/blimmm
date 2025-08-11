import { renderTable } from "./ui.js";

export default class Blimmm {
    /**
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.holder = element;
        console.log("Blimmm is working...")

        this.blockTree = [];

        this.addBlock('paragraph');
        this.addBlock('list');
        this.addBlock('table');

        this.render()
    }


    render() {
        this.holder.innerHTML = "";
        this.blockTree.forEach(block => {
            if (block.type === "paragraph") {
                let el = document.createElement("div");
                el.dataset.id = block.id;
                el.contentEditable = true;
                block.data.forEach(segment => {
                    let span = document.createElement("span")
                    span.innerText = segment.text;
                    el.appendChild(span)
                })
                this.holder.appendChild(el)
                this.attachListeners(el);
            }

            if (block.type === "list") {
                const list = document.createElement("ul");
                list.dataset.id = block.id;
                block.data.forEach(item => {
                    const li = document.createElement("li");
                    li.contentEditable = true;
                    li.innerText = item;
                    list.appendChild(li)
                    this.attachListeners(li);
                });
                this.holder.appendChild(list);
            }

            if (block.type === "table") {
                this.holder.appendChild(renderTable(block, this.attachListeners.bind(this), this.render.bind(this)));
            }
        })
    }


    /**
     * @param {HTMLElement} el 
     */
    attachListeners(el) {
        if (el._listenersAttached) return;

        el.addEventListener("keydown", (e) => {
            if (e.key.toUpperCase() === "ENTER") {
                e.preventDefault();
            }
        });


        el.addEventListener('input', (e) => {

        })

        el._listenersAttached = true;

    }


    addBlock(type) {
        if (type === "paragraph") {
            this.blockTree.push({
                id: crypto.randomUUID(),
                type,
                data: [{ text: 'New paragraph...' }]
            })
        }

        if (type === "list") {
            this.blockTree.push({
                id: crypto.randomUUID(),
                type,
                data: [
                    'List item 1',
                    'List item 2'
                ]
            })
        }

        if (type === 'table') {
            this.blockTree.push({
                id: crypto.randomUUID(),
                type,
                data: [
                    ['Name', 'Age'],
                    ['Hirak', '25']
                ]
            });
        }

        this.render();
    }
}