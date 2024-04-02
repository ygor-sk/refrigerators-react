export function split2(str: string, separator: string): { left: string, right: string } {
    let idx = str.indexOf(separator);
    if (idx === -1) {
        return null;
    }
    return {
        left: str.slice(0, idx),
        right: str.slice(idx + separator.length)
    }
}
