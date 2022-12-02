export const DayLeft = (caompagin_date) =>{
  let caompagin_year = caompagin_date.slice(0, 4);
  let caompagin_month = caompagin_date.slice(5, 7);
  let caompagin_day = caompagin_date.slice(8, 10);

  let caompagin_full_date = caompagin_month+'/'+caompagin_day+'/'+caompagin_year;

  let d = new Date();

  let current_day = d.getDate();
  let current_year = d.getFullYear();
  let current_month = d.getMonth();

  let current_full_date = current_month+'/'+current_day+'/'+current_year;

  const date1 = new Date(caompagin_full_date);
  const date2 = new Date(current_full_date);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  return diffDays;

  //console.log(diffTime + " milliseconds");
  //console.log(diffDays + " days");
}