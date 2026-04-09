

export const useUserRole = () => {
  const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;
  console.log("user role check :" , user?.role);
  const role = user?.role;
  return role || null;
};
