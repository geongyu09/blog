export default function Tag({ tag }: { tag: string }) {
  return (
    <span className="bg-indigo-300 text-gray-700 px-2 py-1 rounded-full text-sm mr-2">
      {tag}
    </span>
  );
}
