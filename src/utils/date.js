function extractDate(time, timeZone) {
    // 年月
    const frontendUtcDate = new Date(time);
    const backendDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timeZone,
    }).format(frontendUtcDate);

    const match = backendDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4}), (\d{1,2}):(\d{1,2}):(\d{1,2}) (AM|PM)$/);

    const year = match[3];
    const month = match[1].padStart(2, '0');
    const day = match[2].padStart(2, '0');
    let hour = parseInt(match[4], 10);
    const minute = match[5];
    const ampm = match[7];

    // 处理12小时制的时间
    if (ampm === 'PM' && hour !== 12) {
        hour += 12;
    } else if (ampm === 'AM' && hour === 12) {
        hour = 0;
    }

    const formattedTime = `${year}-${month}-${day} ${hour.toString().padStart(2, '0')}:${minute}`;

    return formattedTime;
}

function extractYearAndMonthAndDay(time, timeZone) {
    // 年月
    const frontendUtcDate = new Date(time);
    const backendDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timeZone,
    }).format(frontendUtcDate);

    const match = backendDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4}), (\d{1,2}):(\d{1,2}):(\d{1,2}) (AM|PM)$/);

    const year = match[3];
    const month = match[1].padStart(2, '0');
    const day = match[2].padStart(2, '0');
    let hour = parseInt(match[4], 10);
    const ampm = match[7];

    // 处理12小时制的时间
    if (ampm === 'PM' && hour !== 12) {
        hour += 12;
    } else if (ampm === 'AM' && hour === 12) {
        hour = 0;
    }

    const formattedTime = `${year}-${month}-${day}`;

    return formattedTime;
}

function extractYearAndMonth(time, timeZone) {
    // 年月
    const frontendUtcDate = new Date(time);
    const backendDate = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
    }).format(frontendUtcDate);


    const match = backendDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);

    const yearPart = match[3];
    const monthPart = match[1];

    // 构建 "2024-1" 格式
    const formattedDate = `${yearPart}-${monthPart}`;

    return formattedDate;
}

function extractDay(time, timeZone) {
    // 日
    const frontendUtcDate = new Date(time);
    const backendDate = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
    }).format(frontendUtcDate);
    const match = backendDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    return match[2];
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 导出检查函数
export { extractDate, extractYearAndMonth, extractDay, formatDate, extractYearAndMonthAndDay };