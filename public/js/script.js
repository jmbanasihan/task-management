//for calendar
let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

let dark_mode_toggle = document.querySelector('.dark-mode-switch')

dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
}





//grid- events.js
function addEvents(grid) {
    let g = "grid";

    grid.on("dragstart", function (event, el) {
      let node = el.gridstackNode;
      let x = el.getAttribute("gs-x"); // verify node (easiest) and attr are the same
      let y = el.getAttribute("gs-y");
      console.log(
        g +
          "dragstart " +
          el.textContent +
          " pos: (" +
          node.x +
          "," +
          node.y +
          ") = (" +
          x +
          "," +
          y +
          ")"
      );
    });

    grid.on("drag", function (event, el) {
      let node = el.gridstackNode;
      let x = el.getAttribute("gs-x"); // verify node (easiest) and attr are the same
      let y = el.getAttribute("gs-y");
      // console.log(g + 'drag ' + el.textContent + ' pos: (' + node.x + ',' + node.y + ') = (' + x + ',' + y + ')');
    });

    grid.on("dragstop", function (event, el) {
      let node = el.gridstackNode;
      let x = el.getAttribute("gs-x"); // verify node (easiest) and attr are the same
      let y = el.getAttribute("gs-y");
      console.log(
        g +
          "dragstop " +
          el.textContent +
          " pos: (" +
          node.x +
          "," +
          node.y +
          ") = (" +
          x +
          "," +
          y +
          ")"
      );
    });

    grid.on("dropped", function (event, previousWidget, newWidget) {
      if (previousWidget) {
        console.log(
          g + "dropped - Removed widget from grid:",
          previousWidget
        );
      }
      if (newWidget) {
        console.log(g + "dropped - Added widget in grid:", newWidget);
      }
    });
  }

//for grid
let options1 = {
    column: 12,
    row: 1, // don't collapse when empty
    cellHeight: 200,
    disableOneColumnMode: true,
    float: false,
    acceptWidgets: function (el) {
      return false;
    }, // function example, else can be simple: true | false | '.someClass' value
  };

  let options2 = {
    column: 3,
    row: 4, // don't collapse when empty
    cellHeight: 200,
    disableOneColumnMode: true,
    float: false,
    acceptWidgets: function (el) {
      return true;
    }, // function example, else can be simple: true | false | '.someClass' value
  };

    let gridbox1 = document.getElementById("gridbox1");
    let gridbox2 = document.getElementById("gridbox2");

    let grid1 = GridStack.init(options1, gridbox1);
    let grid2 = GridStack.init(options2, gridbox2);

    var content = `
      <p>lorem</p>
      <div style="display:flex;">
 <h1>hi</h1>
 <h2>hi</h2>
    </div>
      `;
      var items = [
        {
          w: 3,
          content: content,
          noResize: true,
        },
        { w: 3, content: content, noResize: true },
        { w: 3, content: content, noResize: true },
        { w: 3, content: content, noResize: true },
      ];

    addEvents(grid1);
    grid1.load(items);

