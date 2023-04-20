import { UserDetailsType } from "../redux/user/types";
import { capitalize } from "./StringUtils";
import { AppointmentType } from "../redux/appointment/types";
import React from "react";
import { AppointmentStatus } from "../enum/AppointmentEnum";

/******************* user details ************************/
export const getUsername = (user: UserDetailsType) => {
    if (!!user && !!user.name) return user.name;
    // const names = user.email.split("@")[0];
    if (!!user && user.email.includes("@lsu.edu"))
        return capitalize(user.email.replace("@lsu.edu", ""));
    return "Unknown user";
};

/******************* date utils ************************/

export const calendarIntToMonth = {
    0: "january",
    1: "february",
    2: "march",
    3: "april",
    4: "may",
    5: "june",
    6: "july",
    7: "august",
    8: "september",
    9: "october",
    10: "november",
    11: "december",
};

/******************* get available slots from the list of accepted apts ************************/

// hrs shown in Local time zone
// pending: if the current user already has
// a pending schedule apt with the tutor
export const SLOTS_PER_DAY = [
    {
        title: "9 - 10 AM",
        start: 9,
        available: true,
        pending: false,
    },
    {
        title: "10 - 11 AM",
        start: 10,
        available: true,
        pending: false,
    },
    {
        title: "11 AM - 12 PM",
        start: 11,
        available: true,
        pending: false,
    },
    {
        title: "12 - 1 PM",
        start: 12,
        available: true,
        pending: false,
    },
    {
        title: "1 - 2 PM",
        start: 13,
        available: true,
        pending: false,
    },
    {
        title: "2 - 3 PM",
        start: 14,
        available: true,
        pending: false,
    },
    {
        title: "3 - 4 PM",
        start: 15,
        available: true,
        pending: false,
    },
    {
        title: "4 - 5 PM",
        start: 16,
        available: true,
        pending: false,
    },
    {
        title: "5 - 6 PM",
        start: 17,
        available: true,
        pending: false,
    },
];

export const getAvailableSlot = (
    date?: Date,
    acceptedApts: AppointmentType[] = [],
    loggedUserId?: number,
) => {
    if (!date) return [];

    if (acceptedApts.length === 0) return SLOTS_PER_DAY;

    // we evaluate the accepted appointments using the selected date's
    // utc values since the appointments' values are set in UTC
    const selectedDay = date.getUTCDate();
    const selectedMonth = date.getUTCMonth();
    const selectedYear = date.getUTCFullYear();

    const pendingAptsCreatedByLoggedUserOnDate = acceptedApts.filter(apt =>
        loggedUserId
            ? loggedUserId === apt.studentId &&
              apt.status === AppointmentStatus.PENDING
            : false,
    );

    const pendingAptsHrs = pendingAptsCreatedByLoggedUserOnDate.map(item =>
        new Date(item.scheduledAt).getHours(),
    );
    const pendingAptsIds = pendingAptsCreatedByLoggedUserOnDate.map(
        item => item.id,
    );

    // filter out appointments that are accepted for that day
    // or are still pending (only if created by the logged user)
    const acceptedAptsSlotsOnDate = acceptedApts.filter(apt => {
        const scheduledDate = new Date(apt.scheduledAt);
        const scheduledDay = scheduledDate.getUTCDate();
        const scheduledMonth = scheduledDate.getMonth();
        const scheduledYear = scheduledDate.getUTCFullYear();
        return (
            scheduledDay === selectedDay &&
            scheduledMonth === selectedMonth &&
            scheduledYear === selectedYear &&
            (apt.status === AppointmentStatus.ACCEPTED ||
                pendingAptsIds.includes(apt.id))
        );
    });

    // filter slots per day availability
    // slots are not in the accepted scheduled hours
    // then such slots are available
    if (acceptedAptsSlotsOnDate.length > 0) {
        const scheduledDateTsAcceptedOnSelectedDay =
            acceptedAptsSlotsOnDate.map(item =>
                new Date(item.scheduledAt).getHours(),
            );
        return SLOTS_PER_DAY.map(slotItem => {
            return {
                ...slotItem,
                available: !scheduledDateTsAcceptedOnSelectedDay.includes(
                    slotItem.start,
                ),
                pending: pendingAptsHrs.includes(slotItem.start),
            };
        });
    }

    // by default sending all slots as available
    return SLOTS_PER_DAY;
};

export const getScheduledSlots = (scheduledDate?: Date) => {
    if (!scheduledDate) return [];
    const scheduledHrs = scheduledDate.getHours();
    return SLOTS_PER_DAY.map(slotItem => {
        return {
            ...slotItem,
            available: scheduledHrs !== slotItem.start, // if false, the user scheduled this slot
        };
    });
};

export const getScheduledSlot = (scheduledDate?: Date) => {
    if (!scheduledDate) return [];
    const scheduledHrs = scheduledDate.getHours();
    return SLOTS_PER_DAY.filter(slotItem => slotItem.start === scheduledHrs);
};

/******************* user ratings utils ************************/

export const ratings = {
    1: {
        id: "very-bad",
        title: "Very bad",
        className: "rate-very-bad",
        totalUsers: 10,
        icon: (
            <img
                width={30}
                height={30}
                src={process.env.PUBLIC_URL + "/pouting_face.svg"}
            />
        ),
    },
    2: {
        id: "bad",
        title: "Just bad",
        className: "rate-just-bad",
        totalUsers: 1,
        icon: (
            <img
                width={30}
                height={30}
                src={process.env.PUBLIC_URL + "/neutral_face.svg"}
            />
        ),
    },
    3: {
        id: "good",
        title: "Good",
        className: "rate-good",
        totalUsers: 100,
        icon: (
            <img
                width={30}
                height={30}
                src={process.env.PUBLIC_URL + "/slightly_smiling.svg"}
            />
        ),
    },
    4: {
        id: "very-good",
        title: "Very Good",
        className: "rate-very-good",
        totalUsers: 1000,
        icon: (
            <img
                width={30}
                height={30}
                src={process.env.PUBLIC_URL + "/grinning_face.svg"}
            />
        ),
    },
};
export const getFormattedRatings = (user?: UserDetailsType) => {
    if (!user) return [];

    return Object.keys(ratings).map(ratingKey => {
        return {
            ...ratings[ratingKey],
            totalUsers: user.ratingByNumbers
                ? user.ratingByNumbers[ratingKey]
                : 0,
        };
    });
};