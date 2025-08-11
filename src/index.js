export default class Blimmm {
    /**
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.holder = element;
        console.log("Blimmm is working...")

        this.blockTree = [];

        this.addBlock('paragraph');

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

        this.render();
    }
}