import React, { FC, useState } from "react";
import { Icon } from "@/components";
import { RiSearch2Line } from "react-icons/ri";
import { useAsyncDebounce } from "react-table";

interface GlobalFilterProps {
  pre_global_filtered_rows: [];
  global_filter: string;
  setGlobalFilter: (value: string | undefined) => {};
}

const GlobalFilter: FC<GlobalFilterProps> = ({
  pre_global_filtered_rows,
  global_filter,
  setGlobalFilter,
}) => {
  const count = pre_global_filtered_rows.length;
  const [value, setValue] = useState<string | undefined>(global_filter);
  const onChange = useAsyncDebounce((value: string | undefined) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex gap-x-2 items-baseline">
      <div className="border border-indigo-500 rounded-xl flex items-center px-3 gap-x-2 w-[200px]">
        <Icon
          icon={<RiSearch2Line className="w-5 h-5" />}
          iconWrapperStyles=" text-gray-500"
        />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records`}
          className="w-full px-2 py-2  bg-transparent outline-none text-gra-900"
        />
      </div>
    </label>
  );
};

export default GlobalFilter;
