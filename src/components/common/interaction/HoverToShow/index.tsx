interface HoverToShowProps {
  hoverComponent: React.ReactNode;
  nonHoverComponent: React.ReactNode;
}

export default function HoverToShow({
  hoverComponent,
  nonHoverComponent,
}: HoverToShowProps) {
  return (
    <div className="relative">
      <div className="relative group">
        <div className="transition-all duration-300 ease-in-out">
          {nonHoverComponent}
        </div>

        <div className="absolute top-0 right-0 w-full transition-all duration-300 ease-in-out opacity-0 invisible group-hover:opacity-100 group-hover:visible">
          {hoverComponent}
        </div>
      </div>
    </div>
  );
}
