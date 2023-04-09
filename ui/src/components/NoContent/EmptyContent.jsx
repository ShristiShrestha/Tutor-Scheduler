import React from "react";
import styled from "styled-components";
import {ResText12Regular, ResText12SemiBold} from "../../utils/TextUtils";
import {grey6} from "../../utils/ShadesUtils";

const Wrapper = styled.div`
  border: 1px solid ${grey6};
  border-radius: 4px;
  min-width: 100%;
  min-height: 300px;
  padding: 24px;
  row-gap: 20px;
  background: #fcfcfc;
`;
export default function EmptyContent({title, desc, className, showEmptyIcon, action}) {
    return <Wrapper className={"centered-flex " + className}>
        {showEmptyIcon && <img width={100} height={100}
                               alt={"empty-content"}
                               src={process.env.PUBLIC_URL + '/empty_box.svg'}/>}
        {title && <ResText12SemiBold>{title}</ResText12SemiBold>}
        <ResText12Regular className={"wrap-word text-center text-grey2"}>{desc}</ResText12Regular>
        {!!action && action}
    </Wrapper>
}