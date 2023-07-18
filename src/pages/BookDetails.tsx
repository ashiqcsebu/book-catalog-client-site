/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import {
  useBookDetailsQuery,
  useBookReviewMutation,
  useDeleteBookMutation,
} from "../redux/features/books/booksApi";
import { useAppSelector } from "../redux/hooks/hooks";

interface IBook {
  _id: string;
  email: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  summary: string;
  customerReviews: [];
}

const BookDetails = () => {
  const navigate = useNavigate();
  const { email } = useAppSelector((state) => state.users.user);

  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState<IBook | null>(null);

  // Call the useBookDetailsQuery hook
  let bookData: IBook | null = null;
  let isLoader: boolean | false = false;
  if (id) {
    const { data, isLoading } = useBookDetailsQuery(id);
    bookData = data?.book;
    isLoader = isLoading;
  }

  // Update the bookInfo state when the bookData changes
  useEffect(() => {
    if (bookData) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setBook(bookData);
    }
  }, [bookData, id]);

  // Book Delete
  const [deleteBook] = useDeleteBookMutation();
  const [isDeleteLoad, setDeleteLoad] = useState(false);
  const handleDeleteBook = () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: ["Cancel", "Yes"],
      dangerMode: false,
    }).then(async (willDelete) => {
      if (willDelete) {
        if (id) {
          setDeleteLoad(true);
          const response: any = await deleteBook(id);
          if (response?.data) {
            swal(response?.data?.message, "", "success");
            navigate("/all-books");
            setDeleteLoad(false);
          } else {
            swal("Book delete operation failed!", "", "error");
            setDeleteLoad(false);
          }
        }
      }
    });
  };

  // Review add for book
  const [addReview] = useBookReviewMutation();
  const [reviewComment, setReviewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response: any = await addReview({
      id: id,
      data: { email: email, comment: reviewComment },
    });
    if (response?.data) {
      setReviewComment("");
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Book Details</title>
      </Helmet>

      <div className="container mx-auto py-8">
        {isLoader ? (
          <div className="text-center">
            <h3 className="text-3xl font-bold">Loading...</h3>
          </div>
        ) : book ? (
          <div className="flex flex-wrap items-start mx-[80px]">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <img
                src={book.image}
                alt={book.title}
                className="max-w-full rounded shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-2/3 pl-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
                {/* Buttons */}
                <div className="flex items-center">
                  <Link to={`/edit-book/${book._id}`}>
                    {email == book?.email && (
                      <button className="flex items-center px-4 py-[3px] bg-green-500 text-white rounded hover:bg-green-600 mr-3">
                        <FiEdit2 className="text-[18px] mr-2" />{" "}
                        <span>Edit</span>
                      </button>
                    )}
                  </Link>
                  {email == book?.email &&
                    (isDeleteLoad ? (
                      <button
                        disabled
                        className="flex items-center px-4 py-[3px] bg-red-500 text-white rounded hover:bg-red-600 ml-3"
                      >
                        Loading...
                      </button>
                    ) : (
                      <button
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={handleDeleteBook}
                        className="flex items-center px-4 py-[3px] bg-red-500 text-white rounded hover:bg-red-600 ml-3"
                      >
                        <AiFillDelete className="text-[18px] mr-2" />{" "}
                        <span>Delete</span>
                      </button>
                    ))}
                </div>
              </div>
              <p className="text-lg mb-2">
                <span className="font-bold">Author:</span> {book.author}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Genre:</span> {book.genre}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Publication Year:</span>{" "}
                {moment(book.publicationDate).format("DD MMMM, YYYY")}
              </p>
              {book?.summary && (
                <h3 className="text-xl font-[500] mt-4 mb-2">
                  Summary about {book.title}
                </h3>
              )}
              <p className="text-lg mb-4">{book?.summary}</p>

              {email && (
                <form onSubmit={handleAddReview}>
                  <label htmlFor="review" className="text-lg font-[500] mb-3">
                    Write Review
                  </label>
                  <textarea
                    id="review"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full h-32 p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    placeholder="Write your review here..."
                    required
                  ></textarea>
                  {isLoading ? (
                    <button
                      disabled
                      className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    >
                      Loading...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    >
                      Submit Review
                    </button>
                  )}
                </form>
              )}

              <h3 className="text-xl font-bold mt-6">Customer Reviews</h3>
              <div className="mb-4">
                {book?.customerReviews.length > 0 ? (
                  <ul className="space-y-4">
                    {book?.customerReviews?.map(
                      (review: { email: string; comment: string }, index) => (
                        <li key={index} className="flex items-start mt-4">
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
                            alt="User Profile"
                          />
                          <div className="ml-4">
                            <p className="font-[600]">{review.email}</p>
                            <p className="py-2 rounded">{review.comment}</p>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Book not found.</p>
        )}
      </div>
    </>
  );
};

export default BookDetails;
