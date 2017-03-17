module.exports = {
    validateSymbols: (value) => {
        if (value.includes('<') || value.includes('>') || value.includes('&')) {
            return false;
        }

        return true;
    },

    isNumber: (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    validateRange: (value, min, max) => {
        if (value.length < min || value.length > max) {
            return false;
        }
        return true;
    }
}