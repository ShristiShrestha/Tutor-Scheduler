import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import { amethyst, orchid, snow } from "../../utils/ShadesUtils";

const Wrapper = styled.div`
    .ant-btn {
        display: flex;
        align-items: center;
        padding: 16px 20px !important;
        border-radius: 2px !important;
    }

    .secondary {
        background: white;
        color: ${amethyst};
        border: 1px solid ${amethyst};

        :hover {
            background: ${snow};
        }
    }

    .primary {
        background: ${amethyst};

        :hover {
            background: ${amethyst};
        }

        :disabled {
            color: white;
            background: ${orchid};
        }
    }
`;
export default function MyButton(props) {
    const type = props.type;
    return (
        <Wrapper>
            <Button className={type} size={props.size || "default"} {...props}>
                {props.children}
            </Button>
        </Wrapper>
    );
}