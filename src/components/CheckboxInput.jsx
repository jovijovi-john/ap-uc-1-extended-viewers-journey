
import { useState } from 'react';

export default function CheckboxInput({
  createReference = () => { },
  className,
  children
}) {

  const [isChecked, setIsChecked] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setIsChecked(!isChecked);
    }
  };

  return (
    <label className={`text-white flex gap-4 text-3xl ${className}`}>
      <input
        ref={(el) => createReference(el)}
        type="checkbox"
        name='teste'
        value={'teste'}
        checked={isChecked}
        onKeyDown={handleKeyPress}
        onChange={() => setIsChecked(!isChecked)}
      />

      {children}
    </label>
  )
}
