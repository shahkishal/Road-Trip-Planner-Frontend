export interface Trip {
  Data: {
    id: string;
    source: string;
    destination: string;
    from: string;
    to: string;
    duration: string;
    description: string;
    travelTypeId: string;
  }[];
  totalTrips: number;
}
