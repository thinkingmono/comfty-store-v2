//Function to format price in usd currency.
export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number / 100);
}

//Function to get unique values from an array and store them into an array with all selection.
export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type]);
    // console.log(unique);
    if (type === 'colors') {
        unique = unique.flat();
    }
    return ['all', ...new Set(unique)]
}
