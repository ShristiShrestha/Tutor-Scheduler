import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import { amethyst } from "../../utils/ShadesUtils";

const Wrapper = styled.div`
    .ant-btn {
        display: flex;
        align-items: center;
        padding: 16px 20px !important;
        border: none;
    }

    .secondary {
        background: white;
        color: ${amethyst};
    }

    .primary {
        background: ${amethyst};
    }
`;
export default function MyButton(props) {
    const type = props.type;
    return (
        <Wrapper>
            <Button type={type} className={type} size={"large"}>
                {props.children}
            </Button>
        </Wrapper>
    );
}