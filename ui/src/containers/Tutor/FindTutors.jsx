import Search from "../../components/Search/Search";
import { data } from "../../static_data/tutors";
import TutorCard from "../../components/Card/TutorCard";
import { ResText14SemiBold } from "../../utils/TextUtils";
import styled from "styled-components";
import { grey6 } from "../../utils/ShadesUtils";
import { Col, Row } from "antd";

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
    return (
        <Wrapper className={"h-vertically-centered-flex"}>
            <Header>
                <Row>
                    <Col span={8}>
                        <ResText14SemiBold>Find Tutors</ResText14SemiBold>
                    </Col>
                    <Col span={8}>
                        <Search />
                    </Col>
                    <Col span={8} />
                </Row>
            </Header>
            <TutorsList>
                <Row gutter={[24, 24]} wrap={true}>
                    {data.map((item, index) => (
                        <Col key={"find-tutors-" + index} span={6}>
                            <TutorCard
                                name={item.name}
                                title={item.title}
                                rating={item.ratings}
                                description={item.description}
                                expertises={item.expertises}
                            />
                        </Col>
                    ))}
                </Row>
            </TutorsList>
        </Wrapper>
    );
}