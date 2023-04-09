import React, {useState} from "react";
import {Calendar} from "antd";
import styled from "styled-components";
import dayjs from "dayjs";

const Wrapper = styled.div`
`;

const MyCalendar = ({onClick, dateCellRender, value}) => {
    const [loading, setLoading] = useState(false);
    const [calendarData, setCalendarData] = useState([]);
    const [today, setToday] = useState(new Date());
    const [viewMonth, setViewMonth] = useState(today.getMonth());

    if (loading) return <div>Loading...</div>

    // const dateCellRender = (value) => {
    //     if (value.date() !== 7)
    //         return []
    //     const listData = [
    //         {type: "success", content: "12 PM"},
    //         {type: "success", content: "1 PM"},
    //     ]
    //     return (
    //         <ul className="events">
    //             {listData.map((item) => (
    //                 <li key={item.content}>
    //                     <Badge status={item.type} text={item.content}/>
    //                 </li>
    //             ))}
    //         </ul>
    //     );
    // };

    const disabledDates = (date) => {
        const today = new Date();
        return date && date.diff(today) < 0;
    }

    return <Wrapper>
        <Calendar
            disabledDate={disabledDates}
            value={dayjs(value)}
            dateCellRender={dateCellRender}
            onSelect={(date) => onClick(date)}
            mode={"month"}
        />
    </Wrapper>
};

export default MyCalendar;
