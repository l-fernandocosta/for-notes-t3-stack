import { type NextPage } from "next";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("/bg-login.jpg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello, traveller.</h1>
          <p className="mb-5">
            It`s time to take some notes, start your journey now.
          </p>
          <button
            className="btn-primary btn"
            onClick={() =>
              signIn("github", {
                callbackUrl: "/home",
              })
            }
          >
            START THE ENGINES
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
