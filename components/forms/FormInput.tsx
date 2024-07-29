import Image, { StaticImageData } from 'next/image';

type FormInputParams = {
  label: string;
  src?: StaticImageData | string;
  type: string;
  placeHolder?: string;
  err?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  classname?: string;
  genClassName?: string;
  textClass: string;
  inputClass?: string;
  require?: boolean;
  disabled?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormInput({
  label,
  src,
  type,
  placeHolder,
  require,
  err,
  name,
  value,
  classname,
  genClassName,
  textClass,
  inputClass,
  defaultValue,
  disabled,
  handleChange,
}: FormInputParams) {
  //
  return (
    <div className={`${genClassName}`}>
      <label
        htmlFor={name}
        className={`text-[#333333] ${textClass} ${err && 'text-[#FF3939]'}`}
      >
        {label}
      </label>
      <div
        className={`rounded-[8px] ${inputClass} ${
          err && 'border-[#FF3939]'
        } focus-within:shadow-custom focus-within:border-[#633CFF] py-[12px] px-[16px] gap-[12px] border border-solid border-[#D9D9D9] flex items-center justify-between flex-wrap ${classname}`}
      >
        {src && typeof src !== 'string' ? (
          <Image src={src} alt={label} className={genClassName} />
        ) : (
          src && (
            <Image src={src as string} alt={label} className={genClassName} />
          )
        )}
        <input
          name={name}
          value={value}
          type={type}
          className={`outline-none flex-1 min-w-0 `}
          required={require}
          placeholder={placeHolder}
          defaultValue={defaultValue}
          onChange={handleChange}
          disabled={disabled}
        />
        {err && (
          <p className="text-[#FF3939] whitespace-nowrap text-[12px] leading-[18px]">
            {err}
          </p>
        )}
      </div>
    </div>
  );
}
export default FormInput;
