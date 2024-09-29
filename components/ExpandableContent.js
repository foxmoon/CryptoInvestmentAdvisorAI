import { useState } from 'react';
import { marked } from 'marked';

export default function ExpandableContent({ title, content, initialExpanded = false, bgColor = 'bg-white' }) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const summaryLength = 100;

  const renderMarkdown = (text) => {
    return { __html: marked(text) };
  };

  const getSummary = (text) => {
    if (!text || text.length <= summaryLength) return text;
    return text.slice(0, summaryLength).trim() + '...';
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className={`p-4 ${bgColor} border rounded-md`}>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div 
        className="prose prose-sm max-w-none" 
        dangerouslySetInnerHTML={renderMarkdown(isExpanded ? content : getSummary(content))}
      />
      {content && content.length > summaryLength && (
        <button 
          onClick={toggleExpand} 
          className="text-blue-500 hover:underline mt-2 text-sm focus:outline-none"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}