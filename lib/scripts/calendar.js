(function() {
    document.addEventListener('DOMContentLoaded', () => getCalendar());
    let calendarJson = [];
    var selectedDateString;
    let firstFromLastAdded;
    var touchDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement || screen.width <= 1024);

    const getCalendar = async () => {
        var currentDay = new Date();
        
        calendarFetch(currentDay);

        changeMonthSetup();
    }

    async function calendarFetch(selectedDate, change = '') {
        const url = new URL("https://pdwebapi-mf5.conveyor.cloud/api/installerAppData/getCalendar");
        const urlMonth = new URL("https://pdwebapi-mf5.conveyor.cloud/api/installerAppData/getCalendarMonth");

        var dd = String(selectedDate.getDate()).padStart(2, '0');
        var mm = String(selectedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        const month = selectedDate.toLocaleString('default', { month: 'long' });
        var yyyy = selectedDate.getFullYear();
        var monthCount = 2;
        selectedDateString = `${mm}/${dd}/${yyyy}`
        
        const params = { date: selectedDateString, monthCount: monthCount };

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        var titleElement = document.getElementById('calendar_month');
        titleElement.textContent = `${month} ${yyyy}`
            
        if (calendarJson.length == 0) {
            const response = await fetch(url);
            calendarJson = await response.json();
        }
        else if (change != null) {
            let nextMonth = (selectedDate.getMonth() + 1) % 12 == 0 ? 12 : (selectedDate.getMonth() + 1) % 12;
            let selectedYear = selectedDate.getFullYear();
            let minMonth = calendarJson[0].mm, maxMonth = calendarJson[calendarJson.length - 1].mm, minYear = calendarJson[0].yy, maxYear = calendarJson[calendarJson.length - 1].yy;
            let monthParams;

            if (change == 'back' && nextMonth - minMonth <= 2 && nextMonth - minMonth > 0 && selectedYear - minYear < 1) {
                monthParams = { date: `${minMonth}/1/${minYear}`, monthCount: monthCount + 2};

                getCalendarMonth(urlMonth, monthParams);
            }
            else if (change != 'back' && (maxYear - selectedYear <= 1 && (nextMonth - maxMonth == 11 || (maxMonth - nextMonth <= 2 && maxMonth - nextMonth > 0) ||  (nextMonth - maxMonth <= 2 && nextMonth - maxMonth > 0)))) {
                monthParams = { date: `${maxMonth}/1/${maxYear}`, monthCount: -monthCount - 2 };
                
                getCalendarMonth(urlMonth, monthParams);
            }
        }
        
        createCalendarDay(calendarJson, selectedDate);
    }

    async function getCalendarMonth(urlMonth, monthParams) {
        Object.keys(monthParams).forEach(key => urlMonth.searchParams.append(key, monthParams[key]));
        const response = await fetch(urlMonth);
        let calendarJsonArray = await response.json();
        let arrayLength = calendarJsonArray.length;

        if (firstFromLastAdded != null) {
            if (firstFromLastAdded.dateId == calendarJsonArray[0].dateId) {
                return;
            }
        }

        for (let i = 0; i < arrayLength; i++) {
            const element = calendarJsonArray[i];
            if (monthParams.monthCount > 0) {
                calendarJson = [element, ...calendarJson];
            }
            else {
                calendarJson = [...calendarJson, element];
            }
        }
        firstFromLastAdded = calendarJsonArray[0];
    }
    
    function createCalendarDay(calendarJson, selectedDate) {
        var dateGrid = document.getElementById('date_grid');
        dateGrid.innerHTML = '';
        var numOfDaysDisplayed = 42;
        var beginingOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        var beginingOfMonthWeek = beginingOfMonth.getWeekNumber() - 1;
        var endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        var endOfMonthWeek = endOfMonth.getWeekNumber();
        var selectedDateWeek = selectedDate.getWeekNumber() - 1;
        var firstSunday = getLastSunday(beginingOfMonth).toISOString().split('.')[0].split('T')[0] + 'T00:00:00';

        var calendar = [];

        var counter = 1;
        var startIndex = calendarJson.findIndex(x => x.dateId == firstSunday);
        while (counter <= numOfDaysDisplayed) {
            calendar = [...calendar, calendarJson[startIndex++]];
            counter++;
        }
        
        for (let i = 0; i < calendar.length; i++){
            let obj = calendar[i];
            // console.log(obj.dateId, obj.dd, obj.dw, obj.holidayName, obj.isHoliday, obj.isWorkDay, obj.mm, obj.wm, obj.wy, obj.yy);
                
            if (obj.dw == 7) {
                var dateWeek = document.createElement('div');
                dateWeek.classList.add('dateWeek');
                dateWeek.setAttribute('id', obj.wy);
            }

            var date = document.createElement('div');
            date.classList.add('date');
            date.setAttribute('id', obj.dateId);

            var dateNumber = document.createElement('div');
            dateNumber.classList.add('dateNumber');
            date.append(dateNumber);

            const currentDay = new Date();
            const month = new Date(obj.yy, obj.mm - 1, 1).toLocaleString('default', { month: 'short' });
            
            if (obj.dd == currentDay.getDate() && obj.mm == currentDay.getMonth() + 1 && obj.yy == currentDay.getFullYear()) {
                date.firstChild.classList.add('dateNumber-currentDay');
            }

            if (!obj.isWorkDay) {
                date.classList.add('date-nonWorkDay');
            }

            if (obj.mm != beginingOfMonth.getMonth() + 1) {
                date.classList.add('date-greyMonth');
            }

            dateNumber.textContent = `${obj.dd == 1 ? month : ''} ${obj.dd} ${obj.isHoliday && !touchDevice ? obj.holidayName : ''}`;
            
            if (obj.dw == 7 && obj.wy == endOfMonthWeek + 1) {
                return;
            }

            if (dateWeek != null) {
                dateWeek.append(date);
                dateGrid.append(dateWeek);

                document.getElementById(obj.dateId).addEventListener('click', () => {selectDay(event)});
            }
        }
    }

    Date.prototype.getWeekNumber = function(){
        var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
        var dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
    };

    function selectDay(event) {
        var target = event.target;

        var dateNumber = document.querySelectorAll('.dateNumber, .date-selectedMobile');

        for (let i = 0; i < dateNumber.length; i++) {
            const element = dateNumber[i];
            element.classList.remove('date-selectedMobile');
            element.classList.remove('dateNumber-selected');
        }

        if (target.classList.contains('dateNumber') && !touchDevice) {
            target.classList.add('dateNumber-selected');
        }
        else {
            if (touchDevice) {
                target.classList.add('date-selectedMobile');
            }
            else {
                target.firstChild.classList.add('dateNumber-selected');
            }
        }
    }

    function changeMonthSetup() {
        document.querySelector('#calendar_month').addEventListener('click', () => {calendarFetch(new Date());});
        document.querySelectorAll('.month-change').forEach(function (element) {
            element.addEventListener('click', () => changeMonth(element));
        });
    }

    function changeMonth(element) {
        var change = element.getAttribute('data-change');
        var selectedMonth = new Date(selectedDateString);
        selectedMonth = change == 'back' ?
                        new Date(selectedMonth.setDate(0)) : new Date(selectedMonth.getMonth() == 11 ? selectedMonth.getFullYear() + 1 : selectedMonth.getFullYear(), (selectedMonth.getMonth() + 1) % 12, 1);
        
        calendarFetch(selectedMonth, change);
    }

    function getLastSunday(d) {
        var t = new Date(d);
        t.setDate(t.getDate() - t.getDay());
        return t;
    }
})();