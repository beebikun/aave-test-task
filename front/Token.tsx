import React from 'react';

interface IProps {
  image: string;
}

export default function Token({ image }: IProps): React.ReactElement {
  const canBeRendered = image.includes('<svg');

  if (canBeRendered) {
    return <div className="item" dangerouslySetInnerHTML={{ __html: image }} />;
  }

  return (
    <div className="item">
      <img src={image} />
    </div>
  );
}
