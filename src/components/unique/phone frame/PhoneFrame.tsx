import Image from "next/image";

export default function PhoneFrame() {
  return (
    <div className="container">
      <div className="phone">
        <div className="notch-container">
          <div className="notch"></div>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full object-cover">
          <Image
            src="/img/placeholder_mie.jpg"
            alt="PhoneFrame"
            width={500}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
