export function parseSegments(node, parentStyle = []) {
    const segments = [];
    if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim()) {
            segments.push({ text: node.textContent, style: parentStyle });
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        let style = [...parentStyle];
        const tag = node.tagName.toLowerCase();
        if ((tag === 'b' || tag === 'strong') && !style.includes('bold')) style.push('bold');
        else if ((tag === 'em' || tag === 'i') && !style.includes('italic')) style.push('italic');
        else if (tag === 'u' && !style.includes('underline')) style.push('underline');
        for (const child of node.childNodes) {
            segments.push(...parseSegments(child, style));
        }
    }
    return segments;
}