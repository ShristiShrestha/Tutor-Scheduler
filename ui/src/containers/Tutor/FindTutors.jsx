import Search from "../../components/Search/Search";
import TutorCard from "../../components/Card/TutorCard";
import {ResText14SemiBold} from "../../utils/TextUtils";
import styled from "styled-components";
import {grey6} from "../../utils/ShadesUtils";
import {Col, Row, Spin} from "antd";
import {Link} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {UserParams, UserSortKeys} from "../../redux/user/types";
import {UserRoles} from "../../enum/UserEnum";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../redux/user/actions";
import {selectUser} from "../../redux/user/reducer";

const Wrapper = styled.div`
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 48px; // height of main top header - app name
  left: 200px;
  right: 0;
  padding: 0 24px;
  border-bottom: 1px solid ${grey6};

  .ant-row {
    width: 100%;
  }

  .ant-col {
    align-self: center;
  }
`;

const TutorsList = styled.div`
  position: relative;
  top: 56px; // height of find tutor header
  height: calc(100vh - 112px);
  overflow-y: auto;
  margin-bottom: 120px;
  padding: 24px;
`;


export default function FindTutors() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {users} = useSelector(selectUser);
    const getUserParams = (): UserParams => {
        return {
            sortBy: UserSortKeys.rating,
            role: UserRoles.TUTOR,
        }
    }

    const fetchTutors = useCallback(() => {
        const tutorsParams = getUserParams();
        dispatch(fetchUsers(tutorsParams));
        setLoading(false);
    }, [dispatch]); // will create function inside callback only if dispatch has changed

    useEffect(() => {
        fetchTutors();
    }, [fetchTutors]); // will call fetchTutors if fetchApts function has changed


    return (
        <Wrapper className={"h-vertically-centered-flex"}>
            <Header>
                <Row>
                    <Col span={8}>
                        <ResText14SemiBold>Find Tutors</ResText14SemiBold>
                    </Col>
                    <Col span={8}>
                        <Search/>
                    </Col>
                    <Col span={8}/>
                </Row>
            </Header>
            <Spin spinning={loading}>
                <TutorsList>
                    <Row gutter={[24, 24]} wrap={true}>
                        {users.map((item, index) => (
                            <Col key={"find-tutors-" + index} span={6}>
                                <Link to={"/profile/" + item.id + "/request-tutoring"}>
                                    <TutorCard {...item}/>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </TutorsList>
            </Spin>
        </Wrapper>
    );
}