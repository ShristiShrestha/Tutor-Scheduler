import {List, Space} from "antd";
import React, {useState} from "react";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import "./ListView.scss";
import {ResText14Regular, ResText16SemiBold} from "../../utils/TextUtils";
import styled from "styled-components";
import {yellow} from "../../utils/ShadesUtils";
import {Link} from "react-router-dom";

const data = Array.from({
    length: 23,
}).map((_, i) => ({
    time: `9:${i}5 AM`,
    title: `Mr. John Doe ${i}`,
    avatar: `https://joesch.moe/api/v1/random?key=${i}`,
    description: "Hi, Trying to get in contact with Tutor.",
    content: "Seems somethings not working.",
}));

const Wrapper = styled.div`
  .anticon svg {
    font-size: 18px;
    cursor: pointer;
    z-index: 1;
  }

  .ant-list-item {
    //border: 2px solid #fcfcfc;

    :hover {
      background: #f8f8f8;
      //border: 2px solid #7A41E6 !important;
      border-radius: 4px;
      cursor: pointer;
    }
  }
`

const ListItem = ({item}) => {
    const [checked, setChecked] = useState(false);
    const [starred, setStarred] = useState(false);

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
    };

    const handleStarClick = () => {
        setStarred(!starred);
    };

    return (
        <Link to={"/chat/users/0"}>
            <List.Item>
                {/*<Checkbox checked={checked} onChange={handleCheckboxChange}/>*/}
                {/* <List.Item.Meta title={item.title} /> */}
                <Space style={{marginRight: 12}}>
                    {starred ? (
                        <StarFilled onClick={handleStarClick} style={{color: yellow}}/>
                    ) : (
                        <StarOutlined onClick={handleStarClick}/>
                    )}
                </Space>
                <ResText14Regular className={"listview-title text-grey1"}>{item.title}</ResText14Regular>
                <ResText14Regular
                    className="listview-field text-grey3">
                    {item.description}
                </ResText14Regular>
                <ResText14Regular className="listview-time">{item.time} </ResText14Regular>
            </List.Item>
        </Link>
    );
};

const ListView = () => {
    const [checked, setChecked] = useState(false);
    const [starred, setStarred] = useState(false);

    const handleStarClick = () => {
        setStarred(!starred);
    };

    const handleDeleteClick = () => {
        setChecked(!checked);
    };

    return (
        <Wrapper>
            <div
                style={{marginLeft: "25px", marginTop: "20px", marginBottom: "10px"}}>
                <ResText16SemiBold
                    className={"text-grey2"}
                    style={{marginRight: "12px", fontSize: "16px"}}>
                    Recent conversations{" "}
                </ResText16SemiBold>
                {starred ? (
                    <StarFilled style={{color: yellow}} onClick={() => handleStarClick()}/>
                ) : (
                    <StarOutlined onClick={() => handleStarClick()}/>
                )}
                {/*{checked ? (*/}
                {/*    <DeleteFilled style={{marginLeft: "20px", color: danger}} onClick={() => handleDeleteClick()}/>*/}
                {/*) : (*/}
                {/*    <DeleteOutlined style={{marginLeft: "20px", color: danger}} onClick={() => handleDeleteClick()}/>*/}
                {/*)}*/}

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
                renderItem={(item) => <ListItem item={item}/>}
            />
        </Wrapper>
    );
};
export default ListView;
