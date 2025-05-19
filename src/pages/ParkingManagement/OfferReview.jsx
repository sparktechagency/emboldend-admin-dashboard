import { Input, Spin } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import OfferReviewTable from "../../components/OfferReviewTable";
import { useBussinessShopOfferQuery } from "../../features/bussinessManagement/bussinessApi";
import Loading from "../../components/Loading";

dayjs.extend(customParseFormat);

const { TextArea } = Input;

const column = [
  "SL",
  "Shop Name",
  "Item Name",
  "Item Category",
  "Start Date",
  "End Date",
  "Price",
  "Action",
];

const OfferReview = () => {
  const navigate = useNavigate();
 

  return (
    <div className="w-full">
      <div className="mt-16">
        <div>
          <div
            onClick={() => navigate("/business-management")}
            className="flex items-center w-48 gap-3 pb-8 text-xl font-semibold cursor-pointer"
          >
            <IoIosArrowBack className="font-semibold" />
            <span className="text-[#C68C4E]">Offer Review</span>
          </div>
        </div>

        {/* Loading Indicator */}
        
          <div>
            <OfferReviewTable columns={column} />
          </div>

      </div>
    </div>
  );
};

export default OfferReview;
