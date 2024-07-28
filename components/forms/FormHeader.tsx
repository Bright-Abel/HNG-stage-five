type FormHeaderParams = {
  header: string;
  pText: string;
};
function FormHeader({ header, pText }: FormHeaderParams) {
  return (
    <div>
      <h1 className="text-[32px] font-bold leading-[48px] text-[#333333]">
        {header}
      </h1>
      <p className="font-normal text-[16px] leading-[24px]">{pText}</p>
    </div>
  );
}
export default FormHeader;
