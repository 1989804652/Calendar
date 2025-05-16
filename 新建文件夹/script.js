class Calendar {
    constructor() {
        this.date = new Date();
        this.currentMonth = this.date.getMonth();
        this.currentYear = this.date.getYear() + 1900;
        this.today = new Date();
        
        this.init();
    }

    init() {
        this.bindElements();
        this.bindEvents();
        this.render();
    }

    bindElements() {
        this.calendarDays = document.getElementById('calendarDays');
        this.currentMonthElement = document.getElementById('currentMonth');
        this.prevMonthButton = document.getElementById('prevMonth');
        this.nextMonthButton = document.getElementById('nextMonth');
        this.yearInput = document.getElementById('yearInput');
        this.monthInput = document.getElementById('monthInput');
        this.searchBtn = document.getElementById('searchBtn');
    }

    bindEvents() {
        this.prevMonthButton.addEventListener('click', () => this.changeMonth(-1));
        this.nextMonthButton.addEventListener('click', () => this.changeMonth(1));
        this.searchBtn.addEventListener('click', () => this.searchByInput());
    }

    changeMonth(delta) {
        this.currentMonth += delta;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        } else if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.render();
    }

    searchByInput() {
        const year = parseInt(this.yearInput.value, 10);
        const month = parseInt(this.monthInput.value, 10);
        if (
            isNaN(year) || isNaN(month) ||
            year < 1900 || year > 2100 ||
            month < 1 || month > 12
        ) {
            alert('请输入有效的年份（1900-2100）和月份（1-12）');
            return;
        }
        this.currentYear = year;
        this.currentMonth = month - 1;
        this.render();
    }

    getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    isToday(year, month, day) {
        return year === this.today.getFullYear() &&
               month === this.today.getMonth() &&
               day === this.today.getDate();
    }

    render() {
        const daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
        const firstDay = this.getFirstDayOfMonth(this.currentYear, this.currentMonth);
        
        // 同步输入框的值
        if (this.yearInput && this.monthInput) {
            this.yearInput.value = this.currentYear;
            this.monthInput.value = this.currentMonth + 1;
        }
        
        // 更新月份显示
        this.currentMonthElement.textContent = `${this.currentYear}年${this.currentMonth + 1}月`;
        
        // 清空日历
        this.calendarDays.innerHTML = '';
        
        // 添加上个月的日期
        const prevMonthDays = this.getDaysInMonth(this.currentYear, this.currentMonth - 1);
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.className = 'day other-month';
            day.textContent = prevMonthDays - i;
            this.calendarDays.appendChild(day);
        }
        
        // 添加当前月的日期
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.className = 'day';
            if (this.isToday(this.currentYear, this.currentMonth, i)) {
                day.classList.add('today');
            }
            day.textContent = i;
            this.calendarDays.appendChild(day);
        }
        
        // 添加下个月的日期
        const remainingDays = 42 - (firstDay + daysInMonth); // 6行7列 = 42
        for (let i = 1; i <= remainingDays; i++) {
            const day = document.createElement('div');
            day.className = 'day other-month';
            day.textContent = i;
            this.calendarDays.appendChild(day);
        }
    }
}

// 初始化日历
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
}); 