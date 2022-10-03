export type Note = {
  id: number;
  body: string;
};

export type User = {
  id: string;
  display: string;
};

export type LeadjetUser = {
  birthdate: number;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  location: Location;
  phone_number: string;
  title: string;
  username: string;
};

export type Location = {
  city: string;
  postcode: number;
  state: string;
  street: string;
};
