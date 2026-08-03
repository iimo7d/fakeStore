export type UserProfile = {
  address: Address;
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  phone: string;
  __v: number;
};

export type Address = {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
};

export type Geolocation = {
  lat: string;
  long: string;
};

export type Name = {
  firstname: string;
  lastname: string;
};
