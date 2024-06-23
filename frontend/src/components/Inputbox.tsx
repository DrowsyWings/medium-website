import { ChangeEvent } from "react";

export const InputBox = ({
  label,
  placeholder,
  onChange,
  type,
}: LabeledInput) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-900 pt-2">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

interface LabeledInput {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
