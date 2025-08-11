
export function renderTable(block, attachListeners, render) {

    const wrapper = document.createElement("div");

    const table = document.createElement("table");
    table.dataset.id = block.id;
    block.data.forEach(rowData => {
        const row = document.createElement("tr");
        rowData.forEach(cellData => {
            const cell = document.createElement("td");
            cell.contentEditable = true;
            cell.innerText = cellData;
            row.appendChild(cell);
            attachListeners(cell);
        });
        table.appendChild(row);
    });

    wrapper.appendChild(table);

    const controlsUi = createTableControls({
        onAddRow: () => {
            const numCols = block.data[0].length;
            const newRow = [];

            for (let i = 0; i < numCols; i++) {
                newRow.push('New cell');
            }

            block.data.push(newRow);

            render();
        },

        onAddColumn: () => {
            block.data.forEach(row => {
                row.push('New cell');
            });

            render();
        },

        onRemoveRow: () => {
            if (block.data.length > 1) {
                block.data.pop();
                render();
            }
        },

        onRemoveColumn: () => {
            if (block.data[0].length > 1) {
                block.data.forEach(row => {
                    row.pop();
                });
                render();
            }
        }
    });
    wrapper.appendChild(controlsUi);
    return wrapper;
}


export function createTableControls(config = {}) {
    const controls = document.createElement('div');

    controls.style.cssText = `
            display: flex;
            gap: 8px;
            padding: 8px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
        `;

    // Add row button
    const addRowBtn = document.createElement('button');
    addRowBtn.textContent = '+ Row';
    addRowBtn.style.cssText = `
            padding: 4px 8px;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            font-size: 12px;
        `;
    addRowBtn.addEventListener('click', () => config.onAddRow ? config.onAddRow() : {});

    // Add column button
    const addColBtn = document.createElement('button');
    addColBtn.textContent = '+ Column';
    addColBtn.style.cssText = `
            padding: 4px 8px;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            font-size: 12px;
        `;
    addColBtn.addEventListener('click', () => config.onAddColumn ? config.onAddColumn() : {});

    // Remove row button
    const removeRowBtn = document.createElement('button');
    removeRowBtn.textContent = '- Row';
    removeRowBtn.style.cssText = `
            padding: 4px 8px;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            font-size: 12px;
        `;
    removeRowBtn.addEventListener('click', () => config.onRemoveRow ? config.onRemoveRow() : {});

    // Remove column button
    const removeColBtn = document.createElement('button');
    removeColBtn.textContent = '- Column';
    removeColBtn.style.cssText = `
            padding: 4px 8px;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            font-size: 12px;
        `;
    removeColBtn.addEventListener('click', () => config.onRemoveColumn ? config.onRemoveColumn() : {});

    controls.appendChild(addRowBtn);
    controls.appendChild(addColBtn);
    controls.appendChild(removeRowBtn);
    controls.appendChild(removeColBtn);

    return controls;
}
