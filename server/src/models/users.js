const users = [
  {
    "_id": "5ea44b1a5bf45e77e449b6b2",
    "avatar": "http://placehold.it/32x32",
    "username": "Meyer Mcpherson",
  },
  {
    "_id": "5ea44b1a1757308eae68e3fe",
    "avatar": "http://placehold.it/32x32",
    "username": "Simpson Ross",
  },
  {
    "_id": "5ea44b1a083e72e85b1d5d2b",
    "avatar": "http://placehold.it/32x32",
    "username": "Estela Ward",
  },
  {
    "_id": "5ea44b1a97f7afaca320f0e3",
    "avatar": "http://placehold.it/32x32",
    "username": "Kelli Richards",
  },
  {
    "_id": "5ea44b1aeff006a0582ec0a2",
    "avatar": "http://placehold.it/32x32",
    "username": "Ortiz Mcknight",
  },
];

export const getUsers = () => {
  return users;
};

export const getUser = (id) => {
  const user = users.find(item => item._id === id.toString());
  if (!user) return null;
  return user;
};

export const addNewUser = (user) => {
  const newUser = {
    ...user,
    _id: Math.random().toString(),
  }
  users.push(newUser);
  return newUser;
};
