import React from 'react';
import beginnerContent from '../Data/content.json';

const Beginner = () => {
  const { beginnerTopics } = beginnerContent;

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h4>o Introduction to HTML</h4>
        <h4>o HTML Elements and Structure</h4>
        <h4>o Working with Links and Images</h4>
        <h4>o Creating Forms in HTML</h4>
        <h4>o Introduction to HTML5 Semantics</h4>
      </div>
      {beginnerTopics.map((topic, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{topic.title}</h2>
          <div className="prose lg:prose-lg">
            {Array.isArray(topic.content) ? (
              topic.content.map((item, idx) => {
                switch (item.type) {
                  case 'heading':
                    return <h3 key={idx} className="text-lg font-bold mb-2">{item.text}</h3>;
                  case 'paragraph':
                    return <p key={idx} className="mb-4">{item.text}</p>;
                  case 'code':
                    return (
                      <pre key={idx} className="bg-gray-100 rounded-lg p-4 mb-4">
                        <code className="text-sm">{item.text}</code>
                      </pre>
                    );
                  default:
                    return null;
                }
              })
            ) : (
              <p className="mb-4">{topic.content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Beginner;
