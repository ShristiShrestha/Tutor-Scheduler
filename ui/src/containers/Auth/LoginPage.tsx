import React from "react";
import styled from "styled-components";
import { amethyst } from "../../utils/ShadesUtils";
import { Header4, ResText16Regular } from "../../utils/TextUtils";
import MyButton from "../../components/Button/MyButton";

const Wrapper = styled.div`
    background: ${amethyst};
    width: 100vw;
    height: calc(100vh - 48px);
    overflow: hidden;
`;

const LandingCard = styled.div`
    //background: white;
    padding: 24px;
    //max-width: 500px;
    //max-height: 500px;
    margin: auto;
    border: 1px solid ${amethyst};
    border-radius: 4px;
    row-gap: 12px;

    color: white;
`;
export default function LoginPage() {
    return (
        <Wrapper>
            <LandingCard className={"centered-flex"}>
                <Header4 className={"text-white"}>
                    Online Tutor Scheduler
                </Header4>
                <ResText16Regular>
                    <u>Find</u> Tutors of your <u>choice.</u>
                </ResText16Regular>

                <MyButton type={"secondary"}>
                    <ResText16Regular>Login</ResText16Regular>
                </MyButton>
            </LandingCard>
        </Wrapper>
    );
}