import { Checkbox, List, Space } from "antd";
import React, { useState } from "react";
import { StarOutlined, StarFilled, DeleteOutlined } from "@ant-design/icons";
import "./ListView.scss";
import { useNavigate } from "react-router-dom";

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  time: `9:${i}5 AM`,
  title: `Mr. John Doe ${i}`,
  avatar: `https://joesch.moe/api/v1/random?key=${i}`,
  description: "Hi, Trying to get in contact with Tutor.",
  content: "Seems somethings not working.",
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ListItem = ({ item }) => {
  const [checked, setChecked] = useState(false);
  const [starred, setStarred] = useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleStarClick = () => {
    setStarred(!starred);
  };

  const history = useNavigate();
  const changeUrl = () => {
    history("/profile");
  };

  return (
    <List.Item>
      <Checkbox checked={checked} onChange={handleCheckboxChange} />
      {/* <List.Item.Meta title={item.title} /> */}
      <Space style={{ marginLeft: "20px" }}>
        {starred ? (
          <StarFilled onClick={handleStarClick} />
        ) : (
          <StarOutlined onClick={handleStarClick} />
        )}
      </Space>
      <span className="title-listview" onClick={changeUrl}>
        {item.title}
      </span>
      <span
        className="listview-field"
        style={{ fontWeight: 500, marginLeft: "150px" }}
      >
        {item.description}
      </span>
      <span className="listview-field"> {item.content} </span>
      <span className="listview-time">{item.time} </span>
    </List.Item>
  );
};

const ListView = () => {
  const [checked, setChecked] = useState(false);
  const [starred, setStarred] = useState(false);

  const handleStarClick = () => {
    setStarred(!starred);
  };
  return (
    <>
      <div
        style={{ marginLeft: "25px", marginTop: "20px", marginBottom: "10px" }}
      >
        <Checkbox />
        <span
          style={{ marginLeft: "25px", marginRight: "25px", fontSize: "16px" }}
        >
          Select All{" "}
        </span>
        {starred ? (
          <StarFilled onClick={handleStarClick} />
        ) : (
          <StarOutlined onClick={handleStarClick} />
        )}
        <DeleteOutlined style={{ marginLeft: "20px" }} />
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 8,
        }}
        dataSource={data}
        renderItem={(item) => <ListItem item={item} />}
      />
    </>
  );
};

// const ListView = () => (
//   <List
//     itemLayout="vertical"
//     size="large"
//     pagination={{
//       onChange: (page) => {
//         console.log(page);
//       },
//       pageSize: 3,
//     }}
//     dataSource={data}
//     footer={
//       <div>
//         <b>ant design</b> footer part
//       </div>
//     }
//     renderItem={(item) => (
//       <List.Item
//         key={item.title}
//         actions={[
//           <IconText
//             icon={StarOutlined}
//             text="156"
//             key="list-vertical-star-o"
//           />,
//           <IconText
//             icon={LikeOutlined}
//             text="156"
//             key="list-vertical-like-o"
//           />,
//           <IconText
//             icon={MessageOutlined}
//             text="2"
//             key="list-vertical-message"
//           />,
//         ]}
//         extra={<div></div>}
//       >
//         <List.Item.Meta
//           avatar={<Avatar src={item.avatar} />}
//           title={
//             <div>
//               {item.title}
//               {item.description}
//               {item.content}
//               {item.time}
//             </div>
//           }
//           description={item.description}
//         />
//       </List.Item>
//     )}
//   />
// );
export default ListView;
