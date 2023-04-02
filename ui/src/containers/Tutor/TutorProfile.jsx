import React, {useState} from "react";
import styled from "styled-components";
import {grey1, grey6, pearl} from "../../utils/ShadesUtils";
import {ResText14Regular, ResText14SemiBold, ResText16Regular, ResText16SemiBold} from "../../utils/TextUtils";
import {
    ratings,
    renderActorInfo,
    renderNeedsTutoring,
    renderTabs,
    SlotInfo,
    TabContent
} from "../Schedule/ScheduleView";
import {CalendarOutlined, StarOutlined} from "@ant-design/icons";
import {toMonthDateYearStr} from "../../utils/DateUtils";
import MyCalendar from "../../components/MyCalendar/MyCalendar";
import {useParams} from "react-router";
import {useLocation} from "react-router-dom";
import {Checkbox, Col, Divider, Input, Row} from "antd";
import MyButton from "../../components/Button/MyButton";

const Wrapper = styled.div`
  .ant-divider {
    margin: 0;
  }

  .ant-row {
    margin: 0 !important;
  }

  .ant-col {
    height: fit-content;
  }
`;

const Header = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid ${grey6};
  box-shadow: 0 24px #eaeaea;
`;

const Content = styled.div`
  //padding: 24px;
  background: white;
    // background: ${pearl};
  height: calc(100vh - 48px);
  overflow-y: auto;
  position: relative;
  padding-bottom: 120px;

  .border-right {
    border-right: 1px solid ${grey6};
  }
`;

const ProfileCard = styled.div`
  background: ${pearl};
  align-items: center;
  margin-left: 30px;
  margin-top: 20px;
  width: 70vw;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  height: auto;

  .profile-info {
    padding: 30px;
    margin-bottom: 20px;
  }

  .profile-top {
    margin-top: -60px;
  }

  .arrange-div {
    display: flex;
    align-items: center;
  }

  .profile-section {
    margin: 25px 0 0 15px;
  }
