export const formatBalance = (amount = "", decimals = 18) => {
    const balance = parseFloat(amount);
    const divisor = Math.pow(10, decimals);
    const formattedBalance = balance / divisor;
    return formattedBalance.toLocaleString();
};
