export interface Trip {
  data: {
    id: string;
    source: string;
    destination: string;
    from: string;
    to: string;
    duration: string;
    description: string;
    travelTypeId: string;
    isPublic: boolean;
  }[];
  totalTrips: number;
}
