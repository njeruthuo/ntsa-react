import { Disclosure, DisclosureButton } from "@headlessui/react";
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { logout } from "@/state/reducers/auth/authSlice";

const Header = ({ pathname }: { pathname: string }) => {
  const dispatch = useDispatch();

  return (
    <Disclosure
      as="nav"
      className="relative bg-[#1B1C4C] py-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 text-white">
                <div>
                  <h2 className="text-xl">BLUETRAX</h2>
                  <span>Speed Governor</span>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              onClick={() => dispatch(logout())}
              type="button"
              className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span className="absolute -inset-1.5" />
              {pathname !== "/sign-in" && (
                <div className="flex">
                  <button className="logout-btn">Logout</button>
                  <ArrowRightStartOnRectangleIcon
                    aria-hidden="true"
                    className="size-6"
                  />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Header;
