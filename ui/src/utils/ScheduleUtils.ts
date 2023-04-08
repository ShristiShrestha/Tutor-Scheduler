import {UserDetailsType} from "../redux/user/types";
import {capitalize} from "./StringUtils";
import {AppointmentType} from "../redux/appointment/types";

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
    11: "december"
}

export const getUsername = (user: UserDetailsType) => {
    if (!!user && !!user.name)
        return user.name
    // const names = user.email.split("@")[0];
    if (user && user.email.includes("@lsu.edu"))
        return capitalize(user.email.replace("@lsu.edu", ""));
    return "Unknown user"
}

/******************* get available slots from the list of accepted apts ************************/

// hrs shown in UTC which starts from 0
export const SLOTS_PER_DAY = [
    {
        title: "9 - 10 AM",
        start: 8,
        available: true,
    },
    {
        title: "10 - 11 AM",
        start: 9,
        available: true,
    },
    {
        title: "11 AM - 12 PM",
        start: 10,
        available: true,
    },
    {
        title: "12 - 1 PM",
        start: 11,
        available: true,
    },
    {
        title: "1 - 2 PM",
        start: 12,
        available: true,
    },
    {
        title: "2 - 3 PM",
        start: 13,
        available: true,
    },
    {
        title: "3 - 4 PM",
        start: 14,
        available: true,
    },
    {
        title: "4 - 5 PM",
        start: 15,
        available: true,
    },
    {
        title: "5 - 6 PM",
        start: 16,
        available: true,
    }
]

export const getAvailableSlot = (date?: Date, acceptedApts: AppointmentType[] = []) => {
    console.log("selected data: ", date, " acceptedApts: ", acceptedApts);

    if (!date)
        return [];

    if (acceptedApts.length === 0)
        return SLOTS_PER_DAY;

    // we evaluate the accepted appointments using the selected date's
    // utc values since the appointments' values are set in UTC
    const selectedDay = date.getUTCDate();
    const selectedMonth = date.getUTCMonth();
    const selectedYear = date.getUTCFullYear();

    // filter out appointments that are accepted for that day
    const acceptedAptsSlotsOnDate = acceptedApts.filter(apt => {
        const scheduledDate = new Date(apt.scheduledAt);
        const scheduledDay = scheduledDate.getUTCDate();
        const scheduledMonth = scheduledDate.getMonth();
        const scheduledYear = scheduledDate.getUTCFullYear();
        return scheduledDay === selectedDay &&
            scheduledMonth === selectedMonth &&
            scheduledYear === selectedYear
    });

    // filter slots per day availability
    // slots are not in the accepted scheduled hours
    // then such slots are available
    if (acceptedAptsSlotsOnDate.length > 0) {
        const scheduledDateTsAcceptedOnSelectedDay = acceptedAptsSlotsOnDate.map(item => new Date(item.scheduledAt).getUTCHours());
        return SLOTS_PER_DAY.map(slotItem => {
            return {
                ...slotItem,
                available: !scheduledDateTsAcceptedOnSelectedDay.includes(slotItem.start)
            }
        });
    }

    // no appointments slots accepted for that day
    if (acceptedAptsSlotsOnDate.length === 0) {
        return SLOTS_PER_DAY;
    }

    // by default sending all slots as available
    return SLOTS_PER_DAY;
}