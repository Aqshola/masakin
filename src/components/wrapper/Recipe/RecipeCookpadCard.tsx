import Image from "next/image";

type Props = {
  title: string;
  image: string;
};
export default function RecipeCookpadCard(props: Props) {
  return (
    <div className="bg-primary-green flex  bg-opacity-70 flex-col gap-2 w-[200px] h-[250px] overflow-hidden rounded-2xl">
      <div className="p-2 w-full h-[150px] relative">
        <Image src={props.image} alt="" fill objectFit="cover" />
      </div>
      <div className="w-full p-2">
        <h4 className="font-semibold">{props.title}</h4>
      </div>
    </div>
  );
}
