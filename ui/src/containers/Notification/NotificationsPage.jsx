import React, {useState} from "react";
import styled from "styled-components";
import {grey6} from "../../utils/ShadesUtils";
import NotificationListView from "../../components/ListView/Notification";
import {notification_data} from "../../static_data/tutors";
import {ResText14Regular, ResText14SemiBold} from "../../utils/TextUtils";

const Wrapper = styled.div``;

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

const Content = styled.div`
  position: relative;
  top: 56px;
  height: calc(100vh - 112px);
  overflow-y: auto;
  margin-top: 24px;
`;

const NotificationList = styled.div`
  padding: 12px 24px;
`;

const NotificationsPage = () => {
    const [notificationData, setNotificationData] = useState(notification_data);

    const handleDeleteItem = key => {
        const updatedData = notificationData.filter(item => item.key !== key);
        setNotificationData(updatedData);
    };

    return (
        <Wrapper>
            <Header>
                <ResText14SemiBold>Notifications</ResText14SemiBold>
            </Header>
            <Content>
                <ResText14Regular style={{marginLeft: "25px"}}>
                    Recent
                </ResText14Regular>
                <NotificationList>
                    <NotificationListView
                        item={notificationData}
                        // key={item.key}
                        onDelete={handleDeleteItem}
                    />
                </NotificationList>
            </Content>
        </Wrapper>
    );
};

export default NotificationsPage;
