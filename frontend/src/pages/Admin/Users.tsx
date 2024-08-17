import { useEffect, useState } from "react";
import { changeUserRole, getAllUsers } from "../../services/requestApi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import toast from "react-hot-toast";
import Checkbox from "../../components/Admin/Checkbox";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchAllHouses = async () => {
      try {
        const response = await getAllUsers(page, 8);
        if (response.statusCode === 200) {
          if (response.userList === 0) {
            console.log("No users found");
            return;
          }
          setUsers(response.userList);
          setTotalPages(response.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllHouses();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleRoleChange = async (userId: string | number, newRole: string) => {
    try {
      await changeUserRole(userId, newRole);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      toast.success("User role updated successfully");
    } catch (error) {
      console.error("Failed to change user role", error);
      toast.error("User role updated failed");
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black">User Manager</h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 sm:grid-cols-4 rounded-sm bg-[#F7F9FC]">
          <div className="p-2.5 xl:p-5 col-span-1 flex items-center">
            <h5 className="text-sm font-medium uppercase">Email</h5>
          </div>
          <div className="p-2.5 xl:p-5 hidden col-span-1 sm:flex items-center justify-center">
            <h5 className="text-sm font-medium uppercase">Name</h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-2 flex items-center justify-center">
            <h5 className="text-sm font-medium uppercase">Role</h5>
          </div>
        </div>

        {users.map((user, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 py-2 ${
              key === users.length - 1 ? "" : "border-b border-stroke"
            }`}
            key={key}
          >
            <div className="p-2.5 xl:p-5 col-span-1 flex items-center flex-row">
              <p className="text-sm text-black font-medium">{user.email}</p>
            </div>

            <div className="col-span-1 hidden sm:flex items-center justify-center">
              <p className="text-black">{user.name}</p>
            </div>

            <div className="col-span-2 items-center justify-center flex gap-3 sm:gap-10">
              {/* <p className="text-black">{user.role}</p> */}
              <Checkbox
                label="Admin"
                checked={user.role === "ADMIN"}
                onChange={() =>
                  handleRoleChange(user.id, user.role === "ADMIN" ? "USER" : "ADMIN")
                }
              />
              <Checkbox
                label="User"
                checked={user.role === "USER"}
                onChange={() =>
                  handleRoleChange(user.id, user.role === "USER" ? "ADMIN" : "USER")
                }
              />
            </div>
          </div>
        ))}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2 mb-5">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`border border-stroke py-2 px-4 rounded-md hover:opacity-90 ease-in duration-150 hover:bg-[#3C50E0] hover:text-white ${
                page === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <IoChevronBack />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`${
                  page === index + 1
                    ? "bg-[#3C50E0] text-white"
                    : "bg-white text-black"
                } border border-stroke py-2 px-4 rounded-md hover:opacity-90 ease-in duration-150 hover:bg-[#3C50E0] hover:text-white`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`border border-stroke py-2 px-4 rounded-md hover:opacity-90 ease-in duration-150 hover:bg-[#3C50E0] hover:text-white ${
                page === totalPages ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <IoChevronForward />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
