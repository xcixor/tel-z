export type Contact = {
  id: string;
  name: string;
  phone: string;
};

export type HurdleMember = {
  id: string;
  name: string;
  progress: number;
};

export const INITIAL_CONTACTS: Contact[] = [
  { id: "c1", name: "Amani", phone: "+254 712 345 601" },
  { id: "c2", name: "Shiko", phone: "+254 712 345 602" },
  { id: "c3", name: "Brayo", phone: "+254 712 345 603" },
  { id: "c4", name: "Njoki", phone: "+254 712 345 604" },
  { id: "c5", name: "Kevo", phone: "+254 712 345 605" },
  { id: "c6", name: "Wanjiku", phone: "+254 712 345 606" },
  { id: "c7", name: "Trevor", phone: "+254 712 345 607" },
  { id: "c8", name: "Faith", phone: "+254 712 345 608" },
  { id: "c9", name: "Mumo", phone: "+254 712 345 609" },
  { id: "c10", name: "Cynthia", phone: "+254 712 345 610" },
];
