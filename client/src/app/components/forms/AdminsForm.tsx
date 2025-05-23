// components/AdminForm.tsx
import React from "react";

type AdminFormProps = {
  formValues: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: () => void;
  handleDelete: () => void;
  canSubmit: boolean;
  canDelete: boolean;
  isDisabled: boolean;
};

export const AdminForm = ({
  formValues,
  onChange,
  handleSubmit,
  handleDelete,
  canSubmit,
  canDelete,
  isDisabled,
}: AdminFormProps) => {
  return (
    <div className="flex flex-col gap-6 w-full p-4 bg-white/50 rounded overflow-y-auto">
      {["firstName", "lastName", "email"].map((field) => (
        <input
          key={field}
          name={field}
          type="text"
          value={formValues[field as keyof typeof formValues]}
          onChange={onChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          disabled={isDisabled}
          className={`text-black p-4 rounded-xl outline-none ${
            isDisabled ? "bg-neutral-400 cursor-not-allowed" : "bg-white/90"
          }`}
        />
      ))}

      <select
        name="role"
        value={formValues.role}
        onChange={onChange}
        disabled={isDisabled}
        className={`text-black p-4 rounded-xl outline-none ${
          isDisabled
            ? "bg-neutral-400 cursor-not-allowed"
            : "bg-white/90 cursor-pointer"
        }`}
      >
        {/* Add superAdmin only if allowed */}
        <option value="superAdmin">Super Admin</option>
        <option value="accCreator">Account Creator</option>
        <option value="eventHandler">Event Handler</option>
        <option value="adminManager">Admin Manager</option>
      </select>

      <div className="flex gap-2 w-full">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`px-2 py-3 rounded-xl w-40 mt-2 lg:mt-4 text-neutral-700 transition-all duration-300 ${
            !canSubmit
              ? "bg-white/50 cursor-not-allowed"
              : "bg-white/90 cursor-pointer hover:scale-105"
          }`}
        >
          Update Admin
        </button>

        <button
          onClick={handleDelete}
          disabled={!canDelete}
          className={`px-2 py-3 rounded-xl w-40 mt-2 lg:mt-4 text-white transition-all duration-300 ${
            !canDelete
              ? "bg-red-200 cursor-not-allowed"
              : "bg-red-500/90 hover:scale-105 cursor-pointer"
          }`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
