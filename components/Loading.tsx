import { Oval } from 'react-loader-spinner';

type myStyle = {
  height: string | number;
  width: string | number;
  strokeWidth: number;
  color: string;
};
const Loading = ({ height, width, strokeWidth, color }: myStyle) => {
  return (
    <Oval
      visible={true}
      height={height}
      width={width}
      strokeWidth={strokeWidth}
      strokeWidthSecondary={strokeWidth}
      color={color}
      ariaLabel="oval-loading"
      //   wrapperStyle={{ color: 'red' }}
      //   wrapperClass=""
    />
  );
};
export default Loading;
