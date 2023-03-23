import React from "react";
import { Card, Avatar, Image, Tag, Tabs } from "antd";
import "./Rating.scss";
import TimeLine from "../TimeLine/TimeLine";

const data = [
  {
    title: "Username",
    description:
      "This is review in other input when rating .. write as long as view all",
    date: "Jan 10, 2023 10:52 PM CST",
  },
  {
    title: "Username",
    description:
      "This is review in other input when rating .. write as long as view all",
    date: "Jan 10, 2023 10:52 PM CST",
  },
  {
    title: "Username",
    description:
      "This is review in other input when rating .. write as long as view all",
    date: "Jan 15, 2023 10:52 PM CST",
  },
  {
    title: "Username",
    description:
      "This is review in other input when rating .. write as long as view all",
    date: "Jan 1, 2023 10:52 PM CST",
  },
];

const Rating = () => {
  return (
    <div className="rating-container">
      <div className="rating-mark">
        <span>Rating</span>
      </div>
      <div className="review">
        <span>Other Reviews</span>
        <TimeLine data={data} />
      </div>
    </div>
  );
};

export default Rating;
