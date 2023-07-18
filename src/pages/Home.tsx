/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Helmet } from "react-helmet";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useGetRecentBooksQuery } from "../redux/features/books/booksApi";

interface IBook {
  _id: string;
  email: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  customerReviews: [];
}

const Home = () => {
  const { data: books } = useGetRecentBooksQuery(undefined);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center h-[calc(100vh-80px)]">
          <div>
            <h1 className="text-6xl font-black text-primary mb-2">
              DISCOVER <br /> BOOK'S WORLD
            </h1>
            <p className="text-secondary font-semibold text-xl">
              Welcome to Library Catalog!
            </p>
            <div className="text-primary mt-20">
              <p>The Prophet Muhammad said</p>
              <q>
                Whoever teaches some knowledge will have the reward of the one{" "}
                <br /> who acts upon it, without that detracting from his reward
                in the slightest.
              </q>
            </div>
            <button className="mt-5 border-2 border-[#2563EB] hover:bg-[#2563EB] hover:text-white font-[500] px-[12px] py-[4px] rounded-[8px]">
              Learn more
            </button>
          </div>
          <div className="">
            <img
              height="600px"
              width="600px"
              className="rounded-[14px]"
              src="/src/assets/images/cover.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="mt-[20px] mb-[100px]">
          <h3 className="text-[20px] font-[500] text-left mb-[20px]">
            Recently Published Books
          </h3>
          <div className="grid grid-cols-3 gap-x-10 gap-y-10">
            {books?.books?.map((book: IBook, i: number) => {
              return (
                <Link key={i} to={`/details/${book._id}`}>
                  <Card book={book} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
