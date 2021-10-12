export interface IActivity {
    id: string;
    name: string
}

export interface IEmail {
    description: string;
    emailAddress: string;
}

export interface IPhoneNumber {
    phoneNumber: string;
    description: string;
    extension: string;
    type: string;
}

export interface IContact {
    emailAddresses: IEmail[],
    phoneNumbers: IPhoneNumber[],
}

export interface IEntranceFees {
    cost: string;
    description: string;
    title: string;
}

export interface IDays {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
}

export interface IOperatingHours {
    description: string;
    standardHours: any;
}
export interface IImage {
    title: string;
    altText: string;
    url: string;
}

export interface IPark {
    // Park Code
    parkCode: string;
    // Park Name
    name: string;
    // Description
    description: string;
    // Latitude location
    latitude: string;
    // Longitude location
    longitude: string;
    // Activities available in the park
    activities: IActivity[];
    // State code
    states: string;
    // Contact Details
    contacts: IContact;
    // Entrance Fees details
    entranceFees: IEntranceFees[];
    // Operating Hours details
    operatingHours: IOperatingHours[];
    // images
    images: IImage[];
    // like
    like: boolean;
}

export interface IParkList{
    // Total Park
    total: string;
    // Park list
    data: IPark[];
    // Fetch data count
    limit: number;
    // Describe start
    start: string;
    // Loading indicator
    loading: boolean;
    // Error Msg
    error: string;
}

export interface IParkReducer {
    parkList: IParkList | null
};
