import React from 'react'
import data from '../assets/data.json'

function View() {
  const getImageId = (url) => {
    if (!url) return null;
    const match = url.match(/articleshow\/(\d+)\.cms/);
    return match ? match[1] : null;
  };

  const getImageUrl = (url) => {
    const imageId = getImageId(url);
    return imageId ? `https://static.toiimg.com/photo.cms?photoid=${imageId}` : null;
  };

  const renderHTML = (html) => {
    return { __html: html };
  };

  return (
    <div className="min-h-screen bg-gray-100 md:p-8">
      <div className="w-full md:max-w-[700px] md:mx-auto text-left bg-white md:p-8 p-4 md:rounded-lg shadow-sm">
        <header className="text-left mb-8 pb-6 border-b-2 border-gray-200">
          <h1 className="text-4xl mb-3 text-[#E3272A] font-bold">{data.title}</h1>
          
          {data.leadimage && (
            <div className="w-full mb-4">
              <img 
                src={data.leadimage} 
                alt="Lead Image"
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          )}

          <p className="text-lg text-gray-900 leading-relaxed">
            {data.description}
          </p>
        </header>

        <div className="flex flex-col gap-6 py-2">
          {data.stories.map((story, index) => (
            <article key={index} className="py-6 border-b border-gray-200 last:border-b-0">
              <h2 className="text-2xl mb-4 text-[#E3272A] font-semibold leading-tight">
                {story.headline}
              </h2>

              {story.details.link && (
                <div className="w-full mb-4">
                  <img 
                    src={getImageUrl(story.details.link)} 
                    alt={story.headline}
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              )}

              <div className="flex flex-col gap-4 text-left">
                <div className="mb-3">
                  <p className="text-base text-gray-900 leading-relaxed">
                    {story.summary}
                  </p>
                </div>

                <div className="mb-3">
                  <h3 className="text-base mb-2 text-gray-900 font-bold uppercase tracking-wider">
                    Key Points:
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li 
                      className="text-base text-gray-900"
                      dangerouslySetInnerHTML={renderHTML(story.details.highlight_1)}
                    />
                    <li 
                      className="text-base text-gray-900"
                      dangerouslySetInnerHTML={renderHTML(story.details.highlight_2)}
                    />
                    <li 
                      className="text-base text-gray-900"
                      dangerouslySetInnerHTML={renderHTML(story.details.highlight_3)}
                    />
                  </ul>
                </div>

                {story.details.link && (
                  <div className="mt-4 text-right">
                    <a 
                      href={story.details.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-base text-[#E3272A] hover:text-[#B31F22] hover:underline font-medium transition-colors"
                    >
                      Read full article →
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default View
