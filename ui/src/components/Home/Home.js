import React from "react";
import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import Search from "../Search/Search";
import CardBlock from "../CardBlock/CardBlock";
import { Layout } from "antd";

const { Content } = Layout;

const expertises = ["Computer Vision", "Machine Learning", "Web Development"];
const data = [
  {
    name: "John Doe",
    title: "Freelance Tutor",
    ratings: "100",
    description:
      "“I have been tutoring for like a year now. I like students who are punctual and self motivated to learn. More recently, ...",
    expertises: expertises,
  },
  {
    name: "John Doe",
    title: "Freelance Tutor",
    ratings: "100",
    description:
      "“I have been tutoring for like a year now. I like students who are punctual and self motivated to learn. More recently, ...",
    expertises: expertises,
  },
  {
    name: "John Doe",
    title: "Freelance Tutor",
    ratings: "100",
    description:
      "“I have been tutoring for like a year now. I like students who are punctual and self motivated to learn. More recently, ...",
    expertises: expertises,
  },
  {
    name: "John Doe",
    title: "Freelance Tutor",
    ratings: "100",
    description:
      "“I have been tutoring for like a year now. I like students who are punctual and self motivated to learn. More recently, ...",
    expertises: expertises,
  },
  {
    name: "John Doe",
    title: "Freelance Tutor",
    ratings: "100",
    description:
      "“I have been tutoring for like a year now. I like students who are punctual and self motivated to learn. More recently, ...",
    expertises: expertises,
  },
  {
    name: "John Doe",
    title: "Freelance Tutor",
    ratings: "100",
    description:
      "“I have been tutoring for like a year now. I like students who are punctual and self motivated to learn. More recently, ...",
    expertises: expertises,
  },
  {
    name: "John Doe",
    title: "Freelance Tutor",
    ratings: "100",
    description:
      "“I have been tutoring for like a year now. I like students who are punctual and self motivated to learn. More recently, ...",
    expertises: expertises,
  },
  {
    name: "John Doe",
    title: "Freelance Tutor",
    ratings: "100",
    description:
      "“I have been tutoring for like a year now. I like students who are punctual and self motivated to learn. More recently, ...",
    expertises: expertises,
  },
];

const Home = () => {
  return (
    <Layout>
      <TopBar />
      <SideBar />
      <Layout>
        <Content className="site-layout-background">
          <Search />
          <div>
            <h2 style={{ marginTop: "95px", marginLeft: "230px" }}>
              Our Top Rated Tutors
            </h2>
          </div>
          <div className="container-card">
            {data.map((item, index) => (
              <CardBlock
                name={item.name}
                title={item.title}
                ratings={item.rating}
                description={item.description}
                expertises={item.expertises}
              />
            ))}
          </div>
          {/* <Profile expertises={expertises} />
          <ListView />
          <Chat /> */}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
