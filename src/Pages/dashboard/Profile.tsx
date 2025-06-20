import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import camera from "/images/dashboard/camera.png";
import { useState } from "react";

import SecondaryInput from "@/components/shared/secondary-input";
import { SelectInput } from "@/components/shared/secondary-select";
import Button from "@/components/shared/button";
import { useAuth } from "@/context/auth-provider";
import PasswordInput from "@/components/shared/password-input";

const tabMenu = ["Account", "Password"];

const Profile = () => {
  const { user } = useAuth();

  const [activeMenu, setActiveMenu] = useState(tabMenu[0]);

  const Names = user?.full_name.split(" ");

  return (
    <div className="flex flex-col gap-y-5 w-full">
      <h2 className="text-2xl font-bold">Profile</h2>

      <main className="flex flex-col gap-y-6">
        <div className="flex flex-col px-5 py-6 rounded-lg md:px-6 lg:px-9 bg-background gap-y-10">
          <section className="flex items-center gap-x-4">
            <div className="relative w-fit">
              <Avatar className="w-16 h-16 cursor-pointer">
                <AvatarImage src={""} width={1000} height={1000} alt="User" />
                <AvatarFallback className="text-sm font-medium text-white bg-orange-500">
                  {user?.full_name?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="p-[6px] rounded-full absolute bottom-0 cursor-pointer -right-1 bg-white shadow-lg w-fit">
                <img src={camera} alt="edit photo" />
              </div>
            </div>

            <div className="flex flex-col gap-y-1">
              <h2 className="text-lg font-semibold">
                {user?.full_name ? user.full_name : "Elizabeth Kafaru"}
              </h2>
              <p className="text-[#737373] text-sm">
                {user?.email ? user.email : "elizabeth@gmail.com"}
              </p>
            </div>
          </section>

          <div className="flex w-fit overflow-auto no-scroll border-b items-center gap-x-6">
            {tabMenu.map((menu, index) => (
              <nav
                key={index}
                onClick={() => setActiveMenu(tabMenu[index])}
                className={`transition-all whitespace-nowrap duration-300 py-2 lg:px-7 font-semibold ${
                  menu === activeMenu
                    ? "text-defaultBlue border-b-[2px] border-defaultBlue"
                    : "hover:text-gray-400 cursor-pointer"
                }`}
              >
                {menu}
              </nav>
            ))}
          </div>

          {/* <div className="border-b border-[#E2E8F0] flex items-center justify-between md:justify-start">
            {tabMenu.map((menu, index) => (
              <nav
                key={index}
                onClick={() => setActiveMenu(tabMenu[index])}
                className={`transition-all whitespace-nowrap duration-300 border-b-[2px] py-2 px-7 font-semibold ${
                  menu === activeMenu
                    ? "text-blue-600 border-blue-600"
                    : "hover:text-gray-400 cursor-pointer"
                }`}
              >
                {menu}
              </nav>
            ))}
          </div> */}

          {activeMenu === tabMenu[0] ? (
            <section className="min-h-[calc(100vh-400px)]">
              <form className="flex flex-col gap-y-12">
                <div className="grid gap-8 sm:grid-cols-2">
                  <SecondaryInput
                    label="First Name"
                    placeholder="First Name"
                    value={(Names && Names[0]) || ""}
                  />

                  <SecondaryInput
                    label="Last Name"
                    placeholder="Last Name"
                    value={(Names && Names[1]) || ""}
                  />

                  <SecondaryInput
                    label="Email"
                    placeholder="Email"
                    value={user?.email || ""}
                  />

                  <SelectInput
                    label="Email"
                    placeholder="Email"
                    options={[{ value: "English", label: "English" }]}
                    value="English"
                    disabled
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row items-center justify-end">
                  <Button wrapperclass="sm:max-w-48" variant="outline">
                    Cancel
                  </Button>
                  <Button wrapperclass="sm:max-w-48">Save Changes</Button>
                </div>
              </form>
            </section>
          ) : (
            <>
              <form>
                <div className="grid gap-6 sm:grid-cols-2">
                  <PasswordInput placeholder="Enter old password" label="Old Password" />
                  <PasswordInput placeholder="Enter new password" label="New Password" />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row items-center justify-end mt-6">
                  <Button wrapperclass="sm:max-w-48">Proceed</Button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
