// a toISODate function which respects the timezone
const toISODate = (date) => {
  // we can basically just stitch info given to us by a date
  // object with '-' characters and a leading zero.

  // function to add a leading zero if the value is only 
  // one digit
  const addLeadingZero = (number) => {
    return (number < 10 ? '0' : '') + number;
  }

  // create the string (offset the month by 1)
  const ISOString = date.getFullYear() 
  + '-'
  + addLeadingZero(date.getMonth() + 1) 
  + '-' 
  + addLeadingZero(date.getDate());
  return ISOString;
}


export default toISODate;
