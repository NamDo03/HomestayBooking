import img1 from "../../assets/list-your-property.png";
import img2 from "../../assets/book-with-confidence.png";
import img3 from "../../assets/trustsafety.png";

const Assurance = () => {
  return (
    <div className="px-3 xl:px-20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-24">
        <div className="flex flex-row lg:flex-col justify-center items-center gap-4 p-3">
          <div className="p-4">
            <img src={img1} alt="" />
          </div>
          <div className="flex flex-col justify-start lg:justify-center lg:items-center gap-2 p-4">
            <h4 className="font-semibold text-base lg:text-xl">
              High-quality Property
            </h4>
            <span className="font-light lg:text-center text-start text-sm lg:text-base">
              Every property we have to propose you corresponds to the all high
              standards of comfort and pleasant rest.
            </span>
          </div>
        </div>
        <div className="flex flex-row lg:flex-col justify-center items-center gap-4 p-3">
          <div className="p-4">
            <img src={img2} alt="" />
          </div>
          <div className="flex flex-col justify-start lg:justify-center lg:items-center gap-2 p-4">
            <h4 className="font-semibold text-base lg:text-xl">
              Book with Confidence
            </h4>
            <span className="font-light lg:text-center text-start text-sm lg:text-base">
              Be sure that your booking is confirmed by us, as we are using
              extremely smart booking management system.
            </span>
          </div>
        </div>
        <div className="flex flex-row lg:flex-col justify-center items-center gap-4 p-3">
          <div className="p-4">
            <img src={img3} alt="" />
          </div>
          <div className="flex flex-col justify-start lg:justify-center lg:items-center gap-2 p-4">
            <h4 className="font-semibold text-base lg:text-xl">
              Trust & Safety
            </h4>
            <span className="font-light lg:text-center text-start text-sm lg:text-base">
              Hundreds of satisfied visitors have stated their extremely
              pleasant impressions and you can check it yourself!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assurance;
