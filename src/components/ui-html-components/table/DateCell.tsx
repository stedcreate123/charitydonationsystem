import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";

const Date = ({ value }: any) => {
  return (
    <section
      className={`px-3  w-fit leading-loose rounded-full bg-gray-50 shadow-sm text-c_dark`}
    >
      {format(
        new Timestamp(value?.seconds, value?.nanoseconds).toDate(),
        "EE, MMM d, yyy"
      )}
    </section>
  );
};

export default Date;
