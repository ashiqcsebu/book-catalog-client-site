import { RiFacebookBoxFill, RiInstagramLine } from 'react-icons/ri';
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-[#242630] text-white p-20">
      <div className="flex justify-between">
        <div>
          <img className="h-20" src="https://www.cityofsachse.com/ImageRepository/Document?documentID=7216" alt="Logo" />
        </div>
        <div className="flex gap-20">
          <ul className="space-y-2">
            <li>Home</li>
            <li>All Books</li>
          </ul>
          <ul className="space-y-2">
            <li>Publisher</li>
            <li>Books</li>
          </ul>
          <ul className="space-y-2">
            <li>Contact</li>
            <li>Career</li>
          </ul>
          
       
        </div>
        <div className="flex gap-2 text-2xl">
          <RiFacebookBoxFill />
          <RiInstagramLine />
        </div>
      </div>
      <div className="flex w-full mt-20 gap-5">
        <p>Privacy Policy</p>
        <p>Terms & Condition</p>
        <p className="ml-auto"> &#169; Book Catalog {year} by Ashiqul Islam Shabu</p>
      </div>
    </div>
  );
}
