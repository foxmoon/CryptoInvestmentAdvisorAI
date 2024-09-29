import { useState } from 'react';
import Image from 'next/image';
import { marked } from 'marked';

export default function AdvisorResponse({ advisor, response, isLoading, imageUrl }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const summaryLength = 100;

  const renderMarkdown = (text) => {
    return { __html: marked(text) };
  };

  const getSummary = (text) => {
    if (text.length <= summaryLength) return text;
    return text.slice(0, summaryLength).trim() + '...';
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-md">
      <Image
        src={imageUrl}
        alt={`${advisor} avatar`}
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="flex-1">
        <h4 className="text-lg font-semibold mb-2">
          {advisor.charAt(0).toUpperCase() + advisor.slice(1)}
        </h4>
        {isLoading ? (
          <p className="text-sm text-gray-500">Generating advice...</p>
        ) : (
          <>
            <div 
              className="prose prose-sm max-w-none" 
              dangerouslySetInnerHTML={renderMarkdown(isExpanded ? response : getSummary(response || 'No advice yet.'))}
            />
            {response && response.length > summaryLength && (
              <button 
                onClick={toggleExpand} 
                className="text-blue-500 hover:underline mt-2 text-sm focus:outline-none"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
