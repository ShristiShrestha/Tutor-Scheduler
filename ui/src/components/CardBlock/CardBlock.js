import React from "react";
import { Card, Avatar, Typography, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CircleTag = ({ text }) => (
  <Tag style={{ borderRadius: "50%", margin: "0.2em" }}>{text}</Tag>
);

const ExpertiseList = ({ expertises }) => (
  <div style={{ display: "flex", flexWrap: "wrap" }}>
    {expertises.map((expertise) => (
      <CircleTag text={expertise} key={expertise} />
    ))}
  </div>
);

const CardBlock = ({ name, title, rating, description, expertises }) => (
  <Card
    style={{
      marginLeft: 20,
      marginTop: 20,
      width: "370px",
      borderRadius: "4px",
      padding: "20px",
      height: 293,
    }}
  >
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar
        shape="square"
        size={64}
        // src=""
        icon={<UserOutlined />}
      />
      <div style={{ marginLeft: "1em" }}>
        <Title level={4} style={{ margin: 0 }}>
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
      <ExpertiseList expertises={expertises} />
    </div>
  </Card>
);

export default CardBlock;
