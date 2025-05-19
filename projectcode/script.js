document.addEventListener('DOMContentLoaded', () => {
    const planner = document.getElementById('planner');
    const currentDateElem = document.getElementById('current-date');
    const clearAllBtn = document.getElementById('clear-all-btn');

    const workHours = [
        { hour: 9, label: '9 AM' },
        { hour: 10, label: '10 AM' },
        { hour: 11, label: '11 AM' },
        { hour: 12, label: '12 PM' },
        { hour: 13, label: '1 PM' },
        { hour: 14, label: '2 PM' },
        { hour: 15, label: '3 PM' },
        { hour: 16, label: '4 PM' },
        { hour: 17, label: '5 PM' },
    ];

    // Load saved tasks from localStorage or initialize empty object
    let tasks = JSON.parse(localStorage.getItem('dayPlannerTasks')) || {};

    function saveTasks() {
        localStorage.setItem('dayPlannerTasks', JSON.stringify(tasks));
    }

    function updateCurrentDate() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const now = new Date();
        currentDateElem.textContent = now.toLocaleDateString(undefined, options);
    }

    function isCurrentHour(hour) {
        const now = new Date();
        return now.getHours() === hour;
    }

    function createTimeSlot(hourObj) {
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        if (isCurrentHour(hourObj.hour)) {
            slot.classList.add('current-hour');
        }

        const label = document.createElement('div');
        label.className = 'time-label';
        label.textContent = hourObj.label;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'task-input';
        input.value = tasks[hourObj.hour] || '';
        input.placeholder = 'Add task...';

        const saveBtn = document.createElement('button');
        saveBtn.className = 'save-btn';
        saveBtn.textContent = 'Save';

        saveBtn.addEventListener('click', () => {
            tasks[hourObj.hour] = input.value;
            saveTasks();
            saveBtn.textContent = 'Saved!';
            setTimeout(() => {
                saveBtn.textContent = 'Save';
            }, 1000);
        });

        const clearBtn = document.createElement('button');
        clearBtn.className = 'clear-btn';
        clearBtn.textContent = 'Clear';

        clearBtn.addEventListener('click', () => {
            input.value = '';
            tasks[hourObj.hour] = '';
            saveTasks();
        });

        slot.appendChild(label);
        slot.appendChild(input);
        slot.appendChild(saveBtn);
        slot.appendChild(clearBtn);

        return slot;
    }

    // Generate all time slots
    workHours.forEach(hourObj => {
        const slot = createTimeSlot(hourObj);
        planner.appendChild(slot);
    });

    clearAllBtn.addEventListener('click', () => {
        tasks = {};
        saveTasks();
        // Clear all inputs
        document.querySelectorAll('.task-input').forEach(input => input.value = '');
    });

    updateCurrentDate();
});
