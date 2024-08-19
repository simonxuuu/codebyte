/*
CALCULATE CALENDAR

Allows for calendar rendering.
*/

export function getCalendar({
  year = undefined,
}: {
  year?: number | undefined;
}) {
  if (!year) year = Number(new Date().getFullYear());

  let arr = new Array(12); // make array of 12 months

  // 6 weeks for each month
  for (let x = 0; x < arr.length; x++) {
    arr[x] = new Array(6);
  }

  // 7 days for each week
  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr[x].length; y++) {
      arr[x][y] = new Array(7);
    }
  }

  for (let month = 0; month < arr.length; month++) {
    let startDayInWeek = new Date(year, month, 1).getDay(); // Day of the week of the first day of the month
    let monthLong = new Date(year, month + 1, 0).getDate(); // Number of days in the month
    let prevMonthLong = new Date(year, month, 0).getDate(); // Number of days in the previous month

    let counter = 1;

    for (let x = 0; x < arr[month].length; x++) {
      for (let y = 0; y < arr[month][x].length; y++) {
        if (x === 0 && y < startDayInWeek) {
          const diff = startDayInWeek - y - 1; // get how many days until the first day
          arr[month][x][y] = `beforeMonth_${prevMonthLong - diff}`;
        } else if (counter <= monthLong) {
          arr[month][x][y] = counter;
          counter++;
        } else {
          arr[month][x][y] = `afterMonth_${counter - monthLong}`;
          counter++;
        }
      }
    }
  }

  return arr;
}

const calendar = getCalendar({});

export default calendar; // export current year calendar for use throughout website
