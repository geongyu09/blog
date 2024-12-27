export default function Tag({ tag }: { tag: string }) {
  return (
    <span className="bg-slate-100 text-gray-600 px-3 py-1 rounded-full text-sm mr-2 font-medium">
      {tag}
    </span>
  );
}
