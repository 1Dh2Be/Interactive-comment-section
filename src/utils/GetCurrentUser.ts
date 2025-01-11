interface User {
  username: string;
  avatar: string;
}

export const GetCurrentUser = (data: {
  currentUser: { username: string; image: { png: string } };
}): User => {
  const { username, image } = data.currentUser;
  const user: User = {
    username: username,
    avatar: image.png,
  };
  return user;
};
