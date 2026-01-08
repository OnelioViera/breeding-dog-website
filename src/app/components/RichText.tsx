import React from 'react';

interface RichTextProps {
  content: any; // Payload's RichText field content (Slate format)
  className?: string;
}

const RichText: React.FC<RichTextProps> = ({ content, className }) => {
  if (!content) {
    return null;
  }

  // Basic rendering for Payload's Slate-based richText output
  // This handles paragraphs, headings, bold, italic, and links
  const renderNode = (node: any, index: number): React.ReactNode => {
    if (!node) return null;

    // Handle text nodes
    if (node.text !== undefined) {
      let text: React.ReactNode = node.text;
      
      if (node.bold) {
        text = <strong key={`bold-${index}`}>{text}</strong>;
      }
      if (node.italic) {
        text = <em key={`italic-${index}`}>{text}</em>;
      }
      if (node.underline) {
        text = <u key={`underline-${index}`}>{text}</u>;
      }
      
      return <React.Fragment key={`text-${index}`}>{text}</React.Fragment>;
    }

    // Handle element nodes
    if (node.type) {
      const children = node.children?.map((child: any, i: number) => renderNode(child, i)) || [];

      switch (node.type) {
        case 'h1':
          return <h1 key={`h1-${index}`} className="text-4xl font-bold mb-4 mt-6">{children}</h1>;
        case 'h2':
          return <h2 key={`h2-${index}`} className="text-3xl font-bold mb-3 mt-5">{children}</h2>;
        case 'h3':
          return <h3 key={`h3-${index}`} className="text-2xl font-bold mb-2 mt-4">{children}</h3>;
        case 'h4':
          return <h4 key={`h4-${index}`} className="text-xl font-bold mb-2 mt-3">{children}</h4>;
        case 'h5':
          return <h5 key={`h5-${index}`} className="text-lg font-bold mb-2 mt-3">{children}</h5>;
        case 'h6':
          return <h6 key={`h6-${index}`} className="text-base font-bold mb-2 mt-3">{children}</h6>;
        case 'ul':
          return <ul key={`ul-${index}`} className="list-disc list-inside mb-4 ml-4">{children}</ul>;
        case 'ol':
          return <ol key={`ol-${index}`} className="list-decimal list-inside mb-4 ml-4">{children}</ol>;
        case 'li':
          return <li key={`li-${index}`} className="mb-1">{children}</li>;
        case 'blockquote':
          return <blockquote key={`blockquote-${index}`} className="border-l-4 border-amber-600 pl-4 italic my-4">{children}</blockquote>;
        case 'link':
          return (
            <a
              key={`link-${index}`}
              href={node.url}
              target={node.newTab ? '_blank' : undefined}
              rel={node.newTab ? 'noopener noreferrer' : undefined}
              className="text-amber-600 hover:text-amber-700 underline"
            >
              {children}
            </a>
          );
        case 'paragraph':
        default:
          return <p key={`p-${index}`} className="mb-4">{children}</p>;
      }
    }

    return null;
  };

  // Handle different content structures
  if (content.root?.children) {
    // Slate format with root.children
    return (
      <div className={className}>
        {content.root.children.map((node: any, index: number) => renderNode(node, index))}
      </div>
    );
  } else if (Array.isArray(content)) {
    // Array format
    return (
      <div className={className}>
        {content.map((node: any, index: number) => renderNode(node, index))}
      </div>
    );
  }

  return null;
};

export default RichText;

