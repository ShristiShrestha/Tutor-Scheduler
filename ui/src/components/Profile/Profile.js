import React from "react";
import { Card, Avatar, Layout, Tag, Tabs } from "antd";
import "./Profile.scss";
import TimeLine from "../TimeLine/TimeLine";
import Rating from "../Rating/Rating";
import { useNavigate } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import CalendarBlock from "../Calendar/Calendar";
import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import Search from "../Search/Search";

const { TabPane } = Tabs;
const { Content } = Layout;
const expertises = ["Computer Vision", "Machine Learning", "Web Development"];
const { Meta } = Card;
const data = [
  {
    title: "Schedule for 10 May",
    description:
      "“I have been tutoring for like a year now. I like students who are punctual and self motivated to learn. More recently, ...",
    expertises: expertises,
  },
  {
    title: "Schedule for 10 May",
    description:
      "“I have been tutoring for like a year now. I like students who are punctual and self motivated to learn. More recently, ...",
    expertises: expertises,
  },
  {
    title: "Schedule for 10 May",
    description:
      "“I have been tutoring for like a year now. I like students who are punctual and self motivated to learn. More recently, ...",
    expertises: expertises,
  },
  {
    title: "Schedule for 10 May",
    description:
      "“I have been tutoring for like a year now. I like students who are punctual and self motivated to learn. More recently, ...",
    expertises: expertises,
  },
  {
    title: "Schedule for 10 May",
    description:
      "“I have been tutoring for like a year now. I like students who are punctual and self motivated to learn. More recently, ...",
    expertises: expertises,
  },
];

const CoverImage = () => {
  // console.log(navigate, "navigateee");
  // const handleClick = () => navigate("/profile");
  const navigate = useNavigate();
  return (
    <div className="cover-image">
      <img
        style={{ width: "70vw", height: "26vh" }}
        src="https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Example Image"
      />
    </div>
  );
};

const ProfileInfo = () => {
  const navigate = useNavigate();

  function handleClick() {
    console.log("lolll");
    navigate("/profile");
  }
  return (
    <div className="profile-info">
      <Avatar
        size={100}
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
      />
      <Meta
        title={<span onClick={handleClick}>John Doe Hill “Johnny”</span>}
        description="Former teacher at School of Science. Now doing a freelance tutoring."
        style={{ marginLeft: "20px", marginTop: "15px" }}
      />
      {/* <p>Location: Los Angeles, CA</p>
      <p>Email: johndoe@example.com</p> */}
      {/* Add more information here */}
      {/* <span>Joined in 2021</span> */}
    </div>
  );
};

const CircleTag = ({ text }) => (
  <Tag style={{ borderRadius: "50%", margin: "0.2em" }}>{text}</Tag>
);

const Profile = ({ expertises }) => {
  return (
    <Layout>
      <TopBar />
      <SideBar />
      <Layout>
        <Search />
      </Layout>
      <div className="profile-card">
        <CoverImage />
        <ProfileInfo />
        <div className="specialization">
          <span style={{ marginBottom: "20px" }}>Specializations</span>
          <div>
            {expertises?.map((expertise) => (
              <CircleTag text={expertise} key={expertise} />
            ))}
          </div>
        </div>
        <div className="tab">
          <Tabs>
            <TabPane tab="Request Scheduling" key="1">
              <CalendarBlock />
            </TabPane>
            <TabPane tab="My Schedules" key="2">
              <TimeLine
                data={data}
                expertises={expertises}
                heading="All Schedules"
              />
            </TabPane>
            <TabPane tab="Ratings" key="3">
              <Rating />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
