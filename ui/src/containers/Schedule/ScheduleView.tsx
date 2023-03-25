import styled from "styled-components";
import {useParams} from "react-router";
import {ResText12Regular, ResText14Regular, ResText14SemiBold} from "../../utils/TextUtils";
import {grey6, pearl} from "../../utils/ShadesUtils";
import {Avatar, Tag} from "antd";
import {Link} from "react-router-dom";
import {StatusTagList} from "../../components/Card/ScheduleCard";
import React from "react";
import {expertises} from "../../static_data/tutors";

const Wrapper = styled.div`

`

const Header = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid ${grey6};
  box-shadow: 0 24px #eaeaea;
`

const Content = styled.div`
  padding: 24px;
  background: ${pearl};
  height: calc(100vh - 48px);
`

const ScheduleActorInfo = styled.div.attrs({
    className: "outer-shadow"
})`
  max-width: 720px;
  margin: auto;
  padding: 24px;
  border: 1px solid ${grey6};
  background: white;
  border-radius: 8px;
  column-gap: 24px;
  margin-bottom: 24px;

  .actor-info-content {
    margin-top: 12px;
  }

  .actor-profile-info {
    margin-left: 16px;
    row-gap: 2px;
    align-items: start;
  }
`

const NeedsTutoring = styled.div.attrs({
    className: "vertical-start-flex outer-shadow"
})`
  max-width: 720px;
  margin: auto;
  padding: 24px;
  border: 1px solid ${grey6};
  background: white;
  border-radius: 8px;
  column-gap: 24px;
  margin-bottom: 24px;
  align-items: start;
  row-gap: 4px;
`

export default function ScheduleView() {
    const {id} = useParams();
    return <Wrapper>
        <Header>My Schedule 1</Header>
        <Content>
            <ScheduleActorInfo>
                <ResText14SemiBold>Tutor Info</ResText14SemiBold>
                <div className={"h-start-flex actor-info-content"}>
                    <Avatar
                        shape="circle"
                        size={64}/>
                    <div className={"vertical-start-flex actor-profile-info"}>
                        <ResText14SemiBold>Shristi Shrestha
                            {" "}
                            <Link to={"/user/"}>
                                <ResText12Regular>View profile</ResText12Regular>
                            </Link>
                        </ResText14SemiBold>
                        <ResText14Regular className={"text-grey3"}>
                            Joined in Jan 24, 2023
                        </ResText14Regular>
                    </div>
                </div>
            </ScheduleActorInfo>
            <NeedsTutoring>
                <ResText14SemiBold>Needs tutoring in</ResText14SemiBold>
                <StatusTagList>{expertises && expertises.map((expertise) => (<Tag><ResText12Regular>
                    {expertise}
                </ResText12Regular></Tag>))}</StatusTagList>
                <div style={{marginTop: "1rem"}}>
                    <ResText12Regular className={"text-grey2"}>Note - </ResText12Regular>
                    <ResText12Regular>I am looking for an easy and fun tutoring.</ResText12Regular>
                </div>
            </NeedsTutoring>
            <ResText14SemiBold>Showing schedule {id}</ResText14SemiBold>
        </Content>
    </Wrapper>
}