// components/ShareButton.js
import { toPng } from 'html-to-image';

export default function ShareButton({ shayariId }) {
  const handleShare = () => {
    const element = document.getElementById(`${shayariId}`);
    toPng(element).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `shayari-${shayariId}.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <button onClick={handleShare} className="cursor-pointer flex items-center gap-1">
      📤 Share as Image
    </button>
  );
}