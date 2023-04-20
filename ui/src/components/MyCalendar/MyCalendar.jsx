import React from "react";
import { Calendar } from "antd";
import styled from "styled-components";
import dayjs from "dayjs";

const Wrapper = styled.div``;

const MyCalendar = ({ onClick, dateCellRender, value }) => {
    const disabledDates = date => {
        const now = new Date();
        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
        );
        return date && date.isBefore(today);
    };

    return (
        <Wrapper>
            <Calendar
                disabledDate={disabledDates}
                value={dayjs(value)}
                dateCellRender={dateCellRender}
                onSelect={date => onClick(date)}
                mode={"month"}
            />
        </Wrapper>
    );
};

export default MyCalendar;
