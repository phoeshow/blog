import { useState, useMemo, useEffect } from 'react';

import { RichTextEditor } from '@mantine/rte';

const EditPage = () => {
  const [value, onChange] = useState('');

  const modules = useMemo(
    () => ({
      history: { delay: 2500, userOnly: true },
      syntax: true,
    }),
    []
  );

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="editpage">
      <p>this editpage</p>
      <RichTextEditor modules={modules} value={value} onChange={onChange} />
    </div>
  );
};

export default EditPage;
