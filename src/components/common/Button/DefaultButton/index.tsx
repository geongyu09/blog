import cn from '@/utils/cn';

interface DefaultButtonProps {
  classname?: string;
  text?: string;
}

export default function DefaultButton({ text, classname }: DefaultButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'w-full py-4 text-center block bg-slate-100 rounded-md text-slate-900 font-semibold hover:bg-slate-200 transition-all',
        classname,
      )}
    >
      {text}
    </button>
  );
}

DefaultButton.defaultProps = {
  classname: '',
  text: '',
};
