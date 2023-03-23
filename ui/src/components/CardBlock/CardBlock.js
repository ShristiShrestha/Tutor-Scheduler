import React from "react";
import { Card, Avatar, Typography, Tag } from "antd";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

const CircleTag = ({ text }) => (
  <Tag style={{ borderRadius: "50%", margin: "0.2em" }}>{text}</Tag>
);

const ExpertiseList = ({ expertises }) => (
  <div style={{ display: "flex", flexWrap: "wrap" }}>
    {expertises.map((expertise) => (
      <CircleTag text={expertise} key={expertise} style={{ padding: "10px" }} />
    ))}
  </div>
);

const StatusBox = ({ status }) => {
  let color, text;
  console.log(status);
  switch (status) {
    case "Denied":
      color = "red";
      text = "Denied";
      break;
    case "Pending":
      color = "blue";
      text = "Pending";
      break;
    case "Approved":
      color = "green";
      text = "Approved";
      break;
    default:
      color = "gray";
      text = "Unknown";
  }

  return (
    <Tag color={color} style={{ float: "right", marginBottom: 30 }}>
      {text}
    </Tag>
  );
};

const CardBlock = ({
  name,
  title,
  rating,
  description,
  expertises,
  date,
  slot,
  status,
}) => {
  const history = useNavigate();
  const changeUrl = () => {
    history("/profile");
  };
  return (
    <Card
      style={{
        marginLeft: 20,
        marginTop: 20,
        width: "370px",
        borderRadius: "4px",
        // padding: "20px",
        height: 250,
      }}
    >
      {date ? <span>{date}</span> : null}
      {slot ? <span> | {slot} slots</span> : null}
      {status ? (
        <span>
          <StatusBox status={status} />
        </span>
      ) : null}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          shape="circle"
          size={64}
          // src=""
          // icon={<UserOutlined />}
        />
        <div style={{ marginLeft: "1em" }}>
          <Title
            level={4}
            style={{ margin: 0, cursor: "pointer" }}
            onClick={changeUrl}
          >
            {name}
          </Title>
          <Text type="secondary">{title}</Text>
          <Text type="secondary">{rating} ratings</Text>
        </div>
      </div>
      <div style={{ marginTop: "1em" }}>
        <p>{description}</p>
      </div>
      <div style={{ marginTop: "1em" }}>
        {expertises ? <ExpertiseList expertises={expertises} /> : null}
      </div>
    </Card>
  );
};

export default CardBlock;
