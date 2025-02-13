import React from 'react';
import moderateTopicsData from '../Data/content2.json';

const Moderate = () => {
    const { moderateTopics } = moderateTopicsData;

    return (
        <div className="container mx-auto px-4 py-8">
            <div>
                <h2 className="text-3xl font-bold mb-8">Moderate Topics of HTML</h2>
                <h4>o HTML Forms</h4>
                <h4>o HTML Tables</h4>
                <h4>o HTML Semantic Elements</h4>
            </div>
            {moderateTopics.map((topic, index) => (
                <div key={index} className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">{topic.title}</h2>
                    <div className="prose lg:prose-lg">
                        {topic.content.map((item, idx) => {
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
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Moderate;
