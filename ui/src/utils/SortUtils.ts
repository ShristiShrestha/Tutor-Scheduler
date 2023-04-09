export enum SortValueType {
    DATE = "DATE",
    STRING = "STRING",
    OTHER = "OTHER"
}

export enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}

export const sortArrByKey = (apts: any[], key: string,
                             valType: SortValueType,
                             sortOrder: SortOrder = SortOrder.ASC) => {
    if (apts.length === 0)
        return apts
    return apts.sort((first, second) => {
        let firstVal = 0;
        let secondVal = 0;
        switch (valType) {
            case SortValueType.DATE: {
                firstVal = new Date(first[key]).getTime();
                secondVal = new Date(second[key]).getTime();
                console.log("diff: ", (firstVal - secondVal));
                break;
            }
            default: {
                firstVal = first[key];
                secondVal = second[key];
                break;
            }
        }
        const weight = sortOrder === SortOrder.ASC ? 1 : -1;
        return ((firstVal < secondVal) ? (-1 * weight) : ((firstVal > secondVal) ? (1 * weight) : 0));
    })
}