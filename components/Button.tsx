import Loading from './Loading';
type Btn = {
  type: 'button' | 'submit' | 'reset';
  name: string;
  isLoading?: boolean;
  disable?: boolean;
  text?: string;
};
function Button({ type, name, disable, isLoading, text }: Btn) {
  return (
    <div>
      <button
        type={type}
        disabled={disable || isLoading}
        className={`w-full bg-[#633CFF] py-[11px] px-[27px] rounded-[8px] text-white font-semibold text-[16px] leading-[24px] hover:bg-[#BEADFF] hover-shadow-btnCol duration-500 flex justify-center ${
          isLoading && 'cursor-not-allowed '
        }`}
      >
        {isLoading ? (
          <div className="flex gap-2 items-center">
            <Loading color="#FFFF" strokeWidth={6} height={26} width={24} />
            <p>{text}</p>
          </div>
        ) : (
          name
        )}
      </button>
    </div>
  );
}
export default Button;