`;

const CoverImage = () => {
    return (
        <div className="cover-image">
            <img
                style={{width: "70vw", height: "26vh"}}
                src="https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Example Image"
            />
        </div>
    );
};

const getMenuItems = (id) => [
    // {
    //     key: "profile-view",
    //     link: `/profile/${id}/details`,
    //     title: "Profile",
    //     icon: <UserOutlined/>,
    // },
    {
        key: "request-tutoring",
        link: `/profile/${id}/request-tutoring`,
        title: "Request for tutoring",
        icon: <CalendarOutlined/>,
    },
    {
        key: "view-tutor-ratings",
        link: `/profile/${id}/view-tutor-ratings`,
        title: "View tutor ratings",
        icon: <StarOutlined/>,
    },
];


const availableSlots = [
    {
        "key": "slot-0",
        "title": "12 - 1 PM",
        "start-date": new Date(),
        "disabled": false
    },
    {
        "key": "slot-1",
        "title": "1 - 2 PM",
        "start-date": new Date(),
        "disabled": false
    },
    {
        "key": "slot-2",
        "title": "2 - 3 PM",
        "start-date": new Date(),
        "disabled": false
    },
    {
        "key": "slot-3",
        "title": "3 - 4 PM",
        "start-date": new Date(),
        "disabled": false
    },
    {
        "key": "slot-4",
        "title": "4 - 5 PM",
        "start-date": new Date(),
        "disabled": false
    },
    {
        "key": "slot-5",
        "title": "5 - 6 PM",
        "start-date": new Date(),
        "disabled": false,
    },
    {
        "key": "slot-6",
        "title": "6 - 7 PM",
        "start-date": new Date(),
        "disabled": false,
    },
    {
        "key": "slot-7",
        "title": "7 - 8 PM",
        "start-date": new Date(),
        "disabled": true,
    }
]

const TutorProfile = () => {
    const [visible, setVisible] = useState(false);
    const [param, setParam] = useState("title");

    const {id} = useParams();
    const location = useLocation();

    const showModal = type => {
        setParam(type);
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const getDefaultTab = () => {
        const menuItems = getMenuItems(id)
        const pathname = location ? location.pathname : "/profile/" + id;
        if (!!menuItems) {
            const defaultOpenTabs = menuItems.filter(item => item["link"] === pathname);
            if (defaultOpenTabs.length > 0) {
                return defaultOpenTabs.map(item => item["key"]);
            }
            return [menuItems[0].key];
        }
        return [""]
    }

    const renderMenuComponent = (menuItems = getMenuItems(id)) => {
        const defaultTab = getDefaultTab()[0];
        const today = new Date();
        switch (defaultTab) {
            case menuItems[0].key:
                const onClick = (date) => alert("hello, " + toMonthDateYearStr(new Date(date)));
                return (
                    <TabContent>
                        <div className={"h-justified-flex medium-vertical-margin"}>
                            <ResText16Regular>
                                Pick a date and slot time for tutoring.
                            </ResText16Regular>
                            <ResText16SemiBold><b>Today</b>
                                <ResText16Regular className={"text-grey"} style={{marginLeft: 12}}>
                                    {toMonthDateYearStr(today)}
                                </ResText16Regular>
                            </ResText16SemiBold>
                        </div>
                        <MyCalendar onClick={onClick}/>
                    </TabContent>
                );

            // case menuItems[2].key:
            //     return <TabContent>
            //         <ResText16SemiBold>
            //             Request for tutoring
            //         </ResText16SemiBold>
            //         <div className={"rate-tutor-content"}>
            //             <div className={"rate-tutor-features h-start-top-flex"}>
            //                 <ResText16Regular className={"text-grey2"}>Tutoring skill</ResText16Regular>
            //             </div>
            //             <div className={"rate-tutor-comment h-start-flex"}>
            //                 <ResText16Regular className={"text-grey2"}>Add comment (Optional)</ResText16Regular>
            //                 <Input rootClassName={"rate-tutor-input"} size={"large"} bordered/>
            //             </div>
            //             <div className={"h-end-flex"}>
            //                 <MyButton type={"primary"}>
            //                     <ResText14Regular>Submit your ratings</ResText14Regular>
            //                 </MyButton>
            //             </div>
            //         </div>
            //     </TabContent>

            default:
                return <TabContent>
                    <ResText16SemiBold>Overall tutor ratings</ResText16SemiBold>
                    <div className={"rate-tutor-content"}>
                        <div className={"rate-tutor-features h-start-top-flex"}>
                            <ResText16Regular className={"text-grey2"}>Tutoring skill</ResText16Regular>
                            <ul className={"rate-tutor-options"}>
                                {ratings.map(item => <li className={item.className}>{item.icon}</li>)}
                            </ul>
                        </div>
                        <div className={"rate-tutor-comment h-start-flex"}>
                            <ResText16Regular className={"text-grey2"}>Your
                                comment {<img width={20} height={20}
                                              style={{marginLeft: 4, marginBottom: "-4px"}}
                                              src={process.env.PUBLIC_URL + '/pouting_face.svg'}/>} </ResText16Regular>
                            <Input disabled={true} rootClassName={"rate-tutor-input"} size={"large"} bordered/>
                        </div>
                    </div>
                </TabContent>
        }
    };


    const renderCurrentSlot = () => <SlotInfo>
        <ResText16Regular className={"text-grey2"}>Showing slots for
            <b style={{marginLeft: 8, color: grey1}}>{`${toMonthDateYearStr(new Date())}`}</b>
            <ul className={"slot-items"}>
                {availableSlots.map((item, index) => <li>
                    <Checkbox disabled={item.disabled}/>
                    <ResText14Regular>{item.title}</ResText14Regular></li>)}
            </ul>
            <div className={"send-slot-request h-start-top-flex"}>
                <ResText16Regular>By confirming the request, you confirm that this
                    is only a request
                    for tutoring and the
                    tutor may
                    decline to provide service.</ResText16Regular>
                <MyButton type={"primary"}>Send Request</MyButton>
            </div>
        </ResText16Regular>
    </SlotInfo>

    const renderOtherReviews = () => <TabContent>
        <ResText16Regular className={"text-grey2"}>Other reviews</ResText16Regular>
        <ul className={"ratings-other-reviews"}>
            {new Array(3).fill(1).map((item, index) => <li>
                <ResText14Regular key={index}>I am writing this review {item} for index {index}</ResText14Regular>
            </li>)}
        </ul>
    </TabContent>

    const renderSlotView = (tabOpened) => (tabOpened === "" || tabOpened === getMenuItems(id)[0].key) ? renderCurrentSlot() : renderOtherReviews()

    return <Wrapper>
        <Header><ResText14SemiBold>Tutor Profile</ResText14SemiBold></Header>
        <Content>
            <div>
                {renderActorInfo()}
                {renderNeedsTutoring("Specializations", "")}
            </div>

            <Row gutter={[24, 24]}>
                <Col xxl={16} md={24} className={"border-right no-padding"}>
                    {renderTabs(getDefaultTab(), () => renderMenuComponent(), getMenuItems(id))}
                </Col>
                <Col xxl={8} md={24} className={"h-start-top-flex no-padding"}>
                    <Divider type={"horizontal"}/>
                    {renderSlotView(getDefaultTab()[0])}
                </Col>
            </Row>
        </Content>
    </Wrapper>

    // return (
    //     <Layout className="layout">
    //         <ModalBlock
    //             visible={visible}
    //             onClose={handleCancel}
    //             title={
    //                 <ResText14SemiBold className="margin-left">
    //                     Change {param}
    //                 </ResText14SemiBold>
    //             }
    //             bodyText="Profile name"
    //             param={param}
    //         />
    //
    //         <ProfileCard>
    //             <CoverImage/>
    //             <div className="profile-info profile-top arrange-div">
    //                 <NewBlock>
    //                     <Avatar
    //                         size={100}
    //                         src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    //                     />
    //                 </NewBlock>
    //                 <NewBlock className="profile-section">
    //                     <ResText14SemiBold className="margin-left">
    //                         John Doe Hill “Johnny"
    //                     </ResText14SemiBold>
    //                     <EditOutlined
    //                         className="select-item"
    //                         onClick={() => showModal("Name")}
    //                     />
    //                     <NewBlock>
    //                         <ResText12Regular className="medium-vertical-margin">
    //                             Former teacher at School of Science. Now doing a
    //                             freelance tutoring.{" "}
    //                             <EditOutlined
    //                                 className="select-item"
    //                                 onClick={() => showModal("Description")}
    //                             />
    //                         </ResText12Regular>
    //                     </NewBlock>
    //                 </NewBlock>
    //             </div>
    //         </ProfileCard>
    //
    //         <ProfileCard>
    //             <div className="profile-info">
    //                 <ResText14SemiBold>Specializations</ResText14SemiBold>
    //                 <EditOutlined onClick={() => showModal("Specialization")}/>
    //                 <NewBlock className="medium-vertical-margin">
    //                     <StatusTagList>
    //                         {expertises &&
    //                             expertises.map(expertise => (
    //                                 <Tag>
    //                                     <ResText12Regular>
    //                                         {expertise}
    //                                     </ResText12Regular>
    //                                 </Tag>
    //                             ))}
    //                     </StatusTagList>
    //                 </NewBlock>
    //             </div>
    //         </ProfileCard>
    //     </Layout>
    // );
};

export default TutorProfile;
