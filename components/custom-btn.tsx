import Image from "next/image";


type Props = {
  url: string;
  className: string;
  onClick?: () => void;
  backgroundSize?: string;
};

function CustomBtn({
  url,
  className,
  onClick,
  backgroundSize = "cover",
}: Props) {
  return (
    <button
      type="button"
      //   className={`${className} overflow-hidden rounded-2xl bg-center bg-no-repeat transition-opacity hover:opacity-80`}
      //   style={{
      //     backgroundImage: `url('${url}')`,
      //     backgroundSize,
      //   }}
      className={`${className} relative overflow-hidden rounded-2xl transition-opacity hover:opacity-80`}
      onClick={onClick}
    >
      <Image
        src={url}
        alt="Custom Button"
        layout="fill"
        objectFit={"contain"}
        className="rounded-4xl"
      />
    </button>
  );
}

export default CustomBtn;
