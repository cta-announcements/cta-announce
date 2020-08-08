// helper to convert an ISO String into a date object reliably
const toDateFromISO = (ISOString) => {

    // extract the year, month, and day from the string
    const parts = ISOString.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    // return a new date object with these parts
    return new Date(year, month - 1, day);

}

export default toDateFromISO;