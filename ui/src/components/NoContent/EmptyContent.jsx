import React from "react";
import styled from "styled-components";
import {ResText12Regular} from "../../utils/TextUtils";
import {grey6} from "../../utils/ShadesUtils";

const Wrapper = styled.div`
  border: 1px solid ${grey6};
  border-radius: 4px;
  min-width: 100%;
  min-height: 300px;
  padding: 24px;
  row-gap: 12px;
  background: #fcfcfc;
`;
export default function EmptyContent({title, desc, className, showEmptyIcon, action}) {
    return <Wrapper className={"centered-flex " + className}>
        {showEmptyIcon && <img width={100} height={100}
                               src={process.env.PUBLIC_URL + '/empty_box.svg'}/>}
        <ResText12Regular>{desc}</ResText12Regular>
        {!!action && action}
    </Wrapper>
}