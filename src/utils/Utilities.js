export const formatLongNumber = (n, decimals) => {
    if (!n) return 0;
    n = Number(n);
    if (n < 1e3) return +(n).toFixed(decimals);
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(decimals) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(decimals) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(decimals) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(decimals) + "T";
};

export const getShorAddress = (address) => {
    return address.slice(0, 6) + '...' + address.slice(address.length - 5, address.length - 1)
}

export function getOrdinalSuffix(n) {
    var i = n % 10,
        j = n % 100;
    if (i === 1 && j !== 11) {
        return n + "st";
    }
    if (i === 2 && j !== 12) {
        return n + "nd";
    }
    if (i === 3 && j !== 13) {
        return n + "rd";
    }
    return n + "th";
}

export function getFormattedTimePeriod(timeInMillis) {
    const timeInSeconds = timeInMillis / 1000;
    const months = Math.floor(timeInSeconds / 3600 / 24 / 30);
    const days = Math.floor((timeInSeconds - (months * 30 * 24 * 3600)) / 3600 / 24);
    const hours = Math.floor((timeInSeconds - (days * 24 * 3600) - (months * 30 * 24 * 3600)) / 3600);
    const minutes = Math.floor((timeInSeconds - (hours * 3600) - (days * 24 * 3600) - (months * 30 * 24 * 3600)) / 60);
    const seconds = Math.floor(timeInSeconds - (months * 3600 * 30 * 24) - (days * 3600 * 24) - (hours * 3600) - (minutes * 60));

    return {
        months,
        days,
        hours,
        minutes,
        seconds
    }
}