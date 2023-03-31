import React, {useCallback, useEffect, useState} from "react";
import {ResText14Regular} from "../../utils/TextUtils";
import styled from "styled-components";
import {grey3, grey6, parakeet} from "../../utils/ShadesUtils";
import {Table} from "antd";

const Wrapper = styled.div`

  .calendar-header {
    padding: 12px 20px;
  }

  .ant-table-cell-row-hover {
    background: none !important;
  }

  .ant-table-cell {
    padding: 0 !important;
  }

  .calendar-item {
    padding: 24px;
    border: 1px solid white;
  }

  .calendar-item:hover {
    background: ${grey6};
    border: 1px solid ${grey3};
  }

  #is-today {
    background: ${parakeet};
    border: 1px solid ${parakeet};

    text {
      color: white;
    }
  }
`;

// starting from sun to saturday
const daysInt = [0, 1, 2, 3, 4, 5, 6];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

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

const getRowData = (row, id) => {
    const today = new Date();
    const rowData = {
        key: "calendar-item-data" + id
    };
    for (let i = 0; i < row.length; i++) {
        const date = new Date(row[i][0]);
        const day = row[i][1];
        const isToday = today.getDate() === date.getDate() && today.getMonth() === date.getMonth();
        const id = "day-" + date.getDate() + "-date-" + days[date.getDay()]
        rowData["calendarColumn" + day] = {
            id: id,
            date: new Date(date),
            day: new Date(date).getDate(),
            isToday: isToday
        };
    }
    return rowData;
};

const getMonthDatesData = (monthsDates) => {
    let rows = [];
    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
        let row = Array(7)
            .fill(1)
            .map((element, index) => [-1, -1]);
        rows.push(row);
    }

    // fill seven days in the row/week
    let rowIndex = 0
    let addedDayIndex = -1;

    for (let i = 0; i < monthsDates.length; i++) {
        if (rowIndex >= rows.length)
            break;
        if (addedDayIndex === 6) {
            rowIndex += 1;
        }
        const dateToAdd = monthsDates[i];
        if (monthsDates && dateToAdd && dateToAdd.length > 1) {
            const day = dateToAdd[0];
            const dayIndex = dateToAdd[1];
            rows[rowIndex][dayIndex] = [day, dayIndex];
            addedDayIndex = dayIndex;
        }
    }

    return rows;
};

export default function CustomCalendar({onClick}) {
    const [loading, setLoading] = useState(true);
    const [calendarData, setCalendarData] = useState([]);
    const [today, setToday] = useState(new Date());
    const [viewMonth, setViewMonth] = useState(today.getMonth());

    const calendarCols = daysInt.map(day => ({
        key: "calendar-column-" + day,
        title: <div className={"calendar-header centered-flex"}><ResText14Regular>{days[day]}</ResText14Regular></div>,
        dataIndex: "calendarColumn" + day,
        render: param => {
            const isToday = !!param && param["isToday"]
            return {
                children: !!param && (
                    <div className={"centered-flex calendar-item"}
                         id={isToday ? "is-today" : ""}
                         onClick={() => onClick(param["date"])}
                    >
                        <ResText14Regular>{param["day"]}</ResText14Regular>
                    </div>
                ),
            };
        },
    }));

    useEffect(() => {
        getData();
    }, [loading]);

    const getData = useCallback(() => {
        const monthsDates = getMonthDates(today, viewMonth);
        const rowsDates = getMonthDatesData(monthsDates);
        let calendarData = [];
        for (let rowIndex = 0; rowIndex < rowsDates.length; rowIndex++) {
            const row = getRowData(rowsDates[rowIndex], rowIndex);
            calendarData.push(row);
        }
        setCalendarData(calendarData);
        setLoading(false);

    }, [calendarData]);

    if (loading) return <div>Loading...</div>

    return <Wrapper>
        <Table
            columns={calendarCols}
            dataSource={calendarData}
            size={"large"}
            pagination={false}
            bordered
        />
    </Wrapper>
};