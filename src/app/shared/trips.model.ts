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
    isPublic: string;
    image: string;
    ownerName: string;
    ownerId: string;
  }[];
  totalTrips: number;
}
