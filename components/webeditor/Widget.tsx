import { Widget as WidgetType } from '@/lib/types/webeditor';

interface WidgetProps {
  widget: WidgetType;
}

const Widget: React.FC<WidgetProps> = ({ widget }) => {
  return (
    <div className="p-2 bg-white shadow-md rounded-lg mb-2">
      <p>{widget.content}</p>
    </div>
  );
};

export default Widget;
