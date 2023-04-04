import {Button} from "antd";
import React from "react";
import styled from "styled-components";
import {amethyst, snow} from "../../utils/ShadesUtils";

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


    :hover {
      background: ${snow};
    }
  }

  .primary {
    background: ${amethyst};

    :hover {
      background: ${amethyst};
    }
  }
`;
export default function MyButton(props) {
    const type = props.type;
    return (
        <Wrapper>
            <Button className={type} size={"large"}
                    {...props}
            >
                {props.children}
            </Button>
        </Wrapper>
    );
}