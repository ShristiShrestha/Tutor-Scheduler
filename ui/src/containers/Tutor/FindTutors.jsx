import MySearch from "../../components/Search/MySearch";
import TutorCard from "../../components/Card/TutorCard";
import { ResText14Regular, ResText14SemiBold } from "../../utils/TextUtils";
import styled from "styled-components";
import { grey6 } from "../../utils/ShadesUtils";
import { Col, Row, Spin } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { UserParams, UserSortKeys } from "../../redux/user/types";
import { UserRoles } from "../../enum/UserEnum";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/user/actions";
import { selectUser } from "../../redux/user/reducer";
import EmptyContent from "../../components/NoContent/EmptyContent";
import { selectAuth } from "../../redux/auth/reducer";

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
    left: 210px;
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
    top: 60px; // height of find tutor header
    height: calc(100vh - 112px);
    overflow-y: auto;
    margin-bottom: 120px;
    padding: 12px 24px;
    width: 100%;

    .ant-row {
        margin-top: 24px;
    }
`;

export default function FindTutors() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(undefined);

    const { loggedUser } = useSelector(selectAuth);
    const { users } = useSelector(selectUser);

    /******************* local params ************************/
    const getUserParams = (): UserParams => {
        return {
            sortBy: UserSortKeys.rating,
            role: UserRoles.TUTOR,
            filterKey: searchQuery ? "expertise" : undefined,
            filterValue: searchQuery,
        };
    };

    /******************* dispatches ************************/
    const dispatchFetchTutors = () => {
        const tutorsParams = getUserParams();
        dispatch(fetchUsers(tutorsParams));
        setLoading(false);
    }; // will create function inside callback only if fetchUsers has changed

    /******************* use effects ************************/

    useEffect(() => {
        dispatchFetchTutors();
    }, [fetchUsers]); // will call dispatchFetchTutors if it has function has changed

    const noTutorsDesc =
        !!searchQuery && searchQuery.length > 0
            ? `We found 0 tutors with expertise in "${searchQuery}".`
            : "There are no tutors. Please keep in touch.";

    return (
        <Wrapper className={"h-vertically-centered-flex"}>
            <Header>
                <Row>
                    <Col span={8}>
                        <ResText14SemiBold>Find Tutors</ResText14SemiBold>
                    </Col>
                    <Col span={8}>
                        <MySearch
                            value={searchQuery}
                            onSearch={() => dispatchFetchTutors()}
                            onChange={e =>
                                setSearchQuery(e.currentTarget.value)
                            }
                        />
                    </Col>
                    <Col span={8} />
                </Row>
            </Header>
            <TutorsList>
                <ResText14Regular>
                    Showing tutors ({users.length})
                </ResText14Regular>
                <Spin spinning={loading}>
                    {users.length > 0 ? (
                        <Row gutter={[24, 24]} wrap={true}>
                            {users.map((item, index) => (
                                <Col
                                    key={"find-tutors-" + index}
                                    xxl={4}
                                    xl={8}
                                    lg={8}
                                    md={12}
                                    sm={24}
                                >
                                    <Link
                                        to={
                                            "/profile/" +
                                            item.id +
                                            "/request-tutoring"
                                        }
                                    >
                                        <TutorCard
                                            tutor={item}
                                            loggedUserId={loggedUser?.id}
                                        />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <EmptyContent
                            showEmptyIcon={true}
                            className={"medium-vertical-margin"}
                            desc={noTutorsDesc}
                        />
                    )}
                </Spin>
            </TutorsList>
        </Wrapper>
    );
}