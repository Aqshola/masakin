type Props = {
  listData: Array<string>;
};

export default function RecipeListBox(props: Props) {
  return (
    <ul>
      {props.listData.map((data) => (
        <li
          className="text-sm px-5 py-2 border border-primary-softblack rounded border-opacity-10 mb-2"
          key={data}
        >
          {data}
        </li>
      ))}
    </ul>
  );
}
