import FormInput from '@/components/forms/FormInput';

function UserDetails() {
  return (
    <div className="bg-[#FAFAFA] rounded-[12px] p-[20px] flex flex-col gap-[12px]">
      <FormInput
        genClassName="flex md:justify-between md:flex-row md:gap-0 flex-col gap-[4px]"
        label="First name*"
        placeHolder="e.g John Doe"
        classname="bg-white"
        name="firstname"
        type="text"
        textClass="text-[16px] leading-[24px]"
        inputClass="md:w-[68%] w-full"
      />
      <FormInput
        genClassName="flex md:justify-between md:flex-row md:gap-0 flex-col gap-[4px]"
        label="Last name*"
        placeHolder="e.g. Appleseed"
        classname="bg-white"
        name="lastname"
        type="text"
        textClass="text-[16px] leading-[24px]"
        inputClass="md:w-[68%] w-full"
      />
      <FormInput
        genClassName="flex md:justify-between md:flex-row md:gap-0 flex-col gap-[4px]"
        label="Email"
        placeHolder="e.g. email@example.com"
        classname="bg-white"
        name="email"
        type="email"
        textClass="text-[16px] leading-[24px]"
        inputClass="md:w-[68%] w-full"
      />
    </div>
  );
}
export default UserDetails;
