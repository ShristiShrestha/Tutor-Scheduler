import {List, Space} from "antd";
import React, {useState} from "react";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import "./ListView.scss";
import {ResText14Regular} from "../../utils/TextUtils";
import styled from "styled-components";
import {grey6, yellow} from "../../utils/ShadesUtils";
import {Link} from "react-router-dom";
import {toEndDottedStr} from "../../utils/StringUtils";

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
    border-bottom: 1px solid ${grey6} !important;

    :hover {
      background: #f8f8f8;
      border-radius: 4px;
      cursor: pointer;
    }
  }
`;

const ListItem = ({item}) => {
    const [checked, setChecked] = useState(false);
    const [starred, setStarred] = useState(false);

    const handleCheckboxChange = e => {
        setChecked(e.target.checked);
    };

    const handleStarClick = () => {
        setStarred(!starred);
    };

    return (
        <Link to={"/chat/users/0"}>
            <List.Item>
                <Space style={{marginRight: 12}}>
                    {starred ? (
                        <StarFilled
                            onClick={handleStarClick}
                            style={{color: yellow}}
                        />
                    ) : (
                        <StarOutlined onClick={handleStarClick}/>
                    )}
                </Space>
                <ResText14Regular className={"listview-title text-grey1"}>
                    {item.title}
                </ResText14Regular>
                <ResText14Regular className="listview-field text-grey2">
                    {toEndDottedStr(item.description, 20)}
                </ResText14Regular>
                <ResText14Regular className="listview-time">
                    {item.time}{" "}
                </ResText14Regular>
            </List.Item>
        </Link>
    );
};

const ListView = () => {
    const [starred, setStarred] = useState(false);

    const handleStarClick = () => {
        setStarred(!starred);
    };

    return (
        <Wrapper>
            <div
                style={{
                    // marginLeft: "25px",
                    marginTop: "20px",
                    marginBottom: "10px",
                }}
            >
                <ResText14Regular
                    className={"text-grey1"}
                    style={{marginRight: "12px"}}
                >
                    Recent {" "}
                </ResText14Regular>
                {starred ? (
                    <StarFilled
                        style={{color: yellow}}
                        onClick={() => handleStarClick()}
                    />
                ) : (
                    <StarOutlined onClick={() => handleStarClick()}/>
                )}
            </div>
            <List
                itemLayout="vertical"
                size="large"
                className={""}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 8,
                }}
                dataSource={data}
                renderItem={item => <ListItem item={item}/>}
            />
        </Wrapper>
    );
};
export default ListView;
