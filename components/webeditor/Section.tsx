import Widget from "@/components/webeditor/Widget"
import { Section as SectionType } from '@/lib/types/webeditor';

interface SectionProps {
  section: SectionType;
}

const Section: React.FC<SectionProps> = ({ section }) => {
  return (
    <div className="p-4 bg-gray-100 border rounded-lg mb-4">
      <h2 className="text-lg font-semibold">{section.content}</h2>
      <div className="mt-2">
        {section.widgets.length > 0 ? (
          section.widgets.map((widget) => <Widget key={widget.id} widget={widget} />)
        ) : (
          <p className="text-gray-500">No widgets yet.</p>
        )}
      </div>
    </div>
  );
};

export default Section;
