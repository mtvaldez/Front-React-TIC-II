function mean(arr) {
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
}

function median(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;
}

function stdv(arr) {
    const m = mean(arr);
    const variance = arr.reduce((sum, val) => sum + (val - m) ** 2, 0) / arr.length;
    return Math.sqrt(variance);
}

function min(arr) {
    return Math.min(...arr);
}

function max(arr) {
    return Math.max(...arr);
}

export function getStats(arr) {
    if (arr.length === 0) {
        return {
            min: "-",
            max: "-",
            mean: "-",
            median: "-",
            stdv: "-",
        };
    }
    return {
        min: min(arr).toFixed(1),
        max: max(arr).toFixed(1),
        mean: mean(arr).toFixed(1),
        median: median(arr).toFixed(1),
        stdv: stdv(arr).toFixed(1),
    };
}