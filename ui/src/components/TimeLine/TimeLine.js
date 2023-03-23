import React from "react";
import { Card, Text, Image, Tag, Avatar, DatePicker } from "antd";
// import "./TimeLine.scss";
import { Timeline } from "antd";
import { UserOutlined } from "@ant-design/icons";

// const expertises = ["Computer Vision", "Machine Learning", "Web Development"];
const expertises = [];
const TimeLine = ({ data, expertises, heading }) => {
  return (
    <div style={{ marginLeft: "10px", marginBottom: "20px" }}>
      <div style={{ display: "flex" }}>
        <span className="title-schedule"> {heading} </span>
        <DatePicker style={{ marginLeft: "300px" }} />
      </div>
      <div className="timeline">
        <Timeline mode="left">
          {data.map((item, index) => (
            <Timeline.Item>
              {item.date ? (
                <Avatar
                  shape="square"
                  size={64}
                  // src=""
                  icon={<UserOutlined />}
                />
              ) : null}

              {item.title}
              <br />
              {item?.date}
              <div>{item.description}</div>

              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {expertises?.map((expertise) => (
                  <Tag style={{ borderRadius: "50%", margin: "0.2em" }}>
                    {expertise}
                  </Tag>
                ))}
              </div>
            </Timeline.Item>
          ))}

          {/* <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item> */}
        </Timeline>
      </div>
    </div>
  );
};

export default TimeLine;
