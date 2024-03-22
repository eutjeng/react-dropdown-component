export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  job?: string;
};

export type UserResponse = {
  data: Array<User>;
  meta: {
    from: number; // the ordinal number of the first element to be returned
    to: number; // the ordinal number of the last element to be returned
    total: number; // total amount of data
  };
};
