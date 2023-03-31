import React, { useEffect, useState } from "react";
import { ResText12Regular } from "../../utils/TextUtils";
import { Table } from "antd";

const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
const months = ["Feb", "Mar", "Apr", "May"];
const week_ranges = [
    [1, 7],
    [8, 7],
    [15, 7],
    [22, 7],
    [29, 2],
];

const calendarCols = days.map(day => ({
    key: "calendar-column-" + day,
    title: <ResText12Regular>{day}</ResText12Regular>,
    dataIndex: "calendarColumn" + day,
    render: param => {
        return {
            children: !!param && (
                <div id={"calendar-item-clicked-" + param["id"]}>
                    <div>
                        <ResText12Regular>{param["day_str"]}</ResText12Regular>
                    </div>
                    {/*<div className={"centered-flex"}>*/}
                    {/*    <ResText12Regular>{param["val"]}</ResText12Regular>*/}
                    {/*</div>*/}
                </div>
            ),
        };
    },
}));

function getMonthDates(today = new Date(), viewMonth = today.getMonth()) {
    const year = today.getFullYear();
    const month = viewMonth;
    const numDays = new Date(year, month + 1, 0).getDate();
    const dates = [];

    for (let i = 1; i <= numDays; i++) {
        const date = new Date(year, month, i);
        const day = date.getDay();
        dates.push([date, day]);
    }

    return dates;
}

const getRowData = (mnth, start, size) => {
    const days_num = Array(size)
        .fill(1)
        .map((element, index) => start + index);
    const _rowData = {
        key: "calendar-item-data-" + start + "-" + mnth,
    };
    for (let i = 0; i < days_num.length; i++) {
        const day = days_num[i];
        // const id = i === 6 ? 0 : i + 1;
        _rowData["calendarColumn" + days[i]] = {
            id: "day-" + day + "-month-" + mnth,
            day_str: day,
            val: Math.floor(Math.random() * 70 + 1),
        };
    }

    console.log("row data: ", _rowData);
    return _rowData;
};

const MyCalendar = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [today, setToday] = useState(new Date());
    const [viewMonth, setViewMonth] = useState(today.getMonth());

    useEffect(() => {
        getData(1);
    }, [calendarData]);

    const getData = (num_months = 3) => {
        const _calendarData = [];
        if (calendarData.length > 0) return calendarData;
        for (let i = 0; i < num_months; i++) {
            const one_month_data = week_ranges.map(range =>
                getRowData(months[i], range[0], range[1]),
            );
            // @ts-ignore
            _calendarData.push(one_month_data);
        }
        // @ts-ignore
        setCalendarData(_calendarData.flat(2));
    };

    const getMonthDatesData = () => {
        const monthsDates = getMonthDates(today, viewMonth);
        let rows = [];
        let addedDateIndex = [];
        for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
            let row = Array(7)
                .fill(1)
                .map((element, index) => [-1, -1]);

            // fill seven days in the row/week
            for (let i = 0; i < 7; i++) {
                const addDateIndex =
                    addedDateIndex.length === 0
                        ? 0
                        : addedDateIndex[addedDateIndex.length - 1] + 1;
                const day = monthsDates[addDateIndex][0];
                const dayIndex = monthsDates[addDateIndex][1];
                row[dayIndex] = [day, dayIndex];
                addedDateIndex.push(addDateIndex);
            }

            rows.push(row);
        }
        console.log("rows: ", rows);
        return rows;
    };

    console.log("calendar data: ", getMonthDatesData());

    const calendarTable = (
        <Table // @ts-ignore
            columns={calendarCols}
            dataSource={calendarData}
            size={"large"}
            pagination={false}
            bordered
        />
    );

    return <div>{calendarTable}</div>;
};

export default MyCalendar;
