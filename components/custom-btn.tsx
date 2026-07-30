import Image from "next/image";

type Props = {
  url: string;
  className: string;
  onClick?: () => void;
};

function CustomBtn({ url, className, onClick }: Props) {
  return (
    <button
      type="button"
      className={`${className} relative overflow-hidden rounded-2xl transition-opacity hover:opacity-80`}
      onClick={onClick}
    >
      <Image
        src={url}
        alt="Custom Button"
        fill
        sizes="(max-width: 640px) 45vw, 200px"
        className="rounded-4xl object-contain"
      />
    </button>
  );
}

export default CustomBtn;
