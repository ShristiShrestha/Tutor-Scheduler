import React from "react";
import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import Search from "../Search/Search";
import CardBlock from "../CardBlock/CardBlock";
import { Layout } from "antd";
const { Content } = Layout;

const data = [
  {
    name: "Ms. Alyemma Jones",
    title: "Joined in Jan 10, 2023",
    date: "May 14.. 2023",
    slot: 3,
    status: "Denied",
    description:
      "Note - “I am in urgent need. Please do consider tutoring in your available time...”",
  },
  {
    name: "Ms. Alyemma Jones",
    title: "Joined in Jan 10, 2023",
    date: "May 14,. 2023",
    slot: 3,
    status: "Pending",
    description:
      "Note - “I am in urgent need. Please do consider tutoring in your available time...”",
  },
  {
    name: "Ms. Alyemma Jones",
    title: "Joined in Jan 10, 2023",
    date: "May 14. 2023",
    slot: 3,
    status: "Pending",
    description:
      "Note - “I am in urgent need. Please do consider tutoring in your available time...”",
  },
];

const data_2 = [
  {
    name: "Ms. Alyemma Jones",
    title: "Joined in Jan 10, 2023",
    date: "May 14.. 2023",
    slot: 3,
    status: "Denied",
    description:
      "Note - “I am in urgent need. Please do consider tutoring in your available time...”",
  },
  {
    name: "Ms. Alyemma Jones",
    title: "Joined in Jan 10, 2023",
    date: "May 14,. 2023",
    slot: 3,
    status: "Pending",
    description:
      "Note - “I am in urgent need. Please do consider tutoring in your available time...”",
  },
  {
    name: "Ms. Alyemma Jones",
    title: "Joined in Jan 10, 2023",
    date: "May 14. 2023",
    slot: 3,
    status: "Pending",
    description:
      "Note - “I am in urgent need. Please do consider tutoring in your available time...”",
  },
  {
    name: "Ms. Alyemma Jones",
    title: "Joined in Jan 10, 2023",
    date: "May 14.. 2023",
    slot: 3,
    status: "Denied",
    description:
      "Note - “I am in urgent need. Please do consider tutoring in your available time...”",
  },
  {
    name: "Ms. Alyemma Jones",
    title: "Joined in Jan 10, 2023",
    date: "May 14,. 2023",
    slot: 3,
    status: "Pending",
    description:
      "Note - “I am in urgent need. Please do consider tutoring in your available time...”",
  },
  {
    name: "Ms. Alyemma Jones",
    title: "Joined in Jan 10, 2023",
    date: "May 14. 2023",
    slot: 3,
    status: "Pending",
    description:
      "Note - “I am in urgent need. Please do consider tutoring in your available time...”",
  },
];
const MySchedule = ({ name, title, rating, description, expertises }) => {
  return (
    <Layout>
      <TopBar />
      <SideBar />
      <Layout>
        <Content className="site-layout-background">
          <Search />
          <div>
            <h2 style={{ marginTop: "95px", marginLeft: "230px" }}>
              Upcoming Schedule
            </h2>
            <div className="container-card">
              {data?.map((item, index) => (
                <CardBlock
                  name={item.name}
                  title={item.title}
                  ratings={item.rating}
                  description={item.description}
                  date={item.date}
                  slot={item.slot}
                />
              ))}
            </div>
            {/* <div> Schedule Requests</div> */}
            <div>
              <h2 style={{ marginTop: "95px", marginLeft: "230px" }}>
                Schedule Requests
              </h2>
            </div>
            <div className="container-card">
              x
              {data_2?.map((item, index) => (
                <CardBlock
                  name={item.name}
                  title={item.title}
                  ratings={item.rating}
                  description={item.description}
                  date={item.date}
                  slot={item.slot}
                  status={item?.status}
                />
              ))}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MySchedule;
