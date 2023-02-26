/* eslint-disable @next/next/no-img-element */
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";

export const Header = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="navbar   rounded bg-base-300">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">for.notes</a>
      </div>
      <div className="flex-none gap-5">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="avatar btn-ghost btn-circle btn">
            <div className="w-10 rounded-full">
              <img
                src={sessionData?.user?.image ? sessionData.user.image : ""}
                alt="profile image"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-300 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
          </ul>
        </div>
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-outline btn-circle btn">
            <div className="indicator">
              <ExitIcon height={20} width={20} />
            </div>
          </label>

          <div
            tabIndex={0}
            className="card dropdown-content card-compact mt-3 w-52 bg-base-300 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-thin text-red-400">
                Dont leave us 🫤
              </span>

              <div className="card-actions">
                <button
                  className="btn-error btn-block btn bg-error"
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                >
                  Goodbye, traveller.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
